"use client";

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { Dragon } from '@/lib/types/dragon';

// Types

interface AppState {
  theme: 'dark' | 'light' | 'system';
  sidebarOpen: boolean;
  dragons: Dragon[];
  filteredDragons: Dragon[];
  favorites: string[];
  searchFilters: {
    term: string;
    type: string;
    rarity: string;
    abilities: string[];
  };
  ui: {
    loading: boolean;
    error: string | null;
    currentSection: string;
    scrollProgress: number;
  };
  user: {
    preferences: {
      animationsEnabled: boolean;
      particlesEnabled: boolean;
      soundEnabled: boolean;
    };
    stats: {
      dragonsViewed: number;
      timeSpent: number;
      favoriteCount: number;
    };
  };
}

type AppAction =
  | { type: 'SET_THEME'; payload: AppState['theme'] }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_DRAGONS'; payload: Dragon[] }
  | { type: 'FILTER_DRAGONS'; payload: Partial<AppState['searchFilters']> }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'SET_SCROLL_PROGRESS'; payload: number }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<AppState['user']['preferences']> }
  | { type: 'INCREMENT_DRAGONS_VIEWED' }
  | { type: 'UPDATE_TIME_SPENT'; payload: number };

// Initial State
const initialState: AppState = {
  theme: 'system',
  sidebarOpen: false,
  dragons: [],
  filteredDragons: [],
  favorites: [],
  searchFilters: {
    term: '',
    type: 'all',
    rarity: 'all',
    abilities: [],
  },
  ui: {
    loading: false,
    error: null,
    currentSection: 'hero',
    scrollProgress: 0,
  },
  user: {
    preferences: {
      animationsEnabled: true,
      particlesEnabled: true,
      soundEnabled: false,
    },
    stats: {
      dragonsViewed: 0,
      timeSpent: 0,
      favoriteCount: 0,
    },
  },
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case 'SET_DRAGONS':
      return { 
        ...state, 
        dragons: action.payload,
        filteredDragons: action.payload 
      };
    
    case 'FILTER_DRAGONS':
      const newFilters = { ...state.searchFilters, ...action.payload };
      const filtered = state.dragons.filter(dragon => {
        const matchesTerm = !newFilters.term || 
          dragon.name.toLowerCase().includes(newFilters.term.toLowerCase()) ||
          dragon.description.toLowerCase().includes(newFilters.term.toLowerCase());
        
        const matchesType = newFilters.type === 'all' || dragon.type === newFilters.type;
        const matchesRarity = newFilters.rarity === 'all' || dragon.rarity === newFilters.rarity;
        const matchesAbilities = newFilters.abilities.length === 0 ||
          newFilters.abilities.some(ability => dragon.abilities.includes(ability));

        return matchesTerm && matchesType && matchesRarity && matchesAbilities;
      });

      return {
        ...state,
        searchFilters: newFilters,
        filteredDragons: filtered,
      };
    
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      
      return {
        ...state,
        favorites: newFavorites,
        user: {
          ...state.user,
          stats: {
            ...state.user.stats,
            favoriteCount: newFavorites.length,
          },
        },
      };
    
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, loading: action.payload } };
    
    case 'SET_ERROR':
      return { ...state, ui: { ...state.ui, error: action.payload } };
    
    case 'SET_CURRENT_SECTION':
      return { ...state, ui: { ...state.ui, currentSection: action.payload } };
    
    case 'SET_SCROLL_PROGRESS':
      return { ...state, ui: { ...state.ui, scrollProgress: action.payload } };
    
    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...action.payload },
        },
      };
    
    case 'INCREMENT_DRAGONS_VIEWED':
      return {
        ...state,
        user: {
          ...state.user,
          stats: {
            ...state.user.stats,
            dragonsViewed: state.user.stats.dragonsViewed + 1,
          },
        },
      };
    
    case 'UPDATE_TIME_SPENT':
      return {
        ...state,
        user: {
          ...state.user,
          stats: {
            ...state.user.stats,
            timeSpent: state.user.stats.timeSpent + action.payload,
          },
        },
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setTheme: (theme: AppState['theme']) => void;
    toggleSidebar: () => void;
    setDragons: (dragons: Dragon[]) => void;
    filterDragons: (filters: Partial<AppState['searchFilters']>) => void;
    toggleFavorite: (dragonId: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCurrentSection: (section: string) => void;
    setScrollProgress: (progress: number) => void;
    updateUserPreferences: (preferences: Partial<AppState['user']['preferences']>) => void;
    viewDragon: (dragonId: string) => void;
  };
} | null>(null);

// Provider Component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist state to localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('dragon-app-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'SET_THEME', payload: parsed.theme || 'system' });
        if (parsed.favorites) {
          parsed.favorites.forEach((id: string) => {
            dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
          });
        }
        if (parsed.user?.preferences) {
          dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: parsed.user.preferences });
        }
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      theme: state.theme,
      favorites: state.favorites,
      user: state.user,
    };
    localStorage.setItem('dragon-app-state', JSON.stringify(stateToSave));
  }, [state.theme, state.favorites, state.user]);

  // Action creators with analytics
  const actions = {
    setTheme: useCallback((theme: AppState['theme']) => {
      dispatch({ type: 'SET_THEME', payload: theme });
      analytics.themeToggle(theme);
    }, []),

    toggleSidebar: useCallback(() => {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
      analytics.buttonClick('sidebar_toggle', 'navigation');
    }, []),

    setDragons: useCallback((dragons: Dragon[]) => {
      dispatch({ type: 'SET_DRAGONS', payload: dragons });
    }, []),

    filterDragons: useCallback((filters: Partial<AppState['searchFilters']>) => {
      dispatch({ type: 'FILTER_DRAGONS', payload: filters });
      if (filters.term) {
        analytics.searchDragons(filters.term, state.filteredDragons.length);
      }
    }, [state.filteredDragons.length]),

    toggleFavorite: useCallback((dragonId: string) => {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: dragonId });
      analytics.buttonClick('favorite_toggle', 'dragon_card');
    }, []),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),

    setCurrentSection: useCallback((section: string) => {
      dispatch({ type: 'SET_CURRENT_SECTION', payload: section });
      analytics.scrollToSection(section);
    }, []),

    setScrollProgress: useCallback((progress: number) => {
      dispatch({ type: 'SET_SCROLL_PROGRESS', payload: progress });
    }, []),

    updateUserPreferences: useCallback((preferences: Partial<AppState['user']['preferences']>) => {
      dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
    }, []),

    viewDragon: useCallback((dragonId: string) => {
      const dragon = state.dragons.find(d => d.id === dragonId);
      if (dragon) {
        dispatch({ type: 'INCREMENT_DRAGONS_VIEWED' });
        analytics.dragonView(dragon.name);
      }
    }, [state.dragons]),
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Specific hooks for better performance
export function useTheme() {
  const { state, actions } = useApp();
  return {
    theme: state.theme,
    setTheme: actions.setTheme,
  };
}

export function useDragons() {
  const { state, actions } = useApp();
  return {
    dragons: state.dragons,
    filteredDragons: state.filteredDragons,
    searchFilters: state.searchFilters,
    favorites: state.favorites,
    setDragons: actions.setDragons,
    filterDragons: actions.filterDragons,
    toggleFavorite: actions.toggleFavorite,
    viewDragon: actions.viewDragon,
  };
}

export function useUI() {
  const { state, actions } = useApp();
  return {
    loading: state.ui.loading,
    error: state.ui.error,
    currentSection: state.ui.currentSection,
    scrollProgress: state.ui.scrollProgress,
    sidebarOpen: state.sidebarOpen,
    setLoading: actions.setLoading,
    setError: actions.setError,
    setCurrentSection: actions.setCurrentSection,
    setScrollProgress: actions.setScrollProgress,
    toggleSidebar: actions.toggleSidebar,
  };
}

export type { Dragon, AppState };