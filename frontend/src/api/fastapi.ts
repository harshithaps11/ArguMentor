import axios from 'axios';

const FASTAPI_BASE = 'http://localhost:8000';

export async function getRandomMotion() {
  try {
    const res = await axios.get(`${FASTAPI_BASE}/generate-motion`);
    return res.data;
  } catch (e) {
    return { motion: 'Failed to fetch motion' };
  }
}

// Placeholder for future TTS integration
export async function getJudgeIntro() {
  // return axios.post(`${FASTAPI_BASE}/tts`, { text: 'You have 5 min to prepare' });
} 