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
  Building2,
  BookOpen,
  CheckCircle2
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

const PRESET_TOPICS = [
  {
    title: 'Sertifikat Halal Gratis (SEHATI)',
    desc: 'Syarat & cara daftar di BPJPH NTB',
    prompt: 'Bagaimana syarat dan alur daftar Sertifikat Halal Sehati BPJPH di Lombok NTB?'
  },
  {
    title: 'NIB (Nomor Induk Berusaha)',
    desc: 'Langkah terbit izin resmi OSS RBA',
    prompt: 'Apa saja syarat dan langkah membuat NIB gratis di portal OSS RBA?'
  },
  {
    title: 'Izin Edar P-IRT Dinkes',
    desc: 'Standar pangan olahan masuk minimarket',
    prompt: 'Bagaimana cara dan syarat mengurus SPP-IRT rekomendasi Dinas Kesehatan di Lombok?'
  },
  {
    title: 'QRIS Bank NTB Syariah / BI',
    desc: 'Pembayaran nontunai & histori bank',
    prompt: 'Bagaimana cara pasang QRIS Merchant lewat Bank NTB Syariah dan keuntungannya?'
  },
  {
    title: 'Standardisasi Kemasan Ritel',
    desc: 'Fasilitasi UPTD Rumah Kemasan NTB',
    prompt: 'Apa standar kemasan produk olahan ritel modern dan bantuan Rumah Kemasan NTB?'
  },
  {
    title: 'Pendaftaran Merek HKI',
    desc: 'Diskon tarif UMK Rp 500rb Kemenkumham',
    prompt: 'Bagaimana cara mendaftarkan hak cipta merek HKI Kemenkumham dengan rekomendasi dinas?'
  }
];

export const AiMentorModal: React.FC<AiMentorModalProps> = ({ isOpen, onClose }) => {
  const { currentUmkm } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Halo ${currentUmkm?.ownerName || 'Bapak/Ibu Pelaku Usaha'}! Saya **Langkah Mentor AI**, pusat panduan resmi legalitas & perizinan usaha di Pulau Lombok.\n\nSemua panduan resmi seputar **NIB OSS**, **Sertifikasi Halal Gratis (SEHATI)**, **P-IRT Dinkes**, **Merek HKI**, dan **QRIS Bank Indonesia NTB** telah kami siapkan di sini. Anda bisa langsung memilih topik di bawah atau mengetik pertanyaan bebas!`,
      time: 'Baru saja'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer || 'Terima kasih atas pertanyaannya. Silakan pilih topik panduan di atas atau tanyakan ke pendamping dinas setempat.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('AI Mentor Error:', err);
      const fallbackMsg: Message = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `### 📌 Panduan Resmi Cepat:\nUntuk pertanyaan Anda, silakan pastikan NIB telah terbit di **oss.go.id**, lalu daftarkan Sertifikasi Halal Gratis di **ptsp.halal.go.id**. Anda juga dapat menghubungi meja pendamping LANGKAH di dinas setempat.`,
        time: 'Baru saja'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col h-[88vh] max-h-[720px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
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
                  Konsultasi Bebas & Jawaban Siap Pakai
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 leading-tight">
                Pusat Jawaban Resmi Regulasi & Akselerasi IKM/UMKM Se-Pulau Lombok
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Topics Quick Bar */}
        <div className="p-3 bg-slate-100/80 border-b border-slate-200 shrink-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Pilih Langsung Topik Panduan yang Ingin Dipelajari:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {PRESET_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(topic.prompt)}
                disabled={isLoading}
                className="p-2 text-left rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 transition-all cursor-pointer group shadow-2xs"
              >
                <strong className="block text-[11px] text-slate-800 group-hover:text-emerald-800 font-bold truncate">
                  {topic.title}
                </strong>
                <span className="text-[10px] text-slate-500 truncate block">
                  {topic.desc}
                </span>
              </button>
            ))}
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
                <div className="whitespace-pre-wrap leading-relaxed">
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
                <span>Memuat panduan resmi regulasi Lombok...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
          <input 
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Ketik pertanyaan izin usaha Anda (misal: syarat NIB, cara daftar halal, SPP-IRT)..."
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
