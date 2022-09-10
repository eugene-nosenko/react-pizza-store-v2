import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { id: 'popularity', name: 'popularity' }
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log('action', action);
      state.categoryId = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCategoryId, decrement } = filterSlice.actions;

export default filterSlice.reducer;
