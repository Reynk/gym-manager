describe('Add new client', () => {
    it('Goes to login page and fills the form and creates a new user', () => {
        // needed for the uncaught exception hydration error
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        })
        cy.visit('http://localhost:3000/login')
        cy.wait(1000)
        cy.get('input[name="username"]').type('bogdan')
        cy.get('input[name="password"]').type('12345678')
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
        cy.get('input[name="name"]').type("client3")
        cy.get('input[name="age"]').type('17')
        cy.get('input[name="height"]').type('176')
        cy.get('input[name="weight"]').type('76')
        cy.get('select[name="gender"]').select('M')
        cy.get('button[name="_action"]').click()
        cy.wait(2000)
        cy.get('.p-1').should('have.text','client3')
    })
})