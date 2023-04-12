import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddCommentFormSchema } from '../types/addCommentForm';

const initialState: IAddCommentFormSchema = {
  text: '',
  error: undefined,
};

export const addCommentFormSlice = createSlice({
  name: 'addCommentFormSlice',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
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

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
