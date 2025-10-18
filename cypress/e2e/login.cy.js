/// <reference types="cypress" />

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

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
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('reading \'response\'')) return false;
    });

    cy.login('Admin', 'admin123');
    cy.get('.oxd-userdropdown-name').should('be.visible').click();
    cy.contains('Logout').click({ force: true });
    cy.url({ timeout: 15000 }).should('include', '/auth/login');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Forgot password link navigates correctly', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/requestPasswordResetCode');
  });
});
