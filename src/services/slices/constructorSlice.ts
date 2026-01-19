import { orderBurgerApi } from '@api';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  ingredients: Array<TConstructorIngredient>;
  bun: TIngredient | null;
  order: string[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  ingredientCounter: number;
};

const constructorInitialState: TConstructorState = {
  ingredients: [],
  bun: null,
  order: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
  ingredientCounter: 0
};

type TMoveParam = {
  index: number;
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const moveDown = createAction<TMoveParam, 'MOVE_DOWN'>('MOVE_DOWN');
export const moveUp = createAction<TMoveParam, 'MOVE_UP'>('MOVE_UP');
export const removeAll = createAction<'REMOVE_ALL'>('REMOVE_ALL');

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState: constructorInitialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        state.order.push(action.payload._id);
        console.log(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = ingredient.type !== 'bun' ? nanoid() : undefined;
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(moveDown, (state, action) => {
      state.ingredients.splice(
        action.payload.index + 1,
        0,
        state.ingredients.splice(action.payload.index, 1)[0]
      );
    });
    builder.addCase(moveUp, (state, action) => {
      state.ingredients.splice(
        action.payload.index - 1,
        0,
        state.ingredients.splice(action.payload.index, 1)[0]
      );
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.orderModalData = action.payload.order;
      state.orderRequest = false;
      state.error = null;
    });
    builder.addCase(postOrder.pending, (state) => {
      state.orderRequest = true;
      state.orderModalData = null;
      state.error = null;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = null;
      state.error =
        action.error.message || 'Произошла ошибка оформления заказа';
    });
  },
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getOrder: (state) => state.order
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export const {
  getConstructorIngredients,
  getBun,
  getOrder,
  getOrderModalData,
  getOrderRequest
} = constructorSlice.selectors;
