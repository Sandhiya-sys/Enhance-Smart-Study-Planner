import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  ChevronDown,
  ChevronUp,
  Upload,
  CheckCircle,
  BookOpen,
} from 'lucide-react';
import { subjects } from '../data/subjects';
import { PDFViewer } from './PDFViewer';

type SelectedPDF = {
  path: string;
  title: string;
};

type CurrentUser = {
  studyHoursToday?: number;
  totalStudyHours?: number;
  studyStartTimestamp?: number | null;
  shownMilestones?: string[];
};

const ACHIEVEMENT_MILESTONES = [
  {
    key: '1h',
    minutes: 60,
    message: '🎉 Great Job! You completed 1 hour of study today.',
  },
  {
    key: '1.5h',
    minutes: 90,
    message: "🔥 Amazing! You're building strong consistency.",
  },
  {
    key: '3h',
    minutes: 180,
    message: "🚀 Excellent Work! You're getting closer to your goal.",
  },
];

export function SyllabusUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedPDF, setSelectedPDF] = useState<SelectedPDF | null>(null);

  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');

  const getCurrentUser = (): CurrentUser => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    } catch {
      return {};
    }
  };

  const saveCurrentUser = (user: CurrentUser) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const showAchievementPopup = (message: string) => {
    setAchievementMessage(message);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 5000);
  };

  useEffect(() => {
    if (!uploadedFile || !selectedSubject) return;

    let startTime = studyStartTime;

    if (!startTime) {
      startTime = Date.now();
      setStudyStartTime(startTime);

      const currentUser = getCurrentUser();
      currentUser.studyStartTimestamp = startTime;
      if (!Array.isArray(currentUser.shownMilestones)) {
        currentUser.shownMilestones = [];
      }
      saveCurrentUser(currentUser);
    }

    const interval = setInterval(() => {
      if (!startTime) return;

      const elapsedMs = Date.now() - startTime;
      const studyMinutes = elapsedMs / (1000 * 60);
      const studyHours = parseFloat((studyMinutes / 60).toFixed(1));

      const currentUser = getCurrentUser();
      const previousHours = currentUser.studyHoursToday || 0;

      currentUser.studyHoursToday = studyHours;
      currentUser.totalStudyHours =
        (currentUser.totalStudyHours || 0) + Math.max(studyHours - previousHours, 0);

      if (!Array.isArray(currentUser.shownMilestones)) {
        currentUser.shownMilestones = [];
      }

      for (const milestone of ACHIEVEMENT_MILESTONES) {
        if (
          studyMinutes >= milestone.minutes &&
          !currentUser.shownMilestones.includes(milestone.key)
        ) {
          currentUser.shownMilestones.push(milestone.key);
          showAchievementPopup(milestone.message);
        }
      }

      saveCurrentUser(currentUser);
    }, 10000);

    return () => clearInterval(interval);
  }, [uploadedFile, selectedSubject, studyStartTime]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadedFile(true);
    setExpandedUnits([1, 2, 3, 4, 5]);

    const freshStart = Date.now();
    setStudyStartTime(freshStart);

    const currentUser = getCurrentUser();
    currentUser.studyHoursToday = 0;
    currentUser.studyStartTimestamp = freshStart;
    currentUser.shownMilestones = [];
    saveCurrentUser(currentUser);
  };

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnits((prev) =>
      prev.includes(unitNumber)
        ? prev.filter((u) => u !== unitNumber)
        : [...prev, unitNumber]
    );
  };

  const openPDFViewer = (pdfPath: string, title: string) => {
    setSelectedPDF({ path: pdfPath, title });
  };

  const closePDFViewer = () => {
    setSelectedPDF(null);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setUploadedFile(false);
    setExpandedUnits([]);
    setFileName('');
    setSelectedPDF(null);
    setStudyStartTime(null);

    const currentUser = getCurrentUser();
    currentUser.studyHoursToday = 0;
    currentUser.studyStartTimestamp = null;
    currentUser.shownMilestones = [];
    saveCurrentUser(currentUser);
  };

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject);

  return (
    <>
      {selectedPDF && (
        <PDFViewer
          pdfPath={selectedPDF.path}
          title={selectedPDF.title}
          onClose={closePDFViewer}
        />
      )}

      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="relative min-w-[300px] rounded-[20px] border-2 border-[#00F5D4] bg-gradient-to-r from-[#00F5D4]/20 to-[#5B2EFF]/20 p-6 shadow-[0_0_40px_rgba(0,245,212,0.6)] backdrop-blur-[20px]">
              <p className="text-center text-lg font-bold text-white">{achievementMessage}</p>

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: ['#00F5D4', '#FF4D9D', '#FFD700', '#5B2EFF'][i % 4],
                      left: `${Math.random() * 100}%`,
                      top: '50%',
                    }}
                    animate={{
                      y: [0, -100, 100],
                      x: [0, (Math.random() - 0.5) * 200],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] pb-24 font-['Poppins']">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                backgroundColor:
                  i % 3 === 0 ? '#5B2EFF' : i % 3 === 1 ? '#00F5D4' : '#FF4D9D',
              }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 border-b border-white/10 bg-white/10 p-6 backdrop-blur-[20px]">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Syllabus & AI Notes Generator</h1>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl space-y-6 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[20px] border border-white/20 bg-white/10 p-6 backdrop-blur-[20px]"
          >
            <label className="mb-3 block text-sm text-white">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full rounded-[20px] border-2 border-[#00F5D4]/30 bg-white/5 px-4 py-3 text-white transition-all duration-300 focus:border-[#00F5D4] focus:outline-none focus:shadow-[0_0_20px_rgba(0,245,212,0.3)]"
            >
              <option value="" className="bg-[#1a0a2e]">
                Choose a subject
              </option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id} className="bg-[#1a0a2e]">
                  {subject.name}
                </option>
              ))}
            </select>
          </motion.div>

          {selectedSubject && !uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[20px] border-2 border-dashed border-[#00F5D4]/30 bg-white/10 p-8 backdrop-blur-[20px] transition-all duration-300 hover:border-[#00F5D4]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-center">
                <Upload className="mx-auto mb-4 h-20 w-20 text-[#00F5D4]" />
                <h3 className="mb-2 text-2xl font-bold text-white">Upload Syllabus</h3>
                <p className="mb-6 text-white/60">
                  Upload your syllabus to generate all unit notes
                </p>
                <button
                  onClick={handleFileClick}
                  className="rounded-[20px] bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] px-10 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(0,245,212,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,212,0.7)]"
                >
                  Choose File & Generate Notes
                </button>
              </div>
            </motion.div>
          )}

          {selectedSubject && uploadedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 rounded-[20px] border border-[#00F5D4]/30 bg-gradient-to-r from-[#00F5D4]/20 to-[#5B2EFF]/20 p-4 backdrop-blur-[20px]"
            >
              <CheckCircle className="h-6 w-6 text-[#00F5D4]" />
              <div>
                <p className="font-semibold text-white">Syllabus Uploaded Successfully!</p>
                <p className="text-sm text-white/60">{fileName}</p>
              </div>
            </motion.div>
          )}

          {selectedSubject && uploadedFile && selectedSubjectData && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[20px] border border-[#00F5D4]/30 bg-gradient-to-r from-[#00F5D4]/20 to-[#FF4D9D]/20 p-6 backdrop-blur-[20px]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-[#00F5D4]" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      📘 {selectedSubjectData.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/60">AI-Generated Study Notes</p>
                  </div>
                </div>
              </motion.div>

              {selectedSubjectData.units.map((unit, index) => (
                <motion.div
                  key={unit.unitNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-[20px] border border-white/20 bg-white/10 backdrop-blur-[20px]"
                >
                  <button
                    onClick={() => toggleUnit(unit.unitNumber)}
                    className="flex w-full items-center justify-between p-6 transition-all duration-300 hover:bg-white/5"
                  >
                    <div className="text-left">
                      <h3 className="mb-1 text-xl font-bold text-white">
                        ✅ UNIT {unit.unitNumber} – {unit.title}
                      </h3>
                    </div>
                    {expandedUnits.includes(unit.unitNumber) ? (
                      <ChevronUp className="h-6 w-6 text-[#00F5D4]" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-[#00F5D4]" />
                    )}
                  </button>

                  {expandedUnits.includes(unit.unitNumber) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6 px-6 pb-6"
                    >
                      <div className="rounded-[15px] bg-white/5 p-6">
                        <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#00F5D4]">
                          📖 Introduction
                        </h4>
                        <div className="space-y-3">
                          {unit.introduction.map((line, i) => (
                            <p key={i} className="leading-relaxed text-white/80">
                              • {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[15px] bg-white/5 p-6">
                        <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#FF4D9D]">
                          ❓ Important Questions
                        </h4>
                        <div className="space-y-3">
                          {unit.importantQuestions.map((question, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="min-w-[24px] font-bold text-[#FF4D9D]">
                                {i + 1}.
                              </span>
                              <p className="text-white/80">{question}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {unit.pdfPath && (
                        <div className="rounded-[15px] border-2 border-[#5B2EFF]/30 bg-gradient-to-r from-[#5B2EFF]/20 to-[#00F5D4]/20 p-6 transition-all duration-300 hover:border-[#00F5D4]/50">
                          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#5B2EFF]">
                            📄 Notes
                          </h4>
                          <div className="flex items-center justify-between rounded-[15px] bg-white/10 p-5 transition-all duration-300 hover:bg-white/15">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00F5D4] to-[#5B2EFF] shadow-[0_0_20px_rgba(0,245,212,0.4)]">
                                <FileText className="h-7 w-7 text-white" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-white">
                                  Unit {unit.unitNumber} - {unit.title}
                                </p>
                                <p className="mt-1 text-sm text-white/70">
                                  Complete Study Material PDF
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                openPDFViewer(
                                  unit.pdfPath!,
                                  `Unit ${unit.unitNumber} - ${unit.title}`
                                )
                              }
                              className="flex items-center gap-2 rounded-[15px] bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] px-8 py-3.5 font-bold text-white shadow-[0_0_25px_rgba(0,245,212,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,245,212,0.7)]"
                            >
                              <BookOpen className="h-5 w-5" />
                              View PDF
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-white/10" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-white/10 p-4 backdrop-blur-[20px]">
          <div className="mx-auto flex max-w-7xl items-center justify-around">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center">🏠</div>
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => navigate('/planner')}
              className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center">📅</div>
              <span className="text-xs">Planner</span>
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center">🧠</div>
              <span className="text-xs">Quiz</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center">👤</div>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}