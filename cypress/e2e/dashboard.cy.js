describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'AdminUser!123');
    cy.url().should('include', '/dashboard');
  });

  it('Dashboard is visible after login', () => {
    cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain.text', 'Dashboard');
  });

  it('Quick Launch section is displayed', () => {
    cy.contains('Quick Launch').should('be.visible');
  });

  it('Time at Work widget displays user data', () => {
    cy.contains('Time at Work').should('be.visible');
  });
});
