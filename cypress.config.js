const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split")

module.exports = defineConfig({

  reporter: "mocha-multi-reporters",

  reporterOptions: {
    reporterEnabled: "mocha-junit-reporter, mochawesome",

    mochaJunitReporterReporterOptions: {
      mochaFile: "results/junit-[hash].xml",
      testsuitesTitle: "Cypress Tests",
      toConsole: false
    },

    mochawesomeReporterOptions: {
      reportDir: "results",
      overwrite: false,
      html: false,
      json: true,
      reportTitle: "Cypress Test Report",
      embeddedScreenshots: true,
      inlineAssets: true
    }
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",

    setupNodeEvents(on, config) {
      if (config.env.SPLIT === 'true' || config.env.SPLIT === true) {
        console.log('SPLIT is set, loading cypress-split plugin')     
        cypressSplit(on, config)
      }
      else {
        console.log('SPLIT is not set, skipping cypress-split plugin')
      }
      return config;
    }
  }
});