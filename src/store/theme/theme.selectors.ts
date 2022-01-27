import { AppState } from '~store';

const isLightMode = (state: AppState): boolean => state.theme.isLightMode;

export default {
  isLightMode,
};
