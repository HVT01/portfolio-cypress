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
      console.log("ENV:", config.env)
      const split = Number(config.env.SPLIT)

      if (!Number.isNaN(split) && split > 0) {
        console.log("Split:", split, "Index:", config.env.splitIndex, "/", config.env.splitTotal)
        cypressSplit(on, config)
      }
      return config;
    }
  }
});