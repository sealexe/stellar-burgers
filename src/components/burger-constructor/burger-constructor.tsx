import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  getBun,
  getConstructorIngredients,
  getOrderModalData,
  getOrderRequest,
  postOrder
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const ingredients = useSelector(getConstructorIngredients);
  const bun = useSelector(getBun);
  const constructorItems = { bun, ingredients };
  const user = useSelector(getUserData);
  const navigate = useNavigate();

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    if (bun) {
      const orderData = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id
      ];
      dispatch(postOrder(orderData));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
