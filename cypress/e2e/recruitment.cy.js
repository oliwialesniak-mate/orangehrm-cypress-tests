describe('Recruitment Tests', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/recruitment/viewCandidates');
  });

  it('Admin can add a new candidate', () => {
    cy.contains('Add').click();
    cy.get('input[name="firstName"]').type('Automation');
    cy.get('input[name="lastName"]').type('Candidate');
    cy.get('input[type="email"]').type('auto.candidate@test.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Saved').should('be.visible');
  });

  it('Candidate appears in list', () => {
    cy.get('input[placeholder="Type for hints..."]').type('Automation Candidate');
    cy.get('button[type="submit"]').click();
    cy.contains('Automation Candidate').should('exist');
  });
});
