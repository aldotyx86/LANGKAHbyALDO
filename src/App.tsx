import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { UmkmDashboard } from './components/UmkmDashboard';
import { LegalitasTracker } from './components/LegalitasTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { MultiAgencyHub } from './components/MultiAgencyHub';
import { MissingDataCenter } from './components/MissingDataCenter';
import { SelfAssessmentModal } from './components/SelfAssessmentModal';
import { AuthModal } from './components/AuthModal';
import { UmkmCardIdModal } from './components/UmkmCardIdModal';
import { AiMentorModal } from './components/AiMentorModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { 
  Building2, 
  Landmark, 
  Heart, 
  MapPin, 
  Layers, 
  Award, 
  ShieldCheck,
  Bot,
  Sparkles
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { userRole, currentUmkm, adminInfo, aiQuota } = useApp();

  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState<boolean>(false);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  const isStaff = userRole === 'pendamping' || userRole === 'admin_dinas';
  const currentTab = isStaff && (activeTab === 'roadmap' || activeTab === 'legalitas')
    ? 'admin' 
    : activeTab;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header 
        activeTab={currentTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSelfAssessment={() => setIsAssessmentOpen(true)}
        onOpenIdCard={() => setIsIdCardOpen(true)}
        onOpenAiMentor={() => setIsAiMentorOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="flex-1 pb-16">
        {currentTab === 'roadmap' && (
          <UmkmDashboard 
            onOpenSelfAssessment={() => setIsAssessmentOpen(true)}
            onOpenMissingData={() => setActiveTab('missing_data')}
            onOpenIdCard={() => setIsIdCardOpen(true)}
            onOpenAiMentor={() => setIsAiMentorOpen(true)}
            onNavigateToLegalitas={() => setActiveTab('legalitas')}
          />
        )}

        {currentTab === 'legalitas' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            <LegalitasTracker />
          </div>
        )}

        {(currentTab === 'admin' || currentTab === 'umkm_directory') && (
          <AdminDashboard />
        )}

        {currentTab === 'agencies' && (
          <MultiAgencyHub />
        )}

        {currentTab === 'missing_data' && (
          <MissingDataCenter />
        )}
      </main>

      {/* Floating Action Button: Quick AI Mentor for Mobile */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiMentorOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-black text-xs rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105 border-2 border-amber-300 group"
          title="Tanya Asisten AI Legalitas"
        >
          <div className="w-6 h-6 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center font-bold">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span>Mentor AI Legalitas</span>
        </button>
      </div>

      {/* Modals */}
      <SelfAssessmentModal 
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onRegisteredNew={() => {
          setIsAssessmentOpen(true);
          setActiveTab('roadmap');
        }}
      />

      <UmkmCardIdModal 
        isOpen={isIdCardOpen}
        onClose={() => setIsIdCardOpen(false)}
      />

      <AiMentorModal 
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
      />

      <ArchitectureModal 
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-base shadow-md">
                L
              </div>
              <div>
                <span className="text-white font-extrabold text-sm block">LANGKAH LOMBOK</span>
                <span className="text-[11px] text-slate-400">
                  Layanan Pengembangan Kapasitas Harian IKM & UMKM Se-Pulau Lombok
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Mataram • Lombok Barat • Lombok Tengah • Lombok Timur • Lombok Utara
              </span>
              <button 
                onClick={() => setIsArchitectureOpen(true)}
                className="flex items-center gap-1 text-teal-300 hover:text-white underline cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Arsitektur Supabase + R2 + Vercel</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <p>
              Mendukung Digitalisasi Asta Cita Sistem Informatika • Solusi Pendampingan 75.000 UMKM Binaan Bank Indonesia (BI) NTB 2024-2025
            </p>
            <div className="flex items-center gap-3">
              <span>Terintegrasi: Perindustrian, Koperasi, Perdagangan, Pertanian, Perikanan, Pariwisata NTB</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
