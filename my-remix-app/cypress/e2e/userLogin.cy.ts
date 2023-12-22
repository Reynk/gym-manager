describe('My First Test', () => {
  it('Goes to login page and fills the form', () => {
    // needed for the uncaught exception hydration error
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.visit('http://localhost:3000/login')
    cy.wait(1000)
    cy.get('input[name="username"]').type('bogdan')
    cy.get('input[name="password"]').type('12345678')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/client-list')
  })

  it('Goes to login page and fills the form with faulty users', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.visit('http://localhost:3000/login')
    cy.wait(1000)
    cy.get('input[name="username"]').type('lmao')
    cy.get('input[name="password"]').type('parola')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })
})