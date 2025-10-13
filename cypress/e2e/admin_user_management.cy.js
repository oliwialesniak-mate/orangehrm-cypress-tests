describe('Admin - User Management Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/web/index.php/admin/viewSystemUsers');
  });

  it('Admin can add a new user', () => {
    cy.contains('Add').click();
    cy.get('.oxd-select-text').first().click();
    cy.contains('.oxd-select-option', 'ESS').click();

    cy.get('input[placeholder="Type for hints..."]').type('Paul Collings');
    cy.wait(2000);
    cy.get('.oxd-autocomplete-option').contains('Paul Collings').click();

    cy.get('input.oxd-input').eq(1).type('testuser123');
    cy.get('input[type="password"]').eq(0).type('Admin123!');
    cy.get('input[type="password"]').eq(1).type('Admin123!');
    cy.contains('Save').click();

    cy.get('.oxd-toast').should('contain.text', 'Successfully Saved');
  });

  it('User search filters return correct results', () => {
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.contains('Search').click();
    cy.contains('Admin').should('exist');
  });
});
