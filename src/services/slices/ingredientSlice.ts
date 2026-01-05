import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const ingredientsInitialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'allIngredients',
  initialState: ingredientsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
        state.error = null;
      })
      .addCase(getIngredients.pending, (state, action) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
  selectors: {
    getAllIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isIngredientsLoading,
    getImgredientsError: (state) => state.error
  }
});

export const { getAllIngredients, getIngredientsLoading, getImgredientsError } =
  ingredientsSlice.selectors;

// import { getIngredientsApi } from '@api';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TIngredient } from '@utils-types';

// export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
//   getIngredientsApi()
// );

// interface IngredientsState {
//   ingredients: TIngredient[];
//   isIngredientsLoading: boolean;
//   error: string | null;
// }

// const ingredientsInitialState: IngredientsState = {
//   ingredients: [],
//   isIngredientsLoading: false,
//   error: null
// };

// export const ingredientsSlice = createSlice({
//   name: 'allIngredients',
//   initialState: ingredientsInitialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIngredients.fulfilled, (state, action) => {
//         state.ingredients = action.payload;
//         state.isIngredientsLoading = false;
//         state.error = null;
//       })
//       .addCase(getIngredients.pending, (state, action) => {
//         state.isIngredientsLoading = true;
//         state.error = null;
//       })
//       .addCase(getIngredients.rejected, (state, action) => {
//         state.isIngredientsLoading = false;
//         state.error = action.error.message || 'Произошла ошибка';
//       });
//   }
// });

// export const ingredientsReducer = ingredientsSlice.reducer;

// type TConstructorState = {
//   items: Array<TConstructorIngredient>;
// };

// const constructorInitialState: TConstructorState = {
//   items: []
// };

// export const constructorSlice = createSlice({
//   name: 'constructorIngredients',
//   initialState: constructorInitialState,
//   reducers: {
//     addIngredient: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         state.items.push(action.payload);
//         console.log(state.items);
//       },
//       prepare: (ingredient: TIngredient) => {
//         const id = nanoid();
//         return { payload: { ...ingredient, id } };
//       }
//     },
//     removeIngredient: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     }
//   }
// })
