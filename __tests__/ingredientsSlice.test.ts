import ingredientsReducer, {
  ingredientsInitialState,
  getIngredients
} from '../src/services/slices/ingredientSlice';

describe('тест ingredientsSlice reducer', () => {
  test('тест getIngredients.pending', () => {
    const state = ingredientsReducer(ingredientsInitialState, {
      type: getIngredients.pending.type
    });
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('тест getIngredients.fullfiled', () => {
    const mockedIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];
    const loadingState = {
      ...ingredientsInitialState,
      isIngredientsLoading: true
    };
    const state = ingredientsReducer(loadingState, {
      type: getIngredients.fulfilled.type,
      payload: mockedIngredients
    });

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(mockedIngredients);
    expect(state.error).toBeNull();
  });

  test('тест getIngredients.rejected', () => {
    const loadingState = {
      ...ingredientsInitialState,
      isIngredientsLoading: true
    };
    const state = ingredientsReducer(loadingState, {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки данных' }
    });

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   ingredientsSlice,
//   getIngredients
// } from '../src/services/slices/ingredientSlice';

// describe('тест слайса ingredientsSlice', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   test('тест загрузки ингредиентов', async () => {
//     const expectedResult = {
//       success: true,
//       data: [
//         {
//           _id: '643d69a5c3f7b9001cfa093c',
//           name: 'Краторная булка N-200i',
//           type: 'bun',
//           proteins: 80,
//           fat: 24,
//           carbohydrates: 53,
//           calories: 420,
//           price: 1255,
//           image: 'https://code.s3.yandex.net/react/code/bun-02.png',
//           image_mobile:
//             'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
//           image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
//           __v: 0
//         },
//         {
//           _id: '643d69a5c3f7b9001cfa0941',
//           name: 'Биокотлета из марсианской Магнолии',
//           type: 'main',
//           proteins: 420,
//           fat: 142,
//           carbohydrates: 242,
//           calories: 4242,
//           price: 424,
//           image: 'https://code.s3.yandex.net/react/code/meat-01.png',
//           image_mobile:
//             'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
//           image_large:
//             'https://code.s3.yandex.net/react/code/meat-01-large.png',
//           __v: 0
//         }
//       ]
//     };

//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(expectedResult)
//       })
//     ) as jest.Mock;

//     const store = configureStore({
//       reducer: {
//         allIngredients: ingredientsSlice.reducer
//       }
//     });

//     await store.dispatch(getIngredients());
//     const state = store.getState();
//     expect(state.allIngredients.ingredients).toEqual(expectedResult.data);
//   });
//   test('тест состояния загрузки ингредиентов', async () => {
//     global.fetch = jest.fn(
//       () =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve({
//               ok: true,
//               json: () => Promise.resolve({ success: true, data: [] })
//             });
//           }, 100);
//         })
//     ) as jest.Mock;

//     const store = configureStore({
//       reducer: {
//         allIngredients: ingredientsSlice.reducer
//       }
//     });
//     //делаем запрос, но не дожидаемся его завершения
//     const promise = store.dispatch(getIngredients());
//     //процесс загрузки должен быть true
//     expect(store.getState().allIngredients.isIngredientsLoading).toBe(true);
//     //дождидаемся завершения запроса
//     await promise;
//     //процесс загрузки - false
//     expect(store.getState().allIngredients.isIngredientsLoading).toBe(false);
//   });
//   test('тест обработки ошибки', async () => {
//     const errorMessage = 'Ошибка загрузки данных';
//     global.fetch = jest.fn(() =>
//       Promise.reject(new Error(errorMessage))
//     ) as jest.Mock;
//     const store = configureStore({
//       reducer: {
//         allIngredients: ingredientsSlice.reducer
//       }
//     });
//     await store.dispatch(getIngredients());
//     const state = store.getState();
//     expect(state.allIngredients.error).toBe(errorMessage);
//   });
// });
