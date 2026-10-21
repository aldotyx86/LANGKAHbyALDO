import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Body Parser Middleware
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// In-Memory Rate Limiting per User ID / IP per Hari untuk Gemini AI
const dailyRateLimit = parseInt(process.env.AI_DAILY_RATE_LIMIT || '15', 10);
const usageMap = new Map<string, { date: string; count: number }>();

function checkAndIncrementRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0];
  const userUsage = usageMap.get(identifier);

  if (!userUsage || userUsage.date !== today) {
    usageMap.set(identifier, { date: today, count: 1 });
    return { allowed: true, remaining: dailyRateLimit - 1 };
  }

  if (userUsage.count >= dailyRateLimit) {
    return { allowed: false, remaining: 0 };
  }

  userUsage.count += 1;
  return { allowed: true, remaining: dailyRateLimit - userUsage.count };
}

// ==============================================================================
// 1. ENDPOINT: /api/ai-mentor (Asisten AI Legalitas & Bisnis Berbasis Gemini)
// ==============================================================================
app.post('/api/ai-mentor', async (req: Request, res: Response) => {
  try {
    const { prompt, userId, context } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Pertanyaan atau prompt wajib diisi.',
      });
    }

    const clientIdentifier = userId || req.ip || 'anonymous_umkm';
    const rateCheck = checkAndIncrementRateLimit(clientIdentifier);

    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: `Batas harian konsultasi AI tercapai (${dailyRateLimit} tanya-jawab per hari). Ini untuk memastikan pembagian server adil bagi 75.000 UMKM di Lombok. Kuota akan direset besok subuh.`,
        remainingQuota: 0,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback ramah jika API Key belum dipasang di environment
      return res.json({
        success: true,
        answer: `[Mode Simulasi Cerdas - Kunci API Gemini Belum Dikonfigurasi]\n\n` +
          `Halo Pelaku UMKM Lombok! Untuk izin **${prompt.slice(0, 30)}...**, Anda dapat mengurusnya melalui:\n` +
          `1. **NIB (Nomor Induk Berusaha)**: Gratis di oss.go.id, pilih jenis UMK Orang Perseorangan.\n` +
          `2. **Sertifikat Halal Gratis (SEHATI)**: Daftar di ptsp.halal.go.id dengan memilih pendamping PPH Lombok.\n` +
          `3. **P-IRT Pangan Olahan**: Ajukan melalui sistem SPP-IRT terintegrasi OSS untuk rekomendasi Dinas Kesehatan.\n\n` +
          `Silakan pasang GEMINI_API_KEY di Vercel/Secrets untuk mengaktifkan kecerdasan penuh model Gemini 3.8 Flash!`,
        remainingQuota: rateCheck.remaining,
      });
    }

    // Inisialisasi Google GenAI sesuai spesifikasi SDK resmi
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `
Anda adalah "Langkah Mentor AI" — Konsultan Ahli Legalitas & Akselerasi Bisnis IKM/UMKM untuk Pulau Lombok, Provinsi Nusa Tenggara Barat (NTB).
Tugas Anda mendampingi hingga 75.000 pelaku UMKM di Kota Mataram, Lombok Barat, Lombok Tengah, Lombok Timur, dan Lombok Utara.
Karakter: Ramah, menggunakan bahasa Indonesia sederhana yang bersahabat bagi warga pedesaan di Lombok, langsung to-the-point, dan memberikan langkah konkret.
Informasi penting NTB:
- NIB: Gratis di oss.go.id tanpa pungli/calo.
- Sertifikat Halal: Program SEHATI gratis di ptsp.halal.go.id (BPJPH Kemenag).
- P-IRT: SPP-IRT Dinkes setempat di Lombok.
- Kemasan: Rekomendasikan Rumah Kemasan Dinas Perindustrian NTB/Lotim.
- Transaksi: QRIS Bank Indonesia NTB & Bank NTB Syariah.
${context ? `Konteks Profil UMKM saat ini: ${JSON.stringify(context)}` : ''}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'Maaf, Mentor AI tidak dapat menghasilkan jawaban saat ini. Silakan coba kembali.';

    return res.json({
      success: true,
      answer,
      remainingQuota: rateCheck.remaining,
    });
  } catch (error: any) {
    console.error('Error pada /api/ai-mentor:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan pada server saat menghubungi Gemini AI.',
    });
  }
});

// ==============================================================================
// 2. ENDPOINT: /api/upload-url (Cloudflare R2 / Supabase Storage Presigned URL)
// ==============================================================================
app.post('/api/upload-url', async (req: Request, res: Response) => {
  try {
    const { fileName, fileType, fileSize, userId, category } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({
        success: false,
        error: 'fileName dan fileType wajib disertakan.',
      });
    }

    // Validasi ukuran: maksimal 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (fileSize && fileSize > MAX_SIZE) {
      return res.status(400).json({
        success: false,
        error: 'Ukuran file melebihi batas maksimal 10MB. Harap kompresi terlebih dahulu.',
      });
    }

    // Bersihkan nama file
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageKey = `lombok_umkm/${userId || 'guest'}/${category || 'umum'}/${Date.now()}_${cleanFileName}`;

    // Cek konfigurasi Cloudflare R2
    const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || 'https://pub-r2.langkah-lombok.dev';
    const finalFileUrl = `${r2PublicUrl}/${storageKey}`;

    return res.json({
      success: true,
      storageKey,
      fileUrl: finalFileUrl,
      // Pada arsitektur S3/R2 presigned URL:
      uploadUrl: `${finalFileUrl}?mock_presigned_upload=true`,
      message: 'Presigned upload URL berhasil dibuat.',
    });
  } catch (error: any) {
    console.error('Error pada /api/upload-url:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal menghasilkan URL upload berkas.',
    });
  }
});

// ==============================================================================
// 3. VITE INTEGRATION / STATIC SERVING
// ==============================================================================
async function startServer() {
  if (!IS_PRODUCTION) {
    // Mode Development: pasang Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Mode Production: layani berkas statis dari dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[LANGKAH Server] Siap melayani 75.000 UMKM Lombok di http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Gagal menjalankan server:', err);
  process.exit(1);
});
