const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  expose: {
    apiUrl: "https://api.practicesoftwaretesting.com",
    apiUrlWithBugs: "https://api-with-bugs.practicesoftwaretesting.com",
  },
});
