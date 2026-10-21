import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  DollarSign, 
  Package, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SelfAssessmentData, UmkmClass } from '../types';

interface SelfAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelfAssessmentModal: React.FC<SelfAssessmentModalProps> = ({ isOpen, onClose }) => {
  const { currentUmkm, updateAssessment, calculateClass, fireConfetti } = useApp();

  const [formData, setFormData] = useState<SelfAssessmentData>(() => {
    if (currentUmkm) {
      return { ...currentUmkm.assessment };
    }
    return {
      hasNib: false,
      nibNumber: '',
      hasHalal: false,
      halalRegNumber: '',
      hasPirtOrBpom: false,
      pirtNumber: '',
      hasHaki: false,
      hakiMerk: '',
      hasNpwp: false,
      hasLabTest: false,
      hasFacebookPro: false,
      facebookUrl: '',
      hasInstagram: false,
      instagramHandle: '',
      hasWhatsAppBusiness: false,
      hasGoogleMaps: false,
      googleMapsUrl: '',
      hasMarketplace: false,
      marketplaceNames: [],
      hasSeparateBankAcc: false,
      hasDigitalBookkeeping: false,
      hasQris: false,
      qrisMerchantName: '',
      hasFinancialReport: false,
      hasStandardPackaging: false,
      hasBarcodeOrExpiredDate: false,
      hasHygieneCertificate: false,
      lastAssessedAt: new Date().toISOString().split('T')[0]
    };
  });

  const [activeCategory, setActiveCategory] = useState<'legalitas' | 'marketing' | 'keuangan' | 'kemasan'>('legalitas');

  if (!isOpen || !currentUmkm) return null;

  // Live class calculation preview
  const liveClass: UmkmClass = calculateClass(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAssessment(currentUmkm.id, formData);
    fireConfetti();
    onClose();
  };

  const getClassDescription = (cls: UmkmClass) => {
    switch (cls) {
      case 'naik_kelas':
        return {
          title: 'Kelas 3: UMKM Naik Kelas & Siap Ekspor / Kemitraan',
          desc: 'Hebat! Usaha Anda telah memenuhi standar legalitas, pembayaran digital QRIS, dan kemasan ritel. Berhak mengikuti kurasi Business Pitching Bank Indonesia NTB & pameran nasional.',
          color: 'bg-amber-500 text-white'
        };
      case 'berkembang':
        return {
          title: 'Kelas 2: UMKM Berkembang (Mandiri)',
          desc: 'Bagus! Anda telah memiliki legalitas awal atau pemasaran aktif. Langkah berikutnya adalah sertifikasi halal lanjutan, standarisasi kemasan, dan aktivasi QRIS.',
          color: 'bg-emerald-600 text-white'
        };
      default:
        return {
          title: 'Kelas 1: UMKM Pemula (Rintisan / Benih)',
          desc: 'Usaha Anda masih dalam tahap awal rintisan. Mulai selesaikan misi harian Level 1: Pembuatan NIB gratis di OSS dan pembuatan akun Facebook Bisnis untuk mulai jualan.',
          color: 'bg-blue-600 text-white'
        };
    }
  };

  const previewInfo = getClassDescription(liveClass);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Diagnostik Diagnosa Mandiri
            </span>
            <span className="text-xs text-emerald-200">Kapasitas IKM & UMKM</span>
          </div>

          <h2 className="text-2xl font-black text-white">
            Self-Assessment Usaha Anda: {currentUmkm.brandName}
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1">
            Data ini akan mengelompokkan kelas UMKM Anda secara otomatis dan mengeluarkan daftar tugas panduan harian yang tepat sasaran.
          </p>

          {/* Live Badge Preview */}
          <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300">Prediksi Hasil Klasifikasi:</span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                {previewInfo.title}
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-xs whitespace-nowrap ${previewInfo.color}`}>
              {liveClass.toUpperCase().replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCategory('legalitas')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'legalitas' 
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            1. Legalitas & Izin
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('marketing')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'marketing' 
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            2. Pemasaran Digital
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('keuangan')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'keuangan' 
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-600" />
            3. Keuangan & QRIS
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('kemasan')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'kemasan' 
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Package className="w-4 h-4 text-purple-600" />
            4. Mutu & Kemasan
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto space-y-6">

          {/* CATEGORY 1: LEGALITAS */}
          {activeCategory === 'legalitas' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Kenapa Legalitas Penting?</strong>
                  <p className="mt-0.5 text-slate-600">
                    NIB dan Halal/P-IRT adalah tiket dasar agar produk Anda diakui hukum, bisa dipajang di minimarket, dan berhak menerima bantuan mesin dari Dinas Perindustrian/Koperasi Lotim.
                  </p>
                </div>
              </div>

              {/* NIB Check */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.hasNib}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasNib: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500 cursor-pointer"
                      />
                      <span>Sudah Memiliki NIB (Nomor Induk Berusaha) di OSS RBA</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 pl-6">
                      Izin berusaha resmi dari BKPM/Kementerian Investasi.
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${formData.hasNib ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.hasNib ? 'Sudah Ada' : 'Belum Ada'}
                  </span>
                </div>
                {formData.hasNib && (
                  <div className="mt-3 pl-6">
                    <input 
                      type="text"
                      placeholder="Nomor NIB 13 digit (opsional jika ingat)"
                      value={formData.nibNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, nibNumber: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* Halal Check */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.hasHalal}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasHalal: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500 cursor-pointer"
                      />
                      <span>Sudah Memiliki Sertifikat Halal Resmi (BPJPH / Kemenag)</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 pl-6">
                      Wajib untuk produk makanan, minuman, dan olahan hasil tani/laut.
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${formData.hasHalal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.hasHalal ? 'Sudah Ada' : 'Belum Ada'}
                  </span>
                </div>
                {formData.hasHalal && (
                  <div className="mt-3 pl-6">
                    <input 
                      type="text"
                      placeholder="Nomor STTD / No Sertifikat Halal BPJPH"
                      value={formData.halalRegNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, halalRegNumber: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* P-IRT / BPOM Check */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.hasPirtOrBpom}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasPirtOrBpom: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500 cursor-pointer"
                      />
                      <span>Sudah Memiliki Izin Edar P-IRT / Izin BPOM</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 pl-6">
                      Rekomendasi Dinas Kesehatan atau Badan Pengawas Obat & Makanan.
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${formData.hasPirtOrBpom ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.hasPirtOrBpom ? 'Sudah Ada' : 'Belum Ada'}
                  </span>
                </div>
                {formData.hasPirtOrBpom && (
                  <div className="mt-3 pl-6">
                    <input 
                      type="text"
                      placeholder="Nomor P-IRT (15 digit) atau Nomor Izin BPOM"
                      value={formData.pirtNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, pirtNumber: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* HAKI Merk & NPWP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.hasHaki}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasHaki: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded-md"
                    />
                    <span>Merk Terdaftar HAKI Kemenkumham</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6">Perlindungan hak cipta merk dagang.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.hasNpwp}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasNpwp: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded-md"
                    />
                    <span>Memiliki NPWP Usaha / Pribadi</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6">Untuk faktur & rekening usaha bank.</p>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 2: PEMASARAN DIGITAL */}
          {activeCategory === 'marketing' && (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
                <Share2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Jangkau Konsumen NTB & Nusantara</strong>
                  <p className="mt-0.5 text-slate-600">
                    Bila akun belum ada, sistem akan memunculkan tugas pembuatan panduan Facebook & WhatsApp Bisnis yang nanti diverifikasi oleh tim pendamping kami.
                  </p>
                </div>
              </div>

              {/* Facebook Pro */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.hasFacebookPro}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasFacebookPro: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded-md"
                      />
                      <span>Memiliki Akun Facebook Pro / Halaman Bisnis (Fanpage)</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 pl-6">
                      Sarana promosi gratis menjangkau warga dan grup jual-beli Lombok Timur.
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${formData.hasFacebookPro ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.hasFacebookPro ? 'Aktif' : 'Belum Ada'}
                  </span>
                </div>
                {formData.hasFacebookPro && (
                  <div className="mt-3 pl-6">
                    <input 
                      type="url"
                      placeholder="Link Profil / Halaman FB (https://facebook.com/...)"
                      value={formData.facebookUrl || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, facebookUrl: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* WhatsApp Bisnis */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.hasWhatsAppBusiness}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasWhatsAppBusiness: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-md"
                  />
                  <span>Memakai WhatsApp Business & Memiliki Katalog Produk</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Memudahkan pembeli memilih varian dan melihat harga resmi secara instan.
                </p>
              </div>

              {/* Google Maps & Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.hasGoogleMaps}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasGoogleMaps: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded-md"
                    />
                    <span>Terdaftar di Google Maps (Titik Toko)</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6">Mudah dicari wisatawan & kurir ekspedisi.</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.hasInstagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasInstagram: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 rounded-md"
                    />
                    <span>Memiliki Akun Instagram Bisnis Aktif</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6">Untuk branding visual & katalog foto.</p>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 3: KEUANGAN & QRIS */}
          {activeCategory === 'keuangan' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Fondasi Naik Kelas: Rapi Keuangan & Nontunai</strong>
                  <p className="mt-0.5 text-slate-600">
                    Bank Indonesia NTB & Dinas Koperasi mewajibkan QRIS dan pemisahan rekening sebelum Anda dapat diikutsertakan ke program fasilitasi pembiayaan subsidi bunga KUR dan temu kurasi nasional.
                  </p>
                </div>
              </div>

              {/* Rekening Terpisah */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.hasSeparateBankAcc}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasSeparateBankAcc: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-md"
                  />
                  <span>Rekening Usaha Terpisah dari Rekening Rumah Tangga / Pribadi</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Mencegah tercampurnya uang modal dengan belanja dapur.
                </p>
              </div>

              {/* QRIS Merchant */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.hasQris}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasQris: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded-md"
                      />
                      <span>Sudah Memiliki QRIS Merchant (Pembayaran Nontunai)</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 pl-6">
                      Didukung Bank NTB Syariah, BRI, BNI, Dana, ShopeePay, dll.
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${formData.hasQris ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.hasQris ? 'Aktif' : 'Belum Ada'}
                  </span>
                </div>
                {formData.hasQris && (
                  <div className="mt-3 pl-6">
                    <input 
                      type="text"
                      placeholder="Nama Merchant QRIS (Contoh: UD Kopi Sembalun)"
                      value={formData.qrisMerchantName || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, qrisMerchantName: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* Pembukuan Kas Digital */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.hasDigitalBookkeeping}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasDigitalBookkeeping: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-md"
                  />
                  <span>Rutin Mencatat Arus Kas (SIAPIK BI / BukuKas / Catatan Kas)</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Mengetahui laba/rugi bersih bulanan secara pasti.
                </p>
              </div>
            </div>
          )}

          {/* CATEGORY 4: KEMASAN & MUTU */}
          {activeCategory === 'kemasan' && (
            <div className="space-y-4">
              <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-xs text-purple-900 flex items-start gap-3">
                <Package className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Standar Kemasan Modern & Daya Saing</strong>
                  <p className="mt-0.5 text-slate-600">
                    Dinas Perindustrian Lombok Timur menyediakan fasilitasi desain kemasan dan Rumah Kemasan untuk IKM lokal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.hasStandardPackaging}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasStandardPackaging: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-md"
                  />
                  <span>Kemasan Sudah Berstandar Ritel (Alufoil, Pouch Zipper, Dus Sablon)</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Bukan lagi plastik polos tipis yang diikat karet atau lilin.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.hasBarcodeOrExpiredDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasBarcodeOrExpiredDate: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-md"
                  />
                  <span>Label Memuat Tanggal Kadaluarsa, Komposisi & Barcode</span>
                </label>
                <p className="text-xs text-slate-500 mt-1 pl-6">
                  Syarat lolos kurasi oleh-oleh bandara BIL dan hotel NTB.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Summary Callout */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-700 mb-1">
              Dampak Hasil Asesmen Ini:
            </h4>
            <p className="text-xs text-slate-600">
              {previewInfo.desc}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-extrabold shadow-md hover:from-emerald-700 hover:to-teal-800 transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan & Perbarui Misi Harian</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
