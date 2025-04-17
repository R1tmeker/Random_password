import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PasswordSettings, PasswordAction, SavedPassword } from '../types';

interface PasswordState {
  settings: PasswordSettings;
  currentPassword: string;
  savedPasswords: SavedPassword[];
}

const initialSettings: PasswordSettings = {
  length: 12,
  includeNumbers: true,
  includeSymbols: true,
  includeUppercase: true,
  includeLowercase: true,
};

// Load saved passwords from localStorage
const loadSavedPasswords = (): SavedPassword[] => {
  const saved = localStorage.getItem('savedPasswords');
  return saved ? JSON.parse(saved) : [];
};

const initialState: PasswordState = {
  settings: initialSettings,
  currentPassword: '',
  savedPasswords: loadSavedPasswords(),
};

const passwordReducer = (state: PasswordState, action: PasswordAction): PasswordState => {
  switch (action.type) {
    case 'GENERATE':
      return {
        ...state,
        settings: action.settings,
      };
    case 'SAVE_PASSWORD':
      if (!action.password) return state;
      
      // Check if password already exists
      if (state.savedPasswords.some(p => p.value === action.password)) {
        return state;
      }
      
      const newPassword: SavedPassword = {
        id: crypto.randomUUID(),
        value: action.password,
        createdAt: new Date().toISOString(),
      };
      
      const updatedPasswords = [...state.savedPasswords, newPassword];
      localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
      
      return {
        ...state,
        savedPasswords: updatedPasswords,
      };
    case 'REMOVE_PASSWORD':
      const filteredPasswords = state.savedPasswords.filter((p) => p.id !== action.id);
      localStorage.setItem('savedPasswords', JSON.stringify(filteredPasswords));
      return {
        ...state,
        savedPasswords: filteredPasswords,
      };
    case 'RESET_SETTINGS':
      return {
        ...state,
        settings: initialSettings,
      };
    default:
      return state;
  }
};

const PasswordContext = createContext<{
  state: PasswordState;
  dispatch: React.Dispatch<PasswordAction>;
} | null>(null);

export const PasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(passwordReducer, initialState);

  return (
    <PasswordContext.Provider value={{ state, dispatch }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }
  return context;
};