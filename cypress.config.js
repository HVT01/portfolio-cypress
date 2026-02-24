const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://portfolio.com',  // Basis-URL für alle Tests
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    setupNodeEvents(on, config) {
      // Node Event Hooks für CI/CD, Plugins oder Tasks
    },
  },
  env: {
    loginPath: '/login',
    dashboardPath: '/dashboard'
  },
});
