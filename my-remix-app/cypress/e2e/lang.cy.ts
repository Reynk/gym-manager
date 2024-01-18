describe('Test Language change', () => {
    it('Verify initial language option [RO]', () => {
        // needed for the uncaught exception hydration error
        cy.on('uncaught:exception', (err, runnable) => {
          return false;
        })
        cy.visit('http://localhost:3000/login')
        cy.get('button[type="submit"]').contains('Autentificare');
      }),
    it('Change language option and see if translation is as expected', () => {
      // needed for the uncaught exception hydration error
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      })
      cy.visit('http://localhost:3000/login')
      cy.get('select').select('EN');
      cy.get('button[type="submit"]').contains('Sign In');
    }),
    it('See if height value is converted', () => {
        // needed for the uncaught exception hydration error
        cy.on('uncaught:exception', (err, runnable) => {
          return false;
        })
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="username"]').type('robert')
        cy.get('input[name="password"]').type('robert')
        cy.get('button[type="submit"]').click()
        cy.wait(1000)
        cy.get('p[id="Robert-Adrian Chelaru"]').click()
        cy.get('div[id="weight"]').contains('73 kg')
        cy.get('select[name="language"]').select('EN')
        cy.wait(1000)
        cy.get('p[id="Robert-Adrian Chelaru"]').click()
        cy.get('div[id="weight"]').contains('160 lbs')
      }),
      it('See if weight value is converted', () => {
        // needed for the uncaught exception hydration error
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('http://localhost:3000/login');
        cy.get('input[name="username"]').type('robert');
        cy.get('input[name="password"]').type('robert');
        cy.get('button[type="submit"]').click();
        cy.get('p[id="Robert-Adrian Chelaru"]').click();
        cy.get('div[id="height"]').contains('190cm');
        cy.get('select[name="language"]').select('EN');
        cy.wait(1000);
        cy.get('p[id="Robert-Adrian Chelaru"]').click();
        cy.get('div[id="height"]').contains("6'3\"");
      })
  })