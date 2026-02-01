import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'order/getInfo',
  async (number: number) => getOrderByNumberApi(number)
);

interface OrderInfoState {
  order: TOrder;
  isOrderInfoLoading: boolean;
  error: string | null;
}

export const orderInfoInitialState: OrderInfoState = {
  order: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  isOrderInfoLoading: false,
  error: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState: orderInfoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isOrderInfoLoading = false;
        state.error = null;
      })
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isOrderInfoLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderInfoLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
  selectors: {
    getOrderInfoByNumber: (state) => state.order,
    getIsOrderInfoLoading: (state) => state.isOrderInfoLoading,
    getOrderInfoError: (state) => state.error
  }
});

export const {
  getOrderInfoByNumber,
  getIsOrderInfoLoading,
  getOrderInfoError
} = orderInfoSlice.selectors;
