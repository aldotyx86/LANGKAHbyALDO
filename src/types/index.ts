export type UserRole = 'umkm' | 'pendamping' | 'admin_dinas';

export type UmkmClass = 'pemula' | 'berkembang' | 'naik_kelas';

export type MentorshipType = 'otodidak' | 'hibrid' | 'intensif';

export type TaskStatus = 'locked' | 'available' | 'in_review' | 'completed' | 'revision_needed';

export type LombokRegion = 
  | 'Kota Mataram'
  | 'Kabupaten Lombok Barat'
  | 'Kabupaten Lombok Tengah'
  | 'Kabupaten Lombok Timur'
  | 'Kabupaten Lombok Utara';

export type LegalitasType = 'nib' | 'halal' | 'pirt_bpom' | 'npwp' | 'hki_merek';

export type LegalitasStatus = 'belum_ada' | 'sedang_diproses' | 'terbit';

export interface LegalitasItem {
  id: LegalitasType;
  label: string;
  shortDesc: string;
  status: LegalitasStatus;
  documentNumber?: string;
  documentUrl?: string;
  issuedDate?: string;
  verifiedBy?: string;
  verificationNotes?: string;
  targetDinas: string;
  officialPortalUrl: string;
  officialPortalName: string;
}

export type BusinessSector = 
  | 'Kuliner Olahan (Food & Beverage)'
  | 'Kriya & Tenun Tradisional (Songket Sasak)'
  | 'Pertanian & Perkebunan (Kopi Rinjani/Beras Organik)'
  | 'Perikanan & Kelautan Olahan (Abon Ikan/Rumput Laut)'
  | 'Jasa & Pariwisata Kreatif (Homestay/Desa Wisata)'
  | 'Fashion & Konveksi Lokal'
  | 'Herbal & Kosmetik Tradisional (Minyak Sumbawa/Sasak)';

export interface SelfAssessmentData {
  // Legalitas
  hasNib: boolean;
  nibNumber?: string;
  hasHalal: boolean;
  halalRegNumber?: string;
  hasPirtOrBpom: boolean;
  pirtNumber?: string;
  hasHaki: boolean;
  hakiMerk?: string;
  hasNpwp: boolean;
  hasLabTest: boolean;

  // Digital Marketing
  hasFacebookPro: boolean;
  facebookUrl?: string;
  hasInstagram: boolean;
  instagramHandle?: string;
  hasWhatsAppBusiness: boolean;
  hasGoogleMaps: boolean;
  googleMapsUrl?: string;
  hasMarketplace: boolean;
  marketplaceNames?: string[];

  // Keuangan & Perbankan
  hasSeparateBankAcc: boolean;
  hasDigitalBookkeeping: boolean;
  hasQris: boolean;
  qrisMerchantName?: string;
  hasFinancialReport: boolean;

  // Kemasan & Standar Mutu
  hasStandardPackaging: boolean;
  hasBarcodeOrExpiredDate: boolean;
  hasHygieneCertificate: boolean;

  lastAssessedAt: string;
}

export interface TaskItem {
  id: string;
  dayNumber: number;
  aspect: 'legalitas' | 'digital_marketing' | 'keuangan' | 'kemasan_mutu' | 'pitching_ekspor';
  title: string;
  shortDescription: string;
  xpReward: number;
  requiredLevel: number;
  category: string;
  stepGuide: {
    overview: string;
    targetDinas: string;
    officialPortalUrl?: string;
    officialPortalName?: string;
    requirements: string[];
    steps: string[];
    proTips: string;
  };
  proofType: 'url_link' | 'document_upload' | 'registration_number' | 'checklist_photo';
  proofPlaceholder: string;
  associatedAssessmentKey?: keyof SelfAssessmentData;
}

export interface TaskSubmission {
  taskId: string;
  submittedAt: string;
  proofData: string;
  proofNotes?: string;
  documentUrl?: string;
  status: TaskStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  feedback?: string;
}

export interface UmkmProfile {
  id: string;
  username: string;
  ownerName: string;
  businessName: string;
  brandName: string;
  phone: string;
  email: string;
  nik: string;
  address: string;
  region: LombokRegion;
  district: string; // Kecamatan
  sector: BusinessSector;
  monthlyRevenueRange: '< 5 Juta' | '5 - 15 Juta' | '15 - 50 Juta' | '> 50 Juta';
  employeeCount: number;
  establishedYear: number;
  mentorshipType: MentorshipType;
  umkmClass: UmkmClass;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  assessment: SelfAssessmentData;
  legalitasTracker: Record<LegalitasType, LegalitasItem>;
  submissions: Record<string, TaskSubmission>;
  avatarUrl: string;
  facilitations: string[];
  missingDataNotes: string[];
}

export interface AgencyData {
  id: string;
  name: string;
  shortName: string;
  roleDescription: string;
  targetFocus: string;
  iconName: string;
  activeProgramsCount: number;
}

export interface PendampingProfile {
  id: string;
  nip: string;
  username: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  assignedRegion: LombokRegion | 'Seluruh Pulau Lombok';
  districtCoverage: string;
  specialization: string;
  agency: string;
  avatarUrl: string;
  totalDampingan: number;
  verifiedCount: number;
  badgeCode: string;
}

export interface AdminDinasProfile {
  id: string;
  nip: string;
  username: string;
  name: string;
  agency: string;
  position: string;
  phone: string;
  email: string;
  avatarUrl: string;
}
