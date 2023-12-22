describe('My First Test', () => {
  it('Goes to login page and fills the form', () => {
    // needed for the uncaught exception hydration error
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type('robert')
    cy.get('input[name="password"]').type('robert')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/client-list')
  })
})