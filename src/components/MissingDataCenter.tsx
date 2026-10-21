import React, { useState } from 'react';
import { 
  FileQuestion, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Send, 
  HelpCircle, 
  FileText, 
  Building2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissingDataCenter: React.FC = () => {
  const { currentUmkm, addMissingDataNote, removeMissingDataNote, updateAssessment, fireConfetti } = useApp();
  const [newNoteInput, setNewNoteInput] = useState('');

  if (!currentUmkm) return null;

  // Automated missing checks
  const missingItems: Array<{
    category: string;
    item: string;
    dinas: string;
    impact: string;
    isResolved: boolean;
  }> = [
    {
      category: 'Legalitas',
      item: 'Nomor Induk Berusaha (NIB 13 Digit)',
      dinas: 'Dinas Koperasi & UKM / PTSP Lotim',
      impact: 'Syarat mutlak untuk semua program bantuan pemerintah',
      isResolved: currentUmkm.assessment.hasNib
    },
    {
      category: 'Legalitas',
      item: 'Sertifikat Halal Resmi (BPJPH Kemenag)',
      dinas: 'Satgas Halal NTB & Dinas Koperasi',
      impact: 'Wajib nasional untuk makanan & minuman',
      isResolved: currentUmkm.assessment.hasHalal
    },
    {
      category: 'Legalitas',
      item: 'Izin Edar P-IRT / Rekomendasi Dinkes Lotim',
      dinas: 'Dinas Kesehatan & Perindustrian Lotim',
      impact: 'Tiket masuk ke rak minimarket & ritel modern',
      isResolved: currentUmkm.assessment.hasPirtOrBpom
    },
    {
      category: 'Pemasaran Digital',
      item: 'Tautan Akun Facebook Pro / Halaman Bisnis',
      dinas: 'Klinik Bisnis Digital LANGKAH',
      impact: 'Menjangkau calon pembeli di grup Facebook NTB',
      isResolved: currentUmkm.assessment.hasFacebookPro
    },
    {
      category: 'Pemasaran Digital',
      item: 'Titik Lokasi Usaha di Google Maps',
      dinas: 'Dinas Pariwisata & Dinas Kominfo Lotim',
      impact: 'Agar turis dan pembeli mudah menemukan lokasi fisik',
      isResolved: currentUmkm.assessment.hasGoogleMaps
    },
    {
      category: 'Keuangan',
      item: 'Rekening Usaha Khusus (Terpisah dari Uang Rumah)',
      dinas: 'Bank NTB Syariah / Bank Penyalur KUR',
      impact: 'Mencegah modal terpakai belanja dapur',
      isResolved: currentUmkm.assessment.hasSeparateBankAcc
    },
    {
      category: 'Keuangan',
      item: 'QRIS Merchant (Pembayaran Nontunai BI)',
      dinas: 'Kantor Perwakilan Bank Indonesia NTB',
      impact: 'Transaksi tercatat rapi untuk scoring kredit bank',
      isResolved: currentUmkm.assessment.hasQris
    },
    {
      category: 'Standar Mutu',
      item: 'Kemasan Ritel Standar (Alufoil / Standing Pouch)',
      dinas: 'Dinas Perindustrian Kab. Lombok Timur',
      impact: 'Menaikkan nilai jual produk hingga 200%',
      isResolved: currentUmkm.assessment.hasStandardPackaging
    }
  ];

  const unresolved = missingItems.filter(i => !i.isResolved);
  const resolved = missingItems.filter(i => i.isResolved);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    addMissingDataNote(currentUmkm.id, newNoteInput.trim());
    setNewNoteInput('');
    fireConfetti();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-900/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-rose-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Pusat Diagnostik Kelengkapan
              </span>
              <span className="text-xs text-rose-200">
                Pemeriksaan Berkas: {currentUmkm.brandName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Cek Berkas & Data yang Masih Kurang
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tim pendamping mendeteksi dokumen dan data usaha apa saja yang belum lengkap agar dapat segera diurus melalui panduan harian aplikasi LANGKAH.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[160px]">
            <span className="text-3xl font-black text-rose-400">{unresolved.length}</span>
            <span className="text-xs text-slate-300 block font-semibold mt-0.5">Item Belum Lengkap</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Automated Checklist */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Missing items list */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Daftar Dokumen / Data yang Masih Kurang ({unresolved.length})</span>
            </h2>

            {unresolved.length === 0 ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-emerald-800 text-xs font-bold">
                🎉 Luar biasa! Seluruh dokumen dasar dan aspek digital Anda sudah lengkap terisi!
              </div>
            ) : (
              <div className="space-y-3">
                {unresolved.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-500">
                          Lembaga: <strong>{item.dinas}</strong>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.item}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Dampak: {item.impact}
                      </p>
                    </div>

                    <span className="shrink-0 text-[11px] font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                      Belum Ada
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Already resolved items */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Dokumen yang Sudah Lengkap ({resolved.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resolved.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-800">{item.item}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Selesai
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Custom Missing Data Notes from Admin / User */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-amber-600" />
              <span>Catatan Khusus dari Tim Pendamping</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Catatan spesifik tambahan (misal foto resolusi tinggi, hasil uji lab kandungan gizi, atau slide presentasi pitching BI).
            </p>

            {currentUmkm.missingDataNotes && currentUmkm.missingDataNotes.length > 0 ? (
              <div className="space-y-2">
                {currentUmkm.missingDataNotes.map((note, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start justify-between gap-2"
                  >
                    <span className="leading-snug">{note}</span>
                    <button
                      onClick={() => removeMissingDataNote(currentUmkm.id, idx)}
                      className="text-amber-800 hover:text-rose-600 transition-colors p-1"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Tidak ada catatan data kurang tambahan.</p>
            )}

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-700 block">
                Tambah Permintaan Berkas Baru:
              </label>
              <input 
                type="text"
                placeholder="Misal: Surat uji lab bebas boraks..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
              />
              <button
                type="submit"
                disabled={!newNoteInput.trim()}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Catatan Berkas</span>
              </button>
            </form>
          </div>

          {/* Quick Support Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 space-y-2 text-xs text-emerald-950">
            <h4 className="font-bold flex items-center gap-1.5 text-emerald-900">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>Butuh Bantuan Langsung?</span>
            </h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Jika mengalami kendala mengurus NIB atau sertifikat Halal, Anda dapat menghubungi posko pendamping LANGKAH di Kantor Dinas Koperasi UKM Lombok Timur (Kompleks Kantor Bupati Selong).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
