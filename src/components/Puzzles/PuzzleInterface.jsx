import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Clock, Target, Zap, CheckCircle, XCircle } from 'lucide-react';

function PuzzleInterface() {
  const { state, dispatch } = useGame();
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Generate puzzles based on current region
  const generatePuzzle = () => {
    const puzzleTypes = {
      'addition-alley': () => {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        return {
          question: `What is ${a} + ${b}?`,
          answer: a + b,
          type: 'addition',
          hint: `Try counting up from ${a} by ${b} steps!`
        };
      },
      'subtraction-sanctuary': () => {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * a) + 1;
        return {
          question: `What is ${a} - ${b}?`,
          answer: a - b,
          type: 'subtraction',
          hint: `Think: what number plus ${b} equals ${a}?`
        };
      },
      'multiplication-marsh': () => {
        const a = Math.floor(Math.random() * 12) + 1;
        const b = Math.floor(Math.random() * 12) + 1;
        return {
          question: `What is ${a} × ${b}?`,
          answer: a * b,
          type: 'multiplication',
          hint: `Think of ${a} groups of ${b} items each!`
        };
      },
      'division-domain': () => {
        const b = Math.floor(Math.random() * 10) + 2;
        const answer = Math.floor(Math.random() * 10) + 1;
        const a = b * answer;
        return {
          question: `What is ${a} ÷ ${b}?`,
          answer: answer,
          type: 'division',
          hint: `How many groups of ${b} can you make from ${a}?`
        };
      }
    };

    const generator = puzzleTypes[state.currentRegion] || puzzleTypes['addition-alley'];
    return generator();
  };

  useEffect(() => {
    // Generate first puzzle
    setCurrentPuzzle(generatePuzzle());
  }, [state.currentRegion]);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0 && !feedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !feedback) {
      handleTimeout();
    }
  }, [timeLeft, feedback]);

  const handleTimeout = () => {
    setFeedback({
      correct: false,
      message: "Time's up! Don't worry, you'll get it next time!",
      type: 'timeout'
    });
    setStreak(0);
    
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        currentMessage: "No worries! Take your time to think through the problem. Speed comes with practice!",
        mood: 'concerned'
      }
    });
  };

  const submitAnswer = () => {
    if (!currentPuzzle || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === currentPuzzle.answer;
    
    if (isCorrect) {
      const pointsEarned = Math.max(10, timeLeft);
      setScore(score + pointsEarned);
      setStreak(streak + 1);
      
      dispatch({ type: 'GAIN_XP', payload: pointsEarned });
      dispatch({ type: 'COMPLETE_PUZZLE' });
      
      setFeedback({
        correct: true,
        message: `Excellent! You earned ${pointsEarned} points!`,
        type: 'success'
      });

      const messages = [
        "Perfect! Your mathematical powers are growing stronger!",
        "Outstanding work, Math Knight! The kingdom is proud!",
        "Brilliant! You're mastering the ancient number arts!",
        "Fantastic! Each correct answer weakens The Randomizer!"
      ];
      
      dispatch({
        type: 'UPDATE_GUIDE',
        payload: {
          currentMessage: messages[Math.floor(Math.random() * messages.length)],
          mood: 'proud'
        }
      });
    } else {
      setStreak(0);
      setFeedback({
        correct: false,
        message: `Not quite! The answer was ${currentPuzzle.answer}. ${currentPuzzle.hint}`,
        type: 'incorrect'
      });
      
      dispatch({
        type: 'UPDATE_GUIDE',
        payload: {
          currentMessage: "Don't give up! Every mistake is a step closer to mastery. Try the next one!",
          mood: 'concerned'
        }
      });
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzle(generatePuzzle());
    setUserAnswer('');
    setFeedback(null);
    setTimeLeft(30);
  };

  const returnToMap = () => {
    dispatch({ type: 'SET_GAME_STAGE', payload: 'map' });
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        currentMessage: "Great practice session! Ready to explore more regions?",
        mood: 'happy'
      }
    });
  };

  if (!currentPuzzle) {
    return <div className="flex items-center justify-center h-screen">Loading puzzle...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={returnToMap}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Map
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-600/50 px-4 py-2 rounded-full">
            <Target className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{score} pts</span>
          </div>
          
          <div className="flex items-center gap-2 bg-orange-600/50 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{streak} streak</span>
          </div>
        </div>
      </div>

      {/* Main Puzzle Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
          {/* Timer */}
          <div className="flex justify-center mb-8">
            <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              timeLeft <= 10 ? 'bg-red-500/50 animate-pulse' : 'bg-green-500/50'
            }`}>
              <Clock className="w-6 h-6 text-white" />
              <span className="text-white text-xl font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              {currentPuzzle.question}
            </h2>
            <div className="text-lg text-white/80">
              Type: {currentPuzzle.type.charAt(0).toUpperCase() + currentPuzzle.type.slice(1)}
            </div>
          </div>

          {/* Answer Input */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !feedback && submitAnswer()}
              className="text-center text-3xl font-bold bg-white/20 border-2 border-white/30 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all duration-300 w-48"
              placeholder="?"
              disabled={!!feedback}
              autoFocus
            />
            
            {!feedback && (
              <button
                onClick={submitAnswer}
                disabled={userAnswer === ''}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Submit Answer
              </button>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center">
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl mb-6 ${
                feedback.correct 
                  ? 'bg-green-500/20 border border-green-400/30' 
                  : 'bg-red-500/20 border border-red-400/30'
              }`}>
                {feedback.correct ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <div className="text-white">
                  <div className="font-bold text-lg">{feedback.correct ? 'Correct!' : 'Incorrect'}</div>
                  <div className="text-sm text-white/80">{feedback.message}</div>
                </div>
              </div>

              <button
                onClick={nextPuzzle}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Next Puzzle →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10 text-8xl font-bold select-none"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatNumber ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          >
            {Math.floor(Math.random() * 10)}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatNumber {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.05;
          }
          50% { 
            transform: translateY(-50px) rotate(360deg);
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}

export default PuzzleInterface;