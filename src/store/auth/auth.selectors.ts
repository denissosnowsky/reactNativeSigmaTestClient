import { AppState } from '~store';
import { UserDAO } from '~types/auth.types';

const user = (state: AppState): Omit<UserDAO, 'token'> => state.auth.user;
const userId = (state: AppState): string => state.auth.user.id;
const userPhoto = (state: AppState): string => state.auth.user.photo;
const isLogged = (state: AppState): boolean => state.auth.isLogged;
const isLoading = (state: AppState): boolean => state.auth.isLoading;
const isInitializing = (state: AppState): boolean => state.auth.isInitializing;
const error = (state: AppState): string => state.auth.error;
const successAlert = (state: AppState) => state.auth.successAlert;
const testMode = (state: AppState): boolean => state.auth.testMode;
const tempPhoto = (state: AppState): string => state.auth.tempUserPhoto;
const isActivationLinkLoading = (state: AppState) => state.auth.isActivationLinkLoading;
const isResetPasswordLoading = (state: AppState) => state.auth.isResetPasswordLoading;
const userAuth = (state: AppState) => state.auth;
const avatars = (state: AppState) => state.auth.avatars;

export default {
  user,
  error,
  userId,
  isLogged,
  testMode,
  isLoading,
  tempPhoto,
  successAlert,
  isInitializing,
  isActivationLinkLoading,
  isResetPasswordLoading,
  userAuth,
  userPhoto,
  avatars,
};
