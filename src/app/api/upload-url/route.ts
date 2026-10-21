/**
 * Next.js App Router Handler: /api/upload-url
 * Menghasilkan Presigned URL untuk Cloudflare R2 / Supabase Storage
 * Menggunakan Web Standards (Request, Response) yang kompatibel 100% dengan Next.js / Vercel.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, fileType, fileSize, userId, category } = body;

    if (!fileName || !fileType) {
      return Response.json({ success: false, error: 'fileName dan fileType wajib diisi.' }, { status: 400 });
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (fileSize && fileSize > MAX_SIZE) {
      return Response.json({ success: false, error: 'File melebihi 10MB.' }, { status: 400 });
    }

    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageKey = `lombok_umkm/${userId || 'guest'}/${category || 'legalitas'}/${Date.now()}_${cleanFileName}`;
    const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || 'https://pub-r2.langkah-lombok.dev';
    const finalFileUrl = `${r2PublicUrl}/${storageKey}`;

    return Response.json({
      success: true,
      storageKey,
      fileUrl: finalFileUrl,
      uploadUrl: `${finalFileUrl}?presigned=true`,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error?.message || 'Gagal memproses upload URL.' },
      { status: 500 }
    );
  }
}
