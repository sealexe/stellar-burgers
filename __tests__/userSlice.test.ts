import userReducer, {
  clearError,
  initialState,
  loginUser,
  logout,
  registerUser,
  setIsAuthChecked,
  setUser,
  updateUser,
  userLogout
} from '../src/services/slices/userSlice';

describe('тесты userSlice', () => {
  const mockedUser = {
    email: 'test@test.ru',
    name: 'Test Test'
  };
  describe('тесты синхронных экшенов userSlice', () => {
    test('тест проверки аутентификации', () => {
      const state = userReducer(initialState, setIsAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
    test('тест назначения пользователя', () => {
      const state = userReducer(initialState, setUser(mockedUser));
      expect(state.user).toEqual(mockedUser);
    });
    test('тест выхода пользователя из профиля', () => {
      const state = {
        ...initialState,
        user: mockedUser
      };
      const newState = userReducer(state, userLogout());

      expect(newState.user).toBeNull();
    });

    test('очистка ошибки', () => {
      const state = {
        ...initialState,
        error: 'Ошибка'
      };
      const newState = userReducer(state, clearError());

      expect(newState.error).toBeNull();
    });
  });

  describe('тесты асинхронных экшенов userSlice', () => {
    test('тест loginUser.pending', () => {
      const state = userReducer(initialState, {
        type: loginUser.pending.type
      });
      expect(state.error).toBeNull();
    });

    test('тест loginUser.rejected', () => {
      const state = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: { message: 'Произошла ошибка входа в профиль' }
      });
      expect(state.error).toBe('Произошла ошибка входа в профиль');
    });

    test('тест loginUser.fulfilled', () => {
      const state = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: mockedUser
      });
      expect(state.user).toEqual(mockedUser);
      expect(state.isAuthChecked).toBe(true);
    });

    test('тест registerUser.pending', () => {
      const state = userReducer(initialState, {
        type: registerUser.pending.type
      });
      expect(state.error).toBeNull();
    });

    test('тест registerUser.fulfilled', () => {
      const state = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: mockedUser
      });
      expect(state.user).toEqual(mockedUser);
      expect(state.isAuthChecked).toBe(true);
    });

    test('тест registerUser.rejected', () => {
      const state = userReducer(initialState, {
        type: registerUser.rejected.type,
        error: { message: 'Произошла ошибка регистрации пользоваеля' }
      });
      expect(state.error).toBe('Произошла ошибка регистрации пользоваеля');
    });

    test('тест updateUser.pending', () => {
      const state = userReducer(initialState, {
        type: updateUser.pending.type
      });
      expect(state.error).toBeNull();
    });

    test('тест updateUser.rejected', () => {
      const state = userReducer(initialState, {
        type: updateUser.rejected.type,
        error: { message: 'Произошла ошибка обновления данных пользователя' }
      });
      expect(state.error).toBe(
        'Произошла ошибка обновления данных пользователя'
      );
    });

    test('тест updateUser.fulfilled', () => {
      const state = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: mockedUser
      });
      expect(state.user).toEqual(mockedUser);
      expect(state.error).toBeNull();
    });
    test('тест logout.pending', () => {
      const state = userReducer(initialState, {
        type: logout.pending.type
      });
      expect(state.error).toBeNull();
    });

    test('тест logout.rejected', () => {
      const state = userReducer(initialState, {
        type: logout.rejected.type,
        error: { message: 'Произошла ошибка выхода из профиля' }
      });
      expect(state.error).toBe('Произошла ошибка выхода из профиля');
    });

    test('тест logout.fulfilled', () => {
      const state = userReducer(initialState, {
        type: logout.fulfilled.type,
        payload: { user: null }
      });
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});

// import { configureStore } from '@reduxjs/toolkit';
// import { loginUserApi } from '../src/utils/burger-api';

// jest.mock('../src/utils/cookie', () => ({
//   getCookie: jest.fn(() => 'mocked-access-token'),
//   setCookie: jest.fn(),
//   deleteCookie: jest.fn()
// }));

// jest.mock('../src/utils/burger-api', () => {
//   const mockLoginUserApi = jest.fn();

//   return {
//     loginUserApi: mockLoginUserApi,
//     fetchWithRefresh: jest.fn(),
//     refreshToken: jest.fn()
//   };
// });

// const mockedLoginUserApi = loginUserApi as jest.Mock;

// describe('тесты авторизации пользователя', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
// });
