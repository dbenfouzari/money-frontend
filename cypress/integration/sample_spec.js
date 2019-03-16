describe('My first test', () => {
  it('is okay for a11y', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('on a 404 page, we should have a button to come back home page', () => {
    cy.visit('/unknown-route');
    cy.contains('Retour à').click();
    cy.url().should('eq', 'http://localhost:8080/');
  });
});
