#!/bin/bash

# Test script for Cypress coverage setup
echo "🧪 Testing Cypress Coverage Setup"
echo "=================================="

echo ""
echo "1. Testing unit test coverage..."
npm run test:coverage > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Unit test coverage works"
else
    echo "❌ Unit test coverage failed"
    exit 1
fi

echo ""
echo "2. Checking coverage files..."
if [ -d "coverage" ]; then
    echo "✅ Coverage directory exists"
    echo "📊 Coverage files:"
    ls -la coverage/ | head -5
else
    echo "❌ Coverage directory not found"
    exit 1
fi

echo ""
echo "3. Verifying Cypress configuration..."
if grep -q "@cypress/code-coverage" cypress/support/e2e.js; then
    echo "✅ Cypress coverage support is configured"
else
    echo "❌ Cypress coverage support not found"
    exit 1
fi

echo ""
echo "4. Checking Istanbul plugin in Astro config..."
if grep -q "vite-plugin-istanbul" astro.config.mjs; then
    echo "✅ Istanbul plugin is configured in Astro"
else
    echo "❌ Istanbul plugin not found in Astro config"
    exit 1
fi

echo ""
echo "5. Verifying package.json scripts..."
if grep -q "test:e2e:coverage" package.json; then
    echo "✅ E2E coverage scripts are configured"
else
    echo "❌ E2E coverage scripts not found"
    exit 1
fi

echo ""
echo "🎉 Cypress coverage setup is ready!"
echo ""
echo "Next steps:"
echo "- Run 'npm run test:e2e:coverage' to test E2E coverage"
echo "- Run 'npm run test:all:coverage' for complete coverage"
echo "- View coverage reports in the 'coverage/' directory"
