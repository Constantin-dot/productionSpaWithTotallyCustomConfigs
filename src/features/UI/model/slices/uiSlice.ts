import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUiSchema } from '../types/uiSchema';

const initialState: IUiSchema = {
  scroll: {},
};

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginByUsername.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(loginByUsername.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.username = '';
  //       state.password = '';
  //     })
  //     .addCase(loginByUsername.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     });
  // },
});

export const { actions: uiActions } = uiSlice;
export const { reducer: uiReducer } = uiSlice;
