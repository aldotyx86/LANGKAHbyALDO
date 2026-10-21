import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Send, 
  HelpCircle, 
  FileCheck, 
  Building, 
  Lightbulb,
  UploadCloud,
  FileText
} from 'lucide-react';
import { TaskItem, TaskSubmission } from '../types';
import { useApp } from '../context/AppContext';
import { compressImage, formatFileSize } from '../lib/imageCompression';

interface TaskModalProps {
  task: TaskItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  const { currentUmkm, submitTaskProof, fireConfetti } = useApp();

  const [proofInput, setProofInput] = useState('');
  const [proofNotes, setProofNotes] = useState('');
  const [uploadedDocUrl, setUploadedDocUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const existingSubmission: TaskSubmission | undefined = 
    task && currentUmkm ? currentUmkm.submissions[task.id] : undefined;

  useEffect(() => {
    if (existingSubmission) {
      setProofInput(existingSubmission.proofData || '');
      setProofNotes(existingSubmission.proofNotes || '');
      setUploadedDocUrl(existingSubmission.documentUrl || '');
    } else {
      setProofInput('');
      setProofNotes('');
      setUploadedDocUrl('');
    }
    setCompressionInfo(null);
    setIsSuccessSubmitted(false);
  }, [task, existingSubmission]);

  if (!isOpen || !task || !currentUmkm) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const res = await compressImage(file, 1280, 1280, 0.75);
      setCompressionInfo(`Ukuran diperkecil: ${formatFileSize(res.originalSize)} -> ${formatFileSize(res.compressedSize)} (Hemat ${res.savedPercentage}%)`);
      setUploadedDocUrl(res.dataUrl);

      if (!proofInput) {
        setProofInput(`Dokumen Foto: ${file.name}`);
      }

      // Kirim metadata ke /api/upload-url
      await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: res.file.name,
          fileType: res.file.type,
          fileSize: res.compressedSize,
          userId: currentUmkm.id,
          category: task.category,
        }),
      });
    } catch (err: any) {
      console.error('Kompresi gagal:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofInput.trim()) return;

    submitTaskProof(task.id, proofInput.trim(), proofNotes.trim(), uploadedDocUrl || undefined);
    setIsSuccessSubmitted(true);
    fireConfetti();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const isCompleted = existingSubmission?.status === 'completed';
  const isInReview = existingSubmission?.status === 'in_review';
  const isRevision = existingSubmission?.status === 'revision_needed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              H-{task.dayNumber} • {task.category}
            </span>
            <span className="text-xs text-emerald-200 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              +{task.xpReward} XP Poin
            </span>
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            {task.title}
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            {task.shortDescription}
          </p>

          {/* Submission Status banner */}
          <div className="mt-4">
            {isCompleted && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center gap-2 text-xs text-emerald-100 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Tugas Ini Telah Diverifikasi & Dinyatakan Selesai oleh Pendamping!</span>
              </div>
            )}
            {isInReview && (
              <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-xl flex items-center gap-2 text-xs text-amber-100 font-bold">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Menunggu Verifikasi Tim Pendamping Wilayah Lombok</span>
              </div>
            )}
            {isRevision && (
              <div className="p-3 bg-rose-500/20 border border-rose-400/30 rounded-xl flex items-center gap-2 text-xs text-rose-100 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Perlu Revisi: Harap baca catatan tim pendamping di bawah.</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">

          {/* Dinas PIC & Portal Link */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Lembaga Terkait:</span>
                <span className="font-bold text-slate-800">{task.stepGuide.targetDinas}</span>
              </div>
            </div>

            {task.stepGuide.officialPortalUrl && (
              <a 
                href={task.stepGuide.officialPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <span>{task.stepGuide.officialPortalName || 'Akses Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Panduan Resmi Pendamping
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {task.stepGuide.overview}
            </p>
          </div>

          {/* Requirements Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Persyaratan yang Harus Disiapkan
            </h4>
            <ul className="space-y-1.5">
              {task.stepGuide.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Langkah Pengerjaan Praktis
            </h4>
            <div className="space-y-2">
              {task.stepGuide.steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {st}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          {task.stepGuide.proTips && (
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Tips Pendamping Lapangan:</strong>
                <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                  {task.stepGuide.proTips}
                </p>
              </div>
            </div>
          )}

          {/* Feedback */}
          {existingSubmission?.feedback && (
            <div className={`p-4 rounded-2xl border text-xs ${
              isCompleted 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <FileCheck className="w-4 h-4" />
                <span>Catatan Evaluasi Pendamping:</span>
              </div>
              <p className="text-xs italic pl-6">{existingSubmission.feedback}</p>
              {existingSubmission.reviewedAt && (
                <p className="text-[10px] text-slate-500 mt-2 pl-6">
                  Ditinjau pada: {existingSubmission.reviewedAt} oleh {existingSubmission.reviewedBy}
                </p>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-emerald-700" />
              <span>Kirimkan Bukti Langkah Ini ke Tim Pendamping</span>
            </h4>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Bukti Pengerjaan (Link / Nomor Izin / Deskripsi):
              </label>
              <input 
                type="text"
                required
                disabled={isCompleted}
                value={proofInput}
                onChange={(e) => setProofInput(e.target.value)}
                placeholder={task.proofPlaceholder}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-emerald-600 font-mono disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            {/* Optional Photo upload with browser compression */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unggah Foto Bukti / Dokumen (Kompresi Otomatis)</span>
              </label>
              <input 
                type="file"
                disabled={isCompleted}
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
              />
              {isCompressing && (
                <p className="text-[10px] text-amber-700 animate-pulse">Mengompresi gambar di browser...</p>
              )}
              {compressionInfo && (
                <p className="text-[10px] text-emerald-700 font-bold">{compressionInfo}</p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Catatan Tambahan untuk Pendamping:
              </label>
              <textarea 
                rows={2}
                disabled={isCompleted}
                value={proofNotes}
                onChange={(e) => setProofNotes(e.target.value)}
                placeholder="Contoh: Sudah dibuatkan halaman FB, mohon dicek kelengkapan bio nomor WA..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-emerald-600 disabled:bg-slate-100"
              />
            </div>

            {isSuccessSubmitted ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-center text-xs font-bold animate-bounce">
                🎉 Berhasil Dikirim ke Antrean Verifikasi Pendamping!
              </div>
            ) : (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isCompleted || !proofInput.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isInReview ? 'Perbarui Bukti' : 'Kirim Bukti Tugas'}</span>
                </button>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};
