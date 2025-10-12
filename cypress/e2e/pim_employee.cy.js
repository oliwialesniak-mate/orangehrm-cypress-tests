describe('PIM - Employee Management Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/pim/viewEmployeeList');
  });

  it('Admin can add a new employee', () => {
    cy.contains('Add').click();
    cy.get('input[name="firstName"]').type('Cypress');
    cy.get('input[name="lastName"]').type('Tester');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Saved').should('be.visible');
  });

  it('Employee list displays added employee', () => {
    cy.get('input[placeholder="Type for hints..."]').type('Cypress Tester');
    cy.get('button[type="submit"]').click();
    cy.contains('Cypress Tester').should('exist');
  });
});
