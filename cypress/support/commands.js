/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/cypress/add-commands";

// Custom command for testing color contrast
Cypress.Commands.add("checkContrast", (selector, options = {}) => {
  cy.get(selector).then(($el) => {
    const element = $el[0];
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;

    // This is a simplified contrast check - in a real scenario you'd want
    // a more sophisticated color contrast calculation
    expect(backgroundColor).to.not.equal(color);
  });
});

// Custom command for checking if element is in viewport
Cypress.Commands.add("isInViewport", (selector) => {
  cy.get(selector).then(($el) => {
    const bottom = Cypress.$(cy.state("window")).height();
    const right = Cypress.$(cy.state("window")).width();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.lessThan(bottom);
    expect(rect.bottom).to.be.greaterThan(0);
    expect(rect.right).to.be.greaterThan(0);
    expect(rect.left).to.be.lessThan(right);
  });
});
