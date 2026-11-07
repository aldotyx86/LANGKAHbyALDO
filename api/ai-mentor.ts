import { GoogleGenAI } from '@google/genai';

const PREDEFINED_LOMBOK_QA: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['halal', 'sehati', 'bpjph', 'sertifikat halal', 'kemenag'],
    answer: `### 📌 Panduan Resmi Sertifikasi Halal Gratis (SEHATI) di NTB:
1. **Syarat Utama**:
   - Sudah memiliki **NIB (Nomor Induk Berusaha)** aktif dari OSS.
   - Produk kategori makanan/minuman non-daging dengan bahan baku yang dipastikan kehalalannya (Self Declare).
   - Memiliki foto proses produksi bersih di dapur/workshop usaha.
2. **Langkah Pendaftaran**:
   - Buka portal resmi: **ptsp.halal.go.id**.
   - Buat akun Pelaku Usaha dan pilih program **SEHATI (Gratis Rp 0)**.
   - Pilih Lembaga Pendamping PPH lokal di Lombok (LP3H UIN Mataram, LP3H PWNU NTB, atau Halal Center UNRAM).
   - Masukkan daftar bahan baku dan submit permohonan untuk diverifikasi pendamping.
3. **Tips Pendamping**:
   - Tidak ada pungutan biaya sepeser pun. Surat Tanda Terima Dokumen (STTD) akan terbit sebagai bukti sementara.`
  },
  {
    keywords: ['nib', 'oss', 'oss rba', 'izin berusaha', 'bkpm'],
    answer: `### 📌 Panduan Menerbitkan NIB Gratis via OSS RBA:
1. **Syarat Berkas**:
   - NIK e-KTP Pemilik Usaha yang valid di Dukcapil.
   - Nomor WhatsApp dan Email aktif untuk menerima kode OTP.
   - Perkiraan modal usaha (di luar tanah & bangunan) serta alamat lokasi usaha di Lombok.
2. **Langkah Pembuatan**:
   - Akses portal resmi negara: **oss.go.id**.
   - Klik **Daftar** &rarr; Pilih kategori **Usaha Mikro & Kecil (UMK)** &rarr; **Orang Perseorangan**.
   - Masukkan NIK dan verifikasi kode OTP yang masuk ke WhatsApp.
   - Masukkan Klasifikasi Baku Lapangan Usaha (KBLI) sesuai produk (misal: 10799 untuk keripik/sambal, 13121 untuk tenun).
   - Klik **Proses Perizinan Berusaha** dan unduh file PDF NIB 13 digit. Berlaku seumur hidup!`
  },
  {
    keywords: ['pirt', 'spp-irt', 'bpom', 'izin edar', 'dinkes'],
    answer: `### 📌 Panduan Izin Edar P-IRT / SPP-IRT Dinas Kesehatan Lombok:
1. **Syarat Dokumen**:
   - NIB OSS yang sudah terbit.
   - Rancangan label kemasan yang memuat: Nama produk, komposisi, berat bersih/netto, tanggal kadaluarsa, serta nama produsen.
   - Mengikuti Penyuluhan Keamanan Pangan (PKP) atau lolos modul online POM.
2. **Alur Pengajuan**:
   - Masuk ke akun OSS Anda &rarr; Pilih menu **Perizinan Berusaha untuk Menunjang Kegiatan Usaha (UMKU)**.
   - Pilih menu **SPP-IRT** (sppirt.pom.go.id yang terintegrasi di OSS).
   - Isi deskripsi pangan olahan, masa simpan, dan unggah rancangan label.
   - Nomor registrasi P-IRT 15 digit akan diterbitkan untuk dicetak pada kemasan.`
  },
  {
    keywords: ['qris', 'bank ntb', 'nontunai', 'bi ntb', 'pembayaran'],
    answer: `### 📌 Panduan Aktivasi QRIS Merchant Bank Indonesia NTB:
1. **Keuntungan**:
   - Pembeli bisa bayar dari semua aplikasi (GoPay, OVO, Dana, ShopeePay, BCA, BRI, Bank NTB Syariah).
   - Uang langsung masuk ke rekening usaha, aman dari uang palsu, dan riwayat transaksi tercatat rapi untuk bukti kelayakan kredit modal usaha (KUR).
2. **Cara Mendaftar**:
   - **Lewat Bank NTB Syariah**: Ajukan formulir Merchant QRIS di kantor cabang terdekat atau m-banking dengan melampirkan KTP & NIB.
   - **Lewat BRI / BCA / Dana Bisnis**: Bisa daftar online langsung dari aplikasi m-banking dengan verifikasi foto tempat usaha.
   - Cetak barcode QRIS dan tempel di kasir toko atau meja pameran.`
  },
  {
    keywords: ['kemasan', 'rumah kemasan', 'desain', 'standing pouch', 'bungkus'],
    answer: `### 📌 Panduan Standardisasi Kemasan Ritel (UPTD Rumah Kemasan NTB):
1. **Standar Ritel Modern & Oleh-Oleh**:
   - Ganti plastik polos ikat karet/steples dengan bahan **Standing Pouch Zipper Alufoil** atau kemasan sablon kedap udara.
   - Wajib mencantumkan: Merk dagang, netto, nomor P-IRT / Halal, tanggal kadaluarsa (*Best Before*), dan komposisi bahan.
2. **Fasilitasi Pemerintah NTB**:
   - Dinas Perindustrian Provinsi NTB memiliki **UPTD Rumah Kemasan** (Jl. Majapahit Mataram) untuk konsultasi desain dan cetak kemasan IKM dengan harga bersubsidi.`
  },
  {
    keywords: ['hki', 'merek', 'kemenkumham', 'hak cipta', 'paten'],
    answer: `### 📌 Panduan Pendaftaran Merek (HKI Kemenkumham NTB):
1. **Kenapa Wajib?**
   - Agar nama merk usaha Anda memiliki hak paten hukum selama 10 tahun dan tidak bisa dijiplak kompetitor lain.
2. **Diskon Khusus UMK (Dari Rp 1,8 Juta menjadi Rp 500.000)**:
   - Minta **Surat Keterangan Rekomendasi UMK Binaan** di Dinas Koperasi & UKM / Dinas Perindustrian kabupaten setempat.
   - Buka portal **merek.dgip.go.id**, buat akun pemohon UMK dan unggah surat rekomendasi serta etiket logo merek.`
  }
];

function findPredefinedAnswer(prompt: string): string | null {
  const lower = prompt.toLowerCase();
  for (const item of PREDEFINED_LOMBOK_QA) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.answer;
    }
  }
  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, context } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Pertanyaan atau prompt wajib diisi.',
      });
    }

    // 1. Cek knowledge base
    const predefinedAnswer = findPredefinedAnswer(prompt);
    if (predefinedAnswer) {
      return res.status(200).json({
        success: true,
        answer: predefinedAnswer,
        source: 'knowledge_base',
      });
    }

    // 2. Jika API key tersedia, panggil Gemini 2.5 Flash
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== 'your-gemini-api-key-here') {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const systemInstruction = `
Anda adalah "Langkah Mentor AI" — Konsultan Ahli Legalitas & Akselerasi Bisnis IKM/UMKM untuk Pulau Lombok (Kota Mataram, Lombok Barat, Lombok Tengah, Lombok Timur, dan Lombok Utara).
Tugas Anda mendampingi hingga 75.000 pelaku UMKM di Lombok agar usahanya tertib legalitas dan naik kelas.
Karakter: Ramah, menggunakan bahasa Indonesia sederhana yang bersahabat bagi warga pedesaan di Lombok, langsung to-the-point, dan memberikan langkah konkret.
Informasi penting NTB:
- NIB: Gratis di oss.go.id tanpa pungli/calo.
- Sertifikat Halal: Program SEHATI gratis di ptsp.halal.go.id (BPJPH Kemenag).
- P-IRT: SPP-IRT Dinkes setempat di Lombok.
- Kemasan: Rekomendasikan Rumah Kemasan Dinas Perindustrian NTB.
- Transaksi: QRIS Bank Indonesia NTB & Bank NTB Syariah.
${context ? `Konteks Profil UMKM saat ini: ${JSON.stringify(context)}` : ''}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.status(200).json({
            success: true,
            answer: response.text,
            source: 'gemini_live',
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini live call error, using smart fallback:', geminiError?.message);
      }
    }

    // 3. Smart Fallback
    return res.status(200).json({
      success: true,
      answer: `### 📌 Panduan Praktis Legalitas Usaha Lombok:\n\n` +
        `Terima kasih atas pertanyaan Anda mengenai **"${prompt.slice(0, 45)}..."**.\n\n` +
        `Secara umum untuk mempercepat usaha Anda naik kelas di Lombok:\n` +
        `1. **NIB (Nomor Induk Berusaha)**: Dapatkan nomor induk 13 digit gratis di **oss.go.id** (pilih UMK Perseorangan).\n` +
        `2. **Sertifikasi Halal Gratis (SEHATI)**: Daftarkan produk makanan/minuman Anda di **ptsp.halal.go.id** bersama Satgas Halal NTB.\n` +
        `3. **P-IRT Rekomendasi Dinkes**: Ajukan di menu SPP-IRT sistem OSS untuk legalitas masuk minimarket.\n` +
        `4. **QRIS Merchant**: Aktifkan di Bank NTB Syariah atau BRI agar transaksi tercatat rapi.\n\n` +
        `💡 *Tips Pendamping: Anda juga bisa berkonsultasi langsung ke Klinik Bisnis Dinas Koperasi/Perindustrian setempat di Lombok.*`,
      source: 'smart_fallback',
    });
  } catch (error: any) {
    console.error('Error pada /api/ai-mentor:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan pada server saat menghubungi asisten AI.',
    });
  }
}
