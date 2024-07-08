const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,    
    baseUrl: 'https://www.demoblaze.com/',
    video: true,
    videosFolder: "cypress/reports/videos",
    screenshotsFolder: "cypress/reports/screenshots",
    supportFile: "cypress/support/e2e.js",
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
