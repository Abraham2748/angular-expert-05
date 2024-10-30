import { ContadorComponent } from '../../src/app/contador/contador.component';

describe('contador spec', () => {
  it('should increase the counter', () => {
    cy.visit('http://localhost:4200/contador');
    cy.get('button').contains('Increase').click();
    cy.get('span').should('contain', '1');
  });

  it('should decrease the counter', () => {
    cy.visit('http://localhost:4200/contador');
    cy.get('button').contains('Decrease').click();
    cy.get('span').should('contain', '-1');
  });
});
