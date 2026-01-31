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

describe('проверка страницы конструктора бургера', function () {
  it('добавление ингредиента в список конструктора', function () {
    cy.get('[data-cy=ingredient-card][data-id="643d69a5c3f7b9001cfa093e"]')
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy=ingredient-card][data-id="643d69a5c3f7b9001cfa093e"]')
      .get('.cy-inredient-counter')
      .should('have.text', '1');

    cy.get('[data-cy=burger-constructor]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );

    cy.get('[data-cy=burger-constructor]')
      .get('[data-cy=total-price]')
      .should('have.text', '988');
  });
});

describe('проверка работы модальных окон', function () {
  it('открытие модального окна ингредиента', function () {
    cy.get(
      '[data-cy=ingredient-link][data-id="643d69a5c3f7b9001cfa093e"]'
    ).click();

    cy.get('[data-cy=overlay]').should('exist');
    cy.get('[data-cy=modal-window]').within(() => {
      cy.get('[data-cy=modal-title]').should('contain', 'Детали ингредиента');

      cy.get('[data-cy=ingredient-image]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty');

      cy.get('[data-cy=ingredient-calories]').should('have.text', '643');
      cy.get('[data-cy=ingredient-proteins]').should('have.text', '44');
      cy.get('[data-cy=ingredient-fat]').should('have.text', '26');
      cy.get('[data-cy=carbohydrates]').should('have.text', '85');
    });
  });

  it('закрытие модального окна ингредиента', function () {
    cy.get(
      '[data-cy=ingredient-link][data-id="643d69a5c3f7b9001cfa093e"]'
    ).click();
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=overlay]').should('not.exist');
    cy.get('[data-cy=modal-window]').should('not.exist');

    cy.get(
      '[data-cy=ingredient-link][data-id="643d69a5c3f7b9001cfa093e"]'
    ).click();
    cy.get('[data-cy=overlay]').click('topLeft', { force: true });
    cy.get('[data-cy=modal-window]').should('not.exist');
  });
});
// it('добавление булки в конструктор', function () {
//   //Краторная булка N-200i
//   cy.get('[data-cy=ingredient-card][data-id="643d69a5c3f7b9001cfa093c"]')
//     .contains('button', 'Добавить')
//     .should('exist')
//     .click();

//   cy.get('[data-cy=ingredient-card][data-id="643d69a5c3f7b9001cfa093c"]')
//     .get('.cy-inredient-counter')
//     .should('have.text', '2');
// });
