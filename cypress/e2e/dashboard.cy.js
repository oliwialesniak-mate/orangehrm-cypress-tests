describe('Dashboard Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it('Dashboard is visible after login', () => {
    cy.contains('Dashboard').should('be.visible');
  });

  it('Quick Launch section is displayed', () => {
    cy.get('.oxd-layout-context').should('contain', 'Quick Launch');
  });

  it('Time at Work widget displays user data', () => {
    cy.contains('Time at Work').should('be.visible');
  });
});
