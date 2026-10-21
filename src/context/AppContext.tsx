import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  AgencyData, 
  LegalitasItem,
  LegalitasStatus,
  LegalitasType,
  LombokRegion,
  SelfAssessmentData, 
  TaskItem, 
  TaskSubmission, 
  UmkmClass, 
  UmkmProfile, 
  UserRole 
} from '../types';
import { 
  INITIAL_TASKS, 
  INITIAL_UMKM_USERS, 
  INTEGRATED_AGENCIES,
  createDefaultLegalitasTracker 
} from '../data/initialData';

interface AppContextType {
  userRole: UserRole;
  currentUmkm: UmkmProfile | null;
  umkmList: UmkmProfile[];
  tasks: TaskItem[];
  agencies: AgencyData[];
  adminInfo: {
    name: string;
    office: string;
    assignedRegion: string;
    totalLombokUmkm: number;
    companionStaffCount: number;
  };
  aiQuota: number;
  loginAsUmkm: (umkmId: string) => void;
  loginAsPendamping: () => void;
  loginAsAdminDinas: () => void;
  logout: () => void;
  registerUmkm: (newProfile: Partial<UmkmProfile> & { password?: string }) => UmkmProfile;
  updateAssessment: (umkmId: string, data: Partial<SelfAssessmentData>) => void;
  updateLegalitasItem: (
    umkmId: string, 
    legalitasId: LegalitasType, 
    status: LegalitasStatus, 
    documentNumber?: string, 
    documentUrl?: string,
    notes?: string
  ) => void;
  submitTaskProof: (taskId: string, proofData: string, proofNotes?: string, documentUrl?: string) => void;
  reviewTaskSubmission: (umkmId: string, taskId: string, approved: boolean, feedback: string) => void;
  addMissingDataNote: (umkmId: string, note: string) => void;
  removeMissingDataNote: (umkmId: string, index: number) => void;
  decrementAiQuota: () => void;
  calculateClass: (assessment: SelfAssessmentData) => UmkmClass;
  fireConfetti: () => void;
  resetDemoData: () => void;
}

const STORAGE_KEY_UMKM = 'langkah_umkm_profiles_v2';
const STORAGE_KEY_ROLE = 'langkah_user_role_v2';
const STORAGE_KEY_ACTIVE_ID = 'langkah_active_umkm_id_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function calculateClassFromAssessment(assessment: SelfAssessmentData): UmkmClass {
  const hasBasicLegal = assessment.hasNib;
  const hasQualityLegal = assessment.hasHalal || assessment.hasHaki || assessment.hasPirtOrBpom;
  const hasDigitalFinance = assessment.hasQris && assessment.hasSeparateBankAcc;
  const hasMarketing = assessment.hasFacebookPro || assessment.hasInstagram || assessment.hasWhatsAppBusiness;

  if (hasBasicLegal && hasQualityLegal && hasDigitalFinance && assessment.hasStandardPackaging) {
    return 'naik_kelas';
  }

  if (hasBasicLegal || hasMarketing || assessment.hasSeparateBankAcc || assessment.hasPirtOrBpom) {
    return 'berkembang';
  }

  return 'pemula';
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [umkmList, setUmkmList] = useState<UmkmProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_UMKM);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_UMKM_USERS;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ROLE);
      if (stored === 'admin_dinas' || stored === 'pendamping' || stored === 'umkm') {
        return stored;
      }
    } catch {
      // fallback
    }
    return 'umkm';
  });

  const [activeUmkmId, setActiveUmkmId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (stored) return stored;
    } catch {
      // fallback
    }
    return 'umkm-1';
  });

  const [aiQuota, setAiQuota] = useState<number>(15);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UMKM, JSON.stringify(umkmList));
    } catch (e) {
      console.error('Failed to sync UMKM list to localStorage', e);
    }
  }, [umkmList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, userRole);
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeUmkmId);
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [userRole, activeUmkmId]);

  const currentUmkm = useMemo(() => {
    return umkmList.find(u => u.id === activeUmkmId) || umkmList[0] || null;
  }, [umkmList, activeUmkmId]);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // confetti error fallback
    }
  };

  const loginAsUmkm = (umkmId: string) => {
    const found = umkmList.find(u => u.id === umkmId);
    if (found) {
      setActiveUmkmId(found.id);
      setUserRole('umkm');
    }
  };

  const loginAsPendamping = () => {
    setUserRole('pendamping');
  };

  const loginAsAdminDinas = () => {
    setUserRole('admin_dinas');
  };

  const logout = () => {
    setUserRole('umkm');
    setActiveUmkmId('umkm-1');
  };

  const registerUmkm = (newProfile: Partial<UmkmProfile> & { password?: string }): UmkmProfile => {
    const newId = `umkm-${Date.now()}`;
    const initialAssessment: SelfAssessmentData = {
      hasNib: newProfile.assessment?.hasNib || false,
      nibNumber: newProfile.assessment?.nibNumber || '',
      hasHalal: newProfile.assessment?.hasHalal || false,
      halalRegNumber: newProfile.assessment?.halalRegNumber || '',
      hasPirtOrBpom: newProfile.assessment?.hasPirtOrBpom || false,
      pirtNumber: newProfile.assessment?.pirtNumber || '',
      hasHaki: newProfile.assessment?.hasHaki || false,
      hasNpwp: newProfile.assessment?.hasNpwp || false,
      hasLabTest: false,
      hasFacebookPro: newProfile.assessment?.hasFacebookPro || false,
      facebookUrl: newProfile.assessment?.facebookUrl || '',
      hasInstagram: newProfile.assessment?.hasInstagram || false,
      hasWhatsAppBusiness: newProfile.assessment?.hasWhatsAppBusiness || false,
      hasGoogleMaps: newProfile.assessment?.hasGoogleMaps || false,
      hasMarketplace: false,
      hasSeparateBankAcc: newProfile.assessment?.hasSeparateBankAcc || false,
      hasDigitalBookkeeping: false,
      hasQris: newProfile.assessment?.hasQris || false,
      hasFinancialReport: false,
      hasStandardPackaging: newProfile.assessment?.hasStandardPackaging || false,
      hasBarcodeOrExpiredDate: false,
      hasHygieneCertificate: false,
      lastAssessedAt: new Date().toISOString().split('T')[0]
    };

    const calculatedClass = calculateClassFromAssessment(initialAssessment);
    const initialLegalitas = createDefaultLegalitasTracker(initialAssessment) as Record<LegalitasType, LegalitasItem>;

    const fullProfile: UmkmProfile = {
      id: newId,
      username: newProfile.username || `umkm_${Date.now().toString().slice(-4)}`,
      ownerName: newProfile.ownerName || 'Pengusaha Baru Lombok',
      businessName: newProfile.businessName || 'Usaha Mandiri Lombok',
      brandName: newProfile.brandName || newProfile.businessName || 'Merk Lokal',
      phone: newProfile.phone || '081900000000',
      email: newProfile.email || `${newProfile.username || 'user'}@langkah.id`,
      nik: newProfile.nik || '5203000000000001',
      address: newProfile.address || 'Pulau Lombok, NTB',
      region: (newProfile.region as LombokRegion) || 'Kabupaten Lombok Timur',
      district: newProfile.district || 'Selong',
      sector: newProfile.sector || 'Kuliner Olahan (Food & Beverage)',
      monthlyRevenueRange: newProfile.monthlyRevenueRange || '< 5 Juta',
      employeeCount: newProfile.employeeCount || 2,
      establishedYear: newProfile.establishedYear || new Date().getFullYear(),
      mentorshipType: newProfile.mentorshipType || 'hibrid',
      umkmClass: calculatedClass,
      xp: 60,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      assessment: initialAssessment,
      legalitasTracker: initialLegalitas,
      submissions: {},
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      facilitations: [],
      missingDataNotes: [
        'Lengkapi NIB dan dokumen persyaratan awal',
        'Tanyakan Asisten AI Mentor untuk panduan izin usaha pertama Anda'
      ]
    };

    setUmkmList(prev => [fullProfile, ...prev]);
    setActiveUmkmId(fullProfile.id);
    setUserRole('umkm');
    fireConfetti();
    return fullProfile;
  };

  const updateAssessment = (umkmId: string, data: Partial<SelfAssessmentData>) => {
    setUmkmList(prev => prev.map(item => {
      if (item.id !== umkmId) return item;
      const updatedAssessment: SelfAssessmentData = {
        ...item.assessment,
        ...data,
        lastAssessedAt: new Date().toISOString().split('T')[0]
      };
      const newClass = calculateClassFromAssessment(updatedAssessment);

      // Sinkronkan legalitas tracker
      const updatedTracker = { ...item.legalitasTracker };
      if (data.hasNib !== undefined) {
        updatedTracker.nib.status = data.hasNib ? 'terbit' : 'belum_ada';
        if (data.nibNumber) updatedTracker.nib.documentNumber = data.nibNumber;
      }
      if (data.hasHalal !== undefined) {
        updatedTracker.halal.status = data.hasHalal ? 'terbit' : (data.halalRegNumber ? 'sedang_diproses' : 'belum_ada');
        if (data.halalRegNumber) updatedTracker.halal.documentNumber = data.halalRegNumber;
      }
      if (data.hasPirtOrBpom !== undefined) {
        updatedTracker.pirt_bpom.status = data.hasPirtOrBpom ? 'terbit' : 'belum_ada';
        if (data.pirtNumber) updatedTracker.pirt_bpom.documentNumber = data.pirtNumber;
      }
      if (data.hasHaki !== undefined) {
        updatedTracker.hki_merek.status = data.hasHaki ? 'terbit' : 'belum_ada';
        if (data.hakiMerk) updatedTracker.hki_merek.documentNumber = data.hakiMerk;
      }
      if (data.hasNpwp !== undefined) {
        updatedTracker.npwp.status = data.hasNpwp ? 'terbit' : 'belum_ada';
      }

      return {
        ...item,
        assessment: updatedAssessment,
        legalitasTracker: updatedTracker,
        umkmClass: newClass,
        xp: item.xp + 40
      };
    }));
  };

  const updateLegalitasItem = (
    umkmId: string, 
    legalitasId: LegalitasType, 
    status: LegalitasStatus, 
    documentNumber?: string, 
    documentUrl?: string,
    notes?: string
  ) => {
    setUmkmList(prev => prev.map(item => {
      if (item.id !== umkmId) return item;
      const currentTracker = { ...item.legalitasTracker };
      const currentItem = currentTracker[legalitasId];

      if (currentItem) {
        currentTracker[legalitasId] = {
          ...currentItem,
          status,
          documentNumber: documentNumber || currentItem.documentNumber,
          documentUrl: documentUrl || currentItem.documentUrl,
          verificationNotes: notes || currentItem.verificationNotes,
          issuedDate: status === 'terbit' ? new Date().toISOString().split('T')[0] : currentItem.issuedDate
        };
      }

      // Sinkronkan ke assessment
      const updatedAssessment = { ...item.assessment };
      if (legalitasId === 'nib') {
        updatedAssessment.hasNib = status === 'terbit';
        if (documentNumber) updatedAssessment.nibNumber = documentNumber;
      } else if (legalitasId === 'halal') {
        updatedAssessment.hasHalal = status === 'terbit';
        if (documentNumber) updatedAssessment.halalRegNumber = documentNumber;
      } else if (legalitasId === 'pirt_bpom') {
        updatedAssessment.hasPirtOrBpom = status === 'terbit';
        if (documentNumber) updatedAssessment.pirtNumber = documentNumber;
      } else if (legalitasId === 'npwp') {
        updatedAssessment.hasNpwp = status === 'terbit';
      } else if (legalitasId === 'hki_merek') {
        updatedAssessment.hasHaki = status === 'terbit';
        if (documentNumber) updatedAssessment.hakiMerk = documentNumber;
      }

      const newClass = calculateClassFromAssessment(updatedAssessment);

      return {
        ...item,
        assessment: updatedAssessment,
        legalitasTracker: currentTracker,
        umkmClass: newClass,
        xp: status === 'terbit' ? item.xp + 100 : item.xp
      };
    }));

    if (status === 'terbit') {
      fireConfetti();
    }
  };

  const submitTaskProof = (taskId: string, proofData: string, proofNotes?: string, documentUrl?: string) => {
    if (!currentUmkm) return;

    const submission: TaskSubmission = {
      taskId,
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      proofData,
      proofNotes,
      documentUrl,
      status: 'in_review'
    };

    setUmkmList(prev => prev.map(item => {
      if (item.id !== currentUmkm.id) return item;
      return {
        ...item,
        submissions: {
          ...item.submissions,
          [taskId]: submission
        },
        streakDays: item.streakDays < 1 ? 1 : item.streakDays,
        lastActiveDate: new Date().toISOString().split('T')[0]
      };
    }));
  };

  const reviewTaskSubmission = (
    umkmId: string, 
    taskId: string, 
    approved: boolean, 
    feedback: string
  ) => {
    const task = INITIAL_TASKS.find(t => t.id === taskId);
    if (!task) return;

    setUmkmList(prev => prev.map(umkm => {
      if (umkm.id !== umkmId) return umkm;
      
      const currentSub = umkm.submissions[taskId];
      if (!currentSub) return umkm;

      const updatedSub: TaskSubmission = {
        ...currentSub,
        status: approved ? 'completed' : 'revision_needed',
        reviewedAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
        reviewedBy: 'Tim Pendamping Wilayah Lombok & BI NTB',
        feedback
      };

      const updatedAssessment = { ...umkm.assessment };
      if (approved && task.associatedAssessmentKey) {
        (updatedAssessment as Record<string, unknown>)[task.associatedAssessmentKey] = true;
      }

      const newClass = calculateClassFromAssessment(updatedAssessment);
      const earnedXp = approved ? task.xpReward : 0;

      return {
        ...umkm,
        assessment: updatedAssessment,
        umkmClass: newClass,
        xp: umkm.xp + earnedXp,
        submissions: {
          ...umkm.submissions,
          [taskId]: updatedSub
        }
      };
    }));

    if (approved) {
      fireConfetti();
    }
  };

  const addMissingDataNote = (umkmId: string, note: string) => {
    if (!note.trim()) return;
    setUmkmList(prev => prev.map(u => {
      if (u.id !== umkmId) return u;
      return {
        ...u,
        missingDataNotes: [...(u.missingDataNotes || []), note.trim()]
      };
    }));
  };

  const removeMissingDataNote = (umkmId: string, index: number) => {
    setUmkmList(prev => prev.map(u => {
      if (u.id !== umkmId) return u;
      const filtered = [...(u.missingDataNotes || [])];
      filtered.splice(index, 1);
      return {
        ...u,
        missingDataNotes: filtered
      };
    }));
  };

  const decrementAiQuota = () => {
    setAiQuota(prev => Math.max(0, prev - 1));
  };

  const resetDemoData = () => {
    setUmkmList(INITIAL_UMKM_USERS);
    setActiveUmkmId('umkm-1');
    setUserRole('umkm');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        currentUmkm,
        umkmList,
        tasks: INITIAL_TASKS,
        agencies: INTEGRATED_AGENCIES,
        adminInfo: {
          name: 'I Gede Satria, S.E. & 8 Tenaga Pendamping',
          office: 'Dinas Koperasi & UKM / Perindustrian NTB & BI NTB',
          assignedRegion: 'Pulau Lombok (Mataram, Lobar, Loteng, Lotim, KLU)',
          totalLombokUmkm: 75000,
          companionStaffCount: 8
        },
        aiQuota,
        loginAsUmkm,
        loginAsPendamping,
        loginAsAdminDinas,
        logout,
        registerUmkm,
        updateAssessment,
        updateLegalitasItem,
        submitTaskProof,
        reviewTaskSubmission,
        addMissingDataNote,
        removeMissingDataNote,
        decrementAiQuota,
        calculateClass: calculateClassFromAssessment,
        fireConfetti,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
