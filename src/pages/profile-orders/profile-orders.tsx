import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getAllProfileOrders,
  getIsProfileOrdersLoading,
  getProfileOrders
} from '../../services/slices/profileOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isProfileOrdersLoading = useSelector(getIsProfileOrdersLoading);
  useEffect(() => {
    dispatch(getProfileOrders());
  }, []);
  const orders = useSelector(getAllProfileOrders);
  return (
    <>
      {isProfileOrdersLoading ? (
        <Preloader />
      ) : (
        <ProfileOrdersUI orders={orders} />
      )}
    </>
  );
  // return <ProfileOrdersUI orders={orders} />;
};

// import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';

// export const ProfileOrders: FC = () => {
//   /** TODO: взять переменную из стора */
//   const orders: TOrder[] = [];

//   return <ProfileOrdersUI orders={orders} />;
// };
