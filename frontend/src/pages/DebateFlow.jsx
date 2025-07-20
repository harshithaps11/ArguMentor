import React, { useEffect, useRef, useState } from 'react';
import './DebateFlow.css';
import { fetchDebateSpeeches } from '../api/debate';

// Placeholder roles and avatars
const ROLES = [
  'Prime Minister',
  'Opposition Leader',
  'Deputy PM',
  'Deputy OL',
  'Govt Whip',
  'Opposition Whip',
  'AI Judge',
];
const AVATARS = [
  '/avatars/pm.png',
  '/avatars/ol.png',
  '/avatars/dpm.png',
  '/avatars/dol.png',
  '/avatars/gw.png',
  '/avatars/ow.png',
  '/avatars/judge.png',
];

export default function DebateFlow() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [speeches, setSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    async function getSpeeches() {
      setLoading(true);
      const data = await fetchDebateSpeeches();
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
    <div className="debateflow-bg">
      <div className="debateflow-speaker">
        <img src={speech.avatarUrl} alt={speech.role} className="debateflow-avatar" />
        <div className="debateflow-role">{speech.role}</div>
      </div>
      <div className="debateflow-speechbox">
        <div className="debateflow-speechtext">{speech.text}</div>
        <audio ref={audioRef} controls style={{ width: '100%', marginTop: 12 }} />
      </div>
      <div className="debateflow-controls">
        <button onClick={prevSpeech} disabled={currentIdx === 0} className="debateflow-btn">Previous</button>
        <button onClick={nextSpeech} disabled={currentIdx === speeches.length - 1} className="debateflow-btn">Next</button>
      </div>
      {/* TODO: Add POI button and backend event logging */}
    </div>
  );
} 