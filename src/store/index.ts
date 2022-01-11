import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import reducer from './reducer';

const index = configureStore({
  reducer,
});

export type AppDispatch = typeof index.dispatch;
export type AppState = ReturnType<typeof index.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default index;
