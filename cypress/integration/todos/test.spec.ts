/// <reference types="cypress" />

type ExtendedCy = typeof cy & {
  findAllByText: (arg: string) => any; // eslint-disable-line
  findByTestId: (arg: string) => any; // eslint-disable-line
};
const _cy = cy as ExtendedCy;

describe('Todo e2e operations', () => {
  it('user should see loading before first todos fetching', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.get('.r-alignItems-1awozwy > .css-view-1dbjc4n > svg').should('be.visible');
    cy.get('.r-alignItems-1awozwy > .css-view-1dbjc4n > svg').should('not.exist');
  });

  it('user should be able to add new todo', async () => {
    // Given
    const newTodoTitle = 'added todo';
    const cursorMock = '213';
    const bodyMock = {
      completed: false,
      title: newTodoTitle,
      id: cursorMock,
      userId: 1,
    };
    cy.intercept('/todos?limit=30&skip=0', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', `${cursorMock}`);
    cy.intercept('POST', '/todos', {
      statusCode: 201,
      body: bodyMock,
    });
    // When
    cy.visit('/');
    cy.get('input[placeholder="Add new todo"]').type(newTodoTitle, { force: true });
    cy.get('.css-cursor-18t94o4 > .css-text-901oao').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains(new RegExp(newTodoTitle))
      .should('be.visible');
  });

  it('user should be able to compelte and deceompelte todo', () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    cy.intercept('PUT', '/todos/*', {
      statusCode: 201,
      body: undefined,
    });
    // When
    cy.visit('/');
    // Then
    const firstTodo = cy.get('[data-testid="list-item-wrapper"]').first();
    firstTodo.within(() => {
      cy.get('[data-testid="circle-blank"]').should('be.visible');
      cy.get('[data-testid="check"]').should('not.exist');
    });
    firstTodo.within(() => {
      // When
      cy.get('[data-testid="circle-blank"]').click();
      // Then
      cy.get('[data-testid="circle-blank"]').should('not.exist');
      cy.get('[data-testid="check"]').should('be.visible');
      // When
      cy.get('[data-testid="check"]').click();
      // Then
      cy.get('[data-testid="check"]').should('not.exist');
      cy.get('[data-testid="circle-blank"]').should('be.visible');
    });
  });

  it('user should see todos', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.get('[data-testid="list-item-wrapper"]').should('be.visible');
  });

  it('user should see text that list is empty when it is empty', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todosEmpty.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    _cy.findAllByText('No todos found').should('be.visible');
  });

  it('user should be able to filter todos by id', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
    // When
    _cy.findByTestId('id-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
    // When
    _cy.findByTestId('id-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 5')
      .should('be.visible');
  });

  it('user should be able to filter todos by name', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
    // When
    _cy.findByTestId('name-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 5')
      .should('be.visible');
    // When
    _cy.findByTestId('name-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
  });

  it('user should be able to filter todos by status', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    cy.intercept('PUT', '/todos/*', {
      statusCode: 201,
      body: undefined,
    });
    // When
    cy.visit('/');
    const firstTodo = cy.get('[data-testid="list-item-wrapper"]').first();
    firstTodo.within(() => {
      cy.get('[data-testid="circle-blank"]').click();
    });
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
    // When
    _cy.findByTestId('status-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]').last().contains('mock todo 1').should('be.visible');
    // When
    _cy.findByTestId('status-filter').click();
    // Then
    cy.get('[data-testid="list-item-wrapper"]')
      .first()
      .contains('mock todo 1')
      .should('be.visible');
  });

  it('user should be able to see loading while fetchng new todos', () => {
    // Given
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    cy.intercept('/todos?limit=30&skip=0', { fixture: 'todosTwiceFetching/todos1.json' });
    _cy.findByTestId('todo-loading').should('be.visible');
    cy.wait(1000);
    cy.intercept('/todos?limit=30&skip=30', { fixture: 'todosTwiceFetching/todos2.json' });
  });

  it('user should be able to see error message when server error', () => {
    // Given
    cy.intercept('/todos?limit*', { forceNetworkError: true });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.contains('Some error happened').should('be.visible');
  });

  it('user should see be able to switch light/dark modes', async () => {
    // Given
    cy.intercept('/todos?limit*', { fixture: 'todos.json' });
    cy.intercept('/todos/cursor', '200');
    // When
    cy.visit('/');
    // Then
    cy.get('[data-testid="sun"]').should('be.visible');
    cy.get('[data-testid="moon"]').should('not.exist');
    // When
    cy.get('[data-testid="sun"]').click();
    // Then
    cy.get('[data-testid="sun"]').should('not.exist');
    cy.get('[data-testid="moon"]').should('be.visible');
    // When
    cy.get('[data-testid="moon"]').click();
    // Then
    cy.get('[data-testid="sun"]').should('be.visible');
    cy.get('[data-testid="moon"]').should('not.exist');
  });
});

export {};
