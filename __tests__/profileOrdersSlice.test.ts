import profileOrdersSliceReducer, {
  getProfileOrders,
  profileOrdersInitialState
} from '../src/services/slices/profileOrdersSlice';

describe('тест profileOrdersSlice reducer', () => {
  test('тест getProfileOrders.fulfilled', () => {
    const mockedOrders = [
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
    ];

    const loadingState = {
      ...profileOrdersInitialState,
      isProfileOrdersLoading: true
    };

    const state = profileOrdersSliceReducer(loadingState, {
      type: getProfileOrders.fulfilled.type,
      payload: mockedOrders
    });

    expect(state.isProfileOrdersLoading).toBe(false);
    expect(state.profileOrders).toEqual(mockedOrders);
    expect(state.error).toBeNull();
  });

  test('тест getProfileOrders.pending', () => {
    const state = profileOrdersSliceReducer(profileOrdersInitialState, {
      type: getProfileOrders.pending.type
    });
    expect(state.isProfileOrdersLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('тест getProfileOrders.rejected', () => {
    const loadingState = {
      ...profileOrdersInitialState,
      isProfileOrdersLoading: true
    };
    const state = profileOrdersSliceReducer(loadingState, {
      type: getProfileOrders.rejected.type,
      error: { message: 'Ошибка загрузки данных' }
    });

    expect(state.isProfileOrdersLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   getProfileOrders,
//   profileOrdersSlice
// } from '../src/services/slices/profileOrdersSlice';
// import { getOrdersApi } from '../src/utils/burger-api';

// jest.mock('../src/utils/cookie', () => ({
//   getCookie: jest.fn(() => 'mocked-access-token'),
//   setCookie: jest.fn(),
//   deleteCookie: jest.fn()
// }));

// jest.mock('../src/utils/burger-api', () => {
//   const mockGetOrdersApi = jest.fn();

//   return {
//     getOrdersApi: mockGetOrdersApi,
//     fetchWithRefresh: jest.fn(),
//     refreshToken: jest.fn()
//   };
// });

// const mockedGetOrdersApi = getOrdersApi as jest.Mock;

// describe('тест слайса заказов пользователя', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   test('тест загрузки заказов пользователя в его профиле', async () => {
//     const expectedResult = [
//       {
//         _id: '697f777ba64177001b329c15',
//         ingredients: [
//           '643d69a5c3f7b9001cfa093d',
//           '643d69a5c3f7b9001cfa093e',
//           '643d69a5c3f7b9001cfa093d'
//         ],
//         status: 'done',
//         name: 'Флюоресцентный люминесцентный бургер',
//         createdAt: '2026-02-01T15:55:39.916Z',
//         updatedAt: '2026-02-01T15:55:40.348Z',
//         number: 100126
//       },
//       {
//         _id: '697f6e43a64177001b329bfe',
//         ingredients: [
//           '643d69a5c3f7b9001cfa093d',
//           '643d69a5c3f7b9001cfa0942',
//           '643d69a5c3f7b9001cfa0946',
//           '643d69a5c3f7b9001cfa093d'
//         ],
//         status: 'done',
//         name: 'Минеральный spicy флюоресцентный бургер',
//         createdAt: '2026-02-01T15:16:19.187Z',
//         updatedAt: '2026-02-01T15:16:19.406Z',
//         number: 100125
//       }
//     ];

//     mockedGetOrdersApi.mockResolvedValue(expectedResult);

//     const store = configureStore({
//       reducer: {
//         profileOrders: profileOrdersSlice.reducer
//       }
//     });
//     await store.dispatch(getProfileOrders());
//     const state = store.getState();
//     expect(state.profileOrders.profileOrders).toEqual(expectedResult);
//   });
//   test('тест состояния загрузки', async () => {
//     mockedGetOrdersApi.mockImplementation(
//       () =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve([]);
//           }, 100);
//         })
//     );

//     const store = configureStore({
//       reducer: {
//         profileOrders: profileOrdersSlice.reducer
//       }
//     });

//     const promise = store.dispatch(getProfileOrders());

//     expect(store.getState().profileOrders.isProfileOrdersLoading).toBe(true);
//     await promise;
//     expect(store.getState().profileOrders.isProfileOrdersLoading).toBe(false);
//   });
//   test('тест обработки ошибки', async () => {
//     const errorMessage = 'Ошибка загрузки данных';
//     mockedGetOrdersApi.mockImplementation(() =>
//       Promise.reject(new Error(errorMessage))
//     );
//     const store = configureStore({
//       reducer: {
//         profileOrders: profileOrdersSlice.reducer
//       }
//     });
//     await store.dispatch(getProfileOrders());
//     const state = store.getState();
//     expect(state.profileOrders.error).toBe(errorMessage);
//   });
// });
