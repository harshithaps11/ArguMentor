import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Play, Pause } from 'lucide-react';
import AvatarPlayer from '../components/AvatarPlayer';
import SpeechTimer from '../components/SpeechTimer';
import TranscriptionBox from '../components/TranscriptionBox';
import JudgePanel from '../components/JudgePanel';

const DebateRoom: React.FC = () => {
  const [searchParams] = useSearchParams();
  const format = searchParams.get('format') || 'asian-parliamentary';
  const motion = searchParams.get('motion') || '';
  const userRole = searchParams.get('role') || '';
  
  const [isRecording, setIsRecording] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [debateStarted, setDebateStarted] = useState(false);
  const [transcript, setTranscript] = useState('');

  const speakers = [
    { id: 'pm', name: 'Prime Minister', side: 'Government', isUser: userRole === 'pm' },
    { id: 'lo', name: 'Leader of Opposition', side: 'Opposition', isUser: userRole === 'lo' },
    { id: 'dpm', name: 'Deputy Prime Minister', side: 'Government', isUser: userRole === 'dpm' },
    { id: 'dlo', name: 'Deputy Leader of Opposition', side: 'Opposition', isUser: userRole === 'dlo' },
    { id: 'gw', name: 'Government Whip', side: 'Government', isUser: userRole === 'gw' },
    { id: 'ow', name: 'Opposition Whip', side: 'Opposition', isUser: userRole === 'ow' }
  ];

  const currentSpeakerData = speakers[currentSpeaker];

  const handleNextSpeaker = () => {
    if (currentSpeaker < speakers.length - 1) {
      setCurrentSpeaker(currentSpeaker + 1);
      setTranscript('');
    }
  };

  const handleStartDebate = () => {
    setDebateStarted(true);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement Whisper API integration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/motion"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Motion</span>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ArguMentor
          </h1>
        </div>
      </header>

      {/* Debate Stage */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Motion Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {motion}
            </h2>
            <div className="flex items-center justify-center space-x-4 text-gray-300">
              <span>Format: {format === 'asian-parliamentary' ? 'Asian Parliamentary' : 'Practice Debate'}</span>
              <span>•</span>
              <span>Current Speaker: {currentSpeakerData?.name}</span>
            </div>
          </motion.div>

          {/* Debate Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Government */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-400 text-center">Government</h3>
              {speakers.filter(s => s.side === 'Government').map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    currentSpeakerData?.id === speaker.id
                      ? 'border-green-500 bg-green-500 bg-opacity-20'
                      : 'border-gray-700 bg-gray-800 bg-opacity-50'
                  }`}
                >
                  <AvatarPlayer
                    name={speaker.name}
                    isUser={speaker.isUser}
                    isActive={currentSpeakerData?.id === speaker.id}
                    side={speaker.side}
                  />
                </motion.div>
              ))}
            </div>

            {/* Center - Current Speaker & Timer */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
              >
                <SpeechTimer
                  isActive={debateStarted}
                  speakerName={currentSpeakerData?.name || ''}
                  onTimeUp={handleNextSpeaker}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
              >
                <TranscriptionBox
                  transcript={transcript}
                  isRecording={isRecording}
                  isUserTurn={currentSpeakerData?.isUser || false}
                />
              </motion.div>

              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex justify-center space-x-4"
              >
                {!debateStarted ? (
                  <button
                    onClick={handleStartDebate}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Debate</span>
                  </button>
                ) : (
                  <>
                    {currentSpeakerData?.isUser && (
                      <button
                        onClick={toggleRecording}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          isRecording
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                      </button>
                    )}
                    <button
                      onClick={handleNextSpeaker}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <span>Next Speaker</span>
                    </button>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right Side - Opposition */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-red-400 text-center">Opposition</h3>
              {speakers.filter(s => s.side === 'Opposition').map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    currentSpeakerData?.id === speaker.id
                      ? 'border-red-500 bg-red-500 bg-opacity-20'
                      : 'border-gray-700 bg-gray-800 bg-opacity-50'
                  }`}
                >
                  <AvatarPlayer
                    name={speaker.name}
                    isUser={speaker.isUser}
                    isActive={currentSpeakerData?.id === speaker.id}
                    side={speaker.side}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Judge Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <JudgePanel
              debateStarted={debateStarted}
              currentSpeaker={currentSpeaker}
              totalSpeakers={speakers.length}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DebateRoom;