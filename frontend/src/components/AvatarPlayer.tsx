import React from 'react';
import { motion } from 'framer-motion';
import { User, Crown, Shield } from 'lucide-react';

interface AvatarPlayerProps {
  name: string;
  isUser: boolean;
  isActive: boolean;
  side: string;
}

const AvatarPlayer: React.FC<AvatarPlayerProps> = ({ name, isUser, isActive, side }) => {
  const getAvatarColor = () => {
    if (isUser) return 'from-blue-500 to-purple-600';
    if (side === 'Government') return 'from-green-500 to-emerald-600';
    return 'from-red-500 to-pink-600';
  };

  const getIcon = () => {
    if (isUser) return <Crown className="w-6 h-6" />;
    if (side === 'Government') return <Shield className="w-6 h-6" />;
    return <User className="w-6 h-6" />;
  };

  return (
    <div className="text-center">
      <motion.div
        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`relative w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center ${
          isActive ? 'ring-4 ring-white ring-opacity-50' : ''
        }`}
      >
        {getIcon()}
        {isActive && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </motion.div>
      
      <div className="space-y-1">
        <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {name}
        </h4>
        <p className={`text-sm ${isUser ? 'text-blue-400' : 'text-gray-400'}`}>
          {isUser ? 'You' : 'AI'}
        </p>
      </div>

      {/* TODO: Add D-ID or Ready Player Me avatar integration */}
      {/* TODO: Add ElevenLabs or browser TTS for AI speech */}
    </div>
  );
};

export default AvatarPlayer;