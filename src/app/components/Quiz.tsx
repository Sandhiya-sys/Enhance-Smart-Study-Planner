import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { subjects } from '../data/subjects';

export function Quiz() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject);

  // Collect 15 MCQs from all units
  const getAllMCQs = () => {
    if (!selectedSubjectData) return [];

    const allMCQs: any[] = [];
    selectedSubjectData.units.forEach(unit => {
      if (unit.mcqs && unit.mcqs.length > 0) {
        allMCQs.push(...unit.mcqs);
      }
    });

    // Return first 15 MCQs
    return allMCQs.slice(0, 15);
  };

  const mcqs = getAllMCQs();

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const startQuiz = () => {
    if (!selectedSubject) {
      alert('Please select a subject to generate 15 MCQs.');
      return;
    }

    if (mcqs.length < 15) {
      alert('Not enough questions available for this subject. Please select another subject.');
      return;
    }

    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(15).fill(-1));
    setTimeRemaining(600);

    // Start timer
    const timer = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerInterval(timer);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < 14) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Clear timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    let correctAnswers = 0;
    mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.correctAnswer) {
        correctAnswers++;
      }
    });

    const totalQuestions = 15;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Save quiz results
    const quizResult = {
      subject: selectedSubjectData?.name || '',
      score: correctAnswers,
      total: totalQuestions,
      percentage: percentage,
      correct: correctAnswers,
      wrong: wrongAnswers
    };

    localStorage.setItem('quizResult', JSON.stringify(quizResult));

    // Update user score
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.quizScore = percentage;

    // Determine badge based on score
    if (percentage >= 80) {
      currentUser.badge = 'Gold';
    } else if (percentage >= 60) {
      currentUser.badge = 'Silver';
    } else {
      currentUser.badge = 'Bronze';
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update leaderboard
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const userIndex = leaderboard.findIndex((u: any) => u.email === currentUser.email);
    if (userIndex !== -1) {
      leaderboard[userIndex] = currentUser;
    } else {
      leaderboard.push(currentUser);
    }

    // Sort by score and assign ranks
    leaderboard.sort((a: any, b: any) => b.quizScore - a.quizScore);
    leaderboard.forEach((user: any, index: number) => {
      user.rank = index + 1;
    });

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    navigate('/result');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / 15) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a0a2e] to-[#5B2EFF] font-['Poppins'] pb-24 relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF4D9D] rounded-full"
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Quiz Challenge</h1>
          </div>

          {quizStarted && (
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-[20px]">
              <Clock className="w-5 h-5 text-[#FF4D9D]" />
              <span className="text-white font-bold text-lg">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        {!quizStarted ? (
          /* Subject Selection */
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20"
            >
              <h2 className="text-white text-2xl font-bold mb-6 text-center">Select Subject for Quiz</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`p-6 rounded-[20px] border-2 transition-all duration-300 text-left ${
                      selectedSubject === subject.id
                        ? 'bg-gradient-to-br from-[#00F5D4]/20 to-[#FF4D9D]/20 border-[#00F5D4] shadow-[0_0_30px_rgba(0,245,212,0.4)]'
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <h3 className="text-white font-semibold mb-2">{subject.name}</h3>
                    <p className="text-white/60 text-sm">15 Multiple Choice Questions</p>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startQuiz}
                disabled={!selectedSubject}
                className="w-full mt-8 bg-gradient-to-r from-[#00F5D4] via-[#5B2EFF] to-[#FF4D9D] text-white font-bold py-4 rounded-[20px] shadow-[0_0_30px_rgba(91,46,255,0.5)] hover:shadow-[0_0_40px_rgba(91,46,255,0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Quiz
              </motion.button>
            </motion.div>
          </div>
        ) : (
          /* Quiz Questions */
          <div className="space-y-6">
            {/* Subject Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#00F5D4]/20 to-[#5B2EFF]/20 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#00F5D4]/30 text-center"
            >
              <p className="text-white/60 text-sm">Subject</p>
              <h2 className="text-white text-xl font-bold">{selectedSubjectData?.name}</h2>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-4 border border-white/20"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">Question {currentQuestion + 1} of 15</span>
                <span className="text-white text-sm">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#00F5D4] to-[#FF4D9D]"
                />
              </div>
            </motion.div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-[20px] p-8 border border-white/20"
            >
              <h3 className="text-white text-2xl font-bold mb-8">
                {currentQuestion + 1}. {mcqs[currentQuestion]?.question}
              </h3>

              <div className="space-y-4">
                {mcqs[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-[20px] border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-gradient-to-r from-[#00F5D4]/20 to-[#5B2EFF]/20 border-[#00F5D4] shadow-[0_0_20px_rgba(0,245,212,0.3)]'
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-[#00F5D4] bg-[#00F5D4]'
                          : 'border-white/40'
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-white font-medium flex-1">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-4 rounded-[20px] hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentQuestion < 14 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-[#00F5D4] to-[#5B2EFF] text-white font-semibold py-4 rounded-[20px] shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-[#FF4D9D] to-[#5B2EFF] text-white font-semibold py-4 rounded-[20px] shadow-[0_0_20px_rgba(255,77,157,0.4)] hover:shadow-[0_0_30px_rgba(255,77,157,0.6)] transition-all duration-300"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
