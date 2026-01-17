import { getUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './slices/userSlice';
import { getCookie } from '../utils/cookie';

const isTokenExists = () => getCookie('accessToken') !== null;

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      await getUserApi()
        .then((user) => {
          dispatch(setUser(user.user));
        })
        .finally(() => {
          dispatch(setIsAuthChecked(true));
        });
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

// export const getUser = async () => {
//   const res = await getUserApi();
//   return res.user;
// };
