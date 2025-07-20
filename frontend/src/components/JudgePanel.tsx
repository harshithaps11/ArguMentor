import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Star, AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';

interface JudgePanelProps {
  debateStarted: boolean;
  currentSpeaker: number;
  totalSpeakers: number;
}

const JudgePanel: React.FC<JudgePanelProps> = ({ 
  debateStarted, 
  currentSpeaker, 
  totalSpeakers 
}) => {
  const [judgeFeedback, setJudgeFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // TODO: Implement GPT-4 judging logic
  const mockJudgeFeedback = {
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
    ]
  };

  const handleRequestFeedback = () => {
    setIsAnalyzing(true);
    // TODO: Send all speeches to GPT-4 for analysis
    setTimeout(() => {
      setJudgeFeedback(mockJudgeFeedback);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-4 h-4" />;
    if (score >= 6) return <Star className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Scale className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">AI Judge Panel</h3>
        </div>
        <div className="text-sm text-gray-400">
          Progress: {currentSpeaker} / {totalSpeakers} speakers
        </div>
      </div>

      {!debateStarted ? (
        <div className="text-center py-8">
          <Scale className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">The AI judge will provide feedback once the debate begins</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Real-time Analysis */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Real-time Analysis</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Analyzing argument structure...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Evaluating evidence quality...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Assessing rhetorical effectiveness...</span>
              </div>
            </div>
          </div>

          {/* Feedback Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRequestFeedback}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Detailed Feedback</span>
                </div>
              )}
            </motion.button>
          </div>

          {/* Detailed Feedback */}
          {judgeFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Overall Score */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">Overall Score</h4>
                  <div className={`text-2xl font-bold ${getScoreColor(judgeFeedback.overallScore)}`}>
                    {judgeFeedback.overallScore}/10
                  </div>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Detailed Breakdown</h4>
                {judgeFeedback.criteria.map((criterion: any, index: number) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getScoreIcon(criterion.score)}
                        <span className="font-medium text-white">{criterion.name}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(criterion.score)}`}>
                        {criterion.score}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{criterion.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Suggestions for Improvement</h4>
                <ul className="space-y-2">
                  {judgeFeedback.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TODO: Add GPT-4 integration */}
      <div className="mt-4 text-xs text-gray-500">
        TODO: Integrate GPT-4 for comprehensive debate analysis and feedback
      </div>
    </div>
  );
};

export default JudgePanel;