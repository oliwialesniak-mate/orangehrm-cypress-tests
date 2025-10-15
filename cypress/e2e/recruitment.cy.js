/// <reference types="cypress" />

describe('Recruitment Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/recruitment/viewCandidates');
  });

  it('Admin can add a new candidate', () => {
    cy.contains('Add', { timeout: 20000 }).should('be.visible').click();

    cy.get('h6', { timeout: 15000 }).should('contain.text', 'Add Candidate');

    // Wypełnij pola
    cy.get('input[name="firstName"]').type('Automation');
    cy.get('input[name="lastName"]').type('Candidate');

    // Email – unikalny
    const email = `automation_${Date.now()}@example.com`;
    cy.contains('label', 'Email')
      .parents('.oxd-input-group')
      .find('input.oxd-input')
      .clear()
      .type(email);

    // Job Vacancy
    cy.contains('label', 'Job Vacancy', { timeout: 10000 })
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();
    cy.get('.oxd-select-dropdown')
      .find('.oxd-select-option')
      .first()
      .click();

    // Save
    cy.contains('Save').should('be.visible').click();

    // Toast
    cy.get('.oxd-toast', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Successfully Saved');
  });

  it('Candidate appears in list', () => {
    cy.visit('/recruitment/viewCandidates');
    cy.get('input[placeholder="Type for hints..."]')
      .clear()
      .type('Automation Candidate', { delay: 50 });
    cy.contains('Search').click();
    cy.get('.oxd-table-card', { timeout: 20000 })
      .should('contain.text', 'Automation Candidate');
  });
});
