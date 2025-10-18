/// <reference types="cypress" />

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

describe('My Info Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/pim/viewMyDetails');
  });

  it('Admin can edit personal details', () => {
    cy.get('input[name="firstName"]').clear().type('Admin');
    cy.get('input[name="middleName"]').clear().type('QA');
    cy.get('input[name="lastName"]').clear().type('User');
    cy.contains('Save').click();

    async.wait(2000).then(() => {
      cy.get('.oxd-toast').should('contain.text', 'Successfully Updated');
    });
  });

  it('Numeric characters allowed in name field (bug check)', () => {
    cy.get('input[name="firstName"]').clear().type('Admin123');
    cy.contains('Save').click();

    async.wait(2000).then(() => {
      cy.get('.oxd-toast').should('contain.text', 'Successfully Updated');
    });
  });
});
