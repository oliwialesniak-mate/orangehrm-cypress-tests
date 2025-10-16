const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080/web/index.php",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: 2,
    video: false,
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
});
