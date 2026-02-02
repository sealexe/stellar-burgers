import { INGREDIENT_IDS, SELECTORS } from 'cypress/constants/selectors';

describe('проверка страницы конструктора бургера', function () {
  beforeEach(() => {
    //получаем ингредиенты
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/ingredients'
      },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });
  it('добавление ингредиента в список конструктора', function () {
    //кликаем на ингредиент
    cy.get(`${SELECTORS.ingredientCard}[data-id="${INGREDIENT_IDS.filling}"]`)
      .contains('button', 'Добавить')
      .click();
    //проверяем изменение счетчика ингредиента
    cy.get(`${SELECTORS.ingredientCard}[data-id="${INGREDIENT_IDS.filling}"]`)
      .get('.cy-inredient-counter')
      .should('have.text', '1');
    //проверяем наличие ингредиента в консрукторе
    cy.get(SELECTORS.burgerConstructor).should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    //проверяем изменение стоимости заказа
    cy.get(SELECTORS.burgerConstructor)
      .get(SELECTORS.totalPrice)
      .should('have.text', '988');
  });
});

describe('проверка работы модальных окон', function () {
  //получаем ингредиенты
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/ingredients'
      },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });
  it('открытие модального окна ингредиента', function () {
    //кликаем по ингредиенту
    cy.get(
      `${SELECTORS.ingredientLink}[data-id="${INGREDIENT_IDS.filling}"]`
    ).click();
    //проверяем наличие оверлея
    cy.get(SELECTORS.overlay).should('exist');
    //проверяем наличие модального окна
    cy.get(SELECTORS.modalWindow).should('exist');
    cy.get(SELECTORS.modalWindow).within(() => {
      //проверяем наличие заколовка модального окна
      cy.get('[data-cy=modal-title]').should('contain', 'Детали ингредиента');
      //проверяем отображение картинки ингредиента
      cy.get('[data-cy=ingredient-image]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty');
      //проверяем точное совпадение пищевой ценности ингредиента
      cy.get('[data-cy=ingredient-calories]').should('have.text', '643');
      cy.get('[data-cy=ingredient-proteins]').should('have.text', '44');
      cy.get('[data-cy=ingredient-fat]').should('have.text', '26');
      cy.get('[data-cy=carbohydrates]').should('have.text', '85');
    });
  });

  it('закрытие модального окна ингредиента', function () {
    //клик по ингредиенту
    cy.get(
      `${SELECTORS.ingredientLink}[data-id="${INGREDIENT_IDS.filling}"]`
    ).click();
    //клик по кнопке закрытия модального окна
    cy.get('[data-cy=modal-close-button]').click();
    //проверка отсутствия оверлея
    cy.get(SELECTORS.overlay).should('not.exist');
    //проверка отсутствия модального окна
    cy.get(SELECTORS.modalWindow).should('not.exist');
    //кликаем по ингредиенту
    cy.get(
      `${SELECTORS.ingredientLink}[data-id="${INGREDIENT_IDS.filling}"]`
    ).click();
    //кликаем по оверлею
    cy.get(SELECTORS.overlay).click('topLeft', { force: true });
    //проверяем наличие модального окна
    cy.get(SELECTORS.modalWindow).should('not.exist');
  });
});

describe('проверка оформления заказа', function () {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/ingredients'
      },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.visit('/');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.setCookie('accessToken', 'mock-access-token');
    cy.window().then((window) => {
      window.localStorage.setItem('refresh-token', 'mock-refresh-token');
    });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    //добавляем ингредиенты в корзину
    cy.get(`${SELECTORS.ingredientCard}[data-id="${INGREDIENT_IDS.bun}"]`)
      .contains('button', 'Добавить')
      .click();
    cy.get(`${SELECTORS.ingredientCard}[data-id="${INGREDIENT_IDS.filling}"]`)
      .contains('button', 'Добавить')
      .click();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((window) => {
      window.localStorage.clear();
    });
  });

  it('проверка отправки заказа на сервер', function () {
    //оформляем заказ
    cy.get('[data-cy=post-order-button]').click();
    //проверяем тело запроса
    cy.get('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ]
      });
  });
  it('проверка модального окна после успешного оформления заказа', function () {
    //оформляем заказ
    cy.get(SELECTORS.postOrderButton).click();
    //проверяем наличие оверлея
    cy.get(SELECTORS.overlay).should('exist');
    //проверяем наличие модального окна
    cy.get(SELECTORS.modalWindow).should('exist');
    cy.get(SELECTORS.modalWindow).within(() => {
      cy.get('[data-cy=order-number]').should('have.text', '99962');
      cy.get('[data-cy=order-modal-image]').should('be.visible');
    });
  });
  it('проверка очистки конструктора после оформления заказа', function () {
    //оформляем заказ
    cy.get(SELECTORS.postOrderButton).click();
    //проверка очистки конструктора
    cy.get(SELECTORS.burgerConstructor)
      .find('.constructor-element')
      .should('not.exist');
    cy.get(SELECTORS.totalPrice).should('contain', '0');
    cy.get('[data-cy=top-bun-container]').should('have.text', 'Выберите булки');
    cy.get('[data-cy=bottom-bun-container]').should(
      'have.text',
      'Выберите булки'
    );
    cy.get('[data-cy=filling-container]').should(
      'have.text',
      'Выберите начинку'
    );
  });
});
