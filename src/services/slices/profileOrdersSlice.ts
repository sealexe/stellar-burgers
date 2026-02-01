import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getAll',
  async () => getOrdersApi()
);

interface ProfileOrdersState {
  profileOrders: TOrder[];
  isProfileOrdersLoading: boolean;
  error: string | null;
}

export const profileOrdersInitialState: ProfileOrdersState = {
  profileOrders: [],
  isProfileOrdersLoading: false,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState: profileOrdersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.profileOrders = action.payload;
        state.isProfileOrdersLoading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(getProfileOrders.pending, (state, action) => {
        state.isProfileOrdersLoading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.isProfileOrdersLoading = false;
        state.error =
          action.error.message ||
          'Произошла ошибка загрузки заказов пользователя';
      });
  },
  selectors: {
    getAllProfileOrders: (state) => state.profileOrders,
    getIsProfileOrdersLoading: (state) => state.isProfileOrdersLoading,
    getOrdersError: (state) => state.error
  }
});

export const {
  getAllProfileOrders,
  getIsProfileOrdersLoading,
  getOrdersError
} = profileOrdersSlice.selectors;
