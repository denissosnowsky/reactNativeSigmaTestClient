import { createSlice } from '@reduxjs/toolkit';

import { switchThemeReducer } from './reducers';

export type ThemeState = {
  isLightMode: boolean;
};

const initialState: ThemeState = {
  isLightMode: true,
};

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    ...switchThemeReducer,
  },
});

export default counterSlice.reducer;
