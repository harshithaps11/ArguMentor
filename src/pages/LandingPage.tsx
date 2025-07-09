import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Users, Trophy, Zap, BookOpen, Target } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ArguMentor
            </h1>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Master the Art of Debate
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Practice with AI-powered opponents, receive real-time feedback from expert judges, 
              and elevate your argumentation skills in immersive debate simulations.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/format"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start a New Debate
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4 text-white">Why ArguMentor?</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the future of debate training with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "AI Opponents",
                description: "Debate against sophisticated AI avatars with unique personalities and argumentation styles"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Expert Judging",
                description: "Receive detailed feedback from AI judges trained on parliamentary debate standards"
              },
              {
                icon: <Mic className="w-8 h-8" />,
                title: "Voice Recognition",
                description: "Speak naturally with advanced speech-to-text technology for seamless interaction"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4 text-white">How to Use ArguMentor</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <BookOpen className="w-8 h-8" />,
                title: "Choose Format",
                description: "Select your preferred debate format - Asian Parliamentary or Practice Debates"
              },
              {
                step: "02",
                icon: <Target className="w-8 h-8" />,
                title: "Pick Motion & Role",
                description: "Choose or generate a debate motion and select your speaking position"
              },
              {
                step: "03",
                icon: <Mic className="w-8 h-8" />,
                title: "Start Debating",
                description: "Engage with AI opponents and receive real-time feedback from expert judges"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 + index * 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-fit mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-white">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 ArguMentor. Elevating debate skills through AI innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;