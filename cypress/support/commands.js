/// <reference types="cypress" />

Cypress.Commands.add('login', (username = 'Admin', password = 'admin123') => {
  const base = Cypress.config('baseUrl') || 'https://opensource-demo.orangehrmlive.com/web/index.php';

  cy.session([username, password], () => {
    cy.visit(`${base}/auth/login`);

    cy.get('input[placeholder="Username"]', { timeout: 20000 })
      .should('be.visible')
      .type(username, { delay: 50 });

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type(password, { delay: 50 });

    cy.get('button[type="submit"]').should('be.enabled').click();

    // ✅ Flexible success check — not tied to `/dashboard`
    cy.url({ timeout: 30000 }).should('match', /\/(pim|dashboard|admin|viewSystemUsers)/);
  });

  // ✅ After restoring session, go to a known valid page
  cy.visit(`${base}/pim/viewEmployeeList`, { failOnStatusCode: false });
});
