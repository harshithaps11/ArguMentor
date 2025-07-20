import React from 'react';
import './NotesSidebar.css';

export default function NotesSidebar({ open, onClose, notes, setNotes }) {
  if (!open) return null;
  return (
    <div className="notes-sidebar-bg" onClick={onClose}>
      <div className="notes-sidebar" onClick={e => e.stopPropagation()}>
        <div className="notes-header">
          <span>Preparation Notes</span>
          <button className="notes-close-btn" onClick={onClose}>&times;</button>
        </div>
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="• Write your bullet points here...\n• Use Enter for new points."
        />
      </div>
    </div>
  );
} 