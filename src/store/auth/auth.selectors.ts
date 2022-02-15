import { AppState } from '~store';
import { UserDAO } from '~types/auth.types';

const user = (state: AppState): Omit<UserDAO, 'token'> => state.auth.user;
const userId = (state: AppState): string => state.auth.user.id;
const isLogged = (state: AppState): boolean => state.auth.isLogged;
const isLoading = (state: AppState): boolean => state.auth.isLoading;
const isInitializing = (state: AppState): boolean => state.auth.isInitializing;
const error = (state: AppState): string => state.auth.error;
const testMode = (state: AppState): boolean => state.auth.testMode;

export default {
  user,
  error,
  userId,
  isLogged,
  testMode,
  isLoading,
  isInitializing,
};
