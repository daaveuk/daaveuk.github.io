# Unit Testing Setup

## 🧪 Testing Framework: Vitest

The project uses **Vitest** as the primary testing framework, chosen for its excellent TypeScript support, fast execution, and seamless integration with modern tooling.

### Configuration

#### Vitest Config (`vitest.config.ts`)
- **Environment**: `jsdom` for DOM testing
- **Globals**: Enabled for `describe`, `it`, `expect`
- **Setup**: Automated test setup with mocks and utilities
- **Coverage**: Text, JSON, and HTML reports available
- **Path Aliases**: `@`, `@components`, `@functions`, `@layouts`

#### Test Scripts
```bash
npm test           # Run tests in watch mode
npm run test:run   # Run tests once
npm run test:coverage  # Run with coverage report
```

### Test Files Structure

```
src/
  components/
    ThemeToggle.test.tsx     # React component tests
  functions/
    sendEmail.test.ts        # Utility function tests
  test/
    setup.ts                 # Global test configuration
    theme.test.ts           # Theme functionality tests
    utils.test.ts           # General utility tests
```

### Test Coverage

#### 📊 **32 Tests Total - All Passing ✅**

**Component Tests (10 tests)**
- `ThemeToggle.tsx` - React component with full accessibility testing
  - Rendering and DOM structure
  - Accessibility attributes (ARIA labels, roles)
  - User interactions (click handlers)
  - Theme state management
  - Event handling and propagation
  - CSS class assignments
  - Error boundary handling

**Function Tests (5 tests)**
- `sendEmail.ts` - Email URL generation utility
  - mailto URL format validation
  - Subject line encoding
  - Body text encoding
  - Return type verification
  - Email address format validation

**Theme Utility Tests (9 tests)**
- Theme management functions (from Layout.astro)
  - localStorage integration
  - System preference detection
  - Theme application to DOM
  - Theme toggling logic
  - Custom event dispatching

**General Utility Tests (8 tests)**
- Email validation functions
- URL validation functions
- mailto URL parsing utilities
- Error handling and edge cases

### Test Setup & Mocking

#### Global Setup (`src/test/setup.ts`)
- **jest-dom matchers** - Enhanced DOM assertions
- **localStorage mock** - Persistent storage simulation
- **window.matchMedia mock** - Media query testing
- **CustomEvent mock** - Event dispatching support
- **Automatic cleanup** - Between test isolation

#### Key Testing Utilities
- `@testing-library/react` - Component testing utilities
- `@testing-library/jest-dom` - DOM-specific matchers
- Vitest's built-in mocking (`vi.fn()`, `vi.mock()`)
- JSDOM environment for browser APIs

### Test Categories

#### 🔒 **Type Safety Tests**
All test files are written in TypeScript with strict typing:
- Component prop interfaces
- Function parameter and return types
- Event object typing
- Mock function signatures

#### ♿ **Accessibility Tests**
Comprehensive a11y testing including:
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Semantic HTML structure

#### 🎨 **Theme System Tests**
- Light/dark mode switching
- System preference detection
- localStorage persistence
- CSS custom property integration
- Event-driven updates

#### 📧 **Email Functionality Tests**
- mailto URL generation
- Parameter encoding
- Email address validation
- Error handling

### Benefits Achieved

1. **🚀 Fast Execution** - Vitest's optimized test runner
2. **🔍 Type Safety** - Full TypeScript integration
3. **🎯 Comprehensive Coverage** - All critical functionality tested
4. **♿ Accessibility Focused** - WCAG compliance verification
5. **🔄 Continuous Integration** - Ready for CI/CD pipelines
6. **📊 Detailed Reporting** - Coverage reports and metrics
7. **🛠️ Developer Experience** - Watch mode and instant feedback

### Running Tests

```bash
# Development - watch mode with instant feedback
npm test

# CI/CD - single run with exit codes
npm run test:run

# Coverage analysis
npm run test:coverage
```

### Integration with Linting

The testing setup works seamlessly with the ESLint configuration:
- Test files have appropriate ESLint overrides
- TypeScript-aware linting rules
- Import validation for test utilities
- Consistent code style enforcement

This robust testing foundation ensures code quality, prevents regressions, and provides confidence for future development and refactoring.
