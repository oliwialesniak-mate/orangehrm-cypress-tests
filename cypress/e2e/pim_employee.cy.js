describe('PIM - Employee Management Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
    cy.visit('/web/index.php/pim/viewEmployeeList');
  });

  it('Admin can add a new employee', () => {
    cy.contains('Add').click();
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.contains('Save').click();
    cy.get('.oxd-toast').should('contain.text', 'Successfully Saved');
  });

  it('Employee list displays added employee', () => {
    cy.visit('/web/index.php/pim/viewEmployeeList');
    cy.get('input[placeholder="Type for hints..."]').type('John Doe');
    cy.wait(1000);
    cy.contains('Search').click();
    cy.contains('John Doe').should('exist');
  });
});
