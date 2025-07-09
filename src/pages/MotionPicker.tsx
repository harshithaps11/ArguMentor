import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shuffle, Users, Target, Mic } from 'lucide-react';

const MotionPicker: React.FC = () => {
  const [searchParams] = useSearchParams();
  const format = searchParams.get('format') || 'asian-parliamentary';
  const [customMotion, setCustomMotion] = useState('');
  const [selectedMotion, setSelectedMotion] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const sampleMotions = [
    "This House believes that social media has done more harm than good to society",
    "This House would ban all forms of advertising targeting children",
    "This House supports the implementation of universal basic income",
    "This House believes that artificial intelligence will ultimately benefit humanity",
    "This House would prioritize environmental protection over economic growth",
    "This House supports the legalization of all recreational drugs",
    "This House believes that space exploration should be prioritized over ocean exploration",
    "This House would implement a four-day work week as standard practice"
  ];

  const roles = {
    'asian-parliamentary': [
      { id: 'pm', name: 'Prime Minister', side: 'Government', order: 1 },
      { id: 'lo', name: 'Leader of Opposition', side: 'Opposition', order: 2 },
      { id: 'dpm', name: 'Deputy Prime Minister', side: 'Government', order: 3 },
      { id: 'dlo', name: 'Deputy Leader of Opposition', side: 'Opposition', order: 4 },
      { id: 'gw', name: 'Government Whip', side: 'Government', order: 5 },
      { id: 'ow', name: 'Opposition Whip', side: 'Opposition', order: 6 }
    ],
    'practice-debate': [
      { id: 'speaker1', name: 'First Speaker (Pro)', side: 'For', order: 1 },
      { id: 'speaker2', name: 'First Speaker (Con)', side: 'Against', order: 2 },
      { id: 'speaker3', name: 'Second Speaker (Pro)', side: 'For', order: 3 },
      { id: 'speaker4', name: 'Second Speaker (Con)', side: 'Against', order: 4 }
    ]
  };

  const generateRandomMotion = () => {
    const randomMotion = sampleMotions[Math.floor(Math.random() * sampleMotions.length)];
    setSelectedMotion(randomMotion);
    setCustomMotion('');
  };

  const handleCustomMotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMotion(e.target.value);
    setSelectedMotion(e.target.value);
  };

  const currentRoles = roles[format as keyof typeof roles] || roles['asian-parliamentary'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/format"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Format Selection</span>
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
              Set Your Motion & Role
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your debate topic and select your speaking position
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Motion Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Debate Motion</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Motion
                  </label>
                  <input
                    type="text"
                    value={customMotion}
                    onChange={handleCustomMotionChange}
                    placeholder="Enter your debate motion..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="text-center">
                  <span className="text-gray-400">OR</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateRandomMotion}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>Generate Random Motion</span>
                </motion.button>

                {selectedMotion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-gray-700 rounded-lg border border-gray-600"
                  >
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Motion:</h4>
                    <p className="text-white font-medium">{selectedMotion}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Your Role</h3>
              </div>

              <div className="space-y-3">
                {currentRoles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedRole === role.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{role.name}</h4>
                        <p className="text-sm opacity-80">{role.side}</p>
                      </div>
                      <div className="text-sm opacity-60">
                        Speaker {role.order}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {selectedMotion && selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12"
            >
              <Link
                to={`/debate?format=${format}&motion=${encodeURIComponent(selectedMotion)}&role=${selectedRole}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mic className="w-5 h-5 mr-2" />
                Enter Debate Room
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MotionPicker;