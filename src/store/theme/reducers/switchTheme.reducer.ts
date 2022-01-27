import { ThemeState } from '..';

export const switchThemeReducer = {
  switchThemeOn(state: ThemeState) {
    state.isLightMode = !state.isLightMode;
  },
};
