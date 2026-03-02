/// <reference types="cypress" />

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormPage from './pages/FormPage'
import Utils from '../support/utils'

describe('Dashboard-Tests', () => {

  const loginPage = new LoginPage()
  const dashboard = new DashboardPage()
  const form = new FormPage()

  beforeEach(() => {
    cy.fixture('user').as('userData')
    cy.fixture('formData').as('formData')
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

  it('should generate a random email', () => {
    const email = Utils.randomEmail('portfolio.com')
    cy.log('Generated email: ' + email)    
    const ts = Utils.timestamp()    
    cy.log(ts)
    expect(email).to.match(/@portfolio\.com$/)
  })

  it('should generate a timestamp', () => {
    const ts = Utils.timestamp()
    cy.log('Current timestamp: ' + ts)
    expect(ts).to.match(/\d{8}_\d{6}/)
  })

  it('waits for API health check', () => {
    Utils.waitForApi('/api/health', 200)
  })

  it('reads environment variable', () => {
    const baseUrl = Utils.getEnv('CYPRESS_baseUrl', 'http://localhost:3000')
    cy.log(baseUrl)
  })

})