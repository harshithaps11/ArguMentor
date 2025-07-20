import React, { useEffect, useRef, useState } from 'react';
import './DebateRoom.css';
import NotesSidebar from './NotesSidebar';
import { fetchTTS, startDebate } from '../api/debate';
import judgeVideo from '../assets/judge-anchor.mp4'; // Use a professional anchor/judge video
import { useNavigate } from 'react-router-dom';

const JUDGE_MESSAGE = 'You have 5 minutes to prepare your arguments.';

export default function DebateRoom({ debateType = 'Asian Parliamentary' }) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [subtitles, setSubtitles] = useState('');
  const [timer, setTimer] = useState(300);
  const [judgeSmall, setJudgeSmall] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Fetch TTS audio and start timer immediately
  useEffect(() => {
    let isMounted = true;
    fetchTTS(JUDGE_MESSAGE).then(url => {
      if (isMounted) setAudioUrl(url);
    });
    let i = 0;
    function typeSubtitle() {
      setSubtitles(JUDGE_MESSAGE.slice(0, i));
      if (i < JUDGE_MESSAGE.length) {
        i++;
        setTimeout(typeSubtitle, 30);
      }
    }
    typeSubtitle();
    // Start timer immediately
    setTimer(300);
    return () => { isMounted = false; };
  }, []);

  // Play audio when ready
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  // Countdown timer logic
  useEffect(() => {
    if (timer <= 0) {
      // Optionally, you can show a message or disable the button, but do not auto-navigate
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  async function handleStartDebate() {
    setJudgeSmall(true);
    // Hide the timer by setting it to null or a flag
    setTimer(null);
    await startDebate(debateType);
    setTimeout(() => {
      navigate('/debate/flow');
    }, 500);
  }

  return (
    <div className="debate-room-bg">
      <div className={`judge-section ${judgeSmall ? 'judge-small' : ''}`}>
        <video
          src={judgeVideo}
          className="judge-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <audio ref={audioRef} src={audioUrl} />
        <div className="judge-subtitles">{subtitles}</div>
        {timer !== null && (
          <div className="prep-timer">
            <span>Preparation Time: <span className="timer-count">{formatTime(timer)}</span></span>
          </div>
        )}
      </div>
      <button
        className="notes-fab"
        aria-label="Open notes"
        onClick={() => setNotesOpen(true)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11"></path><path d="M21 15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <NotesSidebar open={notesOpen} onClose={() => setNotesOpen(false)} notes={notes} setNotes={setNotes} />
      <button className="start-debate-btn gradient-btn" onClick={handleStartDebate}>
        Start Debate
      </button>
    </div>
  );
} 