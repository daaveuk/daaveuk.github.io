# Coverage Setup

This project now supports comprehensive code coverage reporting for both unit tests (Vitest) and end-to-end tests (Cypress).

## Coverage Types

### 1. Unit Test Coverage (Vitest)
- **Command**: `npm run test:coverage`
- **Output**: `coverage/` directory with HTML reports
- **Technology**: Vitest with V8 coverage

### 2. E2E Test Coverage (Cypress)
- **Command**: `npm run test:e2e:coverage`
- **Output**: `coverage/` directory with merged coverage data
- **Technology**: Istanbul instrumentation via Vite plugin

### 3. Combined Coverage
- **Command**: `npm run test:all:coverage`
- **Description**: Runs both unit and e2e tests with coverage
- **Merge Command**: `npm run coverage:merge`

## Available Scripts

```bash
# Unit tests only
npm run test:coverage

# E2E tests with coverage
npm run test:e2e:coverage

# Both unit and e2e with coverage
npm run test:all:coverage

# Merge coverage reports
npm run coverage:merge

# Standard Cypress commands (without coverage)
npm run cypress:open
npm run cypress:run
```

## Configuration Files

### 1. `.nycrc.json`
NYC (Istanbul) configuration for Cypress coverage:
- Includes: `src/**/*.{js,ts,tsx}`
- Excludes: test files, node_modules, dist
- Reporters: text, html, lcov, json

### 2. `astro.config.mjs`
- Includes `vite-plugin-istanbul` for development mode
- Instruments code for coverage collection during Cypress tests

### 3. `cypress.config.ts`
- Integrates `@cypress/code-coverage` plugin
- Configures coverage exclusions

### 4. `vitest.config.ts`
- Includes Vanilla Extract plugin for proper CSS-in-JS handling
- V8 coverage configuration

## GitHub Actions

The `.github/workflows/coverage.yml` workflow:
1. Runs unit tests with coverage
2. Runs E2E tests with coverage
3. Merges coverage reports
4. Uploads combined coverage to Codecov

## Coverage Reports

### Local Development
After running coverage commands, open `coverage/index.html` to view detailed coverage reports.

### CI/CD
Coverage data is automatically uploaded to Codecov on pull requests to the `develop` branch.

## Troubleshooting

### Missing Coverage Data
If coverage appears to be missing:
1. Ensure the development server is running with instrumentation
2. Check that tests actually interact with the instrumented code
3. Verify `.nycrc.json` includes/excludes are correct

### Cypress Coverage Not Working
1. Ensure `@cypress/code-coverage/support` is imported in `cypress/support/e2e.js`
2. Check that the Istanbul plugin is loaded in `astro.config.mjs`
3. Verify the development server shows the `vite:istanbul` message on startup

### Large Coverage Files
Coverage files can be large. They are excluded from git via `.gitignore`:
- `.nyc_output/`
- `coverage-cypress/`
- `coverage-final.json`
