import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
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
