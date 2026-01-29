import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { getAllIngredients } from '../../services/slices/ingredientSlice';
import { useLocation } from 'react-router-dom';
import {
  getIsOrderInfoLoading,
  getOrderByNumber,
  getOrderInfoByNumber
} from '../../services/slices/orderInfoSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const location = useLocation();

  const orderIdNumber = Number(location.pathname.split('/').pop());

  useEffect(() => {
    dispatch(getOrderByNumber(orderIdNumber));
  }, []);

  const orderData = useSelector(getOrderInfoByNumber);
  const ingredients = useSelector(getAllIngredients);
  const isOrderInfoLoading = useSelector(getIsOrderInfoLoading);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  return (
    <>
      {isOrderInfoLoading ? (
        <Preloader />
      ) : (
        orderInfo && <OrderInfoUI orderInfo={orderInfo} />
      )}
    </>
  );
};
