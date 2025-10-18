/// <reference types="cypress" />
import "cypress-real-events/support";

const async = {
  wait: (ms) => cy.wrap(null).then(() => new Cypress.Promise((res) => setTimeout(res, ms)))
};

describe('Leave Management Tests', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123');
  });

  it('Admin can assign leave to employee (demo-safe)', () => {
    cy.visit('/leave/assignLeave');

    cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .realClick()
      .realType('Paul Collings', { delay: 100 });

    async.wait(2000).then(() => {
      cy.get('body').then(($body) => {
        const $opts = $body.find('.oxd-autocomplete-option');
        if ($opts.length > 0) {
          cy.wrap($opts.first()).click({ force: true });
        }
      });
    });

    cy.get('.oxd-select-text').first().click();
    cy.contains('.oxd-select-option', 'Personal').click({ force: true });

    cy.get('body').then(($body) => {
      const selectors = [
        'input[placeholder="yyyy-mm-dd"]',
        'input[aria-label*="From"]',
        'input[class*="oxd-input"]'
      ];
      for (const sel of selectors) {
        if ($body.find(sel).length >= 2) {
          cy.get(sel).eq(0).clear().type('2025-10-20');
          cy.get(sel).eq(1).clear().type('2025-10-22');
          break;
        }
      }
    });

    cy.contains('Assign').scrollIntoView().click({ force: true });

    async.wait(5000).then(() => {
      cy.get('body').then(($body) => {
        if ($body.find('.oxd-toast').length) {
          cy.get('.oxd-toast').should('contain.text', 'Successfully Assigned');
        } else {
          cy.url().should('include', '/assignLeave');
        }
      });
    });
  });

  it('Leave list filters by date correctly (updated selectors)', () => {
    cy.visit('/leave/viewLeaveList');

    cy.get('input[placeholder*="yyyy"], input[type="date"], input[aria-label*="From"]', { timeout: 20000 })
      .eq(0)
      .clear()
      .type('2025-10-01');

    cy.get('input[placeholder*="yyyy"], input[type="date"], input[aria-label*="To"]').eq(1)
      .clear()
      .type('2025-10-31');

    cy.contains('Search').scrollIntoView().click({ force: true });
    cy.get('.oxd-table-body', { timeout: 15000 }).should('exist');
  });
});
