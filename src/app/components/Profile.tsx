import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Trophy, Target, Clock, LogOut } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
    } else {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      // Load saved profile image if exists
      const savedImage = localStorage.getItem(`profileImage_${userData.email}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Read and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        // Save to localStorage
        if (user?.email) {
          localStorage.setItem(`profileImage_${user.email}`, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  if (!user) return null;

  const profileStats = [
    { label: 'Quiz Score', value: `${user.quizScore}%`, icon: Trophy, color: '#FFD700' },
    { label: 'Study Streak', value: `${user.studyStreak} days`, icon: Target, color: '#FF4D9D' },
    { label: 'Total Study Hours', value: `${user.totalStudyHours} hrs`, icon: Clock, color: '#00F5D4' },
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

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-[20px] border-b border-white/10 p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 shadow-[0_0_30px_rgba(0,245,212,0.2)]"
        >
          <div className="flex flex-col items-center">
            {/* Avatar with upload overlay */}
            <div className="relative group mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {profileImage ? (
                <div
                  onClick={handleProfilePhotoClick}
                  className="w-32 h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,245,212,0.6)] group-hover:shadow-[0_0_50px_rgba(0,245,212,0.9)] transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  onClick={handleProfilePhotoClick}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-[#5B2EFF] to-[#00F5D4] flex items-center justify-center text-white text-5xl font-bold shadow-[0_0_40px_rgba(0,245,212,0.6)] group-hover:shadow-[0_0_50px_rgba(0,245,212,0.9)] transition-all duration-300 cursor-pointer"
                >
                  {user.avatar}
                </div>
              )}
              <button
                onClick={handleProfilePhotoClick}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D9D] to-[#5B2EFF] flex items-center justify-center shadow-[0_0_20px_rgba(255,77,157,0.5)] hover:shadow-[0_0_30px_rgba(255,77,157,0.8)] transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Info */}
            <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
            <p className="text-white/60 mb-4">{user.email}</p>

            {/* Badge */}
            <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FF4D9D]/20 px-6 py-3 rounded-full border border-[#FFD700]/30 flex items-center gap-2">
              <span className="text-2xl">{getBadgeEmoji(user.badge)}</span>
              <span className="text-white font-semibold">{user.badge} Rank</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profileStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    boxShadow: `0 0 20px ${stat.color}40`,
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-white/60 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Edit Profile Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white font-semibold py-4 rounded-[20px] shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:shadow-[0_0_40px_rgba(0,245,212,0.6)] transition-all duration-300"
        >
          Edit Profile
        </motion.button>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-transparent border-2 border-[#FF4D9D] text-[#FF4D9D] font-semibold py-4 rounded-[20px] shadow-[0_0_20px_rgba(255,77,157,0.3)] hover:shadow-[0_0_30px_rgba(255,77,157,0.5)] hover:bg-[#FF4D9D]/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
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
            className="flex flex-col items-center gap-1 text-[#00F5D4]"
          >
            <div className="w-6 h-6 flex items-center justify-center">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
