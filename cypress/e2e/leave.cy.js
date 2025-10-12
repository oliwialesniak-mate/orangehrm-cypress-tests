describe('Leave Management Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/leave/viewLeaveList');
  });

  it('Admin can assign leave to employee', () => {
    cy.contains('Assign Leave').click();
    cy.get('input[placeholder="Type for hints..."]').type('Paul Collings');
    cy.contains('Paul Collings').click();
    cy.get('div[role="listbox"]').first().click();
    cy.contains('CAN - FMLA').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Assigned').should('be.visible');
  });

  it('Leave list filters by date correctly', () => {
    cy.get('input[placeholder="From"]').type('2024-01-01');
    cy.get('input[placeholder="To"]').type('2024-12-31');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('exist');
  });
});
