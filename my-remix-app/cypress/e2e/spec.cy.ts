Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('hydration error')) {
    return false;
  }
});
describe('My First Test', () => {
  it('Goes to login page and fills the form', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type('robert')
    cy.get('input[name="password"]').type('robert')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/client-list')
  })
})