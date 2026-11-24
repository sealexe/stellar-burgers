import feedsSliceReducer, {
  feedsInitialState,
  getFeeds
} from '../src/services/slices/feedSlice';

describe('тест feedsSlice reducer', () => {
  test('тест getFeeds.fulfilled', () => {
    const mockedOrders = {
      orders: [
        {
          _id: '697f777ba64177001b329c15',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2026-02-01T15:55:39.916Z',
          updatedAt: '2026-02-01T15:55:40.348Z',
          number: 100126
        },
        {
          _id: '697f6e43a64177001b329bfe',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Минеральный spicy флюоресцентный бургер',
          createdAt: '2026-02-01T15:16:19.187Z',
          updatedAt: '2026-02-01T15:16:19.406Z',
          number: 100125
        }
      ],
      total: 2,
      totalToday: 10
    };

    const loadingState = {
      ...feedsInitialState,
      isOrdersLoading: true
    };

    const state = feedsSliceReducer(loadingState, {
      type: getFeeds.fulfilled.type,
      payload: mockedOrders
    });

    expect(state.isOrdersLoading).toBe(false);
    expect(state.orders).toEqual(mockedOrders.orders);
    expect(state.ordersAmount.total).toEqual(mockedOrders.total);
    expect(state.ordersAmount.totalToday).toEqual(mockedOrders.totalToday);
    expect(state.error).toBeNull();
  });

  test('тест getFeeds.pending', () => {
    const state = feedsSliceReducer(feedsInitialState, {
      type: getFeeds.pending.type
    });
    expect(state.isOrdersLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('тест getFeeds.rejected', () => {
    const loadingState = {
      ...feedsInitialState,
      isOrdersLoading: true
    };
    const state = feedsSliceReducer(loadingState, {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка загрузки данных' }
    });

    expect(state.isOrdersLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});

// import { configureStore } from '@reduxjs/toolkit';
// import { feedsSlice, getFeeds } from '../src/services/slices/feedSlice';

// describe('тест слайса feedSlice', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   test('тест загрузки ленты заказов', async () => {
//     const expectedResult = {
//       success: true,
//       orders: [
//         {
//           _id: '697f777ba64177001b329c15',
//           ingredients: [
//             '643d69a5c3f7b9001cfa093d',
//             '643d69a5c3f7b9001cfa093e',
//             '643d69a5c3f7b9001cfa093d'
//           ],
//           status: 'done',
//           name: 'Флюоресцентный люминесцентный бургер',
//           createdAt: '2026-02-01T15:55:39.916Z',
//           updatedAt: '2026-02-01T15:55:40.348Z',
//           number: 100126
//         },
//         {
//           _id: '697f6e43a64177001b329bfe',
//           ingredients: [
//             '643d69a5c3f7b9001cfa093d',
//             '643d69a5c3f7b9001cfa0942',
//             '643d69a5c3f7b9001cfa0946',
//             '643d69a5c3f7b9001cfa093d'
//           ],
//           status: 'done',
//           name: 'Минеральный spicy флюоресцентный бургер',
//           createdAt: '2026-02-01T15:16:19.187Z',
//           updatedAt: '2026-02-01T15:16:19.406Z',
//           number: 100125
//         }
//       ],
//       total: 2,
//       totalToday: 10
//     };
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(expectedResult)
//       })
//     ) as jest.Mock;

//     const store = configureStore({
//       reducer: {
//         allFeeds: feedsSlice.reducer
//       }
//     });
//     await store.dispatch(getFeeds());
//     const state = store.getState();
//     expect(state.allFeeds.orders).toEqual(expectedResult.orders);
//   });
//   test('тест состояния загрузки ленты', async () => {
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
//         allFeeds: feedsSlice.reducer
//       }
//     });
//     const promise = store.dispatch(getFeeds());
//     expect(store.getState().allFeeds.isOrdersLoading).toBe(true);
//     await promise;
//     expect(store.getState().allFeeds.isOrdersLoading).toBe(false);
//   });
//   test('тест обработки ошибки', async () => {
//     const errorMessage = 'Ошибка загрузки данных';
//     global.fetch = jest.fn(() =>
//       Promise.reject(new Error(errorMessage))
//     ) as jest.Mock;
//     const store = configureStore({
//       reducer: {
//         allFeeds: feedsSlice.reducer
//       }
//     });
//     await store.dispatch(getFeeds());
//     const state = store.getState();
//     expect(state.allFeeds.error).toBe(errorMessage);
//   });
// });
