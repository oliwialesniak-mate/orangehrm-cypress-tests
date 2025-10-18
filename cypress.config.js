const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    retries: 2,
    video: false,

    // Ensures cy.session works reliably across environments
    experimentalSessionAndOrigin: true,

    setupNodeEvents(on, config) {
      // Custom event listeners (optional)
    },
  },
});
