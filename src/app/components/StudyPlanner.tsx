import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Target } from 'lucide-react';

interface SubjectPlan {
  name: string;
  studyHours: string;
  priority: 'high' | 'medium' | 'low';
  daysLeft: number;
}

export function StudyPlanner() {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState<SubjectPlan[]>([]);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      const { subjects } = JSON.parse(savedSubjects);

      // Generate study plan based on difficulty
      const plan: SubjectPlan[] = subjects.map((subject: any) => {
        let priority: 'high' | 'medium' | 'low' = 'medium';
        let studyHours = '3-4 hrs';

        // Map difficulty to priority and study hours
        if (subject.difficulty === 'Hard') {
          priority = 'high';
          studyHours = '6-7 hrs';
        } else if (subject.difficulty === 'Medium') {
          priority = 'medium';
          studyHours = '3-4 hrs';
        } else if (subject.difficulty === 'Easy') {
          priority = 'low';
          studyHours = '1-2 hrs';
        }

        // Calculate days left if exam date exists
        let daysLeft = 0;
        if (subject.examDate) {
          const examDate = new Date(subject.examDate);
          const today = new Date();
          daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        }

        return {
          name: subject.name,
          studyHours,
          priority,
          daysLeft,
        };
      });

      // Sort by priority (high -> medium -> low) and then by days left
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      setStudyPlan(
        plan.sort((a, b) => {
          if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          return a.daysLeft - b.daysLeft;
        })
      );
    }
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF4D9D';
      case 'medium':
        return '#FFD700';
      case 'low':
        return '#00F5D4';
      default:
        return '#5B2EFF';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Priority';
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Smart Study Planner</h1>
          </div>

          {/* View Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-6 py-2 rounded-[20px] font-semibold transition-all duration-300 ${
                viewMode === 'timeline'
                  ? 'bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2 rounded-[20px] font-semibold transition-all duration-300 ${
                viewMode === 'calendar'
                  ? 'bg-gradient-to-r from-[#FF4D9D] to-[#5B2EFF] text-white shadow-[0_0_20px_rgba(255,77,157,0.4)]'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {studyPlan.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20 text-center"
          >
            <Target className="w-16 h-16 text-[#00F5D4] mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No Study Plan Yet</h3>
            <p className="text-white/60 mb-6">Add subjects to generate your personalized study plan</p>
            <button
              onClick={() => navigate('/subject-input')}
              className="bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white px-8 py-3 rounded-[20px] font-semibold shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
            >
              Add Subjects
            </button>
          </motion.div>
        ) : (
          <>
            {/* AI Generated Schedule Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#00F5D4]/20 to-[#FF4D9D]/20 backdrop-blur-[20px] rounded-[20px] p-6 border border-[#00F5D4]/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5D4] to-[#FF4D9D] flex items-center justify-center">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="text-white text-lg font-semibold">AI-Generated Study Schedule</h3>
              </div>
              <p className="text-white/80 text-sm">
                Your personalized study plan based on exam dates and difficulty levels
              </p>
            </motion.div>

            {/* Subject Cards */}
            {studyPlan.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(0,245,212,0.2)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">{subject.name}</h3>
                    <div className="flex items-center gap-2">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getPriorityColor(subject.priority)}30`,
                          color: getPriorityColor(subject.priority),
                          border: `1px solid ${getPriorityColor(subject.priority)}`,
                        }}
                      >
                        {getPriorityLabel(subject.priority)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-sm mb-1">
                      {subject.daysLeft > 0 ? 'Days Left' : 'Exam Date'}
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {subject.daysLeft > 0 ? subject.daysLeft : 'Not Set'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-[15px] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-[#00F5D4]" />
                      <span className="text-white/60 text-sm">Daily Study</span>
                    </div>
                    <div className="text-white text-lg font-semibold">{subject.studyHours}</div>
                  </div>
                  <div className="bg-white/5 rounded-[15px] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-[#FF4D9D]" />
                      <span className="text-white/60 text-sm">Status</span>
                    </div>
                    <div className="text-white text-lg font-semibold">
                      {subject.daysLeft === 0
                        ? 'Plan Set'
                        : subject.daysLeft <= 7
                        ? 'Urgent'
                        : subject.daysLeft <= 14
                        ? 'Soon'
                        : 'On Track'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
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
            className="flex flex-col items-center gap-1 text-[#00F5D4]"
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
