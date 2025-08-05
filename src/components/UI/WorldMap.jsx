// WorldMap.jsx
import React, { useState } from 'react';
import { useGame } from '../../context/PlayerContext';
import image from '../../assets/image.png';
import { Plus, X, Divide, Minus, Shapes, Brain, Lock, Star, Trophy, Home } from 'lucide-react';

function WorldMap() {
  const { state, dispatch } = useGame();
  const [selectedRegion, setSelectedRegion] = useState(null);

  const unlocked = state?.unlockedRegions || [];

  const regions = [
    {
      id: 'addition-alley',
      name: 'Addition Alley',
      description: 'Master the art of adding numbers together',
      difficulty: 1,
      icon: <Plus className="w-8 h-8" />,
      position: { x: 20, y: 70 },
      color: 'from-green-400 to-green-600',
      unlocked: true,
      completed: false,
      concept: 'Addition & Basic Arithmetic'
    },
    {
      id: 'subtraction-sanctuary',
      name: 'Subtraction Sanctuary',
      description: 'Learn the mysteries of taking numbers away',
      difficulty: 1,
      icon: <Minus className="w-8 h-8" />,
      position: { x: 35, y: 60 },
      color: 'from-blue-400 to-blue-600',
      unlocked: unlocked.includes('subtraction-sanctuary'),
      completed: false,
      concept: 'Subtraction & Number Relationships'
    },
    {
      id: 'multiplication-marsh',
      name: 'Multiplication Marsh',
      description: 'Discover the power of repeated addition',
      difficulty: 2,
      icon: <X className="w-8 h-8" />,
      position: { x: 50, y: 50 },
      color: 'from-purple-400 to-purple-600',
      unlocked: unlocked.includes('multiplication-marsh'),
      completed: false,
      concept: 'Times Tables & Patterns'
    },
    {
      id: 'division-domain',
      name: 'Division Domain',
      description: 'Split numbers into equal parts',
      difficulty: 2,
      icon: <Divide className="w-8 h-8" />,
      position: { x: 65, y: 60 },
      color: 'from-red-400 to-red-600',
      unlocked: unlocked.includes('division-domain'),
      completed: false,
      concept: 'Division & Fair Sharing'
    },
    {
      id: 'geometry-gorge',
      name: 'Geometry Gorge',
      description: 'Explore shapes, angles, and spatial relationships',
      difficulty: 3,
      icon: <Shapes className="w-8 h-8" />,
      position: { x: 55, y: 35 },
      color: 'from-yellow-400 to-orange-600',
      unlocked: unlocked.includes('geometry-gorge'),
      completed: false,
      concept: 'Shapes & Spatial Reasoning'
    },
    {
      id: 'logic-labyrinth',
      name: 'Logic Labyrinth',
      description: 'Challenge your reasoning and problem-solving skills',
      difficulty: 4,
      icon: <Brain className="w-8 h-8" />,
      position: { x: 70, y: 25 },
      color: 'from-indigo-400 to-purple-600',
      unlocked: unlocked.includes('logic-labyrinth'),
      completed: false,
      concept: 'Logic & Critical Thinking'
    },
    {
      id: 'home',
      name: 'Home',
      description: 'Return to your base of knowledge',
      difficulty: 0,
      icon: <Home className="w-8 h-8" />,
      position: { x: 85, y: 20 },
      color: 'from-gray-400 to-gray-600',
      unlocked: true,
      completed: false,
      concept: 'Mission Complete'
    }
  ];

  const enterRegion = (region) => {
    if (!region.unlocked) return;
    
    dispatch({ type: 'SET_CURRENT_REGION', payload: region.id });
    dispatch({ type: 'SET_GAME_STAGE', payload: 'puzzle' });
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        currentMessage: `Welcome to ${region.name}! Let's start with some ${region.concept.toLowerCase()} challenges.`,
        mood: 'excited'
      }
    });
  };

  const getDifficultyStars = (difficulty) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="relative w-full h-screen bg-no-repeat bg-contain bg-center overflow-hidden"
    style={{ backgroundImage: `url(${image})` }}

    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Mountains */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
        
        {/* Floating Islands */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-800/30 rounded-full opacity-60"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 50 + 25 + 'px',
              left: Math.random() * 80 + 10 + '%',
              top: Math.random() * 60 + 20 + '%',
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Kingdom of Numeria
        </h1>
        <p className="text-white/80 text-lg">Choose your mathematical adventure</p>
      </div>

      {/* Regions */}
      <div className="relative w-full h-full">
        {regions.map((region) => (
          <div
            key={region.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: region.position.x + '%', top: region.position.y + '%' }}
            onClick={() => region.unlocked ? enterRegion(region) : setSelectedRegion(region)}
          >
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center
              ${region.unlocked 
                ? `bg-gradient-to-br ${region.color} hover:scale-110 shadow-lg hover:shadow-xl` 
                : 'bg-gray-600 cursor-not-allowed'}
              ${region.completed ? 'ring-4 ring-yellow-400' : ''}
              transition-all duration-300 relative
            `}>
              {region.unlocked ? region.icon : <Lock className="w-8 h-8 text-gray-400" />}
              {region.completed && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Trophy className="w-4 h-4 text-yellow-800" />
                </div>
              )}
              {region.unlocked && !region.completed && (
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${region.color} animate-ping opacity-30`}></div>
              )}
            </div>

            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
                <p className="text-white font-semibold text-sm">{region.name}</p>
              </div>
            </div>

            {region.unlocked && (
              <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white rounded-lg p-4 shadow-xl min-w-64 border-2 border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">{region.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{region.description}</p>
                  {region.difficulty > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">Difficulty:</span>
                      <div className="flex gap-1">
                        {getDifficultyStars(region.difficulty)}
                      </div>
                    </div>
                  )}
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {region.concept}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sequential Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d="M 20% 70% Q 28% 65% 35% 60%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
        <path d="M 35% 60% Q 42% 55% 50% 50%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
        <path d="M 50% 50% Q 58% 55% 65% 60%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
        <path d="M 65% 60% Q 60% 45% 55% 35%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
        <path d="M 55% 35% Q 62% 30% 70% 25%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
        <path d="M 70% 25% Q 77% 22% 85% 20%" stroke="white" strokeWidth="3" fill="none" strokeDasharray="10,5" className="animate-pulse" />
      </svg>

      {/* Locked Region Modal */}
      {selectedRegion && !selectedRegion.unlocked && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 relative">
            <button
              onClick={() => setSelectedRegion(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedRegion.name}</h2>
              <p className="text-gray-600 mb-4">{selectedRegion.description}</p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  🔒 This region is locked! Complete previous regions to unlock new adventures.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default WorldMap;
