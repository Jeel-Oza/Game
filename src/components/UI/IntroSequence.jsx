import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Sword, Shield, Sparkles, Play } from 'lucide-react';

function IntroSequence() {
  const { dispatch } = useGame();
  const [currentScene, setCurrentScene] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const scenes = [
    {
      title: "The Kingdom of Numeria",
      text: "Once a land where numbers lived in perfect harmony...",
      background: "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600",
      icon: <Sparkles className="w-16 h-16 text-white" />
    },
    {
      title: "The Randomizer Strikes",
      text: "A chaotic entity has corrupted the sacred mathematical laws!",
      background: "bg-gradient-to-br from-red-500 via-purple-600 to-black",
      icon: <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse flex items-center justify-center text-white text-2xl">⚡</div>
    },
    {
      title: "The Math Knight Awakens",
      text: "You are chosen to restore balance through the power of mathematics!",
      background: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
      icon: <Sword className="w-16 h-16 text-white" />
    },
    {
      title: "Your Quest Begins",
      text: "Master the mathematical arts and save the Kingdom of Numeria!",
      background: "bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700",
      icon: <Shield className="w-16 h-16 text-white" />
    }
  ];

  useEffect(() => {
    // Auto-advance scenes
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentScene, scenes.length]);

  const startGame = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch({ type: 'SET_GAME_STAGE', payload: 'map' });
      dispatch({
        type: 'UPDATE_GUIDE',
        payload: {
          currentMessage: "Welcome to the World Map! Choose your first mathematical adventure.",
          mood: 'excited'
        }
      });
    }, 1000);
  };

  const skipIntro = () => {
    setCurrentScene(scenes.length - 1);
  };

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading your adventure...</div>
      </div>
    );
  }

  const currentSceneData = scenes[currentScene];

  return (
    <div className={`fixed inset-0 ${currentSceneData.background} flex items-center justify-center transition-all duration-1000`}>
      {/* Skip Button */}
      <button
        onClick={skipIntro}
        className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 z-10"
      >
        Skip Intro
      </button>

      {/* Scene Content */}
      <div className="text-center max-w-4xl mx-auto px-8">
        {/* Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          {currentSceneData.icon}
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
          {currentSceneData.title}
        </h1>

        {/* Description */}
        <p className="text-2xl text-white/90 mb-12 leading-relaxed">
          {currentSceneData.text}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentScene 
                  ? 'bg-white scale-125' 
                  : index < currentScene 
                    ? 'bg-white/70' 
                    : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Start Game Button (only on last scene) */}
        {currentScene === scenes.length - 1 && (
          <button
            onClick={startGame}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto animate-pulse"
          >
            <Play className="w-6 h-6" />
            Begin Your Quest!
          </button>
        )}

        {/* Next Scene Button (for earlier scenes) */}
        {currentScene < scenes.length - 1 && (
          <button
            onClick={() => setCurrentScene(currentScene + 1)}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
          >
            Continue →
          </button>
        )}
      </div>

      {/* Floating Elements for Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/20 text-6xl select-none"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatMath ${5 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          >
            {['÷', '×', '+', '−', '=', '∑', '∞', 'π', '√'][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatMath {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default IntroSequence;