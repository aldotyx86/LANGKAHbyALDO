import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  Award,
  ChevronRight,
  Briefcase,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessSector, LombokRegion, MentorshipType } from '../types';
import { LOMBOK_REGIONS_WITH_DISTRICTS } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisteredNew: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onRegisteredNew }) => {
  const { 
    loginAsUmkm, 
    loginAsPendamping, 
    loginAsAdminDinas, 
    registerUmkm, 
    umkmList,
    pendampingList,
    currentAdminDinas
  } = useApp();

  // Role selector: umkm | pendamping | admin_dinas
  const [roleTab, setRoleTab] = useState<'umkm' | 'pendamping' | 'admin_dinas'>('umkm');
  
  // For UMKM: login or register
  const [umkmSubMode, setUmkmSubMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Pendamping search filter in modal
  const [pendampingFilterRegion, setPendampingFilterRegion] = useState<string>('all');

  // Register form state
  const [regData, setRegData] = useState({
    username: '',
    password: '',
    ownerName: '',
    businessName: '',
    brandName: '',
    phone: '',
    nik: '',
    address: '',
    region: 'Kabupaten Lombok Timur' as LombokRegion,
    district: 'Selong',
    sector: 'Kuliner Olahan (Food & Beverage)' as BusinessSector,
    monthlyRevenueRange: '< 5 Juta' as '< 5 Juta' | '5 - 15 Juta' | '15 - 50 Juta' | '> 50 Juta',
    mentorshipType: 'hibrid' as MentorshipType
  });

  if (!isOpen) return null;

  const handleUmkmLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmed = loginUsername.trim().toLowerCase();

    // Check existing UMKM
    const found = umkmList.find(u => 
      u.username.toLowerCase() === trimmed || 
      u.brandName.toLowerCase().includes(trimmed) ||
      u.phone === trimmed ||
      u.ownerName.toLowerCase().includes(trimmed)
    );

    if (found) {
      loginAsUmkm(found.id);
      onClose();
    } else {
      setLoginError('Akun UMKM tidak ditemukan. Coba pilih akun contoh binaan di bawah atau buat akun baru.');
    }
  };

  const handlePendampingLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmed = loginUsername.trim().toLowerCase();
    const found = pendampingList.find(p => 
      p.username.toLowerCase() === trimmed ||
      p.nip.replace(/\s+/g, '') === trimmed.replace(/\s+/g, '') ||
      p.name.toLowerCase().includes(trimmed)
    );

    if (found) {
      loginAsPendamping(found.id);
      onClose();
    } else {
      setLoginError('ID Petugas/NIP tidak ditemukan. Silakan klik salah satu dari 8 Petugas Resmi di bawah.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.ownerName || !regData.businessName || !regData.phone) return;

    registerUmkm({
      username: regData.username || `umkm_${Date.now().toString().slice(-4)}`,
      ownerName: regData.ownerName,
      businessName: regData.businessName,
      brandName: regData.brandName || regData.businessName,
      phone: regData.phone,
      nik: regData.nik || '5203000000000001',
      address: regData.address || `Kecamatan ${regData.district}, ${regData.region}`,
      region: regData.region,
      district: regData.district,
      sector: regData.sector,
      monthlyRevenueRange: regData.monthlyRevenueRange,
      mentorshipType: regData.mentorshipType
    });

    onRegisteredNew();
    onClose();
  };

  const currentDistricts = LOMBOK_REGIONS_WITH_DISTRICTS[regData.region] || [];

  const filteredPendamping = pendampingList.filter(p => {
    if (pendampingFilterRegion === 'all') return true;
    return p.assignedRegion === pendampingFilterRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Dynamic Modal Header based on Selected Role */}
        <div className={`p-6 text-white relative transition-colors duration-200 ${
          roleTab === 'umkm' 
            ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950'
            : roleTab === 'pendamping'
            ? 'bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950'
            : 'bg-gradient-to-r from-amber-900 via-slate-900 to-slate-950'
        }`}>
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              roleTab === 'umkm'
                ? 'bg-emerald-400 text-slate-950'
                : roleTab === 'pendamping'
                ? 'bg-cyan-400 text-slate-950'
                : 'bg-amber-400 text-slate-950'
            }`}>
              {roleTab === 'umkm' ? 'Sesi Pelaku Usaha' : roleTab === 'pendamping' ? 'Sesi Pendamping Resmi' : 'Sesi Pengawas Dinas'}
            </span>
            <span className="text-xs text-white/80 font-medium">Aplikasi LANGKAH Lombok</span>
          </div>

          <h3 className="text-2xl font-black text-white">
            {roleTab === 'umkm' 
              ? (umkmSubMode === 'login' ? 'Masuk sebagai Pelaku UMKM' : 'Pendaftaran UMKM Baru')
              : roleTab === 'pendamping'
              ? 'Masuk sebagai Tenaga Pendamping'
              : 'Portal Administrator Dinas & BI NTB'}
          </h3>
          
          <p className="text-xs text-white/80 mt-1">
            {roleTab === 'umkm' 
              ? 'Akses roadmap harian, legalitas usaha (NIB, Halal, BPOM), dan pendampingan.'
              : roleTab === 'pendamping'
              ? 'Khusus 8 Petugas Pendamping Lapangan untuk memverifikasi berkas & kurasi 75.000 UMKM.'
              : 'Pantau interoperabilitas Satu Data UMKM NTB, kuota program, dan rekap wilayah.'}
          </p>

          {/* Role Selection Tabs (UMKM vs Pendamping vs Admin) */}
          <div className="mt-5 grid grid-cols-3 gap-1.5 bg-black/25 p-1 rounded-2xl border border-white/15">
            <button
              type="button"
              onClick={() => {
                setRoleTab('umkm');
                setLoginError('');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleTab === 'umkm'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Pelaku UMKM</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRoleTab('pendamping');
                setLoginError('');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleTab === 'pendamping'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pendamping (8)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRoleTab('admin_dinas');
                setLoginError('');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleTab === 'admin_dinas'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin Dinas</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[62vh] overflow-y-auto">
          
          {/* ======================= TAB 1: PELAKU UMKM ======================= */}
          {roleTab === 'umkm' && (
            <div className="space-y-5">
              {/* Subtabs for UMKM: Login vs Daftar */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setUmkmSubMode('login');
                    setLoginError('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    umkmSubMode === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Masuk Akun Binaan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUmkmSubMode('register');
                    setLoginError('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    umkmSubMode === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Daftarkan Usaha Baru
                </button>
              </div>

              {umkmSubMode === 'login' ? (
                <div className="space-y-4">
                  <form onSubmit={handleUmkmLoginSubmit} className="space-y-3.5">
                    {loginError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                        {loginError}
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Username, Nama Usaha, atau Nomor WhatsApp UMKM:
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="Contoh: sitirahma / Sambal Beberuk / 081917654321"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Kata Sandi:
                      </label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-emerald-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Mode demo: Anda bisa login langsung atau memilih profil binaan di bawah.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Masuk sebagai Pelaku UMKM</span>
                    </button>
                  </form>

                  {/* Quick Select Profile UMKM */}
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Pilih Cepat Akun Contoh Binaan Lombok:
                    </span>
                    <div className="space-y-2">
                      {umkmList.slice(0, 4).map((umkm) => (
                        <button
                          key={umkm.id}
                          type="button"
                          onClick={() => {
                            loginAsUmkm(umkm.id);
                            onClose();
                          }}
                          className="w-full p-2.5 text-left rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={umkm.avatarUrl} 
                              alt={umkm.ownerName} 
                              className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                                {umkm.brandName}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {umkm.ownerName} • {umkm.district}, {umkm.region.replace('Kabupaten ', '')}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              umkm.umkmClass === 'naik_kelas' 
                                ? 'bg-amber-100 text-amber-800' 
                                : umkm.umkmClass === 'berkembang' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {umkm.umkmClass === 'naik_kelas' ? 'Naik Kelas' : umkm.umkmClass === 'berkembang' ? 'Berkembang' : 'Pemula'}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">
                              {umkm.xp} XP
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* UMKM Registration Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Nama Pemilik Usaha: *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="Contoh: Lalu Mahsun"
                        value={regData.ownerName}
                        onChange={(e) => setRegData(prev => ({ ...prev, ownerName: e.target.value }))}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Nomor WhatsApp / HP: *
                      </label>
                      <input 
                        type="tel"
                        required
                        placeholder="Contoh: 081912345678"
                        value={regData.phone}
                        onChange={(e) => setRegData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Usaha / Merk Dagang: *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Contoh: Kopi Robusta Sembalun Rinjani"
                      value={regData.businessName}
                      onChange={(e) => setRegData(prev => ({ ...prev, businessName: e.target.value, brandName: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>

                  {/* Region & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Kabupaten / Kota: *
                      </label>
                      <select
                        value={regData.region}
                        onChange={(e) => {
                          const newReg = e.target.value as LombokRegion;
                          const dists = LOMBOK_REGIONS_WITH_DISTRICTS[newReg] || [];
                          setRegData(prev => ({ 
                            ...prev, 
                            region: newReg, 
                            district: dists[0] || 'Selong' 
                          }));
                        }}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500 font-bold"
                      >
                        {Object.keys(LOMBOK_REGIONS_WITH_DISTRICTS).map((reg) => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Kecamatan: *
                      </label>
                      <select
                        value={regData.district}
                        onChange={(e) => setRegData(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500"
                      >
                        {currentDistricts.map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Sektor / Bidang Produk:
                    </label>
                    <select
                      value={regData.sector}
                      onChange={(e) => setRegData(prev => ({ ...prev, sector: e.target.value as BusinessSector }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500"
                    >
                      <option value="Kuliner Olahan (Food & Beverage)">Kuliner Olahan (Food & Beverage)</option>
                      <option value="Kriya & Tenun Tradisional (Songket Sasak)">Kriya & Tenun Tradisional (Songket Sasak)</option>
                      <option value="Pertanian & Perkebunan (Kopi Rinjani/Beras Organik)">Pertanian & Perkebunan (Kopi Rinjani / Bawang)</option>
                      <option value="Perikanan & Kelautan Olahan (Abon Ikan/Rumput Laut)">Perikanan & Kelautan Olahan (Abon Ikan / Rumput Laut)</option>
                      <option value="Jasa & Pariwisata Kreatif (Homestay/Desa Wisata)">Jasa & Pariwisata Kreatif (Homestay / Wisata)</option>
                      <option value="Herbal & Kosmetik Tradisional (Minyak Sumbawa/Sasak)">Herbal & Kosmetik Tradisional</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Jalur Pendampingan:
                      </label>
                      <select
                        value={regData.mentorshipType}
                        onChange={(e) => setRegData(prev => ({ ...prev, mentorshipType: e.target.value as MentorshipType }))}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500 font-bold"
                      >
                        <option value="otodidak">1. Otodidak (Mandiri via Apps)</option>
                        <option value="hibrid">2. Hibrid (Mandiri + Pendamping)</option>
                        <option value="intensif">3. Intensif (Fasilitasi BI NTB)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Omzet per Bulan:
                      </label>
                      <select
                        value={regData.monthlyRevenueRange}
                        onChange={(e) => setRegData(prev => ({ ...prev, monthlyRevenueRange: e.target.value as any }))}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500"
                      >
                        <option value="< 5 Juta">&lt; 5 Juta (Mikro)</option>
                        <option value="5 - 15 Juta">5 - 15 Juta (Berkembang)</option>
                        <option value="15 - 50 Juta">15 - 50 Juta (Menengah)</option>
                        <option value="> 50 Juta">&gt; 50 Juta (Siap Ekspor)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Daftarkan Usaha & Mulai Langkah Harian</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ======================= TAB 2: TENAGA PENDAMPING ======================= */}
          {roleTab === 'pendamping' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs text-indigo-900 leading-relaxed">
                  <strong className="block font-bold">Portal Khusus 8 Tenaga Pendamping Lapangan Lombok</strong>
                  Setiap pendamping memiliki wilayah binaan dan keahlian spesifik (Legalitas OSS, Halal, Rumah Kemasan, Agribisnis, QRIS). Pilih profil Anda untuk memverifikasi berkas UMKM masuk.
                </div>
              </div>

              {/* Filter Wilayah Pendamping */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Daftar 8 Petugas Resmi:
                </span>
                <select
                  value={pendampingFilterRegion}
                  onChange={(e) => setPendampingFilterRegion(e.target.value)}
                  className="text-xs py-1 px-2.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
                >
                  <option value="all">Semua Wilayah Lombok</option>
                  <option value="Kabupaten Lombok Timur">Lombok Timur</option>
                  <option value="Kabupaten Lombok Tengah">Lombok Tengah</option>
                  <option value="Kabupaten Lombok Barat">Lombok Barat</option>
                  <option value="Kota Mataram">Kota Mataram</option>
                  <option value="Kabupaten Lombok Utara">Lombok Utara</option>
                </select>
              </div>

              {/* Roster of 8 Pendamping */}
              <div className="space-y-2.5">
                {filteredPendamping.map((pend) => (
                  <button
                    key={pend.id}
                    type="button"
                    onClick={() => {
                      loginAsPendamping(pend.id);
                      onClose();
                    }}
                    className="w-full p-3 text-left rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer flex items-center justify-between group bg-white shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={pend.avatarUrl} 
                        alt={pend.name} 
                        className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                            {pend.name}
                          </span>
                          <span className="text-[9px] font-mono bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-bold">
                            {pend.badgeCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {pend.assignedRegion} • <span className="text-slate-400">{pend.districtCoverage}</span>
                        </div>
                        <div className="text-[10px] text-indigo-700 font-semibold mt-0.5">
                          Fokus: {pend.specialization}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <div className="inline-flex items-center gap-1 bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-colors">
                        <span>Masuk</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <span className="block text-[9px] text-slate-400 mt-1">
                        {pend.verifiedCount} Terverifikasi
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ======================= TAB 3: ADMIN DINAS & BI NTB ======================= */}
          {roleTab === 'admin_dinas' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs text-amber-950 leading-relaxed">
                  <strong className="block font-bold text-sm text-slate-900 mb-0.5">
                    Akses Tingkat Pimpinan Dinas & Bank Indonesia NTB
                  </strong>
                  Peran ini memiliki otorisasi lintas dinas (Dinas Koperasi & UKM, Dinas Perindustrian, Dinas Perdagangan, DKP, Dinas Pertanian, dan Kantor Perwakilan Bank Indonesia NTB).
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentAdminDinas.avatarUrl} 
                    alt={currentAdminDinas.name} 
                    className="w-12 h-12 rounded-xl object-cover border-2 border-amber-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentAdminDinas.name}</h4>
                    <p className="text-[11px] text-slate-600">{currentAdminDinas.position}</p>
                    <p className="text-[10px] text-amber-700 font-semibold">{currentAdminDinas.agency}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>NIP Resmi:</span>
                    <strong className="font-mono text-slate-700">{currentAdminDinas.nip}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cakupan Pengawasan:</span>
                    <strong className="text-slate-700">75.000 UMKM di 5 Kab/Kota NTB</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mitra Strategis:</span>
                    <strong className="text-slate-700">Bank Indonesia NTB (Portofolio 2024-2025)</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  loginAsAdminDinas();
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Masuk sebagai Admin Dinas Provinsi & BI NTB</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
