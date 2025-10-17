/// <reference types="cypress" />

Cypress.Commands.add('login', (username = 'Admin', password = 'AdminUser!123') => {
  cy.session([username, password], () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wait for page to be ready
    cy.get('input[placeholder="Username"]', { timeout: 20000 })
      .should('be.visible')
      .type(username, { delay: 50 });

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type(password, { delay: 50 });

    cy.get('button[type="submit"]').should('be.enabled').click();

    // Wait until dashboard is loaded
    cy.url({ timeout: 30000 }).should('include', '/dashboard');
  });
});

