# ArguMentor - AI-Powered Debate Simulation

ArguMentor is an interactive web application that helps users practice and improve their debate skills through AI-powered simulations. Users can engage in parliamentary debates, receive real-time feedback from AI judges, and interact with intelligent AI opponents.

## Features

### 🎯 Core Functionality
- **Multiple Debate Formats**: Asian Parliamentary and Practice Debates
- **AI Opponents**: Debate against sophisticated AI avatars with unique personalities
- **Real-time Speech Recognition**: Speak naturally with Whisper API integration
- **AI Judge System**: Receive detailed feedback from GPT-4 powered judges
- **Interactive Avatars**: Visual representation of speakers with animations
- **Live Transcription**: Real-time speech-to-text conversion during debates

### 🌟 User Experience
- **Beautiful Dark Theme**: Modern, professional interface design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Intuitive Navigation**: Clear user flow from format selection to debate room
- **Real-time Feedback**: Immediate analysis and scoring during debates

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **RESTful API** architecture
- **CORS** enabled for frontend communication

### AI Integration (To Be Implemented)
- **OpenAI Whisper API** - Speech-to-text conversion
- **OpenAI GPT-4 API** - AI judging and opponent speech generation
- **ElevenLabs API** - Text-to-speech for AI avatars
- **D-ID or Ready Player Me API** - Avatar animations

## Project Structure

```
argumentor/
├── src/
│   ├── components/
│   │   ├── AvatarPlayer.tsx      # Avatar display and animation
│   │   ├── SpeechTimer.tsx       # Debate timer component
│   │   ├── TranscriptionBox.tsx  # Live speech transcription
│   │   └── JudgePanel.tsx        # AI judge feedback interface
│   ├── pages/
│   │   ├── LandingPage.tsx       # Home page with intro
│   │   ├── DebateFormatSelector.tsx # Format selection
│   │   ├── MotionPicker.tsx      # Motion and role selection
│   │   └── DebateRoom.tsx        # Main debate interface
│   ├── App.tsx                   # Main app component with routing
│   └── main.tsx                  # App entry point
├── backend/
│   ├── server.js                 # Express server with API endpoints
│   ├── package.json              # Backend dependencies
│   └── .env.example              # Environment variables template
└── README.md                     # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. Backend will be available at `http://localhost:3001`

## API Endpoints

### Motion Management
- `GET /api/motion/random` - Get a random debate motion
- `GET /api/motions` - Get all available motions

### AI Services
- `POST /api/judge/analyze` - Submit speeches for AI judge analysis
- `POST /api/speech/transcribe` - Convert speech to text
- `POST /api/speech/generate` - Generate AI speech audio
- `POST /api/avatar/animate` - Generate avatar animations
- `POST /api/ai/generate-speech` - Generate AI opponent speeches

### Utility
- `GET /api/health` - Health check endpoint

## Usage Guide

### 1. Choose Debate Format
- Select between Asian Parliamentary or Practice Debates
- Each format has different rules and speaker arrangements

### 2. Set Motion and Role
- Enter a custom motion or generate a random one
- Choose your speaking position (PM, LO, etc.)

### 3. Enter Debate Room
- See all speakers arranged in traditional debate format
- Government speakers on the left, Opposition on the right
- Your position is highlighted with a crown icon

### 4. Participate in Debate
- Use the microphone button to record your speech
- See live transcription of your words
- AI opponents will respond automatically
- Timer tracks your speech duration

### 5. Receive Feedback
- AI judge provides real-time analysis
- Get detailed scores on argument structure, evidence quality, and delivery
- Receive specific suggestions for improvement

## Development Roadmap

### Phase 1: Current Implementation
- ✅ Basic React frontend with routing
- ✅ Component structure and UI design
- ✅ Backend API skeleton with mock data
- ✅ Timer and transcription UI components

### Phase 2: AI Integration
- 🔄 OpenAI Whisper API for speech-to-text
- 🔄 GPT-4 integration for AI judging
- 🔄 AI opponent speech generation
- 🔄 ElevenLabs text-to-speech integration

### Phase 3: Avatar System
- 🔄 D-ID or Ready Player Me avatar integration
- 🔄 Lip-sync and facial animation
- 🔄 Voice matching with avatar personalities

### Phase 4: Advanced Features
- 🔄 User authentication and profiles
- 🔄 Debate history and performance tracking
- 🔄 Custom AI opponent personalities
- 🔄 Advanced debate formats and rules

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for Whisper and GPT-4 APIs
- ElevenLabs for text-to-speech technology
- D-ID for avatar animation capabilities
- The debate community for format standards and best practices

---

**Note**: This is the initial version with UI components and backend skeleton. AI integrations are marked as TODO items and will be implemented in subsequent phases.