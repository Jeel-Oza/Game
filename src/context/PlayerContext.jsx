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
  },
  guide: {
    isVisible: false,
    currentMessage: '',
    mood: 'neutral',
  },
  gameStage: 'intro', // other values: 'map', 'puzzle', 'battle'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GAIN_XP':
      return {
        ...state,
        player: {
          ...state.player,
          xp: state.player.xp + action.payload,
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
    case 'SOLVE_PUZZLE':
      return {
        ...state,
        progress: {
          totalPuzzlesSolved: state.progress.totalPuzzlesSolved + 1,
        },
        player: {
          ...state.player,
          xp: state.player.xp + 10,
        },
      };
    case 'UPDATE_GUIDE':
      return {
        ...state,
        guide: { ...state.guide, ...action.payload },
      };
    case 'SET_GAME_STAGE':
      return {
        ...state,
        gameStage: action.payload,
      };
    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const gainXp = (amount) => {
    dispatch({ type: 'GAIN_XP', payload: amount });
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatch,
        xp: state.player.xp,
        gainXp,
        player: state.player,
        progress: state.progress,
        guide: state.guide,
        gameStage: state.gameStage,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const useGame = () => useContext(PlayerContext);
