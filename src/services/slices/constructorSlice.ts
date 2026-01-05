import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  ingredients: Array<TConstructorIngredient>;
  bun: TIngredient | null;
};

const constructorInitialState: TConstructorState = {
  ingredients: [],
  bun: null
};

type TMoveParam = {
  index: number;
};

export const moveDown = createAction<TMoveParam, 'MOVE_DOWN'>('MOVE_DOWN');
export const moveUp = createAction<TMoveParam, 'MOVE_UP'>('MOVE_UP');

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
  },
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});

export const { addIngredient, removeIngredient } = constructorSlice.actions;
export const { getConstructorIngredients, getBun } = constructorSlice.selectors;
