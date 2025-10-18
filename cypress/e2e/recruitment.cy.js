/// <reference types="cypress" />

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

describe('Recruitment Module - Add, Verify, and Delete Candidate', () => {
  const timestamp = Date.now();
  const candidate = {
    firstName: `Auto${timestamp}`,
    lastName: `Candidate${timestamp}`,
    email: `auto_${timestamp}@example.com`
  };

  before(() => {
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 20000 }).should('include', '/dashboard/index');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('Admin can add, verify, and delete candidate successfully', () => {

    cy.contains('Recruitment').click();
    cy.url({ timeout: 20000 }).should('include', '/recruitment/viewCandidates');

    cy.contains('Add').click();
    cy.get('h6', { timeout: 15000 }).should('contain.text', 'Add Candidate');

    cy.get('input.orangehrm-firstname').should('be.visible').type(candidate.firstName);
    cy.get('input.orangehrm-lastname').should('be.visible').type(candidate.lastName);

    cy.get('input[placeholder="Type here"]')
      .not('.orangehrm-firstname')
      .not('.orangehrm-middlename')
      .not('.orangehrm-lastname')
      .first()
      .should('be.visible')
      .type(candidate.email);

    cy.contains('Save').should('be.visible').click();

    async.wait(3000).then(() => {
      cy.get('body').then(($body) => {
        if ($body.find('.oxd-toast').length) {
          cy.get('.oxd-toast', { timeout: 15000 })
            .should('be.visible')
            .and('contain.text', 'Successfully Saved');
        }
      });
    });

    cy.visit('/recruitment/viewCandidates');
    cy.get('input[placeholder="Type for hints..."]').type(candidate.email, { delay: 50 });
    cy.contains('Search').click();

    cy.get('.oxd-table-card', { timeout: 20000 })
      .should('contain.text', candidate.firstName)
      .and('contain.text', candidate.lastName);

    cy.get('.oxd-table-card')
      .contains(candidate.lastName)
      .parents('.oxd-table-card')
      .find('i.bi-trash')
      .click({ force: true });

    cy.contains('Yes, Delete').click();

    async.wait(2000).then(() => {
      cy.get('body').then(($body) => {
        if ($body.find('.oxd-toast').length) {
          cy.get('.oxd-toast', { timeout: 15000 }).should('contain.text', 'Successfully Deleted');
        }
      });
    });
  });
});
