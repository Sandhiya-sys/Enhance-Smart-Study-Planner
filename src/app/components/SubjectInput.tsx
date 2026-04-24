import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Calendar } from 'lucide-react';

interface SubjectData {
  name: string;
  examDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export function SubjectInput() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('');
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  const handleNumSubjectsChange = (num: number) => {
    setNumSubjects(num);
    const newSubjects: SubjectData[] = [];
    for (let i = 0; i < num; i++) {
      newSubjects.push({
        name: subjects[i]?.name || '',
        examDate: subjects[i]?.examDate || '',
        difficulty: subjects[i]?.difficulty || 'Medium',
      });
    }
    setSubjects(newSubjects);
  };

  const updateSubject = (index: number, field: keyof SubjectData, value: string) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const handleSave = () => {
    localStorage.setItem('subjects', JSON.stringify({ department, subjects }));
    alert('Subjects saved successfully!');
    navigate('/planner');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#00F5D4';
      case 'Medium':
        return '#FFD700';
      case 'Hard':
        return '#FF4D9D';
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
          <h1 className="text-2xl font-bold text-white">Add Subjects & Exams</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Department Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20"
        >
          <label className="text-white text-sm mb-3 block">Enter Department / Course</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-white/5 border-2 border-[#00F5D4]/30 rounded-[20px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00F5D4] focus:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300"
            placeholder="e.g. B.Sc Computer Science"
          />
        </motion.div>

        {/* Number of Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20"
        >
          <label className="text-white text-sm mb-3 block">Number of Subjects</label>
          <input
            type="number"
            min="0"
            max="10"
            value={numSubjects}
            onChange={(e) => handleNumSubjectsChange(parseInt(e.target.value) || 0)}
            className="w-full bg-white/5 border-2 border-[#FF4D9D]/30 rounded-[20px] px-4 py-3 text-white focus:outline-none focus:border-[#FF4D9D] focus:shadow-[0_0_20px_rgba(255,77,157,0.3)] transition-all duration-300"
            placeholder="Enter number of subjects"
          />
        </motion.div>

        {/* Dynamic Subject Fields */}
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-6 border border-white/20 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Subject {index + 1}</h3>
              <button
                onClick={() => {
                  const updated = subjects.filter((_, i) => i !== index);
                  setSubjects(updated);
                  setNumSubjects(updated.length);
                }}
                className="w-8 h-8 rounded-full bg-[#FF4D9D]/20 flex items-center justify-center hover:bg-[#FF4D9D]/40 transition-all"
              >
                <Trash2 className="w-4 h-4 text-[#FF4D9D]" />
              </button>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Subject Name</label>
              <input
                type="text"
                value={subject.name}
                onChange={(e) => updateSubject(index, 'name', e.target.value)}
                className="w-full bg-white/5 border-2 border-[#00F5D4]/30 rounded-[20px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00F5D4] focus:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300"
                placeholder="Enter subject name"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Exam Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5B2EFF] w-5 h-5 pointer-events-none" />
                <input
                  type="date"
                  value={subject.examDate}
                  onChange={(e) => updateSubject(index, 'examDate', e.target.value)}
                  className="w-full bg-white/5 border-2 border-[#5B2EFF]/30 rounded-[20px] pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#5B2EFF] focus:shadow-[0_0_20px_rgba(91,46,255,0.3)] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-3 block">Difficulty Level</label>
              <div className="flex gap-3">
                {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => updateSubject(index, 'difficulty', level)}
                    className={`flex-1 py-3 rounded-[20px] font-semibold transition-all duration-300 ${
                      subject.difficulty === level
                        ? 'text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                    style={
                      subject.difficulty === level
                        ? {
                            backgroundColor: getDifficultyColor(level) + '40',
                            borderColor: getDifficultyColor(level),
                            borderWidth: '2px',
                            boxShadow: `0 0 20px ${getDifficultyColor(level)}60`,
                          }
                        : {}
                    }
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Save Button */}
        {subjects.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#00F5D4] via-[#5B2EFF] to-[#FF4D9D] text-white font-bold py-4 rounded-[20px] shadow-[0_0_30px_rgba(91,46,255,0.5)] hover:shadow-[0_0_40px_rgba(91,46,255,0.8)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Save Subjects
          </motion.button>
        )}
      </div>
    </div>
  );
}
