describe('Admin - User Management Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/admin/viewSystemUsers');
  });

  it('Admin can add a new user', () => {
    cy.get('button').contains('Add').click();
    cy.get('div[role="listbox"]').first().click();
    cy.contains('Admin').click();
    cy.get('input[placeholder="Type for hints..."]').type('Paul Collings');
    cy.contains('Paul Collings').click();
    cy.get('input[type="password"]').eq(0).type('Auto@123');
    cy.get('input[type="password"]').eq(1).type('Auto@123');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Saved').should('be.visible');
  });

  it('User search filters return correct results', () => {
    cy.get('input[placeholder="Type for hints..."]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('contain', 'Admin');
  });
});
