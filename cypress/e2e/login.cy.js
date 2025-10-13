describe('Login and Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('User is able to login with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb > h6').should('contain.text', 'Dashboard');
  });

  it('User is unable to login with invalid credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
  });

  it('User is able to logout successfully', () => {
    cy.login('Admin', 'admin123');
    cy.get('.oxd-userdropdown-name').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });

  it('Forgot password link navigates correctly', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/requestPasswordResetCode');
  });
});
