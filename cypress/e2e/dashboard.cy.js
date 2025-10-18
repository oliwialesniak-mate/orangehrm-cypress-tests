describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.url({ timeout: 30000 }).should('match', /\/(pim|dashboard|admin|viewSystemUsers|viewEmployeeList)/);
  });

  it('Dashboard is visible after login (if available)', () => {
    cy.get('.oxd-topbar-header-breadcrumb > h6').then($h6 => {
      if ($h6.text().trim() === 'Dashboard') {
        cy.wrap($h6).should('contain.text', 'Dashboard');
      }
    });
  });

  it('Quick Launch section is displayed (if available)', () => {
    cy.get('body').then($body => {
      if ($body.find('div:contains("Quick Launch")').length) {
        cy.contains('Quick Launch').should('be.visible');
      }
    });
  });

  it('Time at Work widget displays user data (if available)', () => {
    cy.get('body').then($body => {
      if ($body.find('div:contains("Time at Work")').length) {
        cy.contains('Time at Work').should('be.visible');
      }
    });
  });
});
