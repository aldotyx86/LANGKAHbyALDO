-- ==============================================================================
-- LANGKAH: Layanan Pengembangan Kapasitas Harian IKM/UMKM Lombok
-- Database Schema untuk Supabase (PostgreSQL 15+)
-- Skala: 75.000 UMKM di 5 Wilayah Pulau Lombok (Mataram, Lobar, Loteng, Lotim, KLU)
-- Fitur: Multi-Role RLS, Hierarki Pendamping Wilayah, Composite Index, Cacheable Curriculum
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
  CREATE TYPE user_role_enum AS ENUM ('umkm', 'pendamping', 'admin_dinas');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE umkm_level_enum AS ENUM ('pemula', 'berkembang', 'naik_kelas');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE mentorship_type_enum AS ENUM ('otodidak', 'hibrid', 'intensif');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE legalitas_status_enum AS ENUM ('belum_ada', 'sedang_diproses', 'terbit');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE mission_status_enum AS ENUM ('belum_dikerjakan', 'sedang_ditinjau', 'disetujui', 'perlu_revisi');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. TABEL: PROFILES
-- Menyimpan data profil pengguna: Pelaku UMKM, Pendamping Lapangan (8 Petugas), & Admin Dinas
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role_enum NOT NULL DEFAULT 'umkm',
  nama_lengkap TEXT NOT NULL,
  nomor_wa TEXT NOT NULL,
  nama_usaha TEXT,
  nama_merek TEXT,
  nik CHAR(16),
  kabupaten_kota TEXT NOT NULL CHECK (kabupaten_kota IN (
    'Kota Mataram',
    'Kabupaten Lombok Barat',
    'Kabupaten Lombok Tengah',
    'Kabupaten Lombok Timur',
    'Kabupaten Lombok Utara'
  )),
  kecamatan TEXT NOT NULL,
  alamat_lengkap TEXT,
  sektor_usaha TEXT DEFAULT 'Kuliner Olahan (Food & Beverage)',
  omzet_bulanan TEXT DEFAULT '< 5 Juta',
  jumlah_tenaga_kerja INT DEFAULT 1,
  level_umkm umkm_level_enum NOT NULL DEFAULT 'pemula',
  model_pendampingan mentorship_type_enum NOT NULL DEFAULT 'hibrid',
  xp_points INT NOT NULL DEFAULT 50,
  streak_days INT NOT NULL DEFAULT 1,
  avatar_url TEXT,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL: MENTOR_ASSIGNMENTS
-- Memetakan 8 pendamping kementerian/dinas ke wilayah binaan masing-masing di Lombok
CREATE TABLE IF NOT EXISTS public.mentor_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kabupaten_kota TEXT NOT NULL,
  kecamatan TEXT, -- Jika NULL, membina seluruh kabupaten
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL: UMKM_LEGALITAS
-- Tracker 5 instrumen legalitas wajib: NIB, Halal, P-IRT/BPOM, NPWP, dan HKI Merek
CREATE TABLE IF NOT EXISTS public.umkm_legalitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  jenis_legalitas TEXT NOT NULL CHECK (jenis_legalitas IN ('nib', 'halal', 'pirt_bpom', 'npwp', 'hki_merek')),
  status legalitas_status_enum NOT NULL DEFAULT 'belum_ada',
  nomor_dokumen TEXT,
  dokumen_url TEXT, -- URL file di Cloudflare R2 / Supabase Storage
  tanggal_terbit DATE,
  catatan_verifikasi TEXT,
  diverifikasi_oleh UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, jenis_legalitas)
);

-- 6. TABEL: DAILY_MISSIONS (KURIKULUM STATIS & CACHEABLE)
-- Daftar tugas harian berjenjang (Duolingo for UMKM) yang di-cache di client/CDN untuk hemat query 75k user
CREATE TABLE IF NOT EXISTS public.daily_missions (
  id TEXT PRIMARY KEY,
  hari_ke INT NOT NULL,
  urutan INT NOT NULL,
  judul TEXT NOT NULL,
  deskripsi_singkat TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('legalitas', 'digital_marketing', 'keuangan', 'kemasan_mutu', 'pitching_ekspor')),
  xp_reward INT NOT NULL DEFAULT 100,
  target_dinas TEXT NOT NULL,
  portal_resmi_url TEXT,
  portal_resmi_nama TEXT,
  syarat_checklist TEXT[] NOT NULL DEFAULT '{}',
  langkah_pengerjaan JSONB NOT NULL DEFAULT '[]'::jsonb,
  tips_pendamping TEXT,
  tipe_bukti TEXT NOT NULL DEFAULT 'text_or_url', -- 'url_link', 'registration_number', 'photo_upload'
  placeholder_bukti TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL: UMKM_MISSION_LOGS (PROGRES PENGERJAAN PER USER)
-- Menyimpan pengiriman bukti harian dari UMKM dan verifikasi oleh 8 pendamping dinas
CREATE TABLE IF NOT EXISTS public.umkm_mission_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL REFERENCES public.daily_missions(id) ON DELETE CASCADE,
  status mission_status_enum NOT NULL DEFAULT 'belum_dikerjakan',
  bukti_data TEXT, -- Link akun FB/WA atau Nomor Izin
  dokumen_url TEXT, -- Dokumen/foto kompresi dari Cloudflare R2
  catatan_umkm TEXT,
  catatan_pendamping TEXT,
  diverifikasi_oleh UUID REFERENCES public.profiles(id),
  tanggal_submit TIMESTAMPTZ,
  tanggal_verifikasi TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mission_id)
);

-- 8. TABEL: AI_USAGE_LOGS (RATE LIMITING GEMINI PER UMKM PER HARI)
-- Mencegah penyalahgunaan token API dan memastikan kuota adil bagi 75.000 UMKM
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  query_count INT NOT NULL DEFAULT 1,
  last_query_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tanggal)
);

-- ==============================================================================
-- COMPOSITE INDEXES: OPTIMASI SKALA 75.000 BARIS DATA
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_kab_kec_role 
  ON public.profiles (kabupaten_kota, kecamatan, role);

CREATE INDEX IF NOT EXISTS idx_profiles_level_sektor 
  ON public.profiles (level_umkm, sektor_usaha);

CREATE INDEX IF NOT EXISTS idx_legalitas_user_jenis 
  ON public.umkm_legalitas (user_id, jenis_legalitas);

CREATE INDEX IF NOT EXISTS idx_legalitas_status_jenis 
  ON public.umkm_legalitas (jenis_legalitas, status);

CREATE INDEX IF NOT EXISTS idx_mission_logs_user_status 
  ON public.umkm_mission_logs (user_id, status);

CREATE INDEX IF NOT EXISTS idx_mission_logs_status_submit 
  ON public.umkm_mission_logs (status, tanggal_submit DESC);

CREATE INDEX IF NOT EXISTS idx_mentor_assignments_lookup 
  ON public.mentor_assignments (mentor_id, kabupaten_kota);

CREATE INDEX IF NOT EXISTS idx_ai_usage_lookup 
  ON public.ai_usage_logs (user_id, tanggal);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm_legalitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm_mission_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function: Dapatkan Role User Saat Ini
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role_enum AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Kebijakan DAILY_MISSIONS: Semua role dan user terdaftar bisa membaca kurikulum statis
CREATE POLICY "Public read for daily_missions"
  ON public.daily_missions FOR SELECT
  TO authenticated, anon
  USING (true);

-- 2. Kebijakan PROFILES:
-- - UMKM hanya bisa melihat & mengedit profilnya sendiri
-- - Pendamping bisa melihat profil UMKM di kabupaten wilayah binaannya
-- - Admin Dinas bisa melihat seluruh profil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
    OR public.current_user_role() = 'admin_dinas'
    OR (
      public.current_user_role() = 'pendamping'
      AND kabupaten_kota IN (
        SELECT kabupaten_kota FROM public.mentor_assignments WHERE mentor_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert own profile on signup"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- 3. Kebijakan UMKM_LEGALITAS:
CREATE POLICY "Users can view own legalitas or mentors in assigned area"
  ON public.umkm_legalitas FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.current_user_role() = 'admin_dinas'
    OR (
      public.current_user_role() = 'pendamping'
      AND user_id IN (
        SELECT p.id FROM public.profiles p
        JOIN public.mentor_assignments m ON m.kabupaten_kota = p.kabupaten_kota
        WHERE m.mentor_id = auth.uid()
      )
    )
  );

CREATE POLICY "UMKM can upsert own legalitas"
  ON public.umkm_legalitas FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "UMKM or Mentors can update legalitas"
  ON public.umkm_legalitas FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.current_user_role() IN ('pendamping', 'admin_dinas')
  );

-- 4. Kebijakan UMKM_MISSION_LOGS:
CREATE POLICY "Mission logs select policy"
  ON public.umkm_mission_logs FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.current_user_role() = 'admin_dinas'
    OR (
      public.current_user_role() = 'pendamping'
      AND user_id IN (
        SELECT p.id FROM public.profiles p
        JOIN public.mentor_assignments m ON m.kabupaten_kota = p.kabupaten_kota
        WHERE m.mentor_id = auth.uid()
      )
    )
  );

CREATE POLICY "UMKM can submit own missions"
  ON public.umkm_mission_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "UMKM and Mentors can update mission logs"
  ON public.umkm_mission_logs FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.current_user_role() IN ('pendamping', 'admin_dinas')
  );

-- 5. Kebijakan AI_USAGE_LOGS:
CREATE POLICY "Users manage own AI usage logs"
  ON public.ai_usage_logs FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 6. Kebijakan MENTOR_ASSIGNMENTS:
CREATE POLICY "Read mentor assignments"
  ON public.mentor_assignments FOR SELECT
  TO authenticated
  USING (true);

-- ==============================================================================
-- AUTOMATIC TRIGGER: UPDATE UPDATED_AT TIMESTAMP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_legalitas_updated_at ON public.umkm_legalitas;
CREATE TRIGGER trigger_legalitas_updated_at
  BEFORE UPDATE ON public.umkm_legalitas
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_mission_logs_updated_at ON public.umkm_mission_logs;
CREATE TRIGGER trigger_mission_logs_updated_at
  BEFORE UPDATE ON public.umkm_mission_logs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
