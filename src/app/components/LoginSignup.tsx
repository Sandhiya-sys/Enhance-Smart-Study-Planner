import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, User, Sparkles } from 'lucide-react';

export function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          navigate('/dashboard');
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('No account found. Please sign up first.');
      }
    } else {
      const user = {
        name,
        email,
        password,
        avatar: name.charAt(0).toUpperCase(),
        quizScore: 0,
        studyStreak: 0,
        totalStudyHours: 0,
        rank: 0,
        badge: 'Bronze'
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Initialize leaderboard
      const leaderboard = localStorage.getItem('leaderboard');
      if (!leaderboard) {
        localStorage.setItem('leaderboard', JSON.stringify([user]));
      } else {
        const board = JSON.parse(leaderboard);
        board.push(user);
        localStorage.setItem('leaderboard', JSON.stringify(board));
      }
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] flex items-center justify-center p-4 font-['Poppins']">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F5D4] rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex flex-col items-center justify-center space-y-6"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-64 h-64 bg-gradient-to-br from-[#00F5D4] to-[#FF4D9D] rounded-full opacity-20 blur-3xl"
            />
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-[#00F5D4]" />
          </div>
          <h2 className="text-4xl font-bold text-white text-center">
            Smart Study Planner
          </h2>
          <p className="text-[#00F5D4] text-center text-lg italic">
            "Small steps every day lead to big success."
          </p>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 shadow-[0_0_40px_rgba(0,245,212,0.3)]"
        >
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-[20px] font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white shadow-[0_0_20px_rgba(0,245,212,0.5)]'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-[20px] font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#FF4D9D] to-[#5B2EFF] text-white shadow-[0_0_20px_rgba(255,77,157,0.5)]'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-white/80 text-sm mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00F5D4] w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="w-full bg-white/5 border-2 border-[#00F5D4]/30 rounded-[20px] pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00F5D4] focus:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="text-white/80 text-sm mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00F5D4] w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border-2 border-[#00F5D4]/30 rounded-[20px] pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00F5D4] focus:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF4D9D] w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border-2 border-[#FF4D9D]/30 rounded-[20px] pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF4D9D] focus:shadow-[0_0_20px_rgba(255,77,157,0.3)] transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#00F5D4] via-[#5B2EFF] to-[#FF4D9D] text-white font-bold py-4 rounded-[20px] shadow-[0_0_30px_rgba(91,46,255,0.5)] hover:shadow-[0_0_40px_rgba(91,46,255,0.8)] transition-all duration-300"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
