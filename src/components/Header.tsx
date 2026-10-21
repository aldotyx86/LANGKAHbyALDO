import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Building2, 
  RotateCcw,
  PlusCircle,
  FileText,
  Bot,
  Layers,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenSelfAssessment: () => void;
  onOpenIdCard: () => void;
  onOpenAiMentor: () => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenSelfAssessment,
  onOpenIdCard,
  onOpenAiMentor,
  onOpenArchitecture
}) => {
  const { 
    userRole, 
    currentUmkm, 
    currentPendamping,
    currentAdminDinas,
    pendampingList,
    umkmList, 
    aiQuota,
    loginAsUmkm, 
    loginAsPendamping,
    loginAsAdminDinas, 
    resetDemoData 
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getClassBadge = (cls?: string) => {
    switch (cls) {
      case 'naik_kelas':
        return {
          label: 'Level 3: UMKM Naik Kelas (Siap Ekspor)',
          color: 'bg-amber-500/10 text-amber-700 border-amber-300'
        };
      case 'berkembang':
        return {
          label: 'Level 2: UMKM Berkembang (Mandiri)',
          color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300'
        };
      default:
        return {
          label: 'Level 1: UMKM Pemula (Rintisan)',
          color: 'bg-blue-500/10 text-blue-700 border-blue-300'
        };
    }
  };

  const isStaffRole = userRole === 'pendamping' || userRole === 'admin_dinas';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top context bar: Identitas Sesi Siapa yang Login & Konteks Pulau Lombok */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Session Pill: Bedakan Siapa yang Login */}
          {userRole === 'umkm' ? (
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Sesi: 👤 Pelaku UMKM (<strong>{currentUmkm?.brandName || 'UMKM Binaan'}</strong> - {currentUmkm?.district || 'Lombok'})</span>
            </div>
          ) : userRole === 'pendamping' ? (
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Sesi: 🛡️ Pendamping Lapangan (<strong>{currentPendamping.name}</strong> • {currentPendamping.badgeCode})</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-amber-500/25 text-amber-200 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Sesi: 🏛️ Admin Dinas NTB & BI (<strong>{currentAdminDinas.name}</strong>)</span>
            </div>
          )}

          <button
            onClick={onOpenAuth}
            className="text-[11px] text-amber-300 hover:text-white underline font-semibold transition-colors cursor-pointer ml-1"
            title="Ganti login antara Pelaku UMKM atau Pendamping Lapangan"
          >
            Ganti / Masuk Akun Lain
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <span className="hidden lg:inline text-slate-400">
            Lombok: <strong className="text-white">75.000 UMKM</strong> vs <strong className="text-emerald-400">8 Pendamping</strong>
          </span>

          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 text-teal-300 hover:text-white transition-colors cursor-pointer bg-white/10 px-2 py-0.5 rounded-md"
            title="Lihat Arsitektur Produksi Next.js + Supabase + Cloudflare R2"
          >
            <Layers className="w-3 h-3 text-amber-300" />
            <span>Arsitektur Stack</span>
          </button>
          
          <button 
            onClick={resetDemoData}
            title="Reset data demo ke awal"
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab(isStaffRole ? 'admin' : 'roadmap')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900">LANGKAH</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                    Lombok Naik Kelas
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
                  Pendampingan Harian IKM/UMKM Se-Pulau Lombok
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {!isStaffRole ? (
              <>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'roadmap'
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Langkah Harian
                </button>
                <button
                  onClick={() => setActiveTab('legalitas')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'legalitas'
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Tracker Legalitas
                </button>
                <button
                  onClick={onOpenSelfAssessment}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Diagnostik
                </button>
                <button
                  onClick={() => setActiveTab('missing_data')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'missing_data'
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Cek Berkas
                  {currentUmkm?.missingDataNotes && currentUmkm.missingDataNotes.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                      {currentUmkm.missingDataNotes.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={onOpenIdCard}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Kartu UMKM
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Verifikasi Berkas Masuk
                </button>
                <button
                  onClick={() => setActiveTab('umkm_directory')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'umkm_directory'
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Direktori 75.000 UMKM
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('agencies')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'agencies'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-teal-600" />
              Multi-Dinas & BI NTB
            </button>
          </nav>

          {/* Right Action: AI Mentor Button & Profile Switcher */}
          <div className="flex items-center gap-2.5">
            
            {/* Asisten AI Mentor Button */}
            <button
              onClick={onOpenAiMentor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Bot className="w-4 h-4" />
              <span>Mentor AI</span>
            </button>

            {/* Streak & XP for UMKM */}
            {!isStaffRole && currentUmkm && (
              <div className="hidden sm:flex items-center gap-2">
                <div 
                  className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs font-bold shadow-2xs"
                  title={`${currentUmkm.streakDays} hari aktif belajar`}
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>{currentUmkm.streakDays} Hari</span>
                </div>

                <div 
                  className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold shadow-2xs"
                  title="Total XP dari misi terverifikasi"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{currentUmkm.xp} XP</span>
                </div>
              </div>
            )}

            {/* Role / Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all border text-left cursor-pointer ${
                  userRole === 'umkm'
                    ? 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200'
                    : userRole === 'pendamping'
                    ? 'bg-cyan-50 hover:bg-cyan-100/70 border-cyan-300'
                    : 'bg-amber-50 hover:bg-amber-100/70 border-amber-300'
                }`}
              >
                {userRole === 'umkm' ? (
                  <img 
                    src={currentUmkm?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'} 
                    alt="avatar" 
                    className="w-8 h-8 rounded-lg object-cover border border-emerald-400"
                  />
                ) : userRole === 'pendamping' ? (
                  <img 
                    src={currentPendamping.avatarUrl} 
                    alt={currentPendamping.name} 
                    className="w-8 h-8 rounded-lg object-cover border-2 border-cyan-500 shadow-2xs"
                  />
                ) : (
                  <img 
                    src={currentAdminDinas.avatarUrl} 
                    alt={currentAdminDinas.name} 
                    className="w-8 h-8 rounded-lg object-cover border-2 border-amber-500 shadow-2xs"
                  />
                )}

                <div className="text-left hidden sm:block">
                  <div className="text-xs font-black text-slate-800 flex items-center gap-1">
                    <span className="truncate max-w-[130px]">
                      {userRole === 'admin_dinas' 
                        ? currentAdminDinas.name 
                        : userRole === 'pendamping'
                        ? currentPendamping.name 
                        : currentUmkm?.brandName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600 truncate max-w-[130px] flex items-center gap-1">
                    {userRole === 'umkm' ? (
                      <span className="text-emerald-700">👤 UMKM • {currentUmkm?.district}</span>
                    ) : userRole === 'pendamping' ? (
                      <span className="text-indigo-800">🛡️ {currentPendamping.badgeCode} • {currentPendamping.assignedRegion.replace('Kabupaten ', '')}</span>
                    ) : (
                      <span className="text-amber-800">🏛️ Dinas Prov & BI NTB</span>
                    )}
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 text-sm animate-in fade-in-50 zoom-in-95 duration-100"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  {/* Current Active Session Card */}
                  <div className={`p-3 rounded-xl border mb-3 ${
                    userRole === 'umkm'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : userRole === 'pendamping'
                      ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        userRole === 'umkm'
                          ? 'bg-emerald-600 text-white'
                          : userRole === 'pendamping'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-amber-500 text-slate-950'
                      }`}>
                        {userRole === 'umkm' ? 'Sesi: Pelaku UMKM' : userRole === 'pendamping' ? 'Sesi: Tenaga Pendamping' : 'Sesi: Admin Dinas'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Aktif</span>
                    </div>

                    <div className="font-bold text-xs text-slate-900 mt-1">
                      {userRole === 'umkm' ? currentUmkm?.brandName : userRole === 'pendamping' ? currentPendamping.name : currentAdminDinas.name}
                    </div>
                    <div className="text-[10px] text-slate-600">
                      {userRole === 'umkm' 
                        ? `Pemilik: ${currentUmkm?.ownerName} (${currentUmkm?.district}, ${currentUmkm?.region.replace('Kabupaten ', '')})`
                        : userRole === 'pendamping'
                        ? `Wilayah: ${currentPendamping.assignedRegion} (${currentPendamping.districtCoverage})`
                        : `${currentAdminDinas.position}`}
                    </div>
                  </div>

                  {/* Switch to 8 Pendamping */}
                  <div className="mb-3">
                    <p className="px-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Pilih 8 Pendamping Lapangan:</span>
                      <span className="text-[9px] text-indigo-600 font-normal">8 Petugas Resmi</span>
                    </p>
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                      {pendampingList.map((pend) => (
                        <button
                          key={pend.id}
                          onClick={() => {
                            loginAsPendamping(pend.id);
                            setActiveTab('admin');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer text-xs ${
                            userRole === 'pendamping' && currentPendamping.id === pend.id
                              ? 'bg-indigo-100 text-indigo-950 font-bold border border-indigo-300'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img src={pend.avatarUrl} alt="" className="w-6 h-6 rounded-md object-cover shrink-0" />
                            <div className="truncate">
                              <div className="font-semibold text-[11px] truncate">{pend.name}</div>
                              <div className="text-[9px] text-slate-500 truncate">{pend.assignedRegion.replace('Kabupaten ', '')} • {pend.badgeCode}</div>
                            </div>
                          </div>
                          {userRole === 'pendamping' && currentPendamping.id === pend.id && (
                            <span className="text-indigo-700 text-xs font-bold shrink-0">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Switch to Sample UMKM */}
                  <div className="mb-3 border-t border-slate-100 pt-2">
                    <p className="px-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Pilih Akun Contoh UMKM Binaan:
                    </p>
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                      {umkmList.map((umkm) => (
                        <button
                          key={umkm.id}
                          onClick={() => {
                            loginAsUmkm(umkm.id);
                            setActiveTab('roadmap');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer text-xs ${
                            userRole === 'umkm' && currentUmkm?.id === umkm.id
                              ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img src={umkm.avatarUrl} alt="" className="w-6 h-6 rounded-md object-cover shrink-0" />
                            <div className="truncate">
                              <div className="font-semibold text-[11px] truncate">{umkm.brandName}</div>
                              <div className="text-[9px] text-slate-500 truncate">{umkm.ownerName} • {umkm.district}</div>
                            </div>
                          </div>
                          {userRole === 'umkm' && currentUmkm?.id === umkm.id && (
                            <span className="text-emerald-700 text-xs font-bold shrink-0">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Switch to Admin Dinas */}
                  <div className="border-t border-slate-100 pt-2 mb-2">
                    <button
                      onClick={() => {
                        loginAsAdminDinas();
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer text-xs ${
                        userRole === 'admin_dinas'
                          ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={currentAdminDinas.avatarUrl} alt="" className="w-6 h-6 rounded-md object-cover" />
                        <div>
                          <div className="font-semibold text-[11px]">{currentAdminDinas.name}</div>
                          <div className="text-[9px] text-slate-500">Admin Dinas Prov NTB & BI</div>
                        </div>
                      </div>
                      {userRole === 'admin_dinas' && <span className="text-amber-800 text-xs font-bold">✓</span>}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2 space-y-1">
                    <button
                      onClick={() => {
                        onOpenAuth();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Buka Form Login / Daftar Usaha Baru</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-slate-100 overflow-x-auto gap-2 text-xs">
          {!isStaffRole ? (
            <>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
                  activeTab === 'roadmap' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Misi Harian
              </button>
              <button
                onClick={() => setActiveTab('legalitas')}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
                  activeTab === 'legalitas' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Tracker Legalitas
              </button>
              <button
                onClick={onOpenSelfAssessment}
                className="px-2.5 py-1 rounded-md font-semibold text-slate-600 whitespace-nowrap"
              >
                Diagnostik
              </button>
              <button
                onClick={() => setActiveTab('missing_data')}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
                  activeTab === 'missing_data' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Cek Berkas
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
                  activeTab === 'admin' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Verifikasi Tugas
              </button>
              <button
                onClick={() => setActiveTab('umkm_directory')}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
                  activeTab === 'umkm_directory' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Data 75k UMKM
              </button>
            </>
          )}

          <button
            onClick={() => setActiveTab('agencies')}
            className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${
              activeTab === 'agencies' ? 'bg-emerald-600 text-white' : 'text-slate-600'
            }`}
          >
            Multi-Dinas & BI
          </button>
        </div>
      </div>
    </header>
  );
};
