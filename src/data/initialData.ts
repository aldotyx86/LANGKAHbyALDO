import { 
  AdminDinasProfile, 
  AgencyData, 
  LegalitasItem, 
  LombokRegion, 
  PendampingProfile, 
  TaskItem, 
  UmkmProfile 
} from '../types';

export const LOMBOK_REGIONS_WITH_DISTRICTS: Record<LombokRegion, string[]> = {
  'Kota Mataram': [
    'Ampenan',
    'Cakranegara',
    'Mataram',
    'Sandubaya',
    'Sekarbela',
    'Selaparang'
  ],
  'Kabupaten Lombok Barat': [
    'Gerung',
    'Batulayar',
    'Gunungsari',
    'Narmada',
    'Kediri',
    'Labuapi',
    'Lembar',
    'Lingsar',
    'Kuripan',
    'Sekotong'
  ],
  'Kabupaten Lombok Tengah': [
    'Praya',
    'Pujut (Mandalika)',
    'Jonggat',
    'Kopang',
    'Batuklintang',
    'Janapria',
    'Pringgarata',
    'Praya Barat',
    'Praya Timur',
    'Praya Barat Daya',
    'Praya Tengah'
  ],
  'Kabupaten Lombok Timur': [
    'Selong',
    'Aikmel',
    'Masbagik',
    'Pringgasela',
    'Sembalun',
    'Labuhan Haji',
    'Pringgabaya',
    'Sukamulia',
    'Keruak',
    'Jerowaru',
    'Sikur',
    'Terara',
    'Montong Gading',
    'Sambelia',
    'Suela',
    'Wanasaba',
    'Lenek',
    'Sakra',
    'Sakra Barat',
    'Sakra Timur',
    'Suralaga'
  ],
  'Kabupaten Lombok Utara': [
    'Tanjung',
    'Gangga',
    'Kayangan',
    'Bayan',
    'Pemenang (Gili Trawangan/Meno/Air)'
  ]
};

export const INTEGRATED_AGENCIES: AgencyData[] = [
  {
    id: 'dinas_koperasi_ukm',
    name: 'Dinas Koperasi dan UKM Provinsi NTB & Kab/Kota se-Lombok',
    shortName: 'Dinas Koperasi & UKM',
    roleDescription: 'Pembinaan kelembagaan, fasilitasi pembiayaan subsidi bunga KUR & fasilitasi sertifikasi halal gratis (SEHATI).',
    targetFocus: 'Pemberdayaan 75.000 UMKM Akar Rumput & Inkubasi',
    iconName: 'Building2',
    activeProgramsCount: 16
  },
  {
    id: 'bi_ntb',
    name: 'Kantor Perwakilan Bank Indonesia Provinsi Nusa Tenggara Barat',
    shortName: 'Bank Indonesia NTB (Mitra Strategis)',
    roleDescription: 'Akselerasi UMKM Naik Kelas, digitalisasi pembayaran QRIS, fasilitasi Business Pitching & Kurasi Karya Kreatif NTB (Portofolio 2024-2025).',
    targetFocus: 'UMKM Ekspor, Ekonomi Syariah & Digitalisasi QRIS',
    iconName: 'Landmark',
    activeProgramsCount: 14
  },
  {
    id: 'dinas_perindustrian',
    name: 'Dinas Perindustrian Provinsi NTB & UPTD Rumah Kemasan',
    shortName: 'Dinas Perindustrian (Rumah Kemasan)',
    roleDescription: 'Standardisasi IKM, bantuan mesin peralatan, uji laboratorium & perbaikan desain kemasan ritel modern.',
    targetFocus: 'Sentra IKM Tenun Songket, Olahan Pangan, & Kopi Rinjani',
    iconName: 'Factory',
    activeProgramsCount: 11
  },
  {
    id: 'dinas_perdagangan',
    name: 'Dinas Perdagangan Provinsi NTB & Kabupaten/Kota',
    shortName: 'Dinas Perdagangan',
    roleDescription: 'Akses pasar domestik dan ekspor, temu bisnis (business matching), dan kurasi ritel modern oleh-oleh.',
    targetFocus: 'Distribusi Nasional, PaDi UMKM & Pasar Ekspor',
    iconName: 'ShoppingBag',
    activeProgramsCount: 8
  },
  {
    id: 'dinas_pertanian',
    name: 'Dinas Pertanian & Perkebunan Provinsi NTB',
    shortName: 'Dinas Pertanian',
    roleDescription: 'Hilirisasi hortikultura (kopi Sembalun lereng Rinjani, beras organik, tembakau, vanili, cabai).',
    targetFocus: 'Petani & IKM Pengolahan Hasil Tani NTB',
    iconName: 'Sprout',
    activeProgramsCount: 7
  },
  {
    id: 'dinas_perikanan',
    name: 'Dinas Kelautan dan Perikanan Provinsi NTB',
    shortName: 'Dinas Kelautan & Perikanan',
    roleDescription: 'Standardisasi mutu pengolahan ikan pesisir (Tanjung Luar, Teluk Awang, Jerowaru) & rumput laut KLU.',
    targetFocus: 'Hilirisasi Hasil Laut & Cold Chain',
    iconName: 'Fish',
    activeProgramsCount: 6
  },
  {
    id: 'dinas_pariwisata',
    name: 'Dinas Pariwisata Provinsi NTB',
    shortName: 'Dinas Pariwisata',
    roleDescription: 'Integrasi cinderamata dan kuliner khas UMKM dengan destinasi wisata Rinjani, KEK Mandalika, dan 3 Gili.',
    targetFocus: 'Cinderamata, Kriya & Kuliner Wisatawan',
    iconName: 'Compass',
    activeProgramsCount: 9
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  // HARI 1: PERSIAPAN DASAR
  {
    id: 'task-hari-1-ktp-foto',
    dayNumber: 1,
    aspect: 'legalitas',
    title: 'Hari 1: Siapkan KTP, NIK & Foto Produk Resolusi Jelas',
    shortDescription: 'Langkah awal persiapan identitas pemilik dan foto produk sebelum mendaftar izin usaha negara.',
    xpReward: 60,
    requiredLevel: 1,
    category: 'Persiapan Usaha',
    stepGuide: {
      overview: 'Sebelum mengakses portal OSS atau mendaftar sertifikasi halal, siapkan dokumen wajib yang paling sering ditolak jika tidak jelas atau buram.',
      targetDinas: 'Tim Pendamping Lapangan Lombok',
      requirements: [
        'Foto e-KTP Pemilik Usaha yang jelas (tidak silau/terpotong)',
        'Nomor WhatsApp aktif untuk menerima kode OTP verifikasi',
        'Minimal 3 foto produk dengan pencahayaan terang alami'
      ],
      steps: [
        'Foto e-KTP Anda di atas bidang datar dengan pencahayaan cukup.',
        'Foto produk Anda secara close-up (tampak depan dan tampak kemasan).',
        'Gunakan fitur kompresi foto di aplikasi ini agar ukuran file hemat di bawah 300KB.',
        'Unggah atau masukkan konfirmasi kesiapan berkas Anda.'
      ],
      proTips: 'Simpan foto KTP dan produk di satu folder khusus di HP agar mudah diunggah saat pendaftaran izin usaha.'
    },
    proofType: 'checklist_photo',
    proofPlaceholder: 'Ketik "KTP dan 3 Foto Produk Siap" atau lampirkan catatan',
    associatedAssessmentKey: 'hasNib'
  },

  // HARI 2: NIB OSS RBA
  {
    id: 'task-hari-2-nib-oss',
    dayNumber: 2,
    aspect: 'legalitas',
    title: 'Hari 2: Terbitkan NIB (Nomor Induk Berusaha) Gratis via OSS RBA',
    shortDescription: 'Identitas resmi izin usaha negara dari Kementerian Investasi/BKPM tanpa calo.',
    xpReward: 120,
    requiredLevel: 1,
    category: 'Legalitas & Perizinan',
    stepGuide: {
      overview: 'NIB adalah "KTP" bagi usaha Anda. Berlaku seumur hidup, menjadi dasar pengajuan sertifikasi Halal Sehati, SPP-IRT, dan syarat pengajuan KUR bank.',
      targetDinas: 'Dinas Penanaman Modal & PTSP se-Pulau Lombok',
      officialPortalUrl: 'https://oss.go.id',
      officialPortalName: 'Portal Resmi OSS RBA BKPM',
      requirements: [
        'NIK KTP terdaftar di Dukcapil',
        'Email aktif dan nomor WhatsApp',
        'KBLI (Klasifikasi Baku Lapangan Usaha) yang sesuai'
      ],
      steps: [
        'Buka laman oss.go.id, klik Daftar -> Pilih Usaha Mikro & Kecil (UMK).',
        'Pilih jenis Orang Perseorangan, isi NIK dan verifikasi OTP.',
        'Login ke dashboard OSS, klik Permohonan Baru -> Tambah Bidang Usaha.',
        'Pilih KBLI yang cocok (misal 10799 untuk olahan keripik/sambal).',
        'Download file PDF NIB 13 digit yang telah resmi terbit.'
      ],
      proTips: 'NIB 100% GRATIS tanpa biaya sepeser pun. Jika butuh bantuan tatap muka, kunjungi meja pelayanan PTSP terdekat.'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Masukkan 13 digit Nomor NIB Anda (Contoh: 1289000123456)',
    associatedAssessmentKey: 'hasNib'
  },

  // HARI 3: WHATSAPP BISNIS
  {
    id: 'task-hari-3-wa-bisnis',
    dayNumber: 3,
    aspect: 'digital_marketing',
    title: 'Hari 3: Pasang WhatsApp Business & Bikin Katalog Produk',
    shortDescription: 'Permudah pelanggan memesan produk tanpa perlu tanya harga berulang kali.',
    xpReward: 80,
    requiredLevel: 1,
    category: 'Pemasaran Digital',
    stepGuide: {
      overview: 'WhatsApp Business memungkinkan Anda memajang foto produk, harga, deskripsi, dan pesan salam otomatis.',
      targetDinas: 'Klinik Bisnis Digital LANGKAH',
      requirements: [
        'Aplikasi WhatsApp Business terpasang di HP',
        'Foto produk dan daftar harga resmi'
      ],
      steps: [
        'Buka WA Bisnis -> Titik Tiga -> Alat Bisnis -> Profil Bisnis.',
        'Atur nama merk, kategori usaha, jam buka, dan alamat di Lombok.',
        'Buka menu Katalog -> Tambah Item Baru -> Unggah foto dan beri harga.',
        'Salin tautan nomor atau katalog WA Anda untuk dikirimkan.'
      ],
      proTips: 'Katalog WA membuat pembeli luar daerah merasa bertransaksi dengan penjual profesional dan terpercaya.'
    },
    proofType: 'url_link',
    proofPlaceholder: 'Nomor WhatsApp Bisnis / Link Katalog (Contoh: 081912345678 atau wa.me/c/...)',
    associatedAssessmentKey: 'hasWhatsAppBusiness'
  },

  // HARI 4: FACEBOOK PRO / FANPAGE
  {
    id: 'task-hari-4-fb-pro',
    dayNumber: 4,
    aspect: 'digital_marketing',
    title: 'Hari 4: Buat Akun Facebook Bisnis / Halaman Fanpage',
    shortDescription: 'Jangkau puluhan ribu pembeli aktif di grup jual-beli Lombok dan sekitarnya.',
    xpReward: 80,
    requiredLevel: 1,
    category: 'Pemasaran Digital',
    stepGuide: {
      overview: 'Facebook adalah sarana belanja UMKM paling aktif di NTB. Ubah profil pribadi ke Mode Profesional atau buat Halaman Bisnis.',
      targetDinas: 'Dinas Koperasi & UKM / Tim Pendamping',
      officialPortalUrl: 'https://facebook.com/pages/create',
      officialPortalName: 'Facebook Page Creator',
      requirements: [
        'Foto profil merk/logo usaha',
        'Foto sampul memperlihatkan produk unggulan',
        'Bio singkat memuat nomor WhatsApp'
      ],
      steps: [
        'Buka Facebook, aktifkan Mode Profesional pada profil atau Buat Halaman Bisnis baru.',
        'Isi deskripsi usaha, lokasi kabupaten di Lombok, dan link kontak.',
        'Buat 1 postingan perkenalan produk lengkap dengan harga.',
        'Salin link halaman Facebook Anda untuk diverifikasi tim pendamping.'
      ],
      proTips: 'Admin pendamping kami akan memverifikasi link FB Anda dan memastikan kontak pemesanan sudah benar.'
    },
    proofType: 'url_link',
    proofPlaceholder: 'Link Akun / Fanpage Facebook (Contoh: https://facebook.com/sambalrinjani)',
    associatedAssessmentKey: 'hasFacebookPro'
  },

  // HARI 5: GOOGLE MAPS
  {
    id: 'task-hari-5-google-maps',
    dayNumber: 5,
    aspect: 'digital_marketing',
    title: 'Hari 5: Daftarkan Titik Tempat Usaha di Google Maps',
    shortDescription: 'Membuat wisatawan dan kurir ekspedisi mudah menemukan lokasi workshop/toko Anda.',
    xpReward: 90,
    requiredLevel: 2,
    category: 'Pemasaran Digital',
    stepGuide: {
      overview: 'Titik Google Maps mempermudah wisatawan Mataram, Senggigi, Sembalun, maupun Mandalika menemukan lokasi oleh-oleh Anda.',
      targetDinas: 'Dinas Pariwisata & Kominfo',
      officialPortalUrl: 'https://business.google.com',
      officialPortalName: 'Google Business Profile',
      requirements: [
        'Akun Google / Gmail aktif',
        'Foto tampak depan tempat usaha / workshop',
        'Alamat lengkap beserta patokan jalan'
      ],
      steps: [
        'Buka Google Maps di HP atau laptop, klik Tambahkan Tempat Anda.',
        'Isi nama usaha yang jelas (misal: "Tenun Songket Sasak Pringgasela - Galeri Ibu Siti").',
        'Tentukan titik pin peta secara akurat dan upload foto tampak depan.',
        'Salin tautan bagikan lokasi dari Google Maps.'
      ],
      proTips: 'Minta 3 pelanggan terdekat memberi ulasan bintang 5 pertama untuk menaikkan peringkat pencarian.'
    },
    proofType: 'url_link',
    proofPlaceholder: 'Link share Google Maps (Contoh: https://maps.app.goo.gl/...)',
    associatedAssessmentKey: 'hasGoogleMaps'
  },

  // HARI 6: PISAH REKENING
  {
    id: 'task-hari-6-pisah-rekening',
    dayNumber: 6,
    aspect: 'keuangan',
    title: 'Hari 6: Buka Rekening Khusus Usaha (Bank NTB Syariah / BRI)',
    shortDescription: 'Hentikan kebocoran uang modal yang tercampur dengan belanja dapur rumah tangga.',
    xpReward: 90,
    requiredLevel: 1,
    category: 'Manajemen Keuangan',
    stepGuide: {
      overview: 'Pemisahan rekening usaha adalah syarat mutlak UMKM naik kelas dan syarat wajib saat difasilitasi pembiayaan KUR bersubsidi.',
      targetDinas: 'Bank Penyalur KUR & Bank NTB Syariah',
      requirements: [
        'KTP dan NIB yang sudah terbit',
        'Setoran awal tabungan bank (Rp 50.000 - Rp 100.000)'
      ],
      steps: [
        'Buka rekening khusus melalui m-banking atau datang ke kantor bank terdekat di Lombok.',
        'Pastikan rekening ini hanya menerima uang penjualan dan membayar biaya produksi.',
        'Catat nama bank dan 4 digit terakhir nomor rekening usaha.'
      ],
      proTips: 'Disiplin tidak mengambil uang kas usaha untuk keperluan pribadi tanpa mencatatnya sebagai gaji pemilik.'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Nama Bank & 4 Digit Terakhir No. Rekening Usaha (Contoh: Bank NTB Syariah ...8821)',
    associatedAssessmentKey: 'hasSeparateBankAcc'
  },

  // HARI 7: SERTIFIKASI HALAL SEHATI
  {
    id: 'task-hari-7-halal-sehati',
    dayNumber: 7,
    aspect: 'legalitas',
    title: 'Hari 7: Daftar Sertifikasi Halal Gratis (Program SEHATI BPJPH)',
    shortDescription: 'Tingkatkan kepercayaan konsumen muslim dengan label Halal resmi dari Kemenag.',
    xpReward: 150,
    requiredLevel: 2,
    category: 'Legalitas & Perizinan',
    stepGuide: {
      overview: 'Pemerintah memfasilitasi sertifikasi halal gratis untuk produk olahan makanan/minuman non-daging dengan bahan alami melalui skema Self Declare.',
      targetDinas: 'Satgas Halal NTB & Pendamping PPH',
      officialPortalUrl: 'https://ptsp.halal.go.id',
      officialPortalName: 'Portal SIHALAL BPJPH',
      requirements: [
        'NIB aktif dari OSS',
        'Bahan baku dipastikan halal (alami tanpa pengawet terlarang)',
        'Foto proses produksi sederhana di dapur usaha'
      ],
      steps: [
        'Buka ptsp.halal.go.id dan buat akun Pelaku Usaha.',
        'Pilih permohonan Sertifikasi Halal skema Self Declare (SEHATI Rp 0).',
        'Masukkan data NIB, pilih nama Lembaga Pendamping Halal di NTB.',
        'Unggah daftar bahan dan submit untuk verifikasi pendamping PPH.'
      ],
      proTips: 'Simpan nomor register STTD (Surat Tanda Terima Dokumen) atau nomor sertifikat jika sudah terbit.'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Nomor STTD / Sertifikat Halal SIHALAL (Contoh: STTD-5203-...)',
    associatedAssessmentKey: 'hasHalal'
  },

  // HARI 8: QRIS BANK INDONESIA NTB
  {
    id: 'task-hari-8-qris-bi-ntb',
    dayNumber: 8,
    aspect: 'keuangan',
    title: 'Hari 8: Pasang Pembayaran Nontunai QRIS Merchant Bank Indonesia NTB',
    shortDescription: 'Terima pembayaran cepat dari semua e-wallet (GoPay, OVO, Dana) dan mobile banking tanpa repot kembalian.',
    xpReward: 130,
    requiredLevel: 2,
    category: 'Manajemen Keuangan',
    stepGuide: {
      overview: 'Program akselerasi Blueprint Sistem Pembayaran Indonesia Bank Indonesia NTB. Seluruh transaksi tercatat otomatis untuk histori perbankan.',
      targetDinas: 'Kantor Perwakilan Bank Indonesia Provinsi NTB',
      requirements: [
        'KTP Pemilik Usaha',
        'Nomor NIB yang sudah terbit',
        'Rekening bank aktif tujuan pencairan'
      ],
      steps: [
        'Ajukan pendaftaran QRIS Merchant melalui m-banking (misal QRIS Bank NTB Syariah, BRImo, atau Dana Bisnis).',
        'Kirim data NIB dan foto tampak tempat usaha.',
        'Setelah disetujui, cetak barcode QRIS dan pasang di kasir/meja jualan.',
        'Ketik nama resmi Merchant QRIS Anda.'
      ],
      proTips: 'Transaksi QRIS tercatat rapi sebagai bukti kelayakan kredit usaha saat mengajukan modal ke bank.'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Nama Resmi QRIS Merchant Anda (Contoh: QRIS - Warung Tenun Sasak)',
    associatedAssessmentKey: 'hasQris'
  },

  // HARI 9: P-IRT DINKES
  {
    id: 'task-hari-9-pirt-dinkes',
    dayNumber: 9,
    aspect: 'legalitas',
    title: 'Hari 9: Urus Izin Edar P-IRT / SPP-IRT Rekomendasi Dinas Kesehatan',
    shortDescription: 'Syarat wajib produk pangan olahan agar bisa masuk rak ritel modern dan toko oleh-oleh.',
    xpReward: 130,
    requiredLevel: 2,
    category: 'Legalitas & Perizinan',
    stepGuide: {
      overview: 'SPP-IRT (Sertifikat Produksi Pangan Industri Rumah Tangga) terintegrasi langsung di sistem OSS RBA.',
      targetDinas: 'Dinas Kesehatan Kabupaten/Kota se-Lombok & Balai POM Mataram',
      officialPortalUrl: 'https://sppirt.pom.go.id',
      officialPortalName: 'Sistem SPP-IRT BPOM',
      requirements: [
        'NIB aktif dari OSS',
        'Rancangan label kemasan yang memuat nama produk, komposisi, tanggal kadaluarsa, alamat produsen',
        'Mengikuti penyuluhan keamanan pangan (PKP)'
      ],
      steps: [
        'Masuk ke menu Perizinan UMKU di akun OSS Anda.',
        'Pilih SPP-IRT, isi data pangan olahan dan masa simpan.',
        'Unggah rancangan label kemasan sesuai ketentuan BPOM.',
        'Terbitkan nomor SPP-IRT 15 digit.'
      ],
      proTips: 'Label kemasan tidak boleh mencantumkan klaim obat medis seperti "menyembuhkan stroke/diabetes".'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Nomor P-IRT 15 Digit (Contoh: P-IRT 2065203010123-28)',
    associatedAssessmentKey: 'hasPirtOrBpom'
  },

  // HARI 10: RUMAH KEMASAN NTB
  {
    id: 'task-hari-10-kemasan-ntb',
    dayNumber: 10,
    aspect: 'kemasan_mutu',
    title: 'Hari 10: Standardisasi Kemasan Ritel (UPTD Rumah Kemasan NTB)',
    shortDescription: 'Upgrade kemasan dari plastik polos menjadi standing pouch alufoil berdesain modern.',
    xpReward: 140,
    requiredLevel: 2,
    category: 'Kualitas & Kemasan',
    stepGuide: {
      overview: 'Dinas Perindustrian NTB memiliki UPTD Rumah Kemasan yang siap membantu desain dan cetak kemasan ramah kantong bagi IKM Lombok.',
      targetDinas: 'UPTD Rumah Kemasan Dinas Perindustrian NTB',
      requirements: [
        'Sampel kemasan lama',
        'Rancangan logo dan informasi legalitas (NIB, Halal, PIRT)'
      ],
      steps: [
        'Konsultasikan desain kemasan Anda di Rumah Kemasan NTB atau desainer binaan.',
        'Pilih bahan standing pouch alufoil atau zipper kedap udara.',
        'Pastikan label mencantumkan netto, tanggal kadaluarsa, dan nomor izin.',
        'Unggah deskripsi atau foto kemasan baru Anda.'
      ],
      proTips: 'Kemasan yang menarik dan higienis dapat menaikkan nilai jual produk 100% hingga 200% lebih mahal.'
    },
    proofType: 'checklist_photo',
    proofPlaceholder: 'Deskripsikan kemasan baru Anda atau cantumkan catatan perubahan',
    associatedAssessmentKey: 'hasStandardPackaging'
  },

  // HARI 11: ARUS KAS SIAPIK BI NTB
  {
    id: 'task-hari-11-siapik-bi',
    dayNumber: 11,
    aspect: 'keuangan',
    title: 'Hari 11: Catat Pembukuan Arus Kas (Aplikasi SIAPIK Bank Indonesia)',
    shortDescription: 'Buat laporan laba rugi bulanan rapi sesuai standar akuntansi UMKM.',
    xpReward: 110,
    requiredLevel: 2,
    category: 'Manajemen Keuangan',
    stepGuide: {
      overview: 'SIAPIK adalah aplikasi pencatatan keuangan gratis dari Bank Indonesia yang diakui oleh seluruh perbankan nasional.',
      targetDinas: 'Kantor Perwakilan Bank Indonesia NTB',
      officialPortalUrl: 'https://siapik.bi.go.id',
      officialPortalName: 'Portal SIAPIK Bank Indonesia',
      requirements: [
        'Catatan transaksi penjualan 7 hari terakhir',
        'Catatan bukti nota belanja bahan baku'
      ],
      steps: [
        'Download aplikasi SIAPIK di Play Store atau buka siapik.bi.go.id.',
        'Pilih sektor usaha Anda (Manufaktur, Jasa, Pertanian, Perdagangan).',
        'Input saldo kas awal dan catat pemasukan serta pengeluaran rutin.',
        'Unduh ringkasan laporan laba rugi sederhana.'
      ],
      proTips: 'Laporan keuangan SIAPIK mempercepat persetujuan pinjaman modal usaha di bank tanpa ribet.'
    },
    proofType: 'checklist_photo',
    proofPlaceholder: 'Ketik "Aktif mencatat di SIAPIK" atau catatan pembukuan',
    associatedAssessmentKey: 'hasFinancialReport'
  },

  // HARI 12: HKI MEREK KEMENKUMHAM
  {
    id: 'task-hari-12-hki-merek',
    dayNumber: 12,
    aspect: 'legalitas',
    title: 'Hari 12: Daftarkan Hak Kekayaan Intelektual (Merek HKI Kemenkumham NTB)',
    shortDescription: 'Lindungi nama merk dagang Anda agar tidak ditiru atau dicuri kompetitor.',
    xpReward: 160,
    requiredLevel: 3,
    category: 'Legalitas & Perizinan',
    stepGuide: {
      overview: 'Sertifikat Merek dari Dirjen KI Kemenkumham memberikan hak monopoli nama produk selama 10 tahun.',
      targetDinas: 'Kanwil Kemenkumham NTB & Dinas Perindustrian/Koperasi',
      officialPortalUrl: 'https://merek.dgip.go.id',
      officialPortalName: 'Pangkalan Data Merek DJKI',
      requirements: [
        'Surat rekomendasi UMK binaan dinas (diskon biaya pendaftaran dari 1,8 juta menjadi Rp 500.000)',
        'Etiket gambar logo/nama merek',
        'Tanda tangan pemohon'
      ],
      steps: [
        'Cek ketersediaan nama merk di pdki-indonesia.dgip.go.id.',
        'Minta surat rekomendasi UMK binaan di Dinas Koperasi/Perindustrian setempat.',
        'Daftar akun di merek.dgip.go.id dan isi formulir pendaftaran merek.',
        'Simpan nomor permohonan resmi HKI Anda.'
      ],
      proTips: 'Nama merek yang telah terdaftar HKI meningkatkan nilai valuasi bisnis saat bermitra dengan ritel besar.'
    },
    proofType: 'registration_number',
    proofPlaceholder: 'Nomor Permohonan / ID Sertifikat Merek HKI (Contoh: IPT2026...)',
    associatedAssessmentKey: 'hasHaki'
  },

  // HARI 13: KURASI PITCHING BI NTB
  {
    id: 'task-hari-13-pitching-bi',
    dayNumber: 13,
    aspect: 'pitching_ekspor',
    title: 'Hari 13: Seleksi Kurasi Karya Kreatif NTB & Business Pitching BI NTB',
    shortDescription: 'Puncak capaian UMKM Naik Kelas: Fasilitasi temu buyer luar negeri dan pameran nasional binaan BI NTB.',
    xpReward: 250,
    requiredLevel: 3,
    category: 'Naik Kelas & Kemitraan',
    stepGuide: {
      overview: 'Program unggulan kemitraan Bank Indonesia Provinsi NTB (Portofolio 2024-2025). UMKM terpilih akan dibawa mewakili NTB ke ajang nasional (KKI, Inacraft, FESyar).',
      targetDinas: 'Kantor Perwakilan Bank Indonesia Provinsi NTB',
      officialPortalUrl: 'https://karyakreatifindonesia.co.id',
      officialPortalName: 'Portal Karya Kreatif Indonesia',
      requirements: [
        'Seluruh legalitas dasar telah lengkap (NIB, Halal/PIRT/BPOM, QRIS)',
        'Kapasitas produksi terjaga dan kemasan siap ritel',
        'Profil usaha ringkas (Company Profile / flyer produk)'
      ],
      steps: [
        'Siapkan slide pitch deck profil usaha dan sertifikat legalitas Anda.',
        'Kirimkan permohonan kurasi melalui aplikasi LANGKAH.',
        'Ikuti sesi pitching fisik atau kurasi produk bersama tim kurator BI NTB di Mataram.',
        'Dapatkan fasilitasi pameran dan pendampingan ekspor intensif.'
      ],
      proTips: 'Tonjolkan keunikan bahan lokal khas Lombok (seperti pewarna alam tenun Sasak atau rempah lereng Rinjani).'
    },
    proofType: 'checklist_photo',
    proofPlaceholder: 'Catatan komitmen kesiapan pitching atau link proposal profil usaha',
    associatedAssessmentKey: 'hasFinancialReport'
  }
];

export const createDefaultLegalitasTracker = (assessment: any): Record<string, LegalitasItem> => {
  return {
    nib: {
      id: 'nib',
      label: 'NIB (Nomor Induk Berusaha)',
      shortDesc: 'Izin berusaha resmi dari BKPM/Kementerian Investasi melalui OSS RBA.',
      status: assessment.hasNib ? 'terbit' : 'belum_ada',
      documentNumber: assessment.nibNumber || (assessment.hasNib ? '1289000491823' : undefined),
      targetDinas: 'DPMPTSP & Dinas Koperasi UKM se-Lombok',
      officialPortalUrl: 'https://oss.go.id',
      officialPortalName: 'Portal OSS RBA'
    },
    halal: {
      id: 'halal',
      label: 'Sertifikat Halal Resmi (BPJPH)',
      shortDesc: 'Jaminan produk halal resmi Kementerian Agama melalui Program SEHATI.',
      status: assessment.hasHalal ? 'terbit' : (assessment.halalRegNumber ? 'sedang_diproses' : 'belum_ada'),
      documentNumber: assessment.halalRegNumber || (assessment.hasHalal ? 'ID5203000129481' : undefined),
      targetDinas: 'Satgas Halal NTB & Dinas Koperasi',
      officialPortalUrl: 'https://ptsp.halal.go.id',
      officialPortalName: 'Portal SIHALAL Kemenag'
    },
    pirt_bpom: {
      id: 'pirt_bpom',
      label: 'P-IRT / Izin Edar BPOM',
      shortDesc: 'Standar kelayakan pangan industri rumah tangga dari Dinas Kesehatan.',
      status: assessment.hasPirtOrBpom ? 'terbit' : 'belum_ada',
      documentNumber: assessment.pirtNumber || (assessment.hasPirtOrBpom ? 'P-IRT 2065203010412-28' : undefined),
      targetDinas: 'Dinas Kesehatan & Balai POM Mataram',
      officialPortalUrl: 'https://sppirt.pom.go.id',
      officialPortalName: 'Sistem SPP-IRT BPOM'
    },
    npwp: {
      id: 'npwp',
      label: 'NPWP Usaha / Pemilik',
      shortDesc: 'Nomor Pokok Wajib Pajak untuk pembukaan rekening usaha dan faktur ritel.',
      status: assessment.hasNpwp ? 'terbit' : 'belum_ada',
      targetDinas: 'KPP Pratama Mataram / Praya',
      officialPortalUrl: 'https://pajak.go.id',
      officialPortalName: 'Portal DJP Online'
    },
    hki_merek: {
      id: 'hki_merek',
      label: 'Sertifikat Merek (HKI Kemenkumham)',
      shortDesc: 'Perlindungan hukum nama merk dagang agar tidak ditiru kompetitor.',
      status: assessment.hasHaki ? 'terbit' : 'belum_ada',
      documentNumber: assessment.hakiMerk || (assessment.hasHaki ? 'IDM000984128' : undefined),
      targetDinas: 'Kanwil Kemenkumham NTB',
      officialPortalUrl: 'https://merek.dgip.go.id',
      officialPortalName: 'DJKI Kemenkumham'
    }
  };
};

export const INITIAL_UMKM_USERS: UmkmProfile[] = [
  {
    id: 'umkm-1',
    username: 'sitirahma',
    ownerName: 'Siti Rahmawati',
    businessName: 'UD Sambal Beberuk Rinjani Lestari',
    brandName: 'Sambal Beberuk Rinjani',
    phone: '081917654321',
    email: 'sitirahma.sambal@gmail.com',
    nik: '5203015409890002',
    address: 'Jl. Raya Aikmel No. 42, RT 03/01',
    region: 'Kabupaten Lombok Timur',
    district: 'Aikmel',
    sector: 'Kuliner Olahan (Food & Beverage)',
    monthlyRevenueRange: '5 - 15 Juta',
    employeeCount: 4,
    establishedYear: 2021,
    mentorshipType: 'hibrid',
    umkmClass: 'berkembang',
    xp: 420,
    streakDays: 4,
    lastActiveDate: '2026-10-20',
    assessment: {
      hasNib: true,
      nibNumber: '1289000491823',
      hasHalal: false,
      halalRegNumber: 'STTD-BPJPH-5203-2026-00412',
      hasPirtOrBpom: true,
      pirtNumber: 'P-IRT 2065203010412-28',
      hasHaki: false,
      hasNpwp: true,
      hasLabTest: false,
      hasFacebookPro: true,
      facebookUrl: 'https://facebook.com/sambalbeberukrinjani',
      hasInstagram: true,
      instagramHandle: '@sambalbeberukrinjani',
      hasWhatsAppBusiness: true,
      hasGoogleMaps: true,
      googleMapsUrl: 'https://maps.app.goo.gl/sambalrinjaniaikmel',
      hasMarketplace: true,
      marketplaceNames: ['Shopee', 'Tokopedia'],
      hasSeparateBankAcc: true,
      hasDigitalBookkeeping: false,
      hasQris: true,
      qrisMerchantName: 'Sambal Beberuk Rinjani Aikmel',
      hasFinancialReport: false,
      hasStandardPackaging: true,
      hasBarcodeOrExpiredDate: true,
      hasHygieneCertificate: false,
      lastAssessedAt: '2026-10-18'
    },
    legalitasTracker: {
      nib: {
        id: 'nib',
        label: 'NIB (Nomor Induk Berusaha)',
        shortDesc: 'Izin berusaha resmi dari BKPM/Kementerian Investasi melalui OSS RBA.',
        status: 'terbit',
        documentNumber: '1289000491823',
        targetDinas: 'DPMPTSP & Dinas Koperasi UKM Lotim',
        officialPortalUrl: 'https://oss.go.id',
        officialPortalName: 'Portal OSS RBA'
      },
      halal: {
        id: 'halal',
        label: 'Sertifikat Halal Resmi (BPJPH)',
        shortDesc: 'Jaminan produk halal resmi Kementerian Agama melalui Program SEHATI.',
        status: 'sedang_diproses',
        documentNumber: 'STTD-BPJPH-5203-2026-00412',
        targetDinas: 'Satgas Halal NTB & Dinas Koperasi Lotim',
        officialPortalUrl: 'https://ptsp.halal.go.id',
        officialPortalName: 'Portal SIHALAL Kemenag'
      },
      pirt_bpom: {
        id: 'pirt_bpom',
        label: 'P-IRT / Izin Edar BPOM',
        shortDesc: 'Standar kelayakan pangan industri rumah tangga dari Dinas Kesehatan.',
        status: 'terbit',
        documentNumber: 'P-IRT 2065203010412-28',
        targetDinas: 'Dinas Kesehatan Lotim',
        officialPortalUrl: 'https://sppirt.pom.go.id',
        officialPortalName: 'Sistem SPP-IRT BPOM'
      },
      npwp: {
        id: 'npwp',
        label: 'NPWP Usaha / Pemilik',
        shortDesc: 'Nomor Pokok Wajib Pajak untuk pembukaan rekening usaha dan faktur ritel.',
        status: 'terbit',
        documentNumber: '82.912.401.8-912.000',
        targetDinas: 'KPP Pratama Praya/Selong',
        officialPortalUrl: 'https://pajak.go.id',
        officialPortalName: 'Portal DJP Online'
      },
      hki_merek: {
        id: 'hki_merek',
        label: 'Sertifikat Merek (HKI Kemenkumham)',
        shortDesc: 'Perlindungan hukum nama merk dagang agar tidak ditiru kompetitor.',
        status: 'belum_ada',
        targetDinas: 'Kanwil Kemenkumham NTB',
        officialPortalUrl: 'https://merek.dgip.go.id',
        officialPortalName: 'DJKI Kemenkumham'
      }
    },
    submissions: {
      'task-hari-2-nib-oss': {
        taskId: 'task-hari-2-nib-oss',
        submittedAt: '2026-10-14 09:30',
        proofData: '1289000491823',
        proofNotes: 'NIB UMK perseorangan KBLI 10799',
        status: 'completed',
        reviewedAt: '2026-10-14 14:10',
        reviewedBy: 'Pendamping Wilayah Lotim',
        feedback: 'Dokumen NIB valid terverifikasi di database OSS RBA.'
      },
      'task-hari-4-fb-pro': {
        taskId: 'task-hari-4-fb-pro',
        submittedAt: '2026-10-16 11:20',
        proofData: 'https://facebook.com/sambalbeberukrinjani',
        proofNotes: 'Sudah diubah ke Halaman Bisnis dan pasang kontak WhatsApp',
        status: 'in_review'
      },
      'task-hari-7-halal-sehati': {
        taskId: 'task-hari-7-halal-sehati',
        submittedAt: '2026-10-17 15:45',
        proofData: 'STTD-BPJPH-5203-2026-00412',
        proofNotes: 'Sudah mendaftar di ptsp.halal.go.id, sedang menunggu kunjungan PPH',
        status: 'in_review'
      }
    },
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    facilitations: ['Inkubasi Pangan Berdaya BI NTB 2024'],
    missingDataNotes: [
      'Foto kemasan tampak belakang belum memuat logo Halal resmi (menunggu STTD terbit)',
      'Perlu melampirkan surat pernyataan bebas boraks/formalin untuk kurasi ritel modern'
    ]
  },
  {
    id: 'umkm-2',
    username: 'ahmadtenun',
    ownerName: 'Ahmad Zulkarnain',
    businessName: 'Tenun Songket Sasak Pringgasela',
    brandName: 'Pringgasela Heritage Weaving',
    phone: '087865991122',
    email: 'ahmad.tenunpringgasela@gmail.com',
    nik: '5203112304920001',
    address: 'Dusun Gubuk Lauq, Desa Pringgasela',
    region: 'Kabupaten Lombok Timur',
    district: 'Pringgasela',
    sector: 'Kriya & Tenun Tradisional (Songket Sasak)',
    monthlyRevenueRange: '15 - 50 Juta',
    employeeCount: 12,
    establishedYear: 2018,
    mentorshipType: 'intensif',
    umkmClass: 'naik_kelas',
    xp: 850,
    streakDays: 12,
    lastActiveDate: '2026-10-20',
    assessment: {
      hasNib: true,
      nibNumber: '9120005829102',
      hasHalal: false,
      hasPirtOrBpom: false,
      hasHaki: true,
      hakiMerk: 'IDM000984128 - Sasak Pringgasela',
      hasNpwp: true,
      hasLabTest: false,
      hasFacebookPro: true,
      facebookUrl: 'https://facebook.com/tenunsasakpringgasela',
      hasInstagram: true,
      instagramHandle: '@pringgasela_weaving',
      hasWhatsAppBusiness: true,
      hasGoogleMaps: true,
      googleMapsUrl: 'https://maps.app.goo.gl/tenunpringgaselagubulauq',
      hasMarketplace: true,
      marketplaceNames: ['Shopee', 'PaDi UMKM BUMN'],
      hasSeparateBankAcc: true,
      hasDigitalBookkeeping: true,
      hasQris: true,
      qrisMerchantName: 'Tenun Pringgasela Heritage Weaving',
      hasFinancialReport: true,
      hasStandardPackaging: true,
      hasBarcodeOrExpiredDate: false,
      hasHygieneCertificate: false,
      lastAssessedAt: '2026-10-15'
    },
    legalitasTracker: {
      nib: {
        id: 'nib',
        label: 'NIB (Nomor Induk Berusaha)',
        shortDesc: 'Izin berusaha resmi dari BKPM/Kementerian Investasi melalui OSS RBA.',
        status: 'terbit',
        documentNumber: '9120005829102',
        targetDinas: 'DPMPTSP & Dinas Perindustrian NTB',
        officialPortalUrl: 'https://oss.go.id',
        officialPortalName: 'Portal OSS RBA'
      },
      halal: {
        id: 'halal',
        label: 'Sertifikat Halal Resmi (BPJPH)',
        shortDesc: 'Kategori Kriya Non-Pangan tidak diwajibkan sertifikasi halal.',
        status: 'terbit',
        documentNumber: 'TIDAK_WAJIB_KRIYA',
        targetDinas: 'Dinas Perindustrian NTB',
        officialPortalUrl: 'https://ptsp.halal.go.id',
        officialPortalName: 'Portal SIHALAL Kemenag'
      },
      pirt_bpom: {
        id: 'pirt_bpom',
        label: 'P-IRT / Izin Edar BPOM',
        shortDesc: 'Kategori Kriya Tenun tidak membutuhkan izin edar makanan.',
        status: 'terbit',
        documentNumber: 'TIDAK_WAJIB_KRIYA',
        targetDinas: 'Dinas Perindustrian NTB',
        officialPortalUrl: 'https://sppirt.pom.go.id',
        officialPortalName: 'Sistem SPP-IRT BPOM'
      },
      npwp: {
        id: 'npwp',
        label: 'NPWP Usaha / Pemilik',
        shortDesc: 'Nomor Pokok Wajib Pajak untuk pembukaan rekening usaha dan faktur ritel.',
        status: 'terbit',
        documentNumber: '91.821.512.4-912.000',
        targetDinas: 'KPP Pratama Selong',
        officialPortalUrl: 'https://pajak.go.id',
        officialPortalName: 'Portal DJP Online'
      },
      hki_merek: {
        id: 'hki_merek',
        label: 'Sertifikat Merek (HKI Kemenkumham)',
        shortDesc: 'Perlindungan hukum nama merk dagang agar tidak ditiru kompetitor.',
        status: 'terbit',
        documentNumber: 'IDM000984128 - Sasak Pringgasela',
        targetDinas: 'Kanwil Kemenkumham NTB',
        officialPortalUrl: 'https://merek.dgip.go.id',
        officialPortalName: 'DJKI Kemenkumham'
      }
    },
    submissions: {
      'task-hari-2-nib-oss': {
        taskId: 'task-hari-2-nib-oss',
        submittedAt: '2026-10-01 10:00',
        proofData: '9120005829102',
        status: 'completed',
        reviewedAt: '2026-10-02 08:30',
        reviewedBy: 'Pendamping Wilayah Lotim',
        feedback: 'Legalitas NIB sangat lengkap dengan KBLI Industri Tenun Bukan Mesin (ATBM).'
      },
      'task-hari-13-pitching-bi': {
        taskId: 'task-hari-13-pitching-bi',
        submittedAt: '2026-10-18 14:00',
        proofData: 'Proposal Pitching Ekspor Tenun Pewarna Alam & Link Profil Google Drive',
        proofNotes: 'Siap difasilitasi kurasi pameran Karya Kreatif Indonesia (KKI) Jakarta mewakili BI NTB',
        status: 'in_review'
      }
    },
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    facilitations: ['Binaan Bank Indonesia NTB 2024-2025', 'Fasilitasi HAKI Gratis Kemenkumham NTB'],
    missingDataNotes: [
      'Katalog produk terjemahan bahasa Inggris untuk kurasi buyer internasional pameran BI'
    ]
  },
  {
    id: 'umkm-3',
    username: 'marlina',
    ownerName: 'Marlina Susanti',
    businessName: 'Kopi Arabika Lereng Rinjani Sembalun',
    brandName: 'Sembalun Highland Coffee',
    phone: '085338112233',
    email: 'marlina.sembalun@gmail.com',
    nik: '5203056108960004',
    address: 'Jl. Wisata Rinjani, Desa Sembalun Bumbung',
    region: 'Kabupaten Lombok Timur',
    district: 'Sembalun',
    sector: 'Pertanian & Perkebunan (Kopi Rinjani/Beras Organik)',
    monthlyRevenueRange: '< 5 Juta',
    employeeCount: 2,
    establishedYear: 2023,
    mentorshipType: 'otodidak',
    umkmClass: 'pemula',
    xp: 90,
    streakDays: 2,
    lastActiveDate: '2026-10-20',
    assessment: {
      hasNib: false,
      hasHalal: false,
      hasPirtOrBpom: false,
      hasHaki: false,
      hasNpwp: false,
      hasLabTest: false,
      hasFacebookPro: false,
      hasInstagram: false,
      hasWhatsAppBusiness: false,
      hasGoogleMaps: false,
      hasMarketplace: false,
      hasSeparateBankAcc: false,
      hasDigitalBookkeeping: false,
      hasQris: false,
      hasFinancialReport: false,
      hasStandardPackaging: false,
      hasBarcodeOrExpiredDate: false,
      hasHygieneCertificate: false,
      lastAssessedAt: '2026-10-20'
    },
    legalitasTracker: {
      nib: {
        id: 'nib',
        label: 'NIB (Nomor Induk Berusaha)',
        shortDesc: 'Izin berusaha resmi dari BKPM/Kementerian Investasi melalui OSS RBA.',
        status: 'belum_ada',
        targetDinas: 'DPMPTSP & Dinas Koperasi UKM Lotim',
        officialPortalUrl: 'https://oss.go.id',
        officialPortalName: 'Portal OSS RBA'
      },
      halal: {
        id: 'halal',
        label: 'Sertifikat Halal Resmi (BPJPH)',
        shortDesc: 'Jaminan produk halal resmi Kementerian Agama melalui Program SEHATI.',
        status: 'belum_ada',
        targetDinas: 'Satgas Halal NTB & Dinas Koperasi Lotim',
        officialPortalUrl: 'https://ptsp.halal.go.id',
        officialPortalName: 'Portal SIHALAL Kemenag'
      },
      pirt_bpom: {
        id: 'pirt_bpom',
        label: 'P-IRT / Izin Edar BPOM',
        shortDesc: 'Standar kelayakan pangan industri rumah tangga dari Dinas Kesehatan.',
        status: 'belum_ada',
        targetDinas: 'Dinas Kesehatan Lotim',
        officialPortalUrl: 'https://sppirt.pom.go.id',
        officialPortalName: 'Sistem SPP-IRT BPOM'
      },
      npwp: {
        id: 'npwp',
        label: 'NPWP Usaha / Pemilik',
        shortDesc: 'Nomor Pokok Wajib Pajak untuk pembukaan rekening usaha dan faktur ritel.',
        status: 'belum_ada',
        targetDinas: 'KPP Pratama Praya',
        officialPortalUrl: 'https://pajak.go.id',
        officialPortalName: 'Portal DJP Online'
      },
      hki_merek: {
        id: 'hki_merek',
        label: 'Sertifikat Merek (HKI Kemenkumham)',
        shortDesc: 'Perlindungan hukum nama merk dagang agar tidak ditiru kompetitor.',
        status: 'belum_ada',
        targetDinas: 'Kanwil Kemenkumham NTB',
        officialPortalUrl: 'https://merek.dgip.go.id',
        officialPortalName: 'DJKI Kemenkumham'
      }
    },
    submissions: {},
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    facilitations: [],
    missingDataNotes: [
      'Belum memiliki NIB (Target prioritas misi Hari 2)',
      'Nomor WhatsApp belum dipasang di profil bisnis',
      'Membutuhkan pendampingan pembuatan rekening terpisah'
    ]
  },
  {
    id: 'umkm-4',
    username: 'wayanmutiara',
    ownerName: 'I Wayan Sudarma',
    businessName: 'Kerajinan Mutiara Air Laut Sekarbela',
    brandName: 'Sekarbela Pearl Jewelry',
    phone: '081803124567',
    email: 'wayan.mutiara@gmail.com',
    nik: '5271011203870003',
    address: 'Jl. Sultan Kaharuddin, Sekarbela',
    region: 'Kota Mataram',
    district: 'Sekarbela',
    sector: 'Kriya & Tenun Tradisional (Songket Sasak)',
    monthlyRevenueRange: '15 - 50 Juta',
    employeeCount: 6,
    establishedYear: 2019,
    mentorshipType: 'hibrid',
    umkmClass: 'berkembang',
    xp: 510,
    streakDays: 6,
    lastActiveDate: '2026-10-20',
    assessment: {
      hasNib: true,
      nibNumber: '1290001827461',
      hasHalal: false,
      hasPirtOrBpom: false,
      hasHaki: true,
      hakiMerk: 'IDM000472819 - Sekarbela Pearl',
      hasNpwp: true,
      hasLabTest: false,
      hasFacebookPro: true,
      hasInstagram: true,
      hasWhatsAppBusiness: true,
      hasGoogleMaps: true,
      hasMarketplace: true,
      hasSeparateBankAcc: true,
      hasDigitalBookkeeping: true,
      hasQris: true,
      qrisMerchantName: 'Sekarbela Pearl Jewelry',
      hasFinancialReport: true,
      hasStandardPackaging: true,
      hasBarcodeOrExpiredDate: false,
      hasHygieneCertificate: false,
      lastAssessedAt: '2026-10-18'
    },
    legalitasTracker: {
      nib: {
        id: 'nib',
        label: 'NIB (Nomor Induk Berusaha)',
        shortDesc: 'Izin berusaha resmi dari BKPM/Kementerian Investasi melalui OSS RBA.',
        status: 'terbit',
        documentNumber: '1290001827461',
        targetDinas: 'DPMPTSP Kota Mataram',
        officialPortalUrl: 'https://oss.go.id',
        officialPortalName: 'Portal OSS RBA'
      },
      halal: {
        id: 'halal',
        label: 'Sertifikat Halal Resmi (BPJPH)',
        shortDesc: 'Produk perhiasan non-pangan.',
        status: 'terbit',
        documentNumber: 'TIDAK_WAJIB_PERHIASAN',
        targetDinas: 'Dinas Perdagangan Mataram',
        officialPortalUrl: 'https://ptsp.halal.go.id',
        officialPortalName: 'Portal SIHALAL'
      },
      pirt_bpom: {
        id: 'pirt_bpom',
        label: 'P-IRT / Izin Edar BPOM',
        shortDesc: 'Kategori non-pangan.',
        status: 'terbit',
        documentNumber: 'TIDAK_WAJIB',
        targetDinas: 'Dinas Kesehatan Mataram',
        officialPortalUrl: 'https://sppirt.pom.go.id',
        officialPortalName: 'Sistem SPP-IRT BPOM'
      },
      npwp: {
        id: 'npwp',
        label: 'NPWP Usaha / Pemilik',
        shortDesc: 'NPWP Perorangan pengusaha.',
        status: 'terbit',
        documentNumber: '72.109.481.2-911.000',
        targetDinas: 'KPP Pratama Mataram Barat',
        officialPortalUrl: 'https://pajak.go.id',
        officialPortalName: 'Portal DJP Online'
      },
      hki_merek: {
        id: 'hki_merek',
        label: 'Sertifikat Merek (HKI Kemenkumham)',
        shortDesc: 'Merek dagang terdaftar.',
        status: 'terbit',
        documentNumber: 'IDM000472819',
        targetDinas: 'Kanwil Kemenkumham NTB',
        officialPortalUrl: 'https://merek.dgip.go.id',
        officialPortalName: 'DJKI Kemenkumham'
      }
    },
    submissions: {},
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    facilitations: ['Pameran Dekranasda NTB', 'QRIS Merchant Bank NTB Syariah'],
    missingDataNotes: []
  }
];

export const OFFICIAL_PENDAMPING_LIST: PendampingProfile[] = [
  {
    id: 'pend-1',
    nip: '19890412 201503 1 004',
    username: 'fathur_lotim',
    name: 'Fathurrahman, S.E.',
    title: 'Koordinator Wilayah Pendamping Lombok Timur',
    phone: '081912345671',
    email: 'fathur.pendamping@langkah.id',
    assignedRegion: 'Kabupaten Lombok Timur',
    districtCoverage: 'Selong, Aikmel, Masbagik, Pringgasela',
    specialization: 'Legalitas NIB OSS, Sertifikasi Halal BPJPH & Inkubasi',
    agency: 'Dinas Koperasi & UKM Lotim / Mitra BI NTB',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 9420,
    verifiedCount: 148,
    badgeCode: 'LOTIM-01'
  },
  {
    id: 'pend-2',
    nip: '19910815 201801 2 007',
    username: 'safitri_sembalun',
    name: 'Baiq Safitri Wardani, M.M.',
    title: 'Tenaga Pendamping Wilayah Rinjani & Agro',
    phone: '081912345672',
    email: 'safitri.wardani@langkah.id',
    assignedRegion: 'Kabupaten Lombok Timur',
    districtCoverage: 'Sembalun, Pringgabaya, Sambelia, Suela',
    specialization: 'Hilirisasi Kopi Rinjani, Agribisnis & Kurasi Bank Indonesia',
    agency: 'Bank Indonesia NTB / Dinas Pertanian Lotim',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 8850,
    verifiedCount: 122,
    badgeCode: 'LOTIM-02'
  },
  {
    id: 'pend-3',
    nip: '19930220 201902 1 003',
    username: 'danuarta_pesisir',
    name: 'Lalu Danuarta, S.Kom.',
    title: 'Tenaga Pendamping Pesisir & Digital Marketing',
    phone: '081912345673',
    email: 'danuarta@langkah.id',
    assignedRegion: 'Kabupaten Lombok Timur',
    districtCoverage: 'Keruak, Jerowaru, Labuhan Haji, Sakra',
    specialization: 'Olahan Perikanan Laut & Optimasi Meta Ads/Facebook Pro',
    agency: 'Dinas Kelautan & Perikanan / Dinas Koperasi Lotim',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 9110,
    verifiedCount: 97,
    badgeCode: 'LOTIM-03'
  },
  {
    id: 'pend-4',
    nip: '19940710 202001 2 005',
    username: 'nurhaliza_loteng',
    name: 'Siti Nurhaliza, S.E.',
    title: 'Tenaga Pendamping Wilayah Lombok Tengah & Mandalika',
    phone: '081912345674',
    email: 'nurhaliza.loteng@langkah.id',
    assignedRegion: 'Kabupaten Lombok Tengah',
    districtCoverage: 'Praya, Pujut (KEK Mandalika), Jonggat, Kopang',
    specialization: 'Pencatatan Keuangan Digital, QRIS Merchant & Event Wisata',
    agency: 'Dinas Koperasi & UKM Lombok Tengah / BI NTB',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 14200,
    verifiedCount: 165,
    badgeCode: 'LOTENG-01'
  },
  {
    id: 'pend-5',
    nip: '19901103 201603 1 002',
    username: 'irwan_lobar',
    name: 'Raden Irwan Saputra, S.T.',
    title: 'Tenaga Pendamping Wilayah Lombok Barat',
    phone: '081912345675',
    email: 'irwan.lobar@langkah.id',
    assignedRegion: 'Kabupaten Lombok Barat',
    districtCoverage: 'Gerung, Narmada, Gunungsari, Sekotong, Kediri',
    specialization: 'Standardisasi IKM, Rumah Kemasan & Uji Laboratorium Mutu',
    agency: 'Dinas Perindustrian NTB (UPTD Rumah Kemasan)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 12400,
    verifiedCount: 139,
    badgeCode: 'LOBAR-01'
  },
  {
    id: 'pend-6',
    nip: '19920518 201704 2 006',
    username: 'sriasih_mataram',
    name: 'Ni Wayan Sri Asih, S.Pd.',
    title: 'Tenaga Pendamping Wilayah Kota Mataram',
    phone: '081912345676',
    email: 'sriasih.mataram@langkah.id',
    assignedRegion: 'Kota Mataram',
    districtCoverage: 'Cakranegara, Ampenan, Sekarbela, Mataram Kota',
    specialization: 'Kriya Mutiara, Songket Fashion & HKI Hak Merek Dagang',
    agency: 'Dinas Perdagangan & Dekranasda Kota Mataram',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 11600,
    verifiedCount: 204,
    badgeCode: 'MTRM-01'
  },
  {
    id: 'pend-7',
    nip: '19950129 202102 1 001',
    username: 'hidayat_klu',
    name: 'M. Hidayatullah, S.P.',
    title: 'Tenaga Pendamping Wilayah Lombok Utara (KLU)',
    phone: '081912345677',
    email: 'hidayat.klu@langkah.id',
    assignedRegion: 'Kabupaten Lombok Utara',
    districtCoverage: 'Tanjung, Bayan, Kayangan, Pemenang (3 Gili)',
    specialization: 'P-IRT Dinkes, Hasil Olahan Mete & Pangan Wisatawan',
    agency: 'Dinas Kesehatan & Dinas Pariwisata KLU',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 8200,
    verifiedCount: 88,
    badgeCode: 'KLU-01'
  },
  {
    id: 'pend-8',
    nip: '19880922 201402 2 003',
    username: 'rahmatia_keuangan',
    name: 'Baiq Rahmatia, S.Sos.',
    title: 'Tenaga Pendamping Akses Permodalan & KUR',
    phone: '081912345678',
    email: 'rahmatia@langkah.id',
    assignedRegion: 'Kabupaten Lombok Timur',
    districtCoverage: 'Sikur, Terara, Montong Gading, Sakra Barat',
    specialization: 'Subsidi Bunga KUR, Fasilitasi Perbankan & Koperasi Mandiri',
    agency: 'Dinas Koperasi & UKM Prov NTB / Bank NTB Syariah',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    totalDampingan: 10720,
    verifiedCount: 115,
    badgeCode: 'LOTIM-04'
  }
];

export const INITIAL_ADMIN_DINAS: AdminDinasProfile = {
  id: 'admin-dinas-prov',
  nip: '19750314 199903 1 002',
  username: 'admin.dinas.ntb',
  name: 'Ir. H. Syamsul Hadi, M.Si.',
  agency: 'Dinas Koperasi & UKM Provinsi NTB',
  position: 'Kepala Bidang Pemberdayaan UMKM & Koordinator Pokja Asta Cita NTB',
  phone: '08113901234',
  email: 'syamsul.hadi@ntbprov.go.id',
  avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
};
