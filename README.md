# 🏝️ LANGKAH: Layanan Pengembangan Kapasitas Harian IKM/UMKM Lombok

Platform pendampingan digital berbasis micro-learning dan gamifikasi interaktif untuk mengakselerasi legalitas, standardisasi, dan kenaikan kelas **75.000 pelaku IKM/UMKM** di 5 Kabupaten/Kota se-Pulau Lombok (Kota Mataram, Lombok Barat, Lombok Tengah, Lombok Timur, dan Lombok Utara).

Repository: [https://github.com/aldotyx86/LANGKAHbyALDO](https://github.com/aldotyx86/LANGKAHbyALDO)

---

## 🚀 Fitur Unggulan

1. **Dashboard Pelaku UMKM (Gamified Learning)**
   - **Progress Level UMKM**: Dari *UMKM Pemula* (Koleksi Dasar), *UMKM Berkembang* (Pasar Digital & Halal), hingga *UMKM Siap Ekspor / Naik Kelas*.
   - **13 Misi Harian Bertahap**: Tugas terstruktur mulai dari persiapan KTP, NIB via OSS RBA, Sertifikasi Halal, PIRT / BPOM, hingga Branding & Ekspor.
   - **Interactive Legalitas Tracker**: Pantau 5 pilar perizinan (NIB, Halal MUI/BPJPH, PIRT/BPOM, NPWP Usaha, HKI Merek).
   - **Asisten Konsultasi Bisnis & Regulasi**: Kurasi tanya jawab izin usaha khas NTB, permodalan KUR, dan kemasan siap ritel modern.

2. **Dashboard Tenaga Pendamping Lapangan (8 Petugas Resmi)**
   - Filter UMKM per wilayah binaan (Mataram, Lobar, Loteng, Lotim, KLU).
   - Antrean verifikasi bukti misi & berkas persyaratan secara real-time.
   - Kirim catatan bimbingan atau persetujuan instan beserta stempel nama & NIP pendamping.

3. **Dashboard Monitoring Admin Dinas Perindustrian & Koperasi**
   - Agregasi statistik 75.000 UMKM di 5 kabupaten/kota.
   - Peta sebaran kepatuhan legalitas (persentase NIB, Halal, PIRT).
   - Ekspor laporan rekapitulasi untuk pembinaan dinas.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons.
- **Backend & Database**: Supabase (PostgreSQL 15+, Multi-Role Row Level Security, Composite Indexes untuk 75.000 baris).
- **AI Intelligence**: Google Gemini API (@google/genai) via server-side routing dengan rate limit per akun.
- **Hosting Target**: GitHub -> Vercel (Auto Deploy on push).

---

## 🗄️ Panduan Setup Supabase (PostgreSQL)

Jalankan script SQL yang telah disediakan pada **SQL Editor** di Dashboard Supabase project Anda (`https://supabase.com/dashboard/project/mtrochonrdilgpgstptt`):

1. **Jalankan Skema Database**:
   Buka file `supabase/schema.sql`, salin seluruh isinya, lalu jalankan di SQL Editor.
   *Membuat tabel: `profiles`, `umkm_legalitas`, `daily_missions`, `umkm_mission_logs`, `mentor_assignments`, enum role, composite index, dan aturan RLS.*

2. **Jalankan Data Awal (Seed Misi Kurikulum)**:
   Buka file `supabase/seed.sql`, salin seluruh isinya, lalu jalankan di SQL Editor.
   *Memuat 13 kurikulum misi harian lengkap beserta syarat dokumen dan tips pendamping.*

---

## 🌐 Panduan Deploy ke Vercel

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** -> **"Project"**.
3. Pilih repository: `aldotyx86/LANGKAHbyALDO`.
4. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`: `https://mtrochonrdilgpgstptt.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: *(Salin Anon Public Key dari Project Settings -> API di Supabase)*
   - `GEMINI_API_KEY`: *(API Key Google Gemini Anda)*
5. Klik **"Deploy"**. Selesai! Aplikasi langsung aktif dengan domain HTTPS gratis dari Vercel.

---

## 👥 Tim Pendamping Lapangan Resmi Lombok

| No | Nama Pendamping | NIP | Wilayah Penugasan | Spesialisasi |
|:--:|:----------------|:---|:------------------|:-------------|
| 1 | **Fathurrahman, S.E.** | 19890412 201503 1 004 | Lombok Timur | Legalitas NIB & Ekspor |
| 2 | **Baiq Nurul Hidayati, S.Pt.** | 19910825 201902 2 008 | Kota Mataram | PIRT, BPOM & Olahan Pangan |
| 3 | **Lalu Ahmad Zaini, S.Kom.** | 19880214 201404 1 002 | Lombok Barat | Pemasaran Digital & E-Commerce |
| 4 | **Siti Maryam, S.E., M.M.** | 19851103 201001 2 015 | Lombok Tengah | Sertifikasi Halal BPJPH |
| 5 | **I Made Sudarsana, S.H.** | 19900618 201603 1 006 | Kota Mataram | HKI, Merek Dagang & Legalitas |
| 6 | **Dra. Nurhasanah** | 19780512 200501 2 009 | Lombok Utara | Koperasi & Manajemen Finansial |
| 7 | **H. Syamsul Hadi, S.P.** | 19820719 200804 1 003 | Lombok Tengah | Sertifikasi Organik & Pertanian |
| 8 | **Ni Wayan Eka Putri, S.Ds.** | 19931201 202012 2 011 | Lombok Barat | Desain Kemasan & Branding Ritel |

---

## 🔒 Lisensi & Hak Cipta
Dikembangkan untuk Gerakan Peningkatan Kapasitas & Legalitas Usaha IKM/UMKM Pulau Lombok, Nusa Tenggara Barat.
