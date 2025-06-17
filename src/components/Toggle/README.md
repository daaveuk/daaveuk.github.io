# Toggle Component

A modern, accessible toggle switch component built with React and vanilla-extract for styling.

## Features

- ✅ **Accessible**: Full keyboard support, ARIA labels, and screen reader friendly
- ✅ **Flexible**: Both controlled and uncontrolled modes
- ✅ **Customizable**: Custom colors, rounded variants, and styling options
- ✅ **TypeScript**: Full type safety with comprehensive prop types
- ✅ **Testing**: Comprehensive test coverage
- ✅ **Modern**: Built with vanilla-extract CSS-in-JS for optimal performance

## Usage

### Basic Toggle

```tsx
import { Toggle } from "./components/Toggle";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      onChange={setChecked}
      ariaLabel="Enable notifications"
    />
  );
}
```

### Uncontrolled Toggle

```tsx
<Toggle
  defaultChecked={true}
  onChange={(checked) => console.log('Toggle changed:', checked)}
  ariaLabel="Dark mode"
/>
```

### Rounded Toggle

```tsx
<Toggle
  rounded={true}
  ariaLabel="Rounded toggle"
/>
```

### Custom Colors

```tsx
<Toggle
  colors={{
    background: "#ff6b6b",
    checked: "#4ecdc4",
    slider: "#ffe66d",
  }}
  ariaLabel="Custom colored toggle"
/>
```

### Disabled Toggle

```tsx
<Toggle
  disabled={true}
  checked={true}
  ariaLabel="Disabled toggle"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled state (optional) |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled mode |
| `onChange` | `(checked: boolean) => void` | - | Callback fired when state changes |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `ariaLabel` | `string` | `"Toggle switch"` | Accessible label for screen readers |
| `disabled` | `boolean` | `false` | Whether the toggle is disabled |
| `className` | `string` | `""` | Additional CSS class name |
| `colors` | `object` | - | Custom color configuration |

### Colors Object

```tsx
colors?: {
  background?: string;  // Background color when unchecked
  checked?: string;     // Background color when checked
  slider?: string;      // Color of the sliding circle
}
```

## Accessibility

The Toggle component follows WCAG guidelines:

- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- Focus indicators for keyboard users
- Proper contrast ratios
- Disabled state handling

## Styling

The component uses vanilla-extract for styling, providing:

- CSS-in-JS with zero runtime overhead
- Type-safe styling
- Optimal bundle size
- Server-side rendering support

## Testing

The component includes comprehensive tests covering:

- Basic rendering and functionality
- Controlled and uncontrolled modes
- Event handling
- Accessibility features
- Custom props and styling
- Disabled states

Run tests with:

```bash
npm test Toggle
```

## Example Implementation

See `ToggleDemo.tsx` for a complete example showcasing all features and variations of the Toggle component.
