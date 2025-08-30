# Dougie.ai Design System

## Overview
This document outlines the design system used across the Dougie.ai website, built with Tailwind CSS and CSS variables for easy theming.

## Color Palette

### Core Colors
- **Primary (Bandit)**: `#3A86F4` - Main buttons, important links, active icons
- **Secondary (Bingo)**: `#F3B082` - Secondary buttons, call-out boxes, banners
- **Background (PomPom)**: `#F2F2F2` - Main page background
- **Content Background (Chloe)**: `#FEFEFE` - Cards, content areas, modals
- **Text (Mackenzie)**: `#191919` - All headings and body text

### Supporting Colors
- **Borders (Bob)**: `#8B8B8B` - Subtle borders, dividers
- **Success (Honey)**: `#63D2E2` - Success messages, confirmations

## Typography

### Fonts
- **Headings**: Baloo 2 (SemiBold 600, Bold 700)
- **Body Text**: Open Sans (Regular 400, Medium 500, SemiBold 600)

### Font Classes
- `font-heading` - Applies Baloo 2 font family
- `font-body` - Applies Open Sans font family

## Component Classes

### Buttons
- `btn-primary` - Primary action buttons (blue)
- `btn-secondary` - Secondary action buttons (peach-orange)

### Forms
- `form-input` - Input fields, textareas, selects
- `form-label` - Form labels

### Cards
- `card` - Content containers with shadow and border

## Responsive Design

### Breakpoints
- **Mobile First**: Default styles for mobile
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up

### Container
- `max-w-7xl` - Maximum width container
- `px-4 sm:px-6 lg:px-8` - Responsive horizontal padding

## Usage Examples

### Basic Layout
```jsx
<div className="min-h-screen bg-background">
  <header className="bg-content-bg shadow-md sticky top-0 z-50">
    {/* Header content */}
  </header>
  
  <section className="py-16 sm:py-24 bg-content-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section content */}
    </div>
  </section>
</div>
```

### Typography
```jsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text">
  Page Title
</h1>
<p className="text-lg text-text/70 leading-relaxed">
  Body text with reduced opacity
</p>
```

### Buttons
```jsx
<button className="btn-primary text-lg px-8 py-4">
  Primary Action
</button>
<button className="btn-secondary text-lg px-8 py-4">
  Secondary Action
</button>
```

### Forms
```jsx
<div>
  <label htmlFor="email" className="form-label">Email Address</label>
  <input
    type="email"
    id="email"
    className="form-input"
    required
  />
</div>
```

## Customization

### Changing Colors
Update the CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-secondary: #YOUR_COLOR;
  /* ... other colors */
}
```

### Adding New Components
Create new component classes in `src/index.css`:

```css
@layer components {
  .your-component {
    @apply bg-content-bg rounded-lg p-4 border border-border/20;
  }
}
```

## Accessibility

- High contrast ratios between text and backgrounds
- Focus states with primary color outline
- Semantic HTML structure
- Responsive design for all screen sizes
- Clear visual hierarchy with typography scale 