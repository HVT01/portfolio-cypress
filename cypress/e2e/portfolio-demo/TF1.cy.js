describe('Login Flow', () => {
  it('logs in with valid credentials', () => {
    cy.visit('/login')
    cy.login('standard_user', 'secret_password')
    cy.url().should('include', '/dashboard')
  })
})