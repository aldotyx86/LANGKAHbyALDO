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
  CheckCircle2
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
  const { loginAsUmkm, loginAsPendamping, loginAsAdminDinas, registerUmkm, umkmList } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmed = loginUsername.trim().toLowerCase();

    // Check if staff
    if (trimmed === 'admin' || trimmed === 'dinas') {
      loginAsAdminDinas();
      onClose();
      return;
    }

    if (trimmed === 'pendamping' || trimmed === 'mentor') {
      loginAsPendamping();
      onClose();
      return;
    }

    // Check existing UMKM
    const found = umkmList.find(u => 
      u.username.toLowerCase() === trimmed || 
      u.brandName.toLowerCase().includes(trimmed)
    );

    if (found) {
      loginAsUmkm(found.id);
      onClose();
    } else {
      setLoginError('Username tidak ditemukan. Coba gunakan akun demo di bawah atau daftarkan akun baru.');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Akses & Pendaftaran
            </span>
            <span className="text-xs text-emerald-200 font-semibold">LANGKAH Se-Pulau Lombok</span>
          </div>

          <h3 className="text-2xl font-black text-white">
            {mode === 'login' ? 'Masuk ke Akun Anda' : 'Daftarkan Usaha / UMKM Baru'}
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            {mode === 'login' 
              ? 'Masuk untuk memantau legalitas dan langkah pendampingan harian.' 
              : 'Daftarkan usaha Anda di Kota Mataram, Lobar, Loteng, Lotim, atau KLU.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex bg-white/10 rounded-xl p-1 gap-1 border border-white/20">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-200 hover:text-white'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'register' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-200 hover:text-white'
              }`}
            >
              Daftar Usaha Baru
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {mode === 'login' ? (
            <div className="space-y-5">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Username atau Nama Merk:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Contoh: sitirahma / ahmadtenun / pendamping / admin"
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
                    Untuk demo simulasi, kata sandi dapat diisi bebas.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sekarang</span>
                </button>
              </form>

              {/* Quick demo accounts */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Pilih Cepat Akun Simulasi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      loginAsUmkm('umkm-1');
                      onClose();
                    }}
                    className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                  >
                    <strong className="block text-slate-800">Siti Rahma (Sambal)</strong>
                    <span className="text-[10px] text-slate-500">Lombok Timur • Berkembang</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginAsUmkm('umkm-4');
                      onClose();
                    }}
                    className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                  >
                    <strong className="block text-slate-800">Wayan (Mutiara Sekarbela)</strong>
                    <span className="text-[10px] text-slate-500">Kota Mataram • Kerajinan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginAsPendamping();
                      onClose();
                    }}
                    className="p-2.5 text-left rounded-xl border border-teal-300 bg-teal-50/60 hover:bg-teal-100/70 transition-colors cursor-pointer"
                  >
                    <strong className="block text-teal-900">8 Pendamping Lapangan</strong>
                    <span className="text-[10px] text-teal-700">Verifikasi Berkas Masuk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginAsAdminDinas();
                      onClose();
                    }}
                    className="p-2.5 text-left rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 transition-colors cursor-pointer"
                  >
                    <strong className="block text-emerald-950">Admin Dinas & BI NTB</strong>
                    <span className="text-[10px] text-emerald-700">Akses Penuh Lintas Wilayah</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                  placeholder="Contoh: Kopi Robusta Narmada"
                  value={regData.businessName}
                  onChange={(e) => setRegData(prev => ({ ...prev, businessName: e.target.value, brandName: e.target.value }))}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                />
              </div>

              {/* Region and District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Kabupaten / Kota di Lombok: *
                  </label>
                  <select
                    value={regData.region}
                    onChange={(e) => {
                      const newReg = e.target.value as LombokRegion;
                      const dists = LOMBOK_REGIONS_WITH_DISTRICTS[newReg] || [];
                      setRegData(prev => ({ 
                        ...prev, 
                        region: newReg, 
                        district: dists[0] || 'Umum' 
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
                  Sektor / Kategori Produk:
                </label>
                <select
                  value={regData.sector}
                  onChange={(e) => setRegData(prev => ({ ...prev, sector: e.target.value as BusinessSector }))}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500"
                >
                  <option value="Kuliner Olahan (Food & Beverage)">Kuliner Olahan (Food & Beverage)</option>
                  <option value="Kriya & Tenun Tradisional (Songket Sasak)">Kriya & Tenun Tradisional (Songket Sasak)</option>
                  <option value="Pertanian & Perkebunan (Kopi Rinjani/Beras Organik)">Pertanian & Perkebunan (Kopi Rinjani / Bawang / Vanili)</option>
                  <option value="Perikanan & Kelautan Olahan (Abon Ikan/Rumput Laut)">Perikanan & Kelautan Olahan (Abon Ikan / Rumput Laut)</option>
                  <option value="Jasa & Pariwisata Kreatif (Homestay/Desa Wisata)">Jasa & Pariwisata Kreatif (Homestay / Tour Guide)</option>
                  <option value="Herbal & Kosmetik Tradisional (Minyak Sumbawa/Sasak)">Herbal & Kosmetik Tradisional</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jalur Pembinaan:
                  </label>
                  <select
                    value={regData.mentorshipType}
                    onChange={(e) => setRegData(prev => ({ ...prev, mentorshipType: e.target.value as MentorshipType }))}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-emerald-500 font-bold"
                  >
                    <option value="otodidak">1. Otodidak (Mandiri via Apps)</option>
                    <option value="hibrid">2. Hibrid (Mandiri + Klinik Dinas)</option>
                    <option value="intensif">3. Intensif (Pitching BI & Ekspor)</option>
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
      </div>
    </div>
  );
};
