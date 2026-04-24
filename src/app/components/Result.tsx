import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Target, ArrowRight } from 'lucide-react';

export function Result() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const savedQuizResult = localStorage.getItem('quizResult');

    if (!currentUser) {
      navigate('/');
    } else {
      const userData = JSON.parse(currentUser);
      setUser(userData);

      if (savedQuizResult) {
        setQuizResult(JSON.parse(savedQuizResult));
      }

      if (userData.quizScore >= 70) {
        setShowConfetti(true);
      }
    }
  }, [navigate]);

  if (!user || !quizResult) return null;

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: 'Outstanding! You are a star! 🌟', color: '#FFD700' };
    if (score >= 80) return { message: 'Excellent work! Keep it up! 🎉', color: '#00F5D4' };
    if (score >= 70) return { message: 'Great job! You\'re doing well! 👍', color: '#5B2EFF' };
    if (score >= 60) return { message: 'Good effort! Focus more on weak areas. 📚', color: '#FFD700' };
    return { message: 'Keep practicing! You can do better! 💪', color: '#FF4D9D' };
  };

  const performance = getPerformanceMessage(user.quizScore);

  const improvementTips = [
    'Review the topics you found challenging',
    'Practice more MCQs regularly',
    'Focus on understanding concepts, not just memorizing',
    'Create mind maps for better retention',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] font-['Poppins'] pb-24 relative overflow-hidden">
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

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#00F5D4', '#FF4D9D', '#FFD700', '#5B2EFF'][i % 4],
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
                rotate: Math.random() * 360,
                opacity: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-[20px] border-b border-white/10 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white text-center">Quiz Results</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Score Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-56 h-56">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="16"
                  fill="none"
                />
                <motion.circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke={performance.color}
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 628' }}
                  animate={{ strokeDasharray: `${(user.quizScore / 100) * 628} 628` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  style={{
                    filter: `drop-shadow(0 0 20px ${performance.color}80)`,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-7xl font-bold text-white"
                >
                  {user.quizScore}%
                </motion.p>
                <p className="text-white/60 mt-2">Your Score</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gradient-to-r from-[#00F5D4]/20 to-[#FF4D9D]/20 rounded-[20px] p-6 border border-white/20"
            style={{ borderColor: performance.color + '40' }}
          >
            <p className="text-white text-xl font-semibold">{performance.message}</p>
            <p className="text-white/60 mt-2">Subject: {quizResult.subject}</p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 text-center"
          >
            <Trophy className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
            <p className="text-white/60 text-sm mb-1">Badge</p>
            <p className="text-white text-lg font-bold">{user.badge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 text-center"
          >
            <div className="text-3xl mb-2">✅</div>
            <p className="text-white/60 text-sm mb-1">Correct</p>
            <p className="text-white text-lg font-bold">{quizResult.correct}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 text-center"
          >
            <div className="text-3xl mb-2">❌</div>
            <p className="text-white/60 text-sm mb-1">Wrong</p>
            <p className="text-white text-lg font-bold">{quizResult.wrong}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 text-center"
          >
            <Target className="w-8 h-8 text-[#00F5D4] mx-auto mb-2" />
            <p className="text-white/60 text-sm mb-1">Score</p>
            <p className="text-white text-lg font-bold">{quizResult.score}/{quizResult.total}</p>
          </motion.div>
        </div>

        {/* Improvement Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20"
        >
          <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            💡 Improvement Tips
          </h3>
          <div className="space-y-3">
            {improvementTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 rounded-[15px] p-3">
                <ArrowRight className="w-5 h-5 text-[#00F5D4] mt-0.5 flex-shrink-0" />
                <p className="text-white/80">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/leaderboard')}
            className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FF4D9D] text-white font-semibold py-4 rounded-[20px] shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-300"
          >
            View Leaderboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/quiz')}
            className="flex-1 bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white font-semibold py-4 rounded-[20px] shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
          >
            Retake Quiz
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard')}
          className="w-full bg-white/10 border border-white/20 text-white font-semibold py-4 rounded-[20px] hover:bg-white/20 transition-all duration-300"
        >
          Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
