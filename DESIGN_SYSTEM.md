# Design System

This document outlines the centralized design system implemented across all components using CSS custom properties.

## 🎨 Colors

### Theme Colors - WCAG AA Compliant
- `--color-body` - Main background color
- `--color-background-accent` - Secondary background/border color
- `--color-text` - Primary text color (high contrast)
- `--color-text-muted` - Secondary text color
- `--color-header-gradient` - Header background gradient
- `--color-button-gradient` - Button background gradient (improved contrast)
- `--color-hover-shadow` - Shadow color for hover effects
- `--color-focus-ring` - Focus indicator color (blue for accessibility)
- `--color-link` - High contrast link color
- `--color-link-hover` - Link hover state color

## 🔤 Typography

### Font Family
- `--font-family` - Lato with system font fallbacks

### Font Weights
- `--font-weight-thin` - 100
- `--font-weight-light` - 300
- `--font-weight-regular` - 400
- `--font-weight-bold` - 700
- `--font-weight-black` - 900

### Font Sizes - Improved Accessibility
- `--font-size-xs` - 0.875rem (14px - minimum readable size)
- `--font-size-sm` - 1rem (16px)
- `--font-size-base` - 1rem (16px)
- `--font-size-lg` - 1.25rem (20px)
- `--font-size-xl` - 1.5rem (24px)
- `--font-size-2xl` - 2rem (32px)
- `--font-size-3xl` - 3rem (48px)
- `--font-size-4xl` - 4rem (64px)
- `--font-size-5xl` - 5rem (80px)

### Line Heights - WCAG AA Compliant
- `--line-height-tight` - 1.3 (for large headings)
- `--line-height-normal` - 1.5 (for body text - WCAG minimum)
- `--line-height-relaxed` - 1.6 (for improved readability)
- `--line-height-button` - 3rem

## 📏 Spacing Scale

### Base Spacing Units
- `--space-xs` - 0.25rem (4px)
- `--space-sm` - 0.5rem (8px)
- `--space-md` - 0.75rem (12px)
- `--space-base` - 1rem (16px)
- `--space-lg` - 1.5rem (24px)
- `--space-xl` - 2rem (32px)
- `--space-2xl` - 3rem (48px)
- `--space-3xl` - 4rem (64px)
- `--space-4xl` - 5rem (80px)

## 🔲 Border Radius

- `--radius-sm` - 0.25rem (4px)
- `--radius-md` - 0.5rem (8px)
- `--radius-lg` - 1rem (16px)
- `--radius-xl` - 1.5rem (24px)
- `--radius-full` - 50% (circular)

## 📐 Layout & Containers

- `--container-max-width` - 1440px
- `--container-padding-mobile` - var(--space-base) (16px)
- `--container-padding-desktop` - var(--space-xl) (32px)

## 🎯 Component-Specific Variables

### Buttons
- `--button-height` - var(--line-height-button) (3rem)
- `--button-padding-x` - var(--space-base) (16px)

### Icons & Images
- `--icon-button-size` - var(--space-2xl) (48px)
- `--profile-picture-size` - var(--space-3xl) (64px)

## 🖼️ Borders

- `--border-width-thin` - 1px
- `--border-width-medium` - 2px
- `--border-width-thick` - 3px

## ♿ Accessibility Features

### WCAG AA Compliance
- **Color Contrast**: All text meets WCAG AA standards (4.5:1 ratio)
- **Font Sizes**: Minimum 14px (0.875rem) for all text
- **Line Heights**: Minimum 1.5 for body text, 1.3 for headings
- **Touch Targets**: Minimum 44px for all interactive elements
- **Focus Management**: Clear focus indicators on all interactive elements

### Accessibility Improvements
- **Skip Link**: Added for keyboard navigation
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Reduced Motion**: Respects user's motion preferences
- **Screen Reader Support**: Hidden descriptive text where needed
- **High Contrast Mode**: Enhanced visibility for high contrast displays

### Interactive Elements
- **Focus Rings**: 2px blue outline with 2px offset
- **Touch Targets**: All buttons and links minimum 44x44px
- **Keyboard Navigation**: Full support for tab navigation
- **Screen Reader Labels**: Descriptive labels for all controls

### Theme Toggle Accessibility
- **ARIA Labels**: Descriptive labels for current state
- **Role Groups**: Proper grouping for complex controls
- **Focus Management**: Clear focus indication
- **State Announcement**: Screen reader announces theme changes

## 📱 Breakpoints (Reference)

- `--breakpoint-tablet` - 768px
- `--breakpoint-desktop` - 1281px

## 🔧 Usage Examples

### Spacing
```css
/* Instead of: padding: 1rem 2rem; */
padding: var(--space-base) var(--space-xl);

/* Instead of: margin-bottom: 0.5rem; */
margin-bottom: var(--space-sm);
```

### Typography
```css
/* Instead of: font-size: 3rem; font-weight: 700; */
font-size: var(--font-size-3xl);
font-weight: var(--font-weight-bold);
```

### Border Radius
```css
/* Instead of: border-radius: 1.5rem; */
border-radius: var(--radius-xl);

/* Instead of: border-radius: 50%; */
border-radius: var(--radius-full);
```

### Layout
```css
/* Instead of: max-width: 1440px; padding: 0 2rem; */
max-width: var(--container-max-width);
padding: 0 var(--container-padding-desktop);
```

## ✅ Benefits

1. **Consistency** - All components use the same spacing, typography, and sizing scales
2. **Maintainability** - Change values in one place to update across the entire site
3. **Scalability** - Easy to add new components that follow the design system
4. **Developer Experience** - Semantic variable names make code more readable
5. **Design Tokens** - Clear documentation of all design decisions

## 🎯 Components Updated

All components now use the centralized design system:

- ✅ **Layout.astro** - Base design system variables
- ✅ **Button.astro** - Uses button-specific and spacing variables
- ✅ **Title.astro** - Uses typography variables
- ✅ **Hero.astro** - Uses spacing and container variables
- ✅ **MainContent.astro** - Uses container and spacing variables
- ✅ **Footer.astro** - Uses typography, spacing, and border variables
- ✅ **ProfilePicture.astro** - Uses spacing and radius variables
- ✅ **IconButton.astro** - Uses spacing, sizing, and border variables
- ✅ **ThemeToggle** - Uses spacing and radius variables

This design system provides a solid foundation for consistent, maintainable styling across the entire application.
