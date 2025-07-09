const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TODO: Add environment variables for API keys
// - OpenAI API Key for GPT-4 judging
// - Whisper API Key for speech-to-text
// - ElevenLabs API Key for TTS
// - D-ID API Key for avatars

// Sample debate motions
const sampleMotions = [
  "This House believes that social media has done more harm than good to society",
  "This House would ban all forms of advertising targeting children",
  "This House supports the implementation of universal basic income",
  "This House believes that artificial intelligence will ultimately benefit humanity",
  "This House would prioritize environmental protection over economic growth",
  "This House supports the legalization of all recreational drugs",
  "This House believes that space exploration should be prioritized over ocean exploration",
  "This House would implement a four-day work week as standard practice",
  "This House believes that genetic engineering should be used to enhance human capabilities",
  "This House would ban private ownership of firearms",
  "This House supports mandatory military service for all citizens",
  "This House believes that cryptocurrency should replace traditional currency",
  "This House would implement a global carbon tax",
  "This House supports the right to disconnect from work communications",
  "This House believes that animal testing should be completely abolished"
];

// Routes

// Generate random motion
app.get('/api/motion/random', (req, res) => {
  const randomMotion = sampleMotions[Math.floor(Math.random() * sampleMotions.length)];
  res.json({ motion: randomMotion });
});

// Get all sample motions
app.get('/api/motions', (req, res) => {
  res.json({ motions: sampleMotions });
});

// AI Judge endpoint - analyzes all speeches and returns feedback
app.post('/api/judge/analyze', (req, res) => {
  const { speeches, motion, format } = req.body;
  
  // TODO: Implement GPT-4 analysis
  // This should:
  // 1. Analyze each speech for argument structure, evidence quality, rebuttal skills
  // 2. Evaluate overall debate performance
  // 3. Provide specific feedback and suggestions
  // 4. Score different aspects of the debate
  
  // Mock response for now
  const mockAnalysis = {
    overallScore: 8.5,
    criteria: [
      { name: 'Argument Structure', score: 8, feedback: 'Clear logical flow with strong opening and conclusion' },
      { name: 'Evidence Quality', score: 7, feedback: 'Good use of examples, could benefit from more statistics' },
      { name: 'Rebuttal Skills', score: 9, feedback: 'Excellent counter-arguments and point-by-point refutation' },
      { name: 'Delivery Style', score: 8, feedback: 'Confident presentation with good pace and emphasis' }
    ],
    suggestions: [
      'Consider addressing the opposition\'s strongest argument earlier',
      'Use more varied rhetorical devices to enhance persuasion',
      'Strengthen the conclusion with a memorable closing statement'
    ],
    individualScores: speeches.map((speech, index) => ({
      speaker: speech.speaker,
      score: 7 + Math.random() * 2, // Random score between 7-9
      feedback: `Speaker ${index + 1} delivered a solid performance with room for improvement in evidence presentation.`
    }))
  };
  
  res.json(mockAnalysis);
});

// Speech-to-text endpoint
app.post('/api/speech/transcribe', (req, res) => {
  const { audioData } = req.body;
  
  // TODO: Implement Whisper API integration
  // This should:
  // 1. Accept audio data from the frontend
  // 2. Send to Whisper API for transcription
  // 3. Return the transcribed text
  
  // Mock response for now
  res.json({ 
    transcript: "This is a mock transcription. The Whisper API will provide real-time speech-to-text conversion.",
    confidence: 0.95 
  });
});

// Text-to-speech endpoint for AI avatars
app.post('/api/speech/generate', (req, res) => {
  const { text, speaker, voice } = req.body;
  
  // TODO: Implement ElevenLabs or browser TTS integration
  // This should:
  // 1. Generate speech audio from text
  // 2. Return audio file or stream
  // 3. Support different voices for different AI characters
  
  // Mock response for now
  res.json({ 
    audioUrl: "/mock-audio.mp3",
    duration: 30,
    voice: voice || "default"
  });
});

// Avatar animation endpoint
app.post('/api/avatar/animate', (req, res) => {
  const { speakerId, text, emotion } = req.body;
  
  // TODO: Implement D-ID or Ready Player Me integration
  // This should:
  // 1. Generate avatar animations based on speech
  // 2. Support different emotions and expressions
  // 3. Return animation data or video stream
  
  // Mock response for now
  res.json({ 
    animationUrl: "/mock-animation.mp4",
    duration: 30,
    emotion: emotion || "neutral"
  });
});

// AI opponent speech generation
app.post('/api/ai/generate-speech', (req, res) => {
  const { motion, role, previousSpeeches, timeRemaining } = req.body;
  
  // TODO: Implement GPT-4 speech generation
  // This should:
  // 1. Generate contextually appropriate debate speech
  // 2. Consider the role (PM, LO, etc.) and format
  // 3. Respond to previous arguments
  // 4. Maintain consistent AI personality
  
  // Mock response for now
  const mockSpeech = {
    text: `As the ${role}, I must respectfully disagree with the previous speaker's arguments. The motion "${motion}" requires us to consider several key factors that have not been adequately addressed. First, we must examine the economic implications...`,
    keyPoints: [
      "Economic impact analysis",
      "Social consequences",
      "Implementation challenges",
      "Long-term effects"
    ],
    rebuttalTargets: previousSpeeches.slice(-2).map(speech => ({
      originalPoint: speech.keyPoint,
      rebuttal: "Counter-argument addressing this point"
    }))
  };
  
  res.json(mockSpeech);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`ArguMentor backend server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/health - Health check');
  console.log('  GET  /api/motion/random - Get random motion');
  console.log('  GET  /api/motions - Get all sample motions');
  console.log('  POST /api/judge/analyze - AI judge analysis');
  console.log('  POST /api/speech/transcribe - Speech-to-text');
  console.log('  POST /api/speech/generate - Text-to-speech');
  console.log('  POST /api/avatar/animate - Avatar animation');
  console.log('  POST /api/ai/generate-speech - AI opponent speech');
  console.log('');
  console.log('TODO: Add the following integrations:');
  console.log('  - OpenAI Whisper API for speech-to-text');
  console.log('  - OpenAI GPT-4 API for AI judging and speech generation');
  console.log('  - ElevenLabs API for text-to-speech');
  console.log('  - D-ID or Ready Player Me API for avatar animations');
});

module.exports = app;