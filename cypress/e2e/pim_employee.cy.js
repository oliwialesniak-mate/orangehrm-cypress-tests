/// <reference types="cypress" />

describe('PIM - Add Employee Workflow (Demo-Safe)', () => {
  const newEmployee = {
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
  };

  beforeEach(() => {
    cy.visit('/auth/login', { failOnStatusCode: false });

    // Login
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verify dashboard
    cy.url({ timeout: 20000 }).should('include', '/dashboard/index');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  /**
   * 1️⃣ User can navigate to PIM module
   */
  it('User is able to navigate to PIM module', () => {
    cy.contains('PIM').click();

    cy.url({ timeout: 20000 }).should('include', '/pim/viewEmployeeList');
    cy.get('.oxd-topbar-header-breadcrumb h6')
      .should('contain.text', 'PIM');

    cy.log('✅ Successfully navigated to PIM module');
  });

  /**
   * 2️⃣ User can add a new employee record
   */
  it('User is able to add a new employee record', () => {
  // Navigate to PIM > Add Employee
  cy.contains('PIM').click();
  cy.contains('Add Employee', { timeout: 20000 }).click();

  // Wait for form
  cy.url().should('include', '/pim/addEmployee');
  cy.get('h6', { timeout: 10000 }).should('contain.text', 'Add Employee');

  // Fill in fields
  cy.get('input[name="firstName"]').type('John');
  cy.get('input[name="middleName"]').type('A');
  cy.get('input[name="lastName"]').type('Doe');

  // Ensure Employee ID present or set new one
  cy.contains('label', 'Employee Id')
    .parents('.oxd-input-group')
    .find('input.oxd-input')
    .should('exist')
    .then(($input) => {
      const current = $input.val();
      if (!current || current.trim() === '') {
        const randomId = Math.floor(Math.random() * 10000).toString();
        cy.wrap($input).clear().type(randomId);
      }
    });

  // Save
  cy.contains('Save').should('be.visible').click();

  // Wait for redirect
  cy.url({ timeout: 40000 }).should('include', '/pim/viewPersonalDetails');
  cy.get('h6', { timeout: 10000 }).should('contain.text', 'John');

  cy.log('✅ Employee added successfully');
});

  /**
   * 3️⃣ User cannot add employee without required fields
   */
  it('User is unable to add an employee without required fields', () => {
    cy.contains('PIM').click();
    cy.contains('Add Employee', { timeout: 20000 }).click();

    // Don’t fill fields
    cy.contains('Save').click();

    // Verify validation messages
    cy.get('span.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');

    cy.url().should('include', '/pim/addEmployee');

    cy.log('✅ Validation correctly prevented saving without required fields');
  });
});
