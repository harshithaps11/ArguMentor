import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DebateFormatSelector from './pages/DebateFormatSelector';
import MotionPicker from './pages/MotionPicker';
import DebateRoom from './pages/DebateRoom';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/format" element={<DebateFormatSelector />} />
        <Route path="/motion" element={<MotionPicker />} />
        <Route path="/debate" element={<DebateRoom />} />
      </Routes>
    </div>
  );
}

export default App;