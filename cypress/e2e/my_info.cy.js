describe('My Info Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/pim/viewPersonalDetails/empNumber/1');
  });

  it('Admin can edit personal details', () => {
    cy.get('button').contains('Save').should('be.visible');
    cy.get('input[name="firstName"]').clear().type('AdminUpdated');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Updated').should('be.visible');
  });

  it('Numeric characters allowed in name field (bug check)', () => {
    cy.get('input[name="firstName"]').clear().type('1234');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="firstName"]').should('have.value', '1234');
  });
});
