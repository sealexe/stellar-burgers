import { rootReducer } from '../src/services/store';
import { constructorInitialState } from '../src/services/slices/constructorSlice';
import { initialState as userInitialState } from '../src/services/slices/userSlice';
import { ingredientsInitialState } from '../src/services/slices/ingredientSlice';
import { feedsInitialState } from '../src/services/slices/feedSlice';
import { orderInfoInitialState } from '../src/services/slices/orderInfoSlice';
import { profileOrdersInitialState } from '../src/services/slices/profileOrdersSlice';

describe('проверка инициализации rootReducer', () => {
  test('должен возвращать корректное начальное состояние при вызове с undefined state и неизвестным экшеном', () => {
    const resultState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(resultState).toEqual({
      constructorIngredients: constructorInitialState,
      user: userInitialState,
      allIngredients: ingredientsInitialState,
      allFeeds: feedsInitialState,
      orderInfo: orderInfoInitialState,
      profileOrders: profileOrdersInitialState
    });
  });
});
