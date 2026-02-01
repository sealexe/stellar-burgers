import { nanoid } from '@reduxjs/toolkit';
import {
  addIngredient,
  constructorSlice,
  moveDown,
  moveUp,
  removeIngredient
} from '../src/services/slices/constructorSlice';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mocked-id')
}));

describe('тесты синхронных экшенов constructorSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('тест добавление ингредиента в конструктор', () => {
    const constructorInitialState = {
      ingredients: [],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0
    };
    const action = addIngredient(ingredient);
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(nanoid).toHaveBeenCalled();
    expect(state).toEqual({
      ingredients: [{ ...ingredient, id: 'mocked-id' }],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });
  test('удаление ингредиента из конструктора', () => {
    const constructorInitialState = {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'id-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
      id: 'id-1'
    };
    const action = removeIngredient(ingredient);
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(state).toEqual({
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });
  test('перемещение ингредиента вниз', () => {
    const constructorInitialState = {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'id-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0,
          id: 'id-3'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    //выбираем индекс элемента в массиве, который хотим переместить вниз
    const index = 1;
    const action = moveDown({ index });
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(state).toEqual({
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'id-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0,
          id: 'id-3'
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });
  test('перемещение ингредиента вверх', () => {
    const constructorInitialState = {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'id-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0,
          id: 'id-3'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    //выбираем индекс элемента в массиве, который хотим переместить вверх
    const index = 2;
    const action = moveUp({ index });
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(state).toEqual({
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'id-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0,
          id: 'id-3'
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0,
          id: 'id-2'
        }
      ],
      bun: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });
});
