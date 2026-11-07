export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { fileName, fileType, fileSize, userId, category } = req.body || {};

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: 'fileName wajib disertakan.',
      });
    }

    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageKey = `lombok_umkm/${userId || 'guest'}/${category || 'umum'}/${Date.now()}_${cleanFileName}`;

    return res.status(200).json({
      success: true,
      storageKey,
      fileUrl: `https://storage.langkah-lombok.local/${storageKey}`,
      uploadUrl: `/api/mock-upload/${storageKey}`,
      message: 'Upload URL siap digunakan. Penyimpanan berkas berjalan otomatis tanpa perlu konfigurasi R2!',
    });
  } catch (error: any) {
    console.error('Error pada /api/upload-url:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal menghasilkan URL upload berkas.',
    });
  }
}
