import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, X, ChevronRight } from 'lucide-react';

function GuideCharacter() {
  const { state, dispatch } = useGame();
  const { guide } = state;
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Guide messages for different situations
  const guideMessages = {
    intro: [
      "Welcome, brave Math Knight! I am Numeris, guardian of mathematical wisdom.",
      "The Kingdom of Numeria is in chaos! The Randomizer has corrupted our sacred numbers.",
      "Only by mastering the ancient math arts can you restore balance to our realm.",
      "Let me show you around. Click on different regions to begin your journey!"
    ],
    map: [
      "This is the World Map! Each region represents a different mathematical challenge.",
      "Start with Addition Alley to master the basics, then advance to harder regions.",
      "Green regions are completed, blue ones are available, and red ones are locked."
    ],
    puzzle: [
      "Time for a mathematical challenge! Read the question carefully.",
      "Take your time - accuracy is more important than speed.",
      "Each correct answer brings you closer to defeating The Randomizer!"
    ],
    victory: [
      "Excellent work, Math Knight! Your skills are growing stronger.",
      "The power of numbers flows through you. Keep training!",
      "Ready for the next challenge? The kingdom needs your help!"
    ]
  };

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [guide.currentMessage]);

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'concerned': return '🤔';
      case 'proud': return '😌';
      default: return '😊';
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'from-green-400 to-blue-500';
      case 'excited': return 'from-yellow-400 to-orange-500';
      case 'concerned': return 'from-purple-400 to-indigo-500';
      case 'proud': return 'from-pink-400 to-red-500';
      default: return 'from-green-400 to-blue-500';
    }
  };

  const nextMessage = () => {
    const messages = guideMessages[state.gameStage] || guideMessages.intro;
    const nextIndex = (currentMessageIndex + 1) % messages.length;
    setCurrentMessageIndex(nextIndex);
    
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        currentMessage: messages[nextIndex]
      }
    });
  };

  const hideGuide = () => {
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: { isVisible: false }
    });
  };

  if (!guide.isVisible) {
    return (
      <button
        onClick={() => dispatch({ type: 'UPDATE_GUIDE', payload: { isVisible: true } })}
        className="fixed bottom-4 right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 animate-bounce z-50"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Guide Character */}
      <div className="relative">
        {/* Character Avatar */}
        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getMoodColor(guide.mood)} p-1 shadow-2xl ${isAnimating ? 'animate-pulse scale-110' : ''} transition-all duration-500`}>
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
            {getMoodEmoji(guide.mood)}
          </div>
        </div>

        {/* Floating magical particles around character */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
            style={{
              left: Math.cos(i * 60 * Math.PI / 180) * 35 + 35 + 'px',
              top: Math.sin(i * 60 * Math.PI / 180) * 35 + 35 + 'px',
              animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: i * 0.2 + 's'
            }}
          />
        ))}

        {/* Speech Bubble */}
        <div className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-4 border-purple-200">
          {/* Speech bubble tail */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-200"></div>
          <div className="absolute top-full right-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white" style={{ marginTop: '-2px', marginLeft: '2px' }}></div>
          
          {/* Message */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-purple-800 text-sm">{guide.name}</h3>
            <button
              onClick={hideGuide}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {guide.currentMessage}
          </p>
          
          {/* Next Message Button */}
          <div className="flex justify-end">
            <button
              onClick={nextMessage}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-1"
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(0.8) translateY(0px);
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.2) translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default GuideCharacter;