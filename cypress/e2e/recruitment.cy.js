/// <reference types="cypress" />

describe('Recruitment Module - Add, Verify, and Delete Candidate', () => {
  const timestamp = Date.now();
  const candidate = {
    firstName: `Auto${timestamp}`,
    lastName: `Candidate${timestamp}`,
    email: `auto_${timestamp}@example.com`
  };

  before(() => {
    // --- LOGIN ---
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('AdminUser!123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 20000 }).should('include', '/dashboard/index');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('Admin can add, verify, and delete candidate successfully', () => {
    // --- STEP 1: Go to Recruitment ---
    cy.contains('Recruitment').click();
    cy.url({ timeout: 20000 }).should('include', '/recruitment/viewCandidates');

    // --- STEP 2: Click "Add" ---
    cy.contains('Add').click();
    cy.get('h6', { timeout: 15000 }).should('contain.text', 'Add Candidate');

    // --- STEP 3: Fill First and Last Name (skip Middle Name) ---
    cy.get('input.orangehrm-firstname').should('be.visible').type(candidate.firstName);
    cy.get('input.orangehrm-lastname').should('be.visible').type(candidate.lastName);

    // --- STEP 4: Fill Email using robust selector ---
    cy.get('input[placeholder="Type here"]')
      .not('.orangehrm-firstname')
      .not('.orangehrm-middlename')
      .not('.orangehrm-lastname')
      .first()
      .should('be.visible')
      .type(candidate.email);

    // --- STEP 5: Save Candidate ---
    cy.contains('Save').should('be.visible').click();

    // --- STEP 6: Verify Success Toast ---
    cy.get('.oxd-toast', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Successfully Saved');
    cy.log('✅ Candidate successfully added');

   // --- STEP 7: Verify Candidate Appears in List ---
cy.visit('/recruitment/viewCandidates');
cy.get('input[placeholder="Type for hints..."]')
  .type(candidate.email, { delay: 50 }); // search by email for uniqueness
cy.contains('Search').click();

cy.get('.oxd-table-card', { timeout: 20000 })
  .should('contain.text', candidate.firstName)
  .and('contain.text', candidate.lastName);

cy.log('✅ Candidate found in list');

    // --- STEP 8: Delete Candidate (Cleanup) ---
    cy.get('.oxd-table-card')
      .contains(candidate.lastName)
      .parents('.oxd-table-card')
      .find('i.bi-trash')
      .click({ force: true });

    cy.contains('Yes, Delete').click();

    cy.get('.oxd-toast', { timeout: 15000 })
      .should('contain.text', 'Successfully Deleted');
    cy.log('✅ Candidate successfully deleted');
  });
});
