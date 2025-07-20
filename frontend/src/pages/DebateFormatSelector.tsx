import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, Trophy, CheckCircle } from 'lucide-react';

const DebateFormatSelector: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const formats = [
    {
      id: 'asian-parliamentary',
      name: 'Asian Parliamentary',
      description: 'Traditional parliamentary debate format with government and opposition sides',
      features: [
        '6 speakers total',
        '7-minute speeches',
        'Points of Information allowed',
        'Structured roles and responsibilities'
      ],
      duration: '45 minutes',
      difficulty: 'Advanced'
    },
    {
      id: 'practice-debate',
      name: 'Practice Debates',
      description: 'Flexible format perfect for skill development and casual practice',
      features: [
        'Customizable speaker count',
        'Adjustable speech times',
        'Relaxed format',
        'Focus on skill building'
      ],
      duration: '20-40 minutes',
      difficulty: 'Beginner-Friendly'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ArguMentor
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Debate Format
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the debate format that best suits your skill level and learning goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formats.map((format, index) => (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border cursor-pointer transition-all duration-300 ${
                  selectedFormat === format.id
                    ? 'border-blue-500 bg-opacity-70'
                    : 'border-gray-700 hover:border-purple-500'
                }`}
                onClick={() => setSelectedFormat(format.id)}
              >
                {selectedFormat === format.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{format.name}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{format.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{format.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">{format.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {format.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {selectedFormat && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12"
            >
              <Link
                to={`/motion?format=${selectedFormat}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue to Motion Selection
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DebateFormatSelector;