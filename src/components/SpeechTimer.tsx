import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

interface SpeechTimerProps {
  isActive: boolean;
  speakerName: string;
  onTimeUp: () => void;
  duration?: number; // in seconds, default 420 (7 minutes)
}

const SpeechTimer: React.FC<SpeechTimerProps> = ({ 
  isActive, 
  speakerName, 
  onTimeUp, 
  duration = 420 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          onTimeUp();
          return 0;
        }
        
        // Warning in last 30 seconds
        if (prevTime <= 30) {
          setIsWarning(true);
        }
        
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsWarning(false);
  }, [speakerName, duration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Speech Timer</h3>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 mb-2">Current Speaker:</p>
        <p className="text-xl font-bold text-white">{speakerName}</p>
      </div>

      <div className="relative mb-4">
        <div className="w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isWarning ? "#ef4444" : "#3b82f6"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isWarning ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className={`text-3xl font-bold ${isWarning ? 'text-red-400' : 'text-white'}`}
          >
            {formatTime(timeLeft)}
          </motion.div>
        </div>
      </div>

      {isWarning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-2 text-red-400"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Time running out!</span>
        </motion.div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        {isActive ? 'Timer Active' : 'Timer Paused'}
      </div>
    </div>
  );
};

export default SpeechTimer;