import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getAllOrders,
  getFeeds,
  getFeedsLoading
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isFeedsLoading = useSelector(getFeedsLoading);
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders = useSelector(getAllOrders);

  return (
    <>
      {isFeedsLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />
      )}
    </>
  );
};

// import { useDispatch, useSelector } from '@store';
// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC, useEffect } from 'react';
// import { getAllFeeds, getFeeds } from '../../services/slices/feedSlice';

// export const Feed: FC = () => {
//   /** TODO: взять переменную из стора */
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getFeeds());
//   }, []);

//   const orders = useSelector(getAllFeeds);
//   console.log('feeds', orders);

//   if (!orders.length) {
//     return <Preloader />;
//   }

//   <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
// };
