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
      {/* Top context bar: Pulau Lombok 75.000 UMKM & 5 Kab/Kota */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase">
            Asta Cita Digital
          </span>
          <span className="text-slate-200">
            Pulau Lombok: <strong className="text-amber-300 font-bold">75.000 UMKM</strong> (Mataram, Lobar, Loteng, Lotim, KLU) vs <strong className="text-emerald-300 font-bold">8 Tenaga Pendamping</strong>
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 text-teal-300 hover:text-white transition-colors cursor-pointer bg-white/10 px-2 py-0.5 rounded-md"
            title="Lihat Arsitektur Produksi Next.js + Supabase + Cloudflare R2"
          >
            <Layers className="w-3 h-3 text-amber-300" />
            <span>Arsitektur Stack</span>
          </button>
          
          <span className="hidden md:inline">Portofolio Bank Indonesia (BI) NTB 2024-2025</span>

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
              <span className="bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-md font-bold">
                {aiQuota}
              </span>
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
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 text-left cursor-pointer"
              >
                {isStaffRole ? (
                  <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                ) : (
                  <img 
                    src={currentUmkm?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'} 
                    alt="avatar" 
                    className="w-8 h-8 rounded-lg object-cover border border-slate-300"
                  />
                )}

                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span className="truncate max-w-[120px]">
                      {userRole === 'admin_dinas' 
                        ? 'Admin Dinas NTB'
                        : userRole === 'pendamping'
                        ? 'Pendamping Lapangan'
                        : currentUmkm?.brandName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {isStaffRole ? '8 Petugas vs 75k' : currentUmkm?.region.replace('Kabupaten ', '')}
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-sm animate-in fade-in-50 zoom-in-95 duration-100"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Simulasi Peran Pengguna (Multi-Role)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Uji coba langsung alur UMKM vs Pendamping Lapangan:
                    </p>
                  </div>

                  {/* Switch to Staff Roles */}
                  <button
                    onClick={() => {
                      loginAsPendamping();
                      setActiveTab('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      userRole === 'pendamping'
                        ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Pendamping Lapangan (8 Petugas)</div>
                      <div className="text-[10px] text-slate-500">Membina 5 Kab/Kota di Lombok</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      loginAsAdminDinas();
                      setActiveTab('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                      userRole === 'admin_dinas'
                        ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Admin Dinas Provinsi & BI NTB</div>
                      <div className="text-[10px] text-slate-500">Akses Penuh Lintas Wilayah</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Switch to Sample UMKM */}
                  <p className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Akun Contoh UMKM Lombok:
                  </p>

                  {umkmList.map((umkm) => (
                    <button
                      key={umkm.id}
                      onClick={() => {
                        loginAsUmkm(umkm.id);
                        setActiveTab('roadmap');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        userRole === 'umkm' && currentUmkm?.id === umkm.id
                          ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <img 
                        src={umkm.avatarUrl} 
                        alt={umkm.brandName} 
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <div className="truncate flex-1">
                        <div className="text-xs font-bold truncate">{umkm.brandName}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <span>{umkm.district}</span>
                          <span>•</span>
                          <span className="capitalize">{umkm.umkmClass.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </button>
                  ))}

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      onOpenAuth();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-emerald-700 hover:bg-emerald-50 transition-colors text-xs font-bold cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Daftarkan Usaha / UMKM Baru</span>
                  </button>
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
