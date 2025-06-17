#!/bin/bash

echo "🧪 Testing Coverage Setup Verification"
echo "======================================"

# Check if required packages are installed
echo "📦 Checking required packages..."
if npm list @cypress/code-coverage &>/dev/null; then
    echo "✅ @cypress/code-coverage installed"
else
    echo "❌ @cypress/code-coverage missing"
fi

if npm list nyc &>/dev/null; then
    echo "✅ nyc installed"
else
    echo "❌ nyc missing"
fi

if npm list istanbul-lib-coverage &>/dev/null; then
    echo "✅ istanbul-lib-coverage installed"
else
    echo "❌ istanbul-lib-coverage missing"
fi

# Check configuration files
echo ""
echo "⚙️  Checking configuration files..."
if [ -f ".nycrc.json" ]; then
    echo "✅ .nycrc.json exists"
else
    echo "❌ .nycrc.json missing"
fi

if [ -f "cypress.config.ts" ]; then
    echo "✅ cypress.config.ts exists"
else
    echo "❌ cypress.config.ts missing"
fi

if [ -f "vitest.config.ts" ]; then
    echo "✅ vitest.config.ts exists"
else
    echo "❌ vitest.config.ts missing"
fi

# Check if scripts exist
echo ""
echo "📝 Checking npm scripts..."
if npm run | grep -q "test:coverage"; then
    echo "✅ test:coverage script available"
fi

if npm run | grep -q "test:e2e:coverage"; then
    echo "✅ test:e2e:coverage script available"
fi

if npm run | grep -q "coverage:merge"; then
    echo "✅ coverage:merge script available"
fi

echo ""
echo "📊 Available Scripts:"
echo "- npm run test:coverage (Unit tests with coverage)"
echo "- npm run test:e2e:coverage (E2E tests with coverage)"
echo "- npm run test:all:coverage (Both unit and e2e coverage)"
echo "- npm run coverage:merge (Merge coverage reports)"
echo ""
echo "📁 Coverage Reports:"
echo "- coverage/unit/index.html (Unit test coverage)"
echo "- coverage/e2e/index.html (E2E test coverage)"
echo "- coverage/merged/index.html (Combined coverage)"
echo ""
echo "✨ Coverage setup verification complete!"
