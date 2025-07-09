import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, MessageSquare } from 'lucide-react';

interface TranscriptionBoxProps {
  transcript: string;
  isRecording: boolean;
  isUserTurn: boolean;
}

const TranscriptionBox: React.FC<TranscriptionBoxProps> = ({ 
  transcript, 
  isRecording, 
  isUserTurn 
}) => {
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // TODO: Implement Whisper API integration for speech-to-text
  const dummyTranscript = isUserTurn 
    ? "This is where your live speech-to-text will appear. The Whisper API will convert your speech to text in real-time."
    : "AI Speaker: This is where the AI's speech will be transcribed. The system will process the AI's generated speech and display it here.";

  return (
    <div className="h-64">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Live Transcription</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isRecording ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center space-x-2 text-red-400"
            >
              <Mic className="w-4 h-4" />
              <span className="text-sm font-medium">Recording</span>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <MicOff className="w-4 h-4" />
              <span className="text-sm font-medium">Stopped</span>
            </div>
          )}
        </div>
      </div>

      <div
        ref={transcriptRef}
        className="h-48 p-4 bg-gray-700 rounded-lg border border-gray-600 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {transcript || dummyTranscript ? (
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 leading-relaxed"
            >
              {transcript || dummyTranscript}
            </motion.p>
            {isRecording && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center space-x-2 text-blue-400"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Listening...</span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {isUserTurn ? 'Start recording to see your speech here' : 'Waiting for AI to speak...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* TODO: Add Whisper API integration */}
      <div className="mt-2 text-xs text-gray-500">
        TODO: Integrate Whisper API for real-time speech-to-text conversion
      </div>
    </div>
  );
};

export default TranscriptionBox;