describe('Login and Authentication Tests', () => {

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('User is able to login with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('User is unable to login with invalid credentials', () => {
    cy.get('input[name="username"]').type('wrongUser');
    cy.get('input[name="password"]').type('wrongPass');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('User is able to logout successfully', () => {
    cy.loginAsAdmin();
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });

  it('Forgot password link navigates correctly', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/auth/requestPasswordResetCode');
  });
});
