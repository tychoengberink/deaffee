// https://docs.cypress.io/api/introduction/api.html

describe('Visit login', () => {
    it('Visits the app login url', () => {
      cy.visit('/login')
      cy.contains('ion-label', 'Code')
    })
  })

  describe('Logs in', () => {
    it('Logs in using a code', () => {
      cy.visit('/login')
      cy.get('input').type('Hello, World')
      cy.get('ion-button').click()
      cy.contains('ion-title', 'Welcome')
    })
  })
  
  