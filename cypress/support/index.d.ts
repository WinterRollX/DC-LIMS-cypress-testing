/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to visit home URL and check if page loaded.
       * @example cy.visitHome()
       */
      visitHome(): Chainable<Element>;
    }
  }