import { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();

const initialState = {
  player: {
    name: 'Hero',
    level: 1,
    health: 80,
    maxHealth: 100,
    xp: 0,
  },
  progress: {
    totalPuzzlesSolved: 0,
    completedRegions: [],
  },
  guide: {
    isVisible: false,
    currentMessage: '',
    mood: 'neutral',
  },
  gameStage: 'intro', // 'intro', 'map', 'puzzle', etc.
  currentRegion: null,
  unlockedRegions: ['addition-alley'],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GAIN_XP':
      const newXp = state.player.xp + action.payload;
      const newLevel = Math.floor(newXp / 100) + 1; // Level up every 100 XP
      
      return {
        ...state,
        player: {
          ...state.player,
          xp: newXp,
          level: Math.max(state.player.level, newLevel),
        },
      };

    case 'UPDATE_HEALTH':
      const newHealth = Math.min(
        state.player.maxHealth,
        Math.max(0, state.player.health + action.payload)
      );
      return {
        ...state,
        player: {
          ...state.player,
          health: newHealth,
        },
      };

    case 'SOLVE_PUZZLE': {
      const regionId = action.payload;
      const nextUnlocked = new Set(state.unlockedRegions);
      const completedRegions = new Set(state.progress.completedRegions);
      
      // Mark current region as completed
      if (regionId) {
        completedRegions.add(regionId);
      }

      // Unlock next regions based on completion
      if (regionId === 'addition-alley') {
        nextUnlocked.add('subtraction-sanctuary');
      } else if (regionId === 'subtraction-sanctuary') {
        nextUnlocked.add('multiplication-marsh');
      } else if (regionId === 'multiplication-marsh') {
        nextUnlocked.add('division-domain');
      } else if (regionId === 'division-domain') {
        nextUnlocked.add('geometry-gorge');
      } else if (regionId === 'geometry-gorge') {
        nextUnlocked.add('logic-labyrinth');
      }

      return {
        ...state,
        progress: {
          totalPuzzlesSolved: state.progress.totalPuzzlesSolved + 1,
          completedRegions: Array.from(completedRegions),
        },
        player: {
          ...state.player,
          xp: state.player.xp + 10,
          level: Math.max(state.player.level, Math.floor((state.player.xp + 10) / 100) + 1),
        },
        unlockedRegions: Array.from(nextUnlocked),
      };
    }

    case 'UPDATE_GUIDE':
      return {
        ...state,
        guide: { 
          ...state.guide, 
          ...action.payload,
          isVisible: action.payload.isVisible !== undefined ? action.payload.isVisible : state.guide.isVisible
        },
      };

    case 'SET_GAME_STAGE':
      return {
        ...state,
        gameStage: action.payload,
      };

    case 'SET_CURRENT_REGION':
      return {
        ...state,
        currentRegion: action.payload,
      };

    case 'RESET_GAME':
      return initialState;

    case 'LEVEL_UP':
      return {
        ...state,
        player: {
          ...state.player,
          level: state.player.level + 1,
          maxHealth: state.player.maxHealth + 20,
          health: state.player.maxHealth + 20, // Full heal on level up
        },
      };

    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const gainXp = (amount) => {
    if (typeof amount !== 'number' || amount < 0) {
      console.warn('Invalid XP amount:', amount);
      return;
    }
    dispatch({ type: 'GAIN_XP', payload: amount });
  };

  const updateHealth = (amount) => {
    if (typeof amount !== 'number') {
      console.warn('Invalid health amount:', amount);
      return;
    }
    dispatch({ type: 'UPDATE_HEALTH', payload: amount });
  };

  const solvePuzzle = (regionId) => {
    dispatch({ type: 'SOLVE_PUZZLE', payload: regionId });
  };

  const updateGuide = (guideData) => {
    dispatch({ type: 'UPDATE_GUIDE', payload: guideData });
  };

  const setGameStage = (stage) => {
    dispatch({ type: 'SET_GAME_STAGE', payload: stage });
  };

  const setCurrentRegion = (regionId) => {
    dispatch({ type: 'SET_CURRENT_REGION', payload: regionId });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  // Check if context is being used outside of provider
  if (!state) {
    throw new Error('useGame must be used within a PlayerProvider');
  }

  return (
    <PlayerContext.Provider
      value={{
        // State values
        state,
        xp: state.player.xp,
        player: state.player,
        progress: state.progress,
        guide: state.guide,
        gameStage: state.gameStage,
        currentRegion: state.currentRegion,
        unlockedRegions: state.unlockedRegions,
        
        // Action functions
        dispatch,
        gainXp,
        updateHealth,
        solvePuzzle,
        updateGuide,
        setGameStage,
        setCurrentRegion,
        resetGame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(PlayerContext);
  
  if (!context) {
    throw new Error('useGame must be used within a PlayerProvider');
  }
  
  return context;
};