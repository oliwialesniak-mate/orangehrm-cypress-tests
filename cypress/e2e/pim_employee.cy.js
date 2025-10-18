/// <reference types="cypress" />

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

describe('PIM - Add Employee Workflow (Demo-Safe)', () => {
  beforeEach(() => {
    cy.visit('/auth/login', { failOnStatusCode: false });
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 20000 }).should('include', '/dashboard/index');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('User is able to navigate to PIM module', () => {
    cy.contains('PIM').click();
    cy.url({ timeout: 20000 }).should('include', '/pim/viewEmployeeList');
    cy.get('.oxd-topbar-header-breadcrumb h6').should('contain.text', 'PIM');
  });

  it('User is able to add a new employee record', () => {
    cy.contains('PIM').click();
    cy.contains('Add Employee', { timeout: 20000 }).click();
    cy.url().should('include', '/pim/addEmployee');
    cy.get('h6', { timeout: 10000 }).should('contain.text', 'Add Employee');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="middleName"]').type('A');
    cy.get('input[name="lastName"]').type('Doe');

    cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input.oxd-input')
      .should('exist')
      .then(($input) => {
        if (!$input.val() || $input.val().trim() === '') {
          cy.wrap($input).clear().type(Math.floor(Math.random() * 10000).toString());
        }
      });

    cy.contains('Save').should('be.visible').click();
    cy.url({ timeout: 40000 }).should('include', '/pim/viewPersonalDetails');
    cy.get('h6', { timeout: 10000 }).should('contain.text', 'John');
  });

  it('User is unable to add an employee without required fields', () => {
    cy.contains('PIM').click();
    cy.contains('Add Employee', { timeout: 20000 }).click();
    cy.contains('Save').click();
    cy.get('span.oxd-input-field-error-message').should('be.visible').and('contain.text', 'Required');
    cy.url().should('include', '/pim/addEmployee');
  });
});
