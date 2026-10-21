import { GoogleGenAI } from '@google/genai';

/**
 * Next.js App Router Handler: /api/ai-mentor
 * Menggunakan Web Standards (Request, Response) yang kompatibel 100% dengan
 * Next.js 13/14/15/App Router di Vercel Serverless Functions.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, context } = body;

    if (!prompt) {
      return Response.json({ success: false, error: 'Prompt wajib diisi.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({
        success: true,
        answer: 'Kunci API Gemini belum dikonfigurasi di server. Silakan tambahkan GEMINI_API_KEY pada Environment Variables Vercel.',
        remainingQuota: 15,
      });
    }

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
Bantu 75.000 UMKM memahami NIB (OSS RBA), Sertifikasi Halal Sehati BPJPH, P-IRT Dinkes, Standarisasi Kemasan Rumah Kemasan NTB, dan QRIS Bank Indonesia NTB.
${context ? `Konteks Profil UMKM: ${JSON.stringify(context)}` : ''}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return Response.json({
      success: true,
      answer: response.text || 'Gagal menghasilkan jawaban.',
      remainingQuota: 14,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error?.message || 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
