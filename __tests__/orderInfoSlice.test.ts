import orderInfoReducer, {
  getOrderByNumber,
  orderInfoInitialState
} from '../src/services/slices/orderInfoSlice';

describe('тест orderInfoSlice reducer', () => {
  test('тест getOrderByNumber.fulfilled', () => {
    const mockedOrder = {
      orders: [
        {
          _id: '697f633ca64177001b329be5',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          owner: '697f632da64177001b329be3',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2026-02-01T14:29:16.278Z',
          updatedAt: '2026-02-01T14:29:16.582Z',
          number: 100500,
          __v: 0
        }
      ]
    };

    const loadingState = {
      ...orderInfoInitialState,
      isOrderInfoLoading: true
    };

    const state = orderInfoReducer(loadingState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockedOrder
    });

    expect(state.isOrderInfoLoading).toBe(false);
    expect(state.order).toEqual(mockedOrder.orders[0]);
    expect(state.error).toBeNull();
  });

  test('тест getOrderByNumber.pending', () => {
    const state = orderInfoReducer(orderInfoInitialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.isOrderInfoLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('тест getOrderByNumber.rejected', () => {
    const loadingState = {
      ...orderInfoInitialState,
      isOrderInfoLoading: true
    };
    const state = orderInfoReducer(loadingState, {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка загрузки данных' }
    });

    expect(state.isOrderInfoLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   getOrderByNumber,
//   orderInfoSlice
// } from '../src/services/slices/orderInfoSlice';

// describe('тест слайса orderInfoSlice', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   test('тест загрузки информации о заказе по номеру', async () => {
//     const expectedResult = {
//       success: true,
//       orders: [
//         {
//           _id: '697f633ca64177001b329be5',
//           ingredients: [
//             '643d69a5c3f7b9001cfa093d',
//             '643d69a5c3f7b9001cfa093e',
//             '643d69a5c3f7b9001cfa093d'
//           ],
//           owner: '697f632da64177001b329be3',
//           status: 'done',
//           name: 'Флюоресцентный люминесцентный бургер',
//           createdAt: '2026-02-01T14:29:16.278Z',
//           updatedAt: '2026-02-01T14:29:16.582Z',
//           number: 100122,
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
//         orderInfo: orderInfoSlice.reducer
//       }
//     });

//     await store.dispatch(getOrderByNumber(100122));
//     const state = store.getState();
//     expect(state.orderInfo.order).toEqual(expectedResult.orders[0]);
//   });
//   test('тест состояния загрузки информации о заказе по номеру', async () => {
//     global.fetch = jest.fn(
//       () =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve({
//               ok: true,
//               json: () => Promise.resolve({ success: true, orders: [] })
//             });
//           }, 100);
//         })
//     ) as jest.Mock;

//     const store = configureStore({
//       reducer: {
//         orderInfo: orderInfoSlice.reducer
//       }
//     });
//     const promise = store.dispatch(getOrderByNumber(100122));
//     expect(store.getState().orderInfo.isOrderInfoLoading).toBe(true);
//     await promise;
//     expect(store.getState().orderInfo.isOrderInfoLoading).toBe(false);
//   });
//   test('тест обработки ошибки', async () => {
//     const errorMessage = 'Ошибка загрузки данных';
//     global.fetch = jest.fn(() =>
//       Promise.reject(new Error(errorMessage))
//     ) as jest.Mock;
//     const store = configureStore({
//       reducer: {
//         orderInfo: orderInfoSlice.reducer
//       }
//     });
//     await store.dispatch(getOrderByNumber(100122));
//     const state = store.getState();
//     expect(state.orderInfo.error).toBe(errorMessage);
//   });
// });
