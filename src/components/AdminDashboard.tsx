import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  Building2, 
  Download,
  AlertTriangle,
  Send,
  Eye,
  FileCheck2,
  TrendingUp,
  MapPin,
  Map
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskSubmission, UmkmClass, UmkmProfile, TaskItem, LombokRegion } from '../types';
import { LOMBOK_REGIONS_WITH_DISTRICTS } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    umkmList, 
    tasks, 
    adminInfo, 
    userRole,
    currentPendamping,
    currentAdminDinas,
    pendampingList,
    loginAsPendamping,
    reviewTaskSubmission, 
    loginAsUmkm,
    fireConfetti
  } = useApp();

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Review Modal State
  const [activeReview, setActiveReview] = useState<{
    umkm: UmkmProfile;
    task: TaskItem;
    submission: TaskSubmission;
  } | null>(null);

  const [reviewFeedback, setReviewFeedback] = useState<string>('');

  // Collect all submissions awaiting review across all UMKMs
  const pendingReviews: Array<{
    umkm: UmkmProfile;
    task: TaskItem;
    submission: TaskSubmission;
  }> = [];

  umkmList.forEach((umkm) => {
    Object.entries(umkm.submissions).forEach(([taskId, sub]) => {
      if (sub.status === 'in_review') {
        const foundTask = tasks.find(t => t.id === taskId);
        if (foundTask) {
          pendingReviews.push({
            umkm,
            task: foundTask,
            submission: sub
          });
        }
      }
    });
  });

  // Filter UMKMs for Directory view
  const filteredUmkm = umkmList.filter((umkm) => {
    const matchesRegion = selectedRegion === 'all' || umkm.region === selectedRegion;
    const matchesDistrict = selectedDistrict === 'all' || umkm.district === selectedDistrict;
    const matchesClass = selectedClass === 'all' || umkm.umkmClass === selectedClass;
    const matchesQuery = 
      umkm.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesDistrict && matchesClass && matchesQuery;
  });

  // Calculate statistics
  const pemulaCount = umkmList.filter(u => u.umkmClass === 'pemula').length;
  const berkembangCount = umkmList.filter(u => u.umkmClass === 'berkembang').length;
  const naikKelasCount = umkmList.filter(u => u.umkmClass === 'naik_kelas').length;

  const handleOpenReview = (item: { umkm: UmkmProfile; task: TaskItem; submission: TaskSubmission }) => {
    setActiveReview(item);
    setReviewFeedback(
      item.task.aspect === 'digital_marketing'
        ? 'Tautan akun media sosial sudah diperiksa. Profil, foto produk, dan nomor kontak WhatsApp telah sesuai standar.'
        : 'Dokumen dan nomor registrasi telah divalidasi dengan database dinas terkait di NTB.'
    );
  };

  const handleConfirmReview = (approved: boolean) => {
    if (!activeReview) return;
    reviewTaskSubmission(
      activeReview.umkm.id,
      activeReview.task.id,
      approved,
      reviewFeedback
    );
    setActiveReview(null);
  };

  // Available districts for the selected region
  const availableDistricts = selectedRegion !== 'all' && selectedRegion in LOMBOK_REGIONS_WITH_DISTRICTS
    ? LOMBOK_REGIONS_WITH_DISTRICTS[selectedRegion as LombokRegion]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Admin Top Alert & Ratio stats */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800/60 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {userRole === 'admin_dinas' ? 'Admin Dinas Provinsi NTB' : 'Command Center Pendamping'}
              </span>
              <span className="text-xs text-teal-200">
                5 Wilayah Pulau Lombok & Bank Indonesia NTB
              </span>
            </div>
            <div className="text-xs text-teal-300 font-mono">
              Petugas: <strong>{adminInfo.name}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Dashboard Verifikasi & Triage 75.000 UMKM Lombok
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Menyelesaikan ketimpangan pendampingan di Pulau Lombok (Kota Mataram, Lombok Barat, Lombok Tengah, Lombok Timur, Lombok Utara) dengan sistem otomasi langkah harian mandiri dan verifikasi bukti digital terpusat.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="md:col-span-5 grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                <div className="text-xl font-black text-blue-300">{pemulaCount}</div>
                <div className="text-[10px] text-slate-300 font-medium">UMKM Pemula</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                <div className="text-xl font-black text-emerald-300">{berkembangCount}</div>
                <div className="text-[10px] text-slate-300 font-medium">Berkembang</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                <div className="text-xl font-black text-amber-300">{naikKelasCount}</div>
                <div className="text-[10px] text-slate-300 font-medium">Naik Kelas (BI)</div>
              </div>
            </div>
          </div>

          {/* Active Officer Identity Card: Bedakan Siapa Petugas yang Sedang Login */}
          {userRole === 'pendamping' ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-wrap items-center justify-between gap-4 mt-3">
              <div className="flex items-center gap-3">
                <img 
                  src={currentPendamping.avatarUrl} 
                  alt={currentPendamping.name} 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-sm">{currentPendamping.name}</span>
                    <span className="bg-cyan-400 text-slate-950 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {currentPendamping.badgeCode}
                    </span>
                    <span className="bg-white/20 text-teal-100 text-[10px] px-2 py-0.5 rounded-full">
                      8 Petugas Resmi Lombok
                    </span>
                  </div>
                  <div className="text-xs text-teal-200">
                    NIP: <span className="font-mono text-white">{currentPendamping.nip}</span> • Wilayah Tugas: <strong className="text-white">{currentPendamping.assignedRegion}</strong>
                  </div>
                  <div className="text-[11px] text-teal-300/90 mt-0.5">
                    Kecamatan Dampingan: <span className="text-white font-semibold">{currentPendamping.districtCoverage}</span> • Fokus: <span className="text-white">{currentPendamping.specialization}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRegion(selectedRegion === currentPendamping.assignedRegion ? 'all' : currentPendamping.assignedRegion)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                    selectedRegion === currentPendamping.assignedRegion
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                  }`}
                >
                  {selectedRegion === currentPendamping.assignedRegion 
                    ? `✓ Filter Wilayah Saya Aktif (${currentPendamping.assignedRegion.replace('Kabupaten ', '')})` 
                    : `Fokus Wilayah Binaan Saya (${currentPendamping.assignedRegion.replace('Kabupaten ', '')})`}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-wrap items-center justify-between gap-4 mt-3">
              <div className="flex items-center gap-3">
                <img 
                  src={currentAdminDinas.avatarUrl} 
                  alt={currentAdminDinas.name} 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-sm">{currentAdminDinas.name}</span>
                    <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                      DINAS-PROV
                    </span>
                  </div>
                  <div className="text-xs text-amber-200">
                    NIP: <span className="font-mono text-white">{currentAdminDinas.nip}</span> • Jabatan: <strong className="text-white">{currentAdminDinas.position}</strong>
                  </div>
                  <div className="text-[11px] text-amber-300/90 mt-0.5">
                    Instansi: {currentAdminDinas.agency} (Portofolio Bank Indonesia NTB 2024-2025)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 1: ANTREAN VERIFIKASI TUGAS (TASK REVIEW QUEUE) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Antrean Berkas & Tugas Menunggu Verifikasi ({pendingReviews.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review bukti pengerjaan harian (link akun FB/WA, nomor NIB OSS, sertifikat halal, dokumen kemasan).
            </p>
          </div>
          {pendingReviews.length === 0 && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
              Semua Berkas Telah Diverifikasi ✓
            </span>
          )}
        </div>

        {pendingReviews.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            Tidak ada antrean tugas yang menunggu verifikasi saat ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReviews.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 hover:bg-amber-50/60 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      H-{item.task.dayNumber} • {item.task.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                      {item.task.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.submission.submittedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                  <img 
                    src={item.umkm.avatarUrl} 
                    alt={item.umkm.brandName} 
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div>
                    <strong className="block text-slate-900">{item.umkm.brandName}</strong>
                    <span className="text-[10px] text-slate-500">
                      {item.umkm.ownerName} • {item.umkm.region} (Kec. {item.umkm.district})
                    </span>
                  </div>
                </div>

                <div className="text-xs bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono break-all">
                  <span className="text-[10px] text-slate-400 font-sans uppercase font-bold block">Bukti Dikirimkan:</span>
                  {item.submission.proofData}
                  {item.submission.proofNotes && (
                    <p className="text-[11px] text-slate-300 font-sans mt-1 italic">
                      "{item.submission.proofNotes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {item.submission.proofData.startsWith('http') ? (
                    <a 
                      href={item.submission.proofData}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Periksa Tautan Bukti</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400">Nomor Registrasi / Dokumen</span>
                  )}

                  <button
                    onClick={() => handleOpenReview(item)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verifikasi Berkas</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: DIREKTORI UMKM LOMBOK */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Direktori UMKM Binaan Se-Pulau Lombok</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter UMKM berdasarkan wilayah Kabupaten/Kota, Kecamatan, dan status legalitas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Cari merk / pemilik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-2 border border-slate-200 rounded-xl w-44 focus:outline-emerald-500"
              />
            </div>

            {/* Filter Region */}
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDistrict('all');
              }}
              className="text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500 font-bold"
            >
              <option value="all">Semua Wilayah Lombok</option>
              {Object.keys(LOMBOK_REGIONS_WITH_DISTRICTS).map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>

            {/* Filter District */}
            {availableDistricts.length > 0 && (
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500"
              >
                <option value="all">Semua Kecamatan</option>
                {availableDistricts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            )}

            {/* Filter Class */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500 font-bold"
            >
              <option value="all">Semua Kelas UMKM</option>
              <option value="pemula">Kelas 1: Pemula</option>
              <option value="berkembang">Kelas 2: Berkembang</option>
              <option value="naik_kelas">Kelas 3: Naik Kelas (BI)</option>
            </select>
          </div>
        </div>

        {/* UMKM Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">UMKM & Pemilik</th>
                <th className="py-3 px-3">Wilayah & Kecamatan</th>
                <th className="py-3 px-3">Kelas UMKM</th>
                <th className="py-3 px-3">Legalitas Wajib</th>
                <th className="py-3 px-3">Digital & QRIS</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUmkm.map((umkm) => (
                <tr key={umkm.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={umkm.avatarUrl} 
                        alt={umkm.brandName} 
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <strong className="text-slate-900 block font-bold">{umkm.brandName}</strong>
                        <span className="text-[10px] text-slate-500">{umkm.ownerName} • {umkm.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div>
                      <span className="font-semibold text-slate-800 block">{umkm.region.replace('Kabupaten ', '')}</span>
                      <span className="text-[10px] text-slate-500">Kec. {umkm.district}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      umkm.umkmClass === 'naik_kelas' 
                        ? 'bg-amber-100 text-amber-800' 
                        : umkm.umkmClass === 'berkembang'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {umkm.umkmClass.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold">
                      <span className={`px-1.5 py-0.5 rounded ${umkm.assessment.hasNib ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                        NIB
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${umkm.assessment.hasHalal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                        Halal
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${umkm.assessment.hasPirtOrBpom ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                        PIRT
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold">
                      <span className={`px-1.5 py-0.5 rounded ${umkm.assessment.hasFacebookPro ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-400'}`}>
                        FB Pro
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${umkm.assessment.hasQris ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                        QRIS
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => loginAsUmkm(umkm.id)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Buka Profil & Misi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VERIFICATION DIALOG MODAL */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <span>Verifikasi Tugas UMKM</span>
              </h3>
              <button 
                onClick={() => setActiveReview(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div><strong className="text-slate-700">UMKM:</strong> {activeReview.umkm.brandName} ({activeReview.umkm.ownerName})</div>
              <div><strong className="text-slate-700">Wilayah:</strong> {activeReview.umkm.region} (Kec. {activeReview.umkm.district})</div>
              <div><strong className="text-slate-700">Tugas:</strong> {activeReview.task.title}</div>
            </div>

            <div className="p-3 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono space-y-1">
              <span className="text-[10px] text-slate-400 font-sans uppercase font-bold block">Bukti yang Disubmit:</span>
              <div className="break-all">{activeReview.submission.proofData}</div>
              {activeReview.submission.proofNotes && (
                <div className="text-[11px] text-slate-300 font-sans italic pt-1 border-t border-slate-700 mt-1">
                  Catatan: {activeReview.submission.proofNotes}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Catatan Verifikasi Tim Pendamping:
              </label>
              <textarea 
                rows={3}
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleConfirmReview(false)}
                className="px-4 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Minta Revisi</span>
              </button>
              <button
                onClick={() => handleConfirmReview(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Setujui (+{activeReview.task.xpReward} XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
