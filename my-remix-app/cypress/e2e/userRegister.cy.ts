describe('User Resgister', () => {
    it('Register user', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        })
        cy.visit('http://localhost:3000/login')
        cy.wait(1000)
        var button = cy.get("#auth")
        button.then(()=>{
            if(button.should('have.text',"Înregistrare" || button.should("have.text","Sign Up"))){
                button.click()
                cy.get('input[name="username"]').type('newUser2')
                cy.get('input[name="password"]').type('12345678')
                cy.get('button[type="submit"]').click()
                cy.url().should('include', '/client-list')
            }
            else {
                cy.get('input[name="username"]').type('newUser2')
                cy.get('input[name="password"]').type('12345678')
                cy.get('button[type="submit"]').click()
                cy.url().should('include', '/client-list')
            }
        })
    })
})