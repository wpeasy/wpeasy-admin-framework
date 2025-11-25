# CLAUDE.md — WP Easy Admin Framework

## Files
- wpea-framework.css - main framework file
- wpea-wp-resets.css - resets to overcome default WP Admin styles
- test-ui.html - Sample HTML for usage of the framework for admin UI

## Light/Dark Mode Usage

The framework now uses the CSS `light-dark()` function for automatic light/dark mode support. This modern approach eliminates the need for separate dark mode classes or media queries.

### How It Works

The `light-dark()` function automatically selects the appropriate color value based on the page's `color-scheme` property:

```css
/* Automatically picks the right color based on the active color scheme */
--wpea-surface--bg: light-dark(#ffffff, #0f1115);
/* Light mode: #ffffff, Dark mode: #0f1115 */
```

### Controlling the Color Scheme

Set the `color-scheme` CSS property on your root element (typically `<body>` or `:root`):

**Respect OS Preference (Default):**
```html
<body style="color-scheme: light dark;">
```
or
```css
:root { color-scheme: light dark; }
```

**Force Light Mode:**
```html
<body style="color-scheme: light only;">
```
or
```css
:root { color-scheme: light only; }
```

**Force Dark Mode:**
```html
<body style="color-scheme: dark only;">
```
or
```css
:root { color-scheme: dark only; }
```

### JavaScript Example

To dynamically switch between color schemes:

```javascript
// Respect OS preference
document.body.style.setProperty('color-scheme', 'light dark');

// Force light mode
document.body.style.setProperty('color-scheme', 'light only');

// Force dark mode
document.body.style.setProperty('color-scheme', 'dark only');
```

See `test-ui.html` for a complete working example with a theme selector dropdown.

### Benefits of light-dark()

1. **No class toggles required** - No need for `.dark` or `.wpea-dark` classes
2. **No duplicate CSS** - Define colors once instead of in multiple media queries
3. **Automatic OS sync** - Respects user's OS preference by default
4. **Better performance** - Browser handles the switching natively
5. **Cleaner code** - Single source of truth for color definitions

### Browser Support

The `light-dark()` function is supported in:
- Chrome/Edge 123+
- Safari 17.5+
- Firefox 120+

For older browsers, consider adding a fallback or polyfill.
