import React from 'react';
import { 
  X, 
  Printer, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Building2,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface UmkmCardIdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UmkmCardIdModal: React.FC<UmkmCardIdModalProps> = ({ isOpen, onClose }) => {
  const { currentUmkm } = useApp();

  if (!isOpen || !currentUmkm) return null;

  const handlePrint = () => {
    window.print();
  };

  const getClassName = (cls: string) => {
    switch (cls) {
      case 'naik_kelas':
        return 'KELAS 3: UMKM NAIK KELAS & SIAP EKSPOR';
      case 'berkembang':
        return 'KELAS 2: UMKM BERKEMBANG MANDIRI';
      default:
        return 'KELAS 1: UMKM PEMULA RINTISAN';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:m-0 print:w-full">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold">Kartu Tanda Binaan & Verifikasi LANGKAH</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Card Body */}
        <div className="p-6 space-y-6">
          <div className="border-4 border-double border-emerald-800 rounded-3xl p-6 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white relative shadow-xl overflow-hidden">
            
            {/* Watermark badge */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none p-4">
              <Award className="w-64 h-64 text-white" />
            </div>

            {/* Header Logos */}
            <div className="border-b border-emerald-700/50 pb-4 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  Pemerintah Kab. Lombok Timur • Bank Indonesia NTB
                </span>
                <h3 className="text-lg font-black text-white tracking-wide">
                  LANGKAH DIGITAL CARD
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                NTB
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex items-start gap-4">
              <img 
                src={currentUmkm.avatarUrl} 
                alt={currentUmkm.brandName} 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-emerald-300">
                  {currentUmkm.sector}
                </span>
                <h4 className="text-xl font-black text-white">
                  {currentUmkm.brandName}
                </h4>
                <p className="text-xs text-slate-300">
                  Pemilik: <strong>{currentUmkm.ownerName}</strong>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-300">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>Kec. {currentUmkm.district}, Kab. Lombok Timur</span>
                </div>
              </div>
            </div>

            {/* Class Classification Badge */}
            <div className="my-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">
                Tingkat Kapasitas Usaha (Status Binaan):
              </span>
              <strong className="text-sm font-black text-amber-300 tracking-wide block mt-0.5">
                {getClassName(currentUmkm.umkmClass)}
              </strong>
            </div>

            {/* Legalities Checkmarks */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentUmkm.assessment.hasNib ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>NIB: {currentUmkm.assessment.hasNib ? 'Terverifikasi' : 'Proses'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentUmkm.assessment.hasHalal ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>Halal: {currentUmkm.assessment.hasHalal ? 'Terbit' : 'Dalam Proses'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentUmkm.assessment.hasQris ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>QRIS Merchant: {currentUmkm.assessment.hasQris ? 'Aktif' : 'Belum'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentUmkm.assessment.hasFacebookPro ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>Medsos Bisnis: {currentUmkm.assessment.hasFacebookPro ? 'Aktif' : 'Belum'}</span>
              </div>
            </div>

            {/* Footer QR & ID */}
            <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div>
                <span>ID REGISTRASI: <strong>{currentUmkm.id.toUpperCase()}</strong></span>
                <span className="block text-slate-400">Total XP: {currentUmkm.xp} Poin</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-300 font-sans font-bold block">VERIFIED SYSTEM</span>
                <span>BI NTB 2024-2025</span>
              </div>
            </div>

          </div>

          {/* Action button */}
          <div className="flex justify-end gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Kartu PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
