// cypress/pages/DashboardPage.js

class DashboardPage {

  visit() {
    cy.visit('/dashboard')
  }

  getWelcomeMessage() {
    return cy.get('.welcome-message')
  }

  openSettings() {
    cy.get('#settings-button').click()
    // cy.get('button').contains('Settings').click()
    // cy.contains('button', 'Settings').click()    -   robuster als mit ID
    cy.get('body').then(($body) => {
    console.log($body.html())
  })
  }

  getWidget(name) {
    return cy.contains('.widget', name)
  }

}

export default DashboardPage