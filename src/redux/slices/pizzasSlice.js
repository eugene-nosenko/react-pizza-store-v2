import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemsPerPage } from '../../constants';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const {
    sortBy,
    // order,
    category,
    search,
    currentPage
  } = params;
  const { data } = await axios.get(
    `https://629146cd665ea71fe1436b03.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=desc&${search}`
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading'
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
      console.log('state', state);
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'rejected';
      state.items = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
