import React from 'react';
import { 
  X, 
  Layers, 
  Database, 
  Server, 
  Smartphone, 
  Cloud, 
  Bot, 
  ShieldCheck, 
  ExternalLink,
  Cpu,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Arsitektur Skala 75.000 UMKM
            </span>
            <span className="text-xs text-teal-300 font-semibold">
              Deployment Pipeline: GitHub &rarr; Vercel &rarr; Supabase + Cloudflare R2 + Gemini
            </span>
          </div>

          <h3 className="text-2xl font-black text-white">
            Spesifikasi Arsitektur Stack Next.js + Supabase
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Dirancang khusus untuk beban 75.000 UMKM se-Pulau Lombok (5 Kab/Kota) dengan karakteristik: File-Heavy (dokumen legalitas), akses 1-3x/hari per UMKM, dan keamanan kunci API di sisi server.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs">
          
          {/* Architectural Diagram representation */}
          <div className="p-5 bg-slate-950 text-white rounded-3xl border border-slate-800 space-y-5">
            <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Diagram Alur Data & Pipeline Produksi (Production Pipeline)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              
              {/* Box 1 */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white mx-auto flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">1. Client Layer (HP UMKM)</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Mobile-First UI, Kompresi Gambar di browser (Canvas HTML5) &rarr; Hemat 90% kuota.
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white mx-auto flex items-center justify-center font-bold">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">2. Vercel Serverless</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  API Routes `/api/ai-mentor` & `/api/upload-url`, Rate Limiting 15 query/hari per UMKM.
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">3. Supabase Core</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Multi-Role RLS (`umkm`, `pendamping`, `admin_dinas`), Composite Indexes untuk 75k baris.
                </p>
              </div>

              {/* Box 4 */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 mx-auto flex items-center justify-center font-bold">
                  <Cloud className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">4. Storage & Gemini AI</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Cloudflare R2 (dokumen NIB/Halal) & Server-side Gemini 3.8 Flash untuk pendampingan regulasi.
                </p>
              </div>

            </div>
          </div>

          {/* Key Optimization Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Keamanan Gemini AI & Kunci API</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Kunci API `GEMINI_API_KEY` disimpan secara eksklusif di environment server Vercel dan dipanggil lewat endpoint `/api/ai-mentor` dengan validasi kuota harian. Kunci tidak pernah bocor ke browser pengguna.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-teal-600" />
                <span>Pola Hemat Query Skala 75k User</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Kurikulum tugas harian (`daily_missions`) bersifat statis dan di-cache pada client. Supabase hanya meng-query progres per `user_id` yang terindeks secara komposit (`user_id, status`), sehingga database tetap responsif tanpa lonjakan biaya.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Hierarki Row-Level Security (RLS)</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                UMKM hanya bisa membaca dan mengubah datanya sendiri. Pendamping lapangan dihubungkan dengan tabel `mentor_assignments` agar hanya dapat memvalidasi UMKM di kabupaten wilayah binaannya.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-amber-600" />
                <span>Cloudflare R2 Zero Egress Cost</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Penyimpanan dokumen perizinan (PDF NIB, STTD Halal, foto produk) memanfaatkan Cloudflare R2 S3-Compatible API yang bebas biaya egress (bandwidth), sangat hemat untuk puluhan ribu berkas.
              </p>
            </div>

          </div>

          {/* Deployment Guide */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <h4 className="font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Langkah Cepat Masuk ke Pipeline GitHub & Vercel:</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-emerald-900 text-[11px] leading-relaxed">
              <li>Jalankan skrip SQL pada file `supabase/schema.sql` di SQL Editor dashboard Supabase Anda.</li>
              <li>Push repositori ini ke GitHub (`git add .`, `git commit -m "feat: Langkah UMKM Lombok"`, `git push origin main`).</li>
              <li>Impor repositori di Vercel Dashboard dan salin variabel dari file `.env.example`.</li>
              <li>Selesai! Aplikasi langsung live dengan backend serverless, RLS database, dan integrasi Gemini AI.</li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
};
