import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredientSlice';
import { constructorSlice } from './slices/constructorSlice';
import { feedsSlice } from './slices/feedSlice';
import { orderInfoSlice } from './slices/orderInfoSlice';
import { userSlice } from './slices/userSlice';

const rootReducer = combineSlices(
  constructorSlice,
  ingredientsSlice,
  feedsSlice,
  orderInfoSlice,
  userSlice
);

// const rootReducer = () => {
// }; // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
