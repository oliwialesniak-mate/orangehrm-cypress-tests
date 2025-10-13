describe('Recruitment Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/web/index.php/recruitment/viewCandidates');
  });

  it('Admin can add a new candidate', () => {
    cy.contains('Add').click();
    cy.get('input[name="firstName"]').type('Automation');
    cy.get('input[name="lastName"]').type('Candidate');
    cy.get('input[type="email"]').type('automation@example.com');
    cy.contains('Save').click();
    cy.get('.oxd-toast').should('contain.text', 'Successfully Saved');
  });

  it('Candidate appears in list', () => {
    cy.visit('/web/index.php/recruitment/viewCandidates');
    cy.get('input[placeholder="Type for hints..."]').type('Automation Candidate');
    cy.wait(1000);
    cy.contains('Search').click();
    cy.contains('Automation Candidate').should('exist');
  });
});
