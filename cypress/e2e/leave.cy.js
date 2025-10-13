describe('Leave Management Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/web/index.php/leave/assignLeave');
  });

  it('Admin can assign leave to employee', () => {
    cy.get('input[placeholder="Type for hints..."]').type('Paul Collings');
    cy.wait(1000);
    cy.get('.oxd-autocomplete-option').contains('Paul Collings').click();
    cy.get('.oxd-select-text').click();
    cy.contains('.oxd-select-option', 'CAN - Personal').click();
    cy.get('input[placeholder="yyyy-mm-dd"]').first().click();
    cy.get('input[placeholder="yyyy-mm-dd"]').eq(0).type('2025-10-20');
    cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).type('2025-10-22');
    cy.contains('Assign').click();
    cy.get('.oxd-toast').should('contain.text', 'Successfully Assigned');
  });

  it('Leave list filters by date correctly', () => {
    cy.visit('/web/index.php/leave/viewLeaveList');
    cy.get('input[placeholder="From"]').type('2025-10-01');
    cy.get('input[placeholder="To"]').type('2025-10-31');
    cy.contains('Search').click();
    cy.get('.oxd-table-body').should('exist');
  });
});
