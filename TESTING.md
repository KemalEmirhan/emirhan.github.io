# Testing Guide

This project uses **Vitest** for unit testing and **Playwright** for end-to-end testing.

## 🧪 Unit Testing (Vitest)

### Running Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test

# Run tests once and exit
yarn test:run

# Run tests with coverage
yarn test:coverage

# Open Vitest UI
yarn test:ui
```

### Test Structure

- **Location**: `src/**/__tests__/`
- **Pattern**: `*.test.{ts,tsx}`
- **Setup**: `src/test/setup.ts`

### Example Test Files

- `src/hooks/__tests__/useAge.test.ts` - Tests the custom age calculation hook
- `src/components/About/__tests__/index.test.tsx` - Tests the About component
- `src/components/Accounts/__tests__/index.test.tsx` - Tests the Accounts component
- `src/components/Icons/__tests__/index.test.tsx` - Tests the Icons component

## 🎭 End-to-End Testing (Playwright)

### Running E2E Tests

```bash
# Run all e2e tests
yarn test:e2e

# Run e2e tests with UI
yarn test:e2e:ui

# Run e2e tests in headed mode (see browser)
yarn test:e2e:headed
```

### Test Structure

- **Location**: `tests/e2e/`
- **Pattern**: `*.spec.ts`
- **Configuration**: `playwright.config.ts`

### Example Test Files

- `homepage.spec.ts` - Tests the homepage functionality

## 🚀 Running All Tests

```bash
# Run both unit and e2e tests
yarn test:all
```

## 📊 Coverage

Current test coverage:

- **Components**: 100% (About, Accounts)
- **Hooks**: 100% (useAge)
- **Overall**: 33.33% (growing as more tests are added)

## 🛠️ Test Configuration

### Vitest Configuration (`vitest.config.ts`)

- Uses `jsdom` environment for React testing
- Includes React Testing Library setup
- Configured with path aliases matching the project
- Excludes e2e tests from unit test runs

### Playwright Configuration (`playwright.config.ts`)

- Tests multiple browsers (Chrome, Firefox, Safari)
- Includes mobile device testing
- Automatically starts dev server before tests
- Generates HTML reports

## 📝 Writing Tests

### Unit Tests

- Use React Testing Library for component testing
- Mock external dependencies
- Test user interactions and accessibility
- Follow the AAA pattern (Arrange, Act, Assert)

### E2E Tests

- Test complete user workflows
- Verify page functionality across browsers
- Test responsive design
- Validate accessibility features

## 🔧 Dependencies

### Unit Testing

- `vitest` - Fast unit test runner
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for testing

### E2E Testing

- `@playwright/test` - End-to-end testing framework
- Multiple browser support (Chromium, Firefox, WebKit)

## 📈 Best Practices

1. **Write tests first** - Follow TDD when possible
2. **Test behavior, not implementation** - Focus on what users see and do
3. **Keep tests simple** - One concept per test
4. **Use descriptive test names** - Make it clear what's being tested
5. **Mock external dependencies** - Keep tests fast and reliable
6. **Test accessibility** - Ensure your app works for all users
7. **Maintain good coverage** - Aim for high but meaningful coverage
