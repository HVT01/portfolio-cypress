/// <reference types="cypress" />

import Utils from '../support/utils'

describe('Utils Demonstration', () => {
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