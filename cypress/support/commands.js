Cypress.Commands.add('haveTextIgnoringCase', (selector, expectedText) => {
    return cy.get(selector).then($el => {
      const actualText = $el.text().trim();
      expect(actualText.toLowerCase()).to.equal(expectedText.toLowerCase());
    });
  });