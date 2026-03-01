class LoginPage {
  // Objekteigenschaften
  usernameField = 'input[name="username"]'
  passwordField = 'input[name="password"]'
  submitButton = 'button[type="submit"]'

  // Methoden
  visit() { cy.visit('/') 
    // Zugriff auf Cypress Config
    //cy.visit(Cypress.env('loginPath') || '/login')
    // Cypress.env liest automatisch die Env-Variablen aus dem Container
    //const baseUrl = Cypress.env('baseUrl') || 'http://localhost:3000'
    //const loginPath = Cypress.env('loginPath') || '/login'
    //cy.visit(`${baseUrl}${loginPath}`)
  }
  fillUsername(username) { cy.get(this.usernameField).type(username) }
  fillPassword(password) { cy.get(this.passwordField).type(password) }
  submit() { cy.get(this.submitButton).click() }
}

export default LoginPage