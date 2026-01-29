import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: Omit<TRegisterData, 'name'>,
    { rejectWithValue }
  ) => {
    const res = await loginUserApi({ email, password });
    if (!res.success) {
      rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const res = await registerUserApi(data);
    if (!res.success) {
      rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const res = await updateUserApi(data);
    if (!res.success) {
      rejectWithValue(res);
    }
    return res.user;
  }
);

export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message || 'Произошла ошибка входа в профиль';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error =
        action.error.message || 'Произошла ошибка регистрации пользоваеля';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error =
        action.error.message ||
        'Произошла ошибка обновления данных пользователя';
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(logout.pending, (state) => {
      state.error = null;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.error =
        action.error.message || 'Произошла ошибка выхода из профиля';
    });
  }
});

export const logout = createAsyncThunk('user/logoutUser', (_, { dispatch }) => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userLogout());
  });
});

export const { setUser, setIsAuthChecked, userLogout, clearError } =
  userSlice.actions;
export const { getUserData, getIsAuthChecked, getError } = userSlice.selectors;
