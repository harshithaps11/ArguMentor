import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Play, Pause } from 'lucide-react';
import AvatarPlayer from '../components/AvatarPlayer';
import SpeechTimer from '../components/SpeechTimer';
import TranscriptionBox from '../components/TranscriptionBox';
import JudgePanel from '../components/JudgePanel';
import './DebateRoom.css';
import NotesSidebar from './NotesSidebar';
import { fetchTTS, startDebate, fetchDebateSpeeches } from '../api/debate';
import judgeVideo from '../assets/judge-anchor.mp4'; // Use a professional anchor/judge video

const DebateRoom: React.FC = () => {
  const [searchParams] = useSearchParams();
  const format = searchParams.get('format') || 'asian-parliamentary';
  const motion = searchParams.get('motion') || '';
  const userRole = searchParams.get('role') || '';
  
  const [isRecording, setIsRecording] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [debateStarted, setDebateStarted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [subtitles, setSubtitles] = useState('');
  const [timer, setTimer] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [judgeSmall, setJudgeSmall] = useState(false);
  const audioRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [speeches, setSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleStartDebate = async () => {
    setJudgeSmall(true);
    await startDebate(format);
    setTimeout(() => {
      // TODO: Implement navigation to debate flow
    }, 500); // Give a moment for backend to generate speeches
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement Whisper API integration
  };

  // Fetch and play TTS audio on mount
  useEffect(() => {
    let isMounted = true;
    fetchTTS(JUDGE_MESSAGE).then(url => {
      if (isMounted) setAudioUrl(url);
    });
    // Typing animation for subtitles
    let i = 0;
    function typeSubtitle() {
      setSubtitles(JUDGE_MESSAGE.slice(0, i));
      if (i < JUDGE_MESSAGE.length) {
        i++;
        setTimeout(typeSubtitle, 30);
      }
    }
    typeSubtitle();
    return () => { isMounted = false; };
  }, []);

  // Play audio when ready, start timer after audio
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      audioRef.current.onended = () => setTimerActive(true);
    }
  }, [audioUrl]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive) return;
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  useEffect(() => {
    async function getSpeeches() {
      setLoading(true);
      const res = await fetch('http://localhost:8000/debate-speeches');
      const data = await res.json();
      setSpeeches(data);
      setLoading(false);
    }
    getSpeeches();
  }, []);

  useEffect(() => {
    if (!speeches[currentIdx] || !speeches[currentIdx].audioUrl) return;
    if (audioRef.current) {
      audioRef.current.src = speeches[currentIdx].audioUrl;
      audioRef.current.play();
    }
  }, [currentIdx, speeches]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function nextSpeech() {
    if (currentIdx < speeches.length - 1) setCurrentIdx(i => i + 1);
  }
  function prevSpeech() {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
  }

  if (loading) {
    return (
      <div className="debateflow-bg">
        <div className="debateflow-loading">Loading debate flow...</div>
      </div>
    );
  }

  const speech = speeches[currentIdx];

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

          <div className="prep-timer">
            <span>Preparation Time: <span className="timer-count">{formatTime(timer)}</span></span>
          </div>
        </div>
      </main>

      <button
        className="notes-fab"
        aria-label="Open notes"
        onClick={() => setNotesOpen(true)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11"></path><path d="M21 15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <NotesSidebar open={notesOpen} onClose={() => setNotesOpen(false)} notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default DebateRoom;