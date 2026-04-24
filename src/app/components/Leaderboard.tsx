import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Crown } from 'lucide-react';

interface LeaderboardUser {
  name: string;
  email: string;
  avatar: string;
  quizScore: number;
  badge: string;
  rank: number;
}

export function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(currentUser);
    setCurrentUserEmail(user.email);

    const board = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    
    // Sort by score and assign ranks
    board.sort((a: LeaderboardUser, b: LeaderboardUser) => b.quizScore - a.quizScore);
    board.forEach((u: LeaderboardUser, index: number) => {
      u.rank = index + 1;
    });
    
    setLeaderboard(board);
  }, [navigate]);

  const getBadgeEmoji = (badge: string) => {
    switch (badge) {
      case 'Gold':
        return '🥇';
      case 'Silver':
        return '🥈';
      default:
        return '🥉';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#5B2EFF';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] font-['Poppins'] pb-24 relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
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
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#FFD700]" />
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20"
          >
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center flex-1"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#808080] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(192,192,192,0.5)] mb-3">
                  {leaderboard[1]?.avatar}
                </div>
                <p className="text-white font-semibold mb-1">{leaderboard[1]?.name}</p>
                <p className="text-[#C0C0C0] text-sm mb-2">{leaderboard[1]?.quizScore}%</p>
                <div className="w-full bg-gradient-to-t from-[#C0C0C0]/30 to-[#C0C0C0]/10 rounded-t-[15px] h-24 flex items-center justify-center border-t-2 border-[#C0C0C0]">
                  <span className="text-4xl">🥈</span>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center flex-1"
              >
                <Crown className="w-8 h-8 text-[#FFD700] mb-2" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_40px_rgba(255,215,0,0.6)] mb-3">
                  {leaderboard[0]?.avatar}
                </div>
                <p className="text-white font-bold text-lg mb-1">{leaderboard[0]?.name}</p>
                <p className="text-[#FFD700] font-bold mb-2">{leaderboard[0]?.quizScore}%</p>
                <div className="w-full bg-gradient-to-t from-[#FFD700]/30 to-[#FFD700]/10 rounded-t-[15px] h-32 flex items-center justify-center border-t-2 border-[#FFD700]">
                  <span className="text-5xl">🥇</span>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center flex-1"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B4513] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(205,127,50,0.5)] mb-3">
                  {leaderboard[2]?.avatar}
                </div>
                <p className="text-white font-semibold mb-1">{leaderboard[2]?.name}</p>
                <p className="text-[#CD7F32] text-sm mb-2">{leaderboard[2]?.quizScore}%</p>
                <div className="w-full bg-gradient-to-t from-[#CD7F32]/30 to-[#CD7F32]/10 rounded-t-[15px] h-20 flex items-center justify-center border-t-2 border-[#CD7F32]">
                  <span className="text-4xl">🥉</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20"
        >
          <h3 className="text-white text-xl font-bold mb-4">Top 10 Rankings</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 10).map((user, index) => {
              const isCurrentUser = user.email === currentUserEmail;
              return (
                <motion.div
                  key={user.email}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className={`p-4 rounded-[15px] border-2 transition-all duration-300 ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-[#00F5D4]/20 to-[#FF4D9D]/20 border-[#00F5D4] shadow-[0_0_30px_rgba(0,245,212,0.4)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{
                          backgroundColor: `${getRankColor(user.rank)}30`,
                          color: getRankColor(user.rank),
                          border: `2px solid ${getRankColor(user.rank)}`,
                        }}
                      >
                        {user.rank}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B2EFF] to-[#00F5D4] flex items-center justify-center text-white font-bold text-lg">
                        {user.avatar}
                      </div>

                      {/* User Info */}
                      <div>
                        <p className="text-white font-semibold flex items-center gap-2">
                          {user.name}
                          {isCurrentUser && (
                            <span className="text-xs bg-[#00F5D4] text-white px-2 py-1 rounded-full">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </div>

                    {/* Score and Badge */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <span className="text-2xl">{getBadgeEmoji(user.badge)}</span>
                        <p className="text-white font-bold text-xl">{user.quizScore}%</p>
                      </div>
                      <p className="text-white/60 text-sm">{user.badge}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {leaderboard.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 text-center"
          >
            <Trophy className="w-16 h-16 text-[#FFD700] mx-auto mb-4 opacity-50" />
            <h3 className="text-white text-xl font-semibold mb-2">No Rankings Yet</h3>
            <p className="text-white/60 mb-6">Take a quiz to appear on the leaderboard!</p>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white px-8 py-3 rounded-[20px] font-semibold shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
            >
              Take Quiz
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-[20px] border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate('/planner')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">📅</div>
            <span className="text-xs">Planner</span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">🧠</div>
            <span className="text-xs">Quiz</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
