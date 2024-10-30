describe('template spec', () => {
  it('should display the home page', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Hello, angular-expert-05');
  });
});
