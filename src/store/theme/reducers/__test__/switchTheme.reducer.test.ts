import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { ThemeState } from '~store/theme';
import { switchThemeReducer } from '..';

describe('Todo next page reducer', () => {
  let state: ThemeState;
  let counterSlice: Slice<ThemeState, SliceCaseReducers<ThemeState>, string>;

  beforeEach(() => {
    state = {
      isLightMode: true,
    };
    counterSlice = createSlice({
      name: 'theme',
      initialState: state,
      reducers: {
        ...switchThemeReducer,
      },
    });
  });

  it('theme reducer should switch the color state', () => {
    const newState = counterSlice.reducer(state, counterSlice.actions.switchThemeOn(undefined));
    expect(newState.isLightMode).toBe(!state.isLightMode);
  });
});
