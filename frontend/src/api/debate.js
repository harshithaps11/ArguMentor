export async function fetchTTS(text) {
  const res = await fetch('http://localhost:8000/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('TTS failed');
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export async function startDebate(debateType) {
  const res = await fetch('http://localhost:8000/start-debate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: debateType })
  });
  if (!res.ok) throw new Error('Failed to start debate');
  return await res.json();
}

export async function fetchDebateSpeeches() {
  const res = await fetch('http://localhost:8000/debate-speeches');
  if (!res.ok) throw new Error('Failed to fetch speeches');
  return await res.json(); // [{role, text, audioUrl, avatarUrl}]
} 