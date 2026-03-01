// cypress/support/utils.js
// --------------------------------------------------------
// Utility functions for Cypress E2E tests
// Diese Funktionen helfen beim Generieren von Testdaten,
// beim Warten auf API-Responses und beim Zugriff auf Env-Variablen
// --------------------------------------------------------

/**
 * Utils Object
 * Enthält alle Hilfsfunktionen
 */
const Utils = {
  /**
   * Generiert einen zufälligen String
   * @param {number} length - Länge des Strings
   * @returns {string}
   */
  randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  /**
   * Generiert eine zufällige E-Mail-Adresse
   * @param {string} domain - Domain der E-Mail (default: example.com)
   * @returns {string}
   */
  randomEmail(domain = 'example.com') {
    return `${this.randomString(6)}@${domain}`
  },

  /**
   * Gibt einen Zeitstempel im Format YYYYMMDD_HHMMSS zurück
   * @returns {string}
   */
  timestamp() {
    const now = new Date()
    const pad = (n) => n.toString().padStart(2, '0')
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  },

  /**
   * Wartet auf eine API-Response mit einem bestimmten Status-Code
   * @param {string} url - API URL
   * @param {number} status - erwarteter Statuscode (default: 200)
   * @param {number} timeout - Timeout in ms (default: 10000)
   */
  waitForApi(url, status = 200, timeout = 10000) {
    cy.request({
      url,
      failOnStatusCode: false,
      timeout
    }).then((resp) => {
      expect(resp.status).to.eq(status)
    })
  },

  /**
   * Liest eine Umgebungsvariable aus Cypress.env() oder liefert Fallback
   * @param {string} key - Name der Variable
   * @param {any} fallback - Wert, falls Variable nicht gesetzt ist (default: '')
   * @returns {string}
   */
  getEnv(key, fallback = '') {
    return Cypress.env(key) || fallback
  }
}

// --------------------------------------------------------
// Export als Default für ES Modules
// Import in Testfiles:
// import Utils from '../support/utils'
// --------------------------------------------------------
export default Utils