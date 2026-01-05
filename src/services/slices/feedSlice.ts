import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

type TOrdersAmount = {
  total: number | null;
  totalToday: number | null;
};

interface FeedsState {
  orders: TOrder[];
  ordersAmount: TOrdersAmount;
  isOrdersLoading: boolean;
  error: string | null;
}

const feedsInitialState: FeedsState = {
  orders: [],
  ordersAmount: {
    total: null,
    totalToday: null
  },
  isOrdersLoading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'allFeeds',
  initialState: feedsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.ordersAmount.total = action.payload.total;
        state.ordersAmount.totalToday = action.payload.totalToday;
        (state.isOrdersLoading = false), (state.error = null);
      })
      .addCase(getFeeds.pending, (state, _action) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getOrdersAmount: (state) => state.ordersAmount,
    getFeedsLoading: (state) => state.isOrdersLoading,
    getFeedsError: (state) => state.error
  }
});

export const { getAllOrders, getFeedsLoading, getFeedsError, getOrdersAmount } =
  feedsSlice.selectors;
