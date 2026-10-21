import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  FileCheck, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  ExternalLink,
  Target,
  ArrowUpRight,
  BookOpen,
  Bot,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskItem, UmkmClass } from '../types';
import { TaskModal } from './TaskModal';

interface UmkmDashboardProps {
  onOpenSelfAssessment: () => void;
  onOpenMissingData: () => void;
  onOpenIdCard: () => void;
  onOpenAiMentor: () => void;
  onNavigateToLegalitas: () => void;
}

export const UmkmDashboard: React.FC<UmkmDashboardProps> = ({
  onOpenSelfAssessment,
  onOpenMissingData,
  onOpenIdCard,
  onOpenAiMentor,
  onNavigateToLegalitas
}) => {
  const { currentUmkm, tasks, agencies } = useApp();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  if (!currentUmkm) return null;

  const completedTaskIds = Object.entries(currentUmkm.submissions)
    .filter(([_, sub]) => sub.status === 'completed')
    .map(([id]) => id);

  const inReviewTaskIds = Object.entries(currentUmkm.submissions)
    .filter(([_, sub]) => sub.status === 'in_review')
    .map(([id]) => id);

  const revisionTaskIds = Object.entries(currentUmkm.submissions)
    .filter(([_, sub]) => sub.status === 'revision_needed')
    .map(([id]) => id);

  const totalTasks = tasks.length;
  const completedCount = completedTaskIds.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const getClassTitle = (cls: UmkmClass) => {
    switch (cls) {
      case 'naik_kelas':
        return {
          title: 'Kelas 3: UMKM Naik Kelas (Siap Ekspor)',
          color: 'from-amber-600 to-amber-700',
          textColor: 'text-amber-800 bg-amber-50 border-amber-200',
          nextGoal: 'Mempertahankan standar mutu & fasilitasi buyer mancanegara.'
        };
      case 'berkembang':
        return {
          title: 'Kelas 2: UMKM Berkembang (Mandiri)',
          color: 'from-emerald-600 to-teal-700',
          textColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          nextGoal: 'Lengkapi sertifikasi Halal & aktivasi QRIS untuk naik ke Kelas 3.'
        };
      default:
        return {
          title: 'Kelas 1: UMKM Pemula (Rintisan)',
          color: 'from-blue-600 to-cyan-700',
          textColor: 'text-blue-800 bg-blue-50 border-blue-200',
          nextGoal: 'Urus NIB OSS dan siapkan akun FB Bisnis untuk naik ke Kelas 2.'
        };
    }
  };

  const currentClassInfo = getClassTitle(currentUmkm.umkmClass);

  const getTaskStatus = (taskId: string) => {
    if (completedTaskIds.includes(taskId)) return 'completed';
    if (inReviewTaskIds.includes(taskId)) return 'in_review';
    if (revisionTaskIds.includes(taskId)) return 'revision_needed';
    return 'available';
  };

  // Status ringkasan legalitas
  const legalitasItems = Object.values(currentUmkm.legalitasTracker);
  const legalitasDone = legalitasItems.filter(i => i.status === 'terbit').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {currentUmkm.region} • Kec. {currentUmkm.district}
              </span>
              <span className="bg-white/10 text-emerald-200 text-xs px-3 py-1 rounded-full border border-white/15">
                Model: <strong className="capitalize text-white">{currentUmkm.mentorshipType}</strong>
              </span>
              <span className="text-xs text-slate-300">
                Sektor: <strong>{currentUmkm.sector}</strong>
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {currentUmkm.brandName}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Pemilik: <strong>{currentUmkm.ownerName}</strong> ({currentUmkm.businessName})
              </p>
            </div>

            {/* Level & Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  Status: <strong className="text-white">{currentClassInfo.title}</strong>
                </span>
                <span className="font-mono text-emerald-200 font-bold">
                  {completedCount} dari {totalTasks} Misi Selesai ({progressPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-white/20">
                <div 
                  className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(progressPercent, 6)}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-300 pt-1 gap-2">
                <span>{currentClassInfo.nextGoal}</span>
                <button
                  onClick={onOpenSelfAssessment}
                  className="underline hover:text-white transition-colors cursor-pointer text-amber-300 font-bold"
                >
                  Ubah Diagnostik & Legalitas &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Quick stats on the right */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Kemajuan Harian & Legalitas
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-center">
              <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-lg font-black">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>{currentUmkm.streakDays}</span>
                </div>
                <div className="text-[10px] text-slate-300 font-medium">Hari Beruntun</div>
              </div>

              <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-lg font-black">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{legalitasDone} / 5</span>
                </div>
                <div className="text-[10px] text-slate-300 font-medium">Izin Terbit</div>
              </div>
            </div>

            {/* AI Assistant Quick Callout */}
            <button
              onClick={onOpenAiMentor}
              className="w-full p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Tanya Asisten AI Legalitas (Gemini)</span>
            </button>

            <button
              onClick={onNavigateToLegalitas}
              className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Buka Tracker 5 Legalitas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Daily Step-by-Step Missions */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <span>Langkah Pendampingan Harian (Checklist Bertahap)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ikuti langkah harian mulai dari persiapan KTP, OSS, Halal, hingga Kurasi Bank Indonesia NTB.
              </p>
            </div>
          </div>

          {/* Missions List */}
          <div className="space-y-3">
            {tasks.map((task) => {
              const status = getTaskStatus(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                    status === 'completed' 
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50' 
                      : status === 'in_review'
                      ? 'bg-amber-50/40 border-amber-200 hover:bg-amber-50'
                      : status === 'revision_needed'
                      ? 'bg-rose-50/40 border-rose-200 hover:bg-rose-50'
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Day / Status Badge */}
                    <div className="shrink-0">
                      {status === 'completed' ? (
                        <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      ) : status === 'in_review' ? (
                        <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs animate-pulse">
                          <Clock className="w-6 h-6" />
                        </div>
                      ) : status === 'revision_needed' ? (
                        <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-800 font-black flex items-center justify-center text-xs border border-slate-200 group-hover:bg-emerald-100 group-hover:text-emerald-800 group-hover:border-emerald-300 transition-colors">
                          H-{task.dayNumber}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {task.category}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          +{task.xpReward} XP
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {task.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {status === 'completed' && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Disetujui
                      </span>
                    )}
                    {status === 'in_review' && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                        Ditinjau
                      </span>
                    )}
                    {status === 'revision_needed' && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                        Perlu Revisi
                      </span>
                    )}
                    {status === 'available' && (
                      <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 flex items-center gap-1">
                        Buka Misi <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: AI Assistant & Quick Legalitas */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Mentor Promo Box */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 shadow-md space-y-3.5 border border-emerald-700/60 relative overflow-hidden">
            <div className="flex items-center gap-2 font-black text-sm text-amber-300">
              <Bot className="w-5 h-5" />
              <span>Asisten AI Legalitas & Bisnis</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Bingung syarat izin edar di Lombok atau cara mendaftar program SEHATI Halal Gratis? Tanyakan langsung ke Mentor AI berbasis model resmi Google Gemini.
            </p>
            <button
              onClick={onOpenAiMentor}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mulai Konsultasi Tanya-Jawab</span>
            </button>
          </div>

          {/* Quick Legalitas Status Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Status 5 Legalitas Usaha</span>
              </h3>
              <button 
                onClick={onNavigateToLegalitas}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Buka Tracker &rarr;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {legalitasItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'terbit' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : item.status === 'sedang_diproses'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.status === 'terbit' ? 'Terbit' : item.status === 'sedang_diproses' ? 'Proses' : 'Belum'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Model Pembinaan */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-teal-600" />
              <span>3 Jalur Pendampingan Lombok</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
                <strong className="text-slate-900 block font-bold">1. Otodidak (Single Fighter)</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Mandiri lewat aplikasi kapan pun tanpa perlu menunggu antrean petugas.
                </p>
              </div>

              <div className="p-3 rounded-2xl border border-emerald-300 bg-emerald-50/40">
                <strong className="text-emerald-950 block font-bold">2. Hibrid (Mandiri + Terjadwal)</strong>
                <p className="text-[11px] text-emerald-900 mt-0.5">
                  Langkah aplikasi harian + klinik bisnis berkala di kantor dinas setempat.
                </p>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
                <strong className="text-slate-900 block font-bold">3. Intensif (Pitching BI NTB)</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Fasilitasi kurasi pameran Karya Kreatif Indonesia (KKI) & pasar ekspor.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Task Modal */}
      <TaskModal 
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />

    </div>
  );
};
