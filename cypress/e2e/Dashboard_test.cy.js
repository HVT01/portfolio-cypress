/// <reference types="cypress" />

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormPage from './pages/FormPage'
import Utils from '../support/utils'

describe('Enterprise Portfolio E2E Tests', () => {

  const loginPage = new LoginPage()
  const dashboard = new DashboardPage()
  const form = new FormPage()

  before(() => {
    cy.fixture('user').then((user) => cy.wrap(user).as('userData'))
    cy.fixture('formData').then((data) => cy.wrap(data).as('formData'))
  })

  it('Login and Dashboard Checks', function () {
    loginPage.visit()
    loginPage.fillUsername(this.userData.username)
    loginPage.fillPassword(this.userData.password)
    loginPage.submit()

    dashboard.getWelcomeMessage().should('contain.text', this.userData.username)
    dashboard.getWidget('Sales Overview').should('exist')
    dashboard.openSettings()
    cy.url().should('include', '/settings')
  })

  it('Form Submission Test', function () {
    form.visit()
    Object.entries(this.formData).forEach(([field, value]) => {
      if (field === 'country') {
        form.selectDropdown(field, value)
      } else {
        form.fillField(field, value)
      }
    })
    form.submit()
    form.getSuccessMessage().should('contain.text', 'submitted successfully')
  })

  it('API Integration Check', function () {
    cy.apiGet('/api/dashboard/stats').then((body) => {
      expect(body).to.have.property('totalUsers')
      expect(body.totalUsers).to.be.a('number')
    })
  })

  it('Utility Function Usage', () => {
    const email = Utils.randomEmail('enterprise.com')
    cy.log('Generated email: ' + email)
    expect(email).to.match(/@enterprise\.com$/)

    const ts = Utils.timestamp()
    cy.log('Timestamp: ' + ts)
    expect(ts).to.match(/\d{8}_\d{6}/)
  })

})