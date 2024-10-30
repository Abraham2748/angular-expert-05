describe('Formulário de login', () => {
  it('Permite al usuario iniciar sesión', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('usuario@example.com');
    cy.get('input[name="password"]').type('contraseña');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
