/// <reference types="cypress" />

describe('Login and Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
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

  it('User is able to logout successfully (with exception handling)', () => {
    // 🔹 Ignore known OrangeHRM logout JS error
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('reading \'response\'')) {
        return false; // prevent Cypress from failing the test
      }
    });

    cy.login('Admin', 'admin123');
    cy.get('.oxd-userdropdown-name').should('be.visible').click();
    cy.contains('Logout').click({ force: true });

    // The app sometimes takes a second to redirect
    cy.url({ timeout: 15000 }).should('include', '/auth/login');
    cy.get('button[type="submit"]').should('be.visible'); // confirm login screen loaded
  });

  it('Forgot password link navigates correctly', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/requestPasswordResetCode');
  });
});
