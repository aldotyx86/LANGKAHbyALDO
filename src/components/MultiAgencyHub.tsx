import React, { useState } from 'react';
import { 
  Building2, 
  Database, 
  Download, 
  Share2, 
  CheckCircle2, 
  Landmark, 
  Factory, 
  ShoppingBag, 
  Sprout, 
  Fish, 
  Compass, 
  FileSpreadsheet,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INTEGRATED_AGENCIES } from '../data/initialData';

export const MultiAgencyHub: React.FC = () => {
  const { umkmList } = useApp();
  const [syncStatus, setSyncStatus] = useState<Record<string, boolean>>({
    dinas_koperasi_ukm: true,
    dinas_perindustrian: true,
    dinas_perdagangan: true,
    bi_ntb: true,
    dinas_pertanian: true,
    dinas_perikanan: true,
    dinas_pariwisata: true
  });

  const [isExporting, setIsExporting] = useState(false);

  const getAgencyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-amber-600" />;
      case 'Factory':
        return <Factory className="w-5 h-5 text-teal-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Fish':
        return <Fish className="w-5 h-5 text-cyan-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-600" />;
      default:
        return <Building2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = [
        'ID_UMKM',
        'Nama_Pemilik',
        'Nama_Usaha',
        'Merk_Dagang',
        'Nomor_HP',
        'Kecamatan',
        'Sektor',
        'Kelas_UMKM',
        'NIB_Ada',
        'Halal_Ada',
        'PIRT_Ada',
        'QRIS_Ada',
        'Total_XP',
        'Jalur_Pendampingan'
      ];

      const rows = umkmList.map(u => [
        u.id,
        `"${u.ownerName}"`,
        `"${u.businessName}"`,
        `"${u.brandName}"`,
        `'${u.phone}`,
        `"${u.district}"`,
        `"${u.sector}"`,
        u.umkmClass,
        u.assessment.hasNib ? 'YA' : 'TIDAK',
        u.assessment.hasHalal ? 'YA' : 'TIDAK',
        u.assessment.hasPirtOrBpom ? 'YA' : 'TIDAK',
        u.assessment.hasQris ? 'YA' : 'TIDAK',
        u.xp,
        u.mentorshipType
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Satu_Data_UMKM_Lombok_Timur_LANGKAH_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Interoperabilitas Multi-Dinas
              </span>
              <span className="text-xs text-emerald-200">
                Satu Data UMKM Lombok Timur & NTB
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Pusat Integrasi Database Lintas Lembaga & BI NTB
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Platform LANGKAH menghubungkan profil dan progres tugas 75.000 UMKM secara real-time ke sistem Dinas Perindustrian, Dinas Koperasi & UKM, Dinas Perdagangan, Dinas Pertanian, Perikanan, Pariwisata, serta Kantor Perwakilan Bank Indonesia NTB (Portofolio 2024-2025).
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-700"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>{isExporting ? 'Menyiapkan CSV...' : 'Ekspor Satu Data UMKM (CSV / Excel)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INTEGRATED_AGENCIES.map((agency) => (
          <div 
            key={agency.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {agency.id === 'bi_ntb' && (
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Portofolio 2024-2025
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                {getAgencyIcon(agency.iconName)}
              </div>
              <div className="pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {agency.targetFocus}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {agency.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {agency.roleDescription}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Database Terhubung (API Sinkron)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 font-bold">
                {agency.activeProgramsCount} Program Aktif
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Blueprint Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            Skema Akselerasi Asta Cita: UMKM Naik Kelas Mandiri & Hibrid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
            <h4 className="font-bold text-amber-300">1. Efisiensi Anggaran APBD / APBN</h4>
            <p className="text-slate-300 leading-relaxed">
              Meniadakan biaya sosialisasi tatap muka berulang-ulang. Pelaku UMKM cukup membuka aplikasi di rumah/workshop untuk panduan step-by-step resmi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
            <h4 className="font-bold text-emerald-300">2. Solusi 8 Pendamping vs 75k UMKM</h4>
            <p className="text-slate-300 leading-relaxed">
              8 tenaga pendamping tidak lagi terbebani melayani 75.000 pertanyaan dasar yang sama. Tugas rutin diotomasi, waktu pendamping fokus pada kurasi kualitas tinggi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
            <h4 className="font-bold text-teal-300">3. Portofolio Bank Indonesia NTB</h4>
            <p className="text-slate-300 leading-relaxed">
              UMKM yang menuntaskan modul level 3 secara otomatis terdaftar di database kurasi Karya Kreatif NTB & program hilirisasi komoditas unggulan BI.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
