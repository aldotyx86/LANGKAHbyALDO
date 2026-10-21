import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle,
  RefreshCw,
  Zap,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Bagaimana syarat daftar Sertifikat Halal Sehati BPJPH di NTB?',
  'Apa langkah mengurus NIB OSS untuk usaha rumahan?',
  'Cara buat SPP-IRT rekomendasi Dinas Kesehatan di Lombok',
  'Tips kemasan makanan agar tahan lama & lolos kurasi BI NTB',
  'Syarat pasang QRIS Merchant lewat Bank NTB Syariah'
];

export const AiMentorModal: React.FC<AiMentorModalProps> = ({ isOpen, onClose }) => {
  const { currentUmkm, aiQuota, decrementAiQuota } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Halo ${currentUmkm?.ownerName || 'Bapak/Ibu Pelaku Usaha'}! Saya **Langkah Mentor AI**, konsultan resmi legalitas & perizinan usaha di Pulau Lombok.\n\nAda yang bisa saya bantu terkait **NIB OSS**, **Sertifikasi Halal Gratis (SEHATI)**, **P-IRT Dinkes**, **Merek HKI**, atau **QRIS Bank Indonesia NTB** hari ini?`,
      time: 'Baru saja'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || inputPrompt).trim();
    if (!promptText || isLoading) return;

    if (aiQuota <= 0) {
      setErrorMessage('Batas harian konsultasi tercapai (15/15). Kuota Anda akan direset besok subuh agar server tetap stabil bagi 75.000 UMKM Lombok.');
      return;
    }

    setErrorMessage('');
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptText,
          userId: currentUmkm?.id || 'demo_user',
          context: currentUmkm ? {
            brandName: currentUmkm.brandName,
            sector: currentUmkm.sector,
            region: currentUmkm.region,
            district: currentUmkm.district,
            umkmClass: currentUmkm.umkmClass,
            hasNib: currentUmkm.assessment.hasNib,
            hasHalal: currentUmkm.assessment.hasHalal,
            hasPirt: currentUmkm.assessment.hasPirtOrBpom
          } : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal menghubungi server Gemini AI.');
      }

      decrementAiQuota();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('AI Mentor Error:', err);
      setErrorMessage(err.message || 'Gagal memproses konsultasi.');
      // Fallback pesan edukatif
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `Maaf, terjadi kendala koneksi ke server AI. Panduan cepat untuk pertanyaan Anda: Silakan hubungi pendamping wilayah Anda atau akses portal resmi oss.go.id / ptsp.halal.go.id.`,
        time: 'Baru saja'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col h-[85vh] max-h-[700px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-white">Langkah Mentor AI</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 leading-tight">
                Konsultan Resmi Regulasi & Legalitas UMKM NTB • Server-Side Secured
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quota Badge */}
            <div className="bg-white/10 border border-white/20 rounded-xl px-2.5 py-1 text-center hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-slate-300 block font-bold">Sisa Kuota:</span>
              <span className="text-xs font-black text-amber-300">{aiQuota} / 15</span>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-400 text-slate-950'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">
                  {msg.text}
                </div>
                <div className={`text-[10px] text-right pt-1 ${
                  msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-600 flex items-center gap-2 shadow-2xs">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Mentor AI sedang membaca regulasi NTB & menyusun langkah praktis...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar shrink-0">
          <span className="text-slate-400 font-bold whitespace-nowrap flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Coba:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg text-slate-700 whitespace-nowrap transition-colors cursor-pointer border border-slate-200/80 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
          <input 
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Tanyakan izin usaha Anda (misal: syarat NIB keripik, biaya halal, SPP-IRT)..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-600 focus:bg-white transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center shrink-0"
            title="Kirim Pertanyaan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
