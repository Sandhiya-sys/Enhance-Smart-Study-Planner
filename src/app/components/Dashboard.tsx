import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Home, BookOpen, BrainCircuit, User, Plus, Calendar, Clock, Target } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(0);
  const [studyHours, setStudyHours] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(currentUser));

      // Calculate stats from localStorage
      const savedSubjects = localStorage.getItem('subjects');
      if (savedSubjects) {
        const { subjects } = JSON.parse(savedSubjects);
        setTotalSubjects(subjects?.length || 0);

        // Count upcoming exams (exams with dates set)
        const examsWithDates = subjects?.filter((s: any) => s.examDate).length || 0;
        setUpcomingExams(examsWithDates);
      }

      // Get study hours from user data
      const userData = JSON.parse(currentUser);
      setStudyHours(userData.totalStudyHours || 0);

      // Calculate progress based on quiz score and study activities
      const quizScore = userData.quizScore || 0;
      const hasSubjects = totalSubjects > 0;
      const hasExams = upcomingExams > 0;

      let calculatedProgress = 0;
      if (quizScore > 0) calculatedProgress += quizScore * 0.5; // 50% weight for quiz
      if (hasSubjects) calculatedProgress += 25; // 25% for adding subjects
      if (hasExams) calculatedProgress += 25; // 25% for setting exam dates

      setProgress(Math.min(Math.round(calculatedProgress), 100));
    }
  }, [navigate, totalSubjects, upcomingExams]);

  if (!user) return null;

  const stats = [
    { label: 'Total Subjects', value: totalSubjects.toString(), icon: BookOpen, color: '#00F5D4' },
    { label: 'Upcoming Exams', value: upcomingExams.toString(), icon: Calendar, color: '#FF4D9D' },
    { label: 'Study Hours Today', value: studyHours.toString(), icon: Clock, color: '#5B2EFF' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] font-['Poppins'] relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F5D4] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-[20px] border-b border-white/10 p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Hi {user.name}!! 👋</h1>
            <p className="text-white/60 mt-1">Welcome back to your study dashboard</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5B2EFF] to-[#00F5D4] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_20px_rgba(0,245,212,0.5)] hover:shadow-[0_0_30px_rgba(0,245,212,0.8)] transition-all duration-300 cursor-pointer"
          >
            {user.avatar}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 pb-24 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    boxShadow: `0 0 20px ${stat.color}40`,
                  }}
                >
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
              </div>
              <p className="text-white/80 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Today's Progress</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 502' }}
                  animate={{ strokeDasharray: `${(progress / 100) * 502} 502` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F5D4" />
                    <stop offset="50%" stopColor="#5B2EFF" />
                    <stop offset="100%" stopColor="#FF4D9D" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-white">{progress}%</p>
                  <p className="text-white/60 mt-2">Complete</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <button
            onClick={() => navigate('/subject-input')}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-[#00F5D4] hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] transition-all duration-300 flex flex-col items-center gap-3"
          >
            <Plus className="w-8 h-8 text-[#00F5D4]" />
            <span className="text-white">Add Subject</span>
          </button>
          <button
            onClick={() => navigate('/planner')}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-[#FF4D9D] hover:shadow-[0_0_30px_rgba(255,77,157,0.3)] transition-all duration-300 flex flex-col items-center gap-3"
          >
            <Target className="w-8 h-8 text-[#FF4D9D]" />
            <span className="text-white">Study Plan</span>
          </button>
          <button
            onClick={() => navigate('/syllabus')}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-[#5B2EFF] hover:shadow-[0_0_30px_rgba(91,46,255,0.3)] transition-all duration-300 flex flex-col items-center gap-3"
          >
            <BookOpen className="w-8 h-8 text-[#5B2EFF]" />
            <span className="text-white">Notes</span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-[#00F5D4] hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] transition-all duration-300 flex flex-col items-center gap-3"
          >
            <BrainCircuit className="w-8 h-8 text-[#00F5D4]" />
            <span className="text-white">Quiz</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/subject-input')}
        className="fixed bottom-24 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#00F5D4] to-[#FF4D9D] flex items-center justify-center shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:shadow-[0_0_40px_rgba(0,245,212,0.9)] transition-all duration-300"
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-[20px] border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1 text-[#00F5D4]"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate('/planner')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Planner</span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <BrainCircuit className="w-6 h-6" />
            <span className="text-xs">Quiz</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
