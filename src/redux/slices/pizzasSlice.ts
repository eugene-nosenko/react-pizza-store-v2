import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { itemsPerPage } from '../../constants';
import { RootState } from '../store';

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number[];
  sizes: number[];
  types: number[];
  rating?: number;
};

export enum Status {
  LOADING = 'loading',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const {
      sortBy,
      // order,
      category,
      search,
      currentPage
    } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://629146cd665ea71fe1436b03.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=desc&${search}`
    );
    return data;
  }
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.FULFILLED;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.REJECTED;
      state.items = [];
    });
  }
});

export const selectPizzaData = (state: RootState) => state.pizzas;
// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
