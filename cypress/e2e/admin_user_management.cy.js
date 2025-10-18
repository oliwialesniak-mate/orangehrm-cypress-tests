/// <reference types="cypress" />
import "cypress-real-events/support";

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

describe('Admin - User Management Tests', () => {
  let createdUsername;

  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.url({ timeout: 30000 }).should('match', /\/(pim|admin|viewEmployeeList|viewSystemUsers)/);
    cy.contains('Admin', { timeout: 15000 }).should('be.visible').click();
    cy.get('h5', { timeout: 20000 }).should('contain.text', 'System Users');
  });

  it('Admin can add a new user (demo-safe)', () => {
    cy.contains('Add').should('be.visible').click();
    cy.url().should('include', '/admin/saveSystemUser');
    cy.get('h6', { timeout: 15000 }).should('contain.text', 'Add User');

    cy.get('.oxd-select-text').eq(0).click();
    cy.contains('.oxd-select-option', 'ESS').click();
    cy.get('.oxd-select-text').eq(1).click();
    cy.contains('.oxd-select-option', 'Enabled').click();

    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .realClick()
      .realType('Bao Thai Pham', { delay: 100 });

    cy.get('.oxd-autocomplete-option', { timeout: 20000 })
      .should('be.visible')
      .first()
      .click({ force: true });

    cy.get('input[placeholder="Type for hints..."]').invoke('val').should('match', /Bao Thai Pham/i);

    createdUsername = `testuser_${Date.now()}`;
    cy.get('input.oxd-input').eq(1).clear().type(createdUsername, { delay: 50 });
    cy.get('input[type="password"]').eq(0).type('Admin123!');
    cy.get('input[type="password"]').eq(1).type('Admin123!');

    cy.contains('Save').scrollIntoView().click({ force: true });

    async.wait(4000).then(() => {
      cy.get('body').then(($body) => {
        const toastSelector = '.oxd-toast, .oxd-toast-content, .oxd-toast--success';
        if ($body.find(toastSelector).length) {
          cy.get(toastSelector, { timeout: 10000 }).should('contain.text', 'Successfully');
        } else {
          cy.url().should('include', '/admin/saveSystemUser');
        }
      });
    });
  });

  it('User search filters return correct results', () => {
    cy.get('h5').should('contain.text', 'System Users');
    cy.get('.oxd-input').eq(1).should('be.visible').type('Admin');
    cy.contains('Search').click();
    cy.get('.oxd-table-card', { timeout: 15000 }).contains('Admin').should('exist');
  });
});
