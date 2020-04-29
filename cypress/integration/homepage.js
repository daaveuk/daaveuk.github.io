describe('Portfolio', () => {
  it('should show the page title', () => {
    cy.visit('http://localhost:3000');
    cy.findByTestId('title')
      .should('be.visible')
      .and('have.text', "Ey 'up!");
  });
});
