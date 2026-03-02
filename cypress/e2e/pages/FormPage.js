// cypress/e2e/pages/FormPage.js

class FormPage {

  visit() {
    cy.visit('/form.html')
  }

  fillField(fieldName, value) {
    cy.get(`input[name="${fieldName}"]`).clear().type(value)
  }

  selectDropdown(fieldName, value) {
    cy.get(`select[name="${fieldName}"]`).select(value)
  }

  submit() {
    cy.get('button[type="submit"]').click()
  }

  getSuccessMessage() {
    return cy.get('.success-message')
  }

}

export default FormPage