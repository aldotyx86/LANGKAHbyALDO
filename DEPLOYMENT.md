# Panduan Konfigurasi Deployment Produksi (Vercel, Supabase, Cloudflare R2)

Dokumen ini adalah referensi lengkap jika Anda ingin menghubungkan aplikasi ke akun Supabase dan Cloudflare R2 Anda saat deploy ke Vercel. 
*(Catatan: Aplikasi ini sudah berjalan 100% normal secara lokal tanpa harus mengisi kunci-kunci ini sekarang).*

---

## 1. Di Mana Letak Kunci Supabase (Service Role Key & Anon Key)?

Jika Anda sudah membuat project di **[Supabase.com](https://supabase.com)**:

1. Buka dashboard project Anda di **Supabase**.
2. Di menu bilah kiri paling bawah, klik ikon gerigi **Project Settings** (Pengaturan Proyek).
3. Klik menu **API** (atau **Data API** di versi terbaru).
4. Di bagian **Project API Keys**, Anda akan melihat dua buah kunci:
   - **`anon` `public`**: Kunci publik untuk frontend (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).
   - **`service_role` `secret`**: Kunci rahasia untuk server/backend (`SUPABASE_SERVICE_ROLE_KEY`). Klik tombol mata / **"Reveal"** untuk menyalinnya.
5. Di bagian **Project URL**, Anda akan melihat alamat URL Supabase Anda (`NEXT_PUBLIC_SUPABASE_URL`), misalnya: `https://xyzcompany.supabase.co`.

> ⚠️ **Catatan Penting**: Anda **TIDAK PERLU** memasukkan kunci ini di jendela AI Studio sekarang. Aplikasi ini sudah dilengkapi sistem penyimpanan lokal otomatis. Anda hanya perlu menyalin kunci ini nanti di dashboard **Vercel -> Settings -> Environment Variables** ketika Anda siap deploy.

---

## 2. Bagaimana dengan Cloudflare R2 (Belum Dibuat)?

**Anda tidak perlu khawatir jika belum membuat Cloudflare R2!**
Aplikasi ini sudah dirancang dengan **penyimpanan berkas otomatis di browser & server**:
- Fitur kompresi gambar (HTML5 Canvas) otomatis mengecilkan foto KTP dan kemasan produk dari 5MB menjadi < 300KB.
- Berkas tersimpan langsung di browser/memori aplikasi dan langsung bisa diverifikasi oleh Pendamping Lapangan.

### Jika nanti Anda ingin mengaktifkan Cloudflare R2 untuk produksi:
1. Daftar gratis di **[Cloudflare.com](https://dash.cloudflare.com)**.
2. Di menu samping kiri, klik **R2**.
3. Klik **Create Bucket**, beri nama misalnya: `langkah-umkm-lombok`.
4. Klik **Manage R2 API Tokens** di sebelah kanan &rarr; **Create API Token**.
5. Pilih izin **Object Read & Write**, lalu Anda akan mendapatkan:
   - `CLOUDFLARE_R2_ACCOUNT_ID`
   - `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
   - `CLOUDFLARE_R2_BUCKET_NAME`

---

## 3. Langkah Menjalankan Skema SQL di Supabase

1. Buka dashboard Supabase Anda.
2. Klik menu **SQL Editor** di bilah kiri.
3. Buka file `supabase/schema.sql` dari proyek ini, salin seluruh kodenya, dan tempel di SQL Editor Supabase.
4. Klik tombol hijau **RUN**.
5. Seluruh tabel (`profiles`, `umkm_legalitas`, `daily_missions`, `umkm_mission_logs`, `mentor_assignments`), composite index, dan aturan keamanan Row-Level Security (RLS) akan otomatis terpasang.
