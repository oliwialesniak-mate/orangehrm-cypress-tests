Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});
