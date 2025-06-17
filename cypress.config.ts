import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // Import code coverage plugin
      require("@cypress/code-coverage/task")(on, config);

      // Include any existing plugin configuration
      require("./cypress/plugins/index.js")(on, config);

      // Return the config
      return config;
    },
  },
  // Global coverage configuration
  env: {
    codeCoverage: {
      exclude: [
        "cypress/**/*",
        "dist/**/*",
        "coverage/**/*",
        "node_modules/**/*",
        "**/*.test.*",
        "**/*.spec.*",
      ],
    },
  },
});
