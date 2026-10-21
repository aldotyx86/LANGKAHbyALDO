import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Plus, 
  Edit3, 
  X,
  FileCheck2,
  Minimize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LegalitasItem, LegalitasStatus, LegalitasType } from '../types';
import { compressImage, formatFileSize } from '../lib/imageCompression';

export const LegalitasTracker: React.FC = () => {
  const { currentUmkm, updateLegalitasItem, fireConfetti } = useApp();

  const [activeEditItem, setActiveEditItem] = useState<LegalitasItem | null>(null);
  const [formStatus, setFormStatus] = useState<LegalitasStatus>('belum_ada');
  const [formNumber, setFormNumber] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: string;
    compressedSize: string;
    savedPercentage: number;
    previewUrl: string;
  } | null>(null);

  if (!currentUmkm) return null;

  const tracker = currentUmkm.legalitasTracker;
  const items = Object.values(tracker);

  const completedCount = items.filter(i => i.status === 'terbit').length;
  const inProgressCount = items.filter(i => i.status === 'sedang_diproses').length;
  const missingCount = items.filter(i => i.status === 'belum_ada').length;

  const handleOpenEdit = (item: LegalitasItem) => {
    setActiveEditItem(item);
    setFormStatus(item.status);
    setFormNumber(item.documentNumber || '');
    setFormNotes(item.verificationNotes || '');
    setCompressionStats(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      // Kompresi di sisi browser sebelum dikirim
      const result = await compressImage(file, 1280, 1280, 0.75);

      setCompressionStats({
        originalSize: formatFileSize(result.originalSize),
        compressedSize: formatFileSize(result.compressedSize),
        savedPercentage: result.savedPercentage,
        previewUrl: result.dataUrl,
      });

      // Panggil backend API /api/upload-url
      await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: result.file.name,
          fileType: result.file.type,
          fileSize: result.compressedSize,
          userId: currentUmkm.id,
          category: activeEditItem?.id || 'legalitas',
        }),
      });
    } catch (err: any) {
      console.error('Gagal mengompresi gambar:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditItem) return;

    updateLegalitasItem(
      currentUmkm.id,
      activeEditItem.id,
      formStatus,
      formNumber.trim() || undefined,
      compressionStats?.previewUrl || activeEditItem.documentUrl,
      formNotes.trim() || undefined
    );

    setActiveEditItem(null);
  };

  const getStatusBadge = (status: LegalitasStatus) => {
    switch (status) {
      case 'terbit':
        return {
          label: 'Sudah Terbit',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        };
      case 'sedang_diproses':
        return {
          label: 'Sedang Diproses',
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />
        };
      default:
        return {
          label: 'Belum Ada',
          bg: 'bg-slate-100 text-slate-600 border-slate-300',
          icon: <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
      
      {/* Title & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Legalitas Usaha
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Standar Regulasi NTB & Nasional
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Tracker 5 Legalitas Wajib Usaha</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau status NIB, Halal, P-IRT, NPWP, dan HKI Merek Anda dalam satu panel terpusat.
          </p>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-center">
            <span className="text-xs font-black block">{completedCount}</span>
            <span className="text-[10px] font-semibold text-emerald-600">Terbit</span>
          </div>
          <div className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-center">
            <span className="text-xs font-black block">{inProgressCount}</span>
            <span className="text-[10px] font-semibold text-amber-600">Proses</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-center">
            <span className="text-xs font-black block">{missingCount}</span>
            <span className="text-[10px] font-semibold text-slate-500">Belum</span>
          </div>
        </div>
      </div>

      {/* Legalitas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const badge = getStatusBadge(item.status);
          return (
            <div 
              key={item.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 relative flex flex-col justify-between ${
                item.status === 'terbit' 
                  ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300' 
                  : item.status === 'sedang_diproses'
                  ? 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {item.label}
                  </h3>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge.bg}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.shortDesc}
                </p>

                {item.documentNumber && (
                  <div className="p-2 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono break-all flex items-center justify-between gap-2">
                    <span className="truncate">{item.documentNumber}</span>
                    <span className="text-[9px] text-emerald-300 font-sans font-bold uppercase shrink-0">Valid</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a 
                  href={item.officialPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold"
                >
                  <span>{item.officialPortalName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {activeEditItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Pembaruan Legalitas</span>
                <h3 className="text-base font-black text-slate-900">{activeEditItem.label}</h3>
              </div>
              <button 
                onClick={() => setActiveEditItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Status Radio */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Status Saat Ini:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['belum_ada', 'sedang_diproses', 'terbit'] as LegalitasStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormStatus(st)}
                      className={`py-2 px-2 rounded-xl font-bold border transition-all text-center cursor-pointer ${
                        formStatus === st
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'terbit' ? '✓ Sudah Terbit' : st === 'sedang_diproses' ? '⏳ Diproses' : '✕ Belum Ada'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nomor Dokumen */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nomor Sertifikat / Registrasi:
                </label>
                <input 
                  type="text"
                  placeholder="Contoh: 1289000123456 atau STTD-5203..."
                  value={formNumber}
                  onChange={(e) => setFormNumber(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-emerald-500 font-mono"
                />
              </div>

              {/* File Upload with Browser Compression */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <span>Upload Foto Berkas / Sertifikat (Kompresi Otomatis)</span>
                  </label>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Hemat Kuota
                  </span>
                </div>
                <input 
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                />
                
                {isCompressing && (
                  <p className="text-[11px] text-amber-700 animate-pulse font-medium">
                    Sedang mengompresi gambar di browser agar hemat kuota...
                  </p>
                )}

                {compressionStats && (
                  <div className="p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-[11px] text-emerald-950 flex items-center justify-between">
                    <div>
                      <strong className="block font-bold">Kompresi Berhasil!</strong>
                      <span>{compressionStats.originalSize} &rarr; {compressionStats.compressedSize}</span>
                    </div>
                    <span className="font-black text-emerald-800 bg-white px-2 py-0.5 rounded-lg text-xs shadow-2xs">
                      Hemat {compressionStats.savedPercentage}% Kuota
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveEditItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
