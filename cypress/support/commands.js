Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/auth/login');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
  cy.contains('Dashboard').should('be.visible');
});
