# Cypress End-to-End Testing Documentation

## Overview

This project includes a comprehensive Cypress test suite that covers all aspects of the portfolio website, from basic functionality to accessibility, performance, and edge cases. The tests are designed to ensure the website works correctly across different browsers, devices, and user scenarios.

## Test Suite Structure

### 📁 Test Files

- **`homepage.cy.js`** - Basic homepage functionality and core elements
- **`accessibility.cy.js`** - WCAG AA compliance and accessibility features
- **`theme-toggle.cy.js`** - Dark/light theme functionality and persistence
- **`navigation.cy.js`** - All links, navigation, and external integrations
- **`content-seo.cy.js`** - Content validation, SEO elements, and semantic HTML
- **`performance.cy.js`** - Loading performance, hydration, and resource optimization
- **`compatibility.cy.js`** - Cross-browser support and responsive design
- **`error-handling.cy.js`** - Error scenarios, edge cases, and graceful degradation

## Test Coverage

### 🎯 Functional Testing
- ✅ Page loading and core content display
- ✅ Email contact functionality with properly encoded URLs
- ✅ Social media links with security attributes
- ✅ Theme toggle with localStorage persistence
- ✅ Skip navigation link functionality

### ♿ Accessibility Testing
- ✅ WCAG AA compliance verification
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Proper ARIA labels and roles
- ✅ Color contrast validation
- ✅ Minimum touch target sizes (44px)
- ✅ Semantic HTML structure

### 🎨 Theme System Testing
- ✅ Light/dark theme toggle functionality
- ✅ Theme persistence across page reloads
- ✅ System preference detection
- ✅ Button state and ARIA label updates
- ✅ Keyboard interaction support

### 🔗 Navigation & Links Testing
- ✅ Email contact with encoded subject/body
- ✅ External social media links with security attributes
- ✅ GitHub repository link validation
- ✅ Skip link focus management
- ✅ Internal link integrity

### 📱 Responsive Design Testing
- ✅ Mobile viewport (320px-667px)
- ✅ Tablet viewport (768px-1024px)
- ✅ Desktop viewport (1280px+)
- ✅ Ultra-wide viewport (2560px+)
- ✅ Portrait/landscape orientations

### ⚡ Performance Testing
- ✅ Page load time validation
- ✅ Image loading verification
- ✅ React component hydration
- ✅ Console error monitoring
- ✅ Resource preloading checks
- ✅ Layout shift prevention

### 🌐 Cross-Browser Compatibility
- ✅ Modern CSS feature support
- ✅ Touch interaction compatibility
- ✅ High contrast mode support
- ✅ Reduced motion preferences
- ✅ Text size scalability
- ✅ Print media support

### 🛡️ Error Handling & Edge Cases
- ✅ Missing image graceful degradation
- ✅ Slow network condition handling
- ✅ JavaScript error resilience
- ✅ LocalStorage failure scenarios
- ✅ Malformed URL validation
- ✅ Browser navigation handling
- ✅ JavaScript-disabled fallbacks

## Running Tests

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all unit tests and e2e tests
npm run test:all

# Run only e2e tests (starts dev server automatically)
npm run test:e2e
```

### 🔧 Individual Test Commands

```bash
# Open Cypress GUI for interactive testing
npm run cypress:open

# Run all Cypress tests headlessly
npm run cypress:run

# Run tests in specific browsers
npm run cypress:run:chrome
npm run cypress:run:firefox

# Run tests with headed browser (visible)
npm run cypress:run:headed

# Run specific test file
npm run cypress:run:spec cypress/e2e/accessibility.cy.js
```

### 🎯 Test Categories

```bash
# Run specific test suites
npx cypress run --spec "cypress/e2e/accessibility.cy.js"
npx cypress run --spec "cypress/e2e/theme-toggle.cy.js"
npx cypress run --spec "cypress/e2e/performance.cy.js"
```

## Custom Commands

The test suite includes custom Cypress commands for common testing patterns:

### `cy.tab()`
Simulates Tab key press for keyboard navigation testing.

```javascript
cy.get('body').tab();
cy.focused().should('have.class', 'skip-link');
```

### `cy.checkContrast(selector)`
Validates color contrast between text and background.

```javascript
cy.checkContrast('h1');
```

### `cy.isInViewport(selector)`
Verifies element is visible within the current viewport.

```javascript
cy.isInViewport('.button');
```

## Test Data & Scenarios

### 📧 Email Testing
- Validates mailto URL format
- Checks proper URL encoding
- Verifies subject and body content
- Tests for malformed email addresses

### 🎨 Theme Testing
- Light/dark mode toggling
- System preference detection
- LocalStorage persistence
- Accessibility state management

### 📱 Responsive Testing
Tested viewport sizes:
- **Mobile**: 320px × 568px, 375px × 667px
- **Tablet**: 768px × 1024px
- **Desktop**: 1280px × 720px, 1920px × 1080px
- **Ultra-wide**: 2560px × 1440px

### ♿ Accessibility Standards
- **WCAG AA Level** compliance
- **Color Contrast**: 4.5:1 minimum ratio
- **Touch Targets**: 44px minimum size
- **Keyboard Navigation**: Full tab support
- **Screen Readers**: Proper ARIA labels

## Browser Support Testing

### ✅ Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 📱 Mobile Testing
- iOS Safari
- Chrome Mobile
- Firefox Mobile

## Continuous Integration

The tests are designed to run in CI environments:

```yaml
# Example GitHub Actions step
- name: Run E2E Tests
  run: |
    npm ci
    npm run build
    npm run test:e2e
```

## Debugging & Troubleshooting

### 🐛 Common Issues

1. **Test Timeouts**: Increase timeout for slow-loading components
2. **Hydration Issues**: Wait for React components with `cy.get(selector, { timeout: 10000 })`
3. **Theme Toggle**: Ensure sufficient wait time for localStorage operations

### 📸 Screenshots & Videos
Cypress automatically captures:
- Screenshots on test failures
- Videos of test runs (in CI mode)
- Network request logs

### 🔍 Debugging Commands

```javascript
// Add debugging breakpoints
cy.debug();

// Log element information
cy.get('selector').then(console.log);

// Pause test execution
cy.pause();
```

## Best Practices

### ✨ Writing Tests
1. Use `data-testid` attributes for reliable element selection
2. Test user behavior, not implementation details
3. Include accessibility checks in all tests
4. Test error scenarios and edge cases

### 🏃‍♂️ Performance
1. Use `beforeEach` for common setup
2. Avoid unnecessary `cy.wait()` calls
3. Use proper assertions instead of delays
4. Mock external requests when appropriate

### 🔧 Maintenance
1. Update tests when UI changes
2. Regular accessibility audits
3. Cross-browser testing
4. Performance benchmarking

## Metrics & Reporting

The test suite provides comprehensive reporting on:
- **Test Coverage**: 8 test suites, 60+ individual tests
- **Accessibility**: WCAG AA compliance verification
- **Performance**: Load time and resource optimization
- **Browser Compatibility**: Multi-browser validation
- **Error Handling**: Edge case coverage

## Future Enhancements

Potential improvements to consider:
- Visual regression testing with Percy or Chromatic
- Lighthouse performance auditing integration
- Advanced accessibility testing with axe-core
- API contract testing for external services
- Load testing for high traffic scenarios
