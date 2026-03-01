/// <reference types="cypress" />

import LoginPage from './pages/LoginPage'

describe('Portfolio Sample Test', () => {
  
  const loginPage = new LoginPage()

  before(() => {
    // Testdaten aus Fixture laden
    cy.fixture('user').then((user) => {
      this.userData = user
    })
  })

  it('Login Flow with Page Object', function () {
    loginPage.visit()
    loginPage.fillUsername(this.userData.username)
    loginPage.fillPassword(this.userData.password)
    loginPage.submit()

    // Assertion
    cy.url().should('include', '/dashboard')
    cy.get('.welcome-message').should('contain.text', `Welcome, ${this.userData.username}`)
  })

  it('Example of Custom Command', function () {
    // Custom Command: cy.login(username, password)
    cy.login(this.userData.username, this.userData.password)
    cy.url().should('include', '/dashboard')
    cy.get('.welcome-message').should('exist')
  })
})