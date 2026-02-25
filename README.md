# KodNest Premium Build System — Design System

**Version 1.0 • Foundation Complete**

A premium, production-ready design system for a serious B2C SaaS product. Not flashy, not loud, not playful. **Calm. Intentional. Coherent. Confident.**

---

## 📋 Files Included

| File | Purpose |
|------|---------|
| **DESIGN_SYSTEM.md** | Complete design system documentation (read this first) |
| **design-tokens.css** | CSS custom properties for all design tokens |
| **layout.css** | Global layout structure (top bar, workspace, sidebar, footer) |
| **components.css** | Reusable component styles (buttons, inputs, cards, alerts, etc.) |
| **index.html** | Interactive showcase of the design system |

---

## 🚀 Quick Start

### View the Design System
1. Open `index.html` in a web browser
2. This demonstrates all components, colors, typography, and spacing

### Integrate Into Your Project

**Option 1: Copy the CSS files**
```html
<head>
  <link rel="stylesheet" href="design-tokens.css">
  <link rel="stylesheet" href="layout.css">
  <link rel="stylesheet" href="components.css">
</head>
```

**Option 2: Import into existing CSS/SCSS**
```css
@import './design-tokens.css';
@import './layout.css';
@import './components.css';
```

---

## 🎨 Design Principles

### Philosophy
- **Calm** — No visual noise, no unnecessary complexity
- **Intentional** — Every design choice serves a purpose
- **Coherent** — Unified visual language across the entire product
- **Confident** — Professional, trustworthy, credible appearance

### What's NOT Here
- ❌ Gradients
- ❌ Glassmorphism
- ❌ Neon colors
- ❌ Animation noise
- ❌ Random spacing values
- ❌ Drop shadows
- ❌ Decorative fonts

### What IS Here
- ✅ Intentional color system (4 colors max)
- ✅ Clean typography hierarchy (2 fonts)
- ✅ Consistent spacing scale (8, 16, 24, 40, 64px)
- ✅ Flat, minimal component design
- ✅ Predictable interactions (150-200ms transitions)
- ✅ Accessible focus states

---

## 🎯 Color System

**Four-color foundation:**

```
Background:    #F7F6F3  (off-white)
Primary Text:  #111111  (deep black)
Accent:        #8B0000  (deep red)
Border:        #E8E6E1  (light gray)

+ Success:     #4A7C5F  (muted green)
+ Warning:     #B8860B  (muted amber)
```

**CSS Variables:**
```css
--color-background
--color-text-primary
--color-accent
--color-success
--color-warning
```

All colors are defined as CSS custom properties in `design-tokens.css`.

---

## 📝 Typography

**Two font families:**
- **Serif** (Georgia, Times New Roman): Headlines, titles
- **Sans-serif** (System fonts): Body, labels, UI text

**Scale:**
```
48px — Headline XL (page titles)
32px — Headline L (section headers)
24px — Headline M (card titles)
20px — Headline S (subsections)
18px — Body Large
16px — Body Regular (default)
14px — Body Small
13px — Label
14px — Code/Monospace
```

**Usage Classes:**
```html
<div class="h1">Headline XL</div>
<div class="h2">Headline L</div>
<div class="h3">Headline M</div>
<p class="body-lg">Body Large</p>
<p class="body">Body Regular</p>
<p class="body-sm">Body Small</p>
<span class="code">code snippet</span>
```

---

## 📏 Spacing System

**Consistent 8px-based scale:**

```
8px   — Micro-spacing (component internals)
16px  — Base unit (padding, gaps)
24px  — Section spacing
40px  — Large separators
64px  — Extra large breaks
```

**Never use random values.** The entire system depends on this scale.

**CSS Variables:**
```css
--spacing-xs  = 8px
--spacing-sm  = 16px
--spacing-md  = 24px
--spacing-lg  = 40px
--spacing-xl  = 64px
```

**Utility Classes:**
```html
<!-- Margin bottom -->
<div class="mb-xs">...</div>
<div class="mb-sm">...</div>
<div class="mb-md">...</div>

<!-- Padding -->
<div class="p-lg">...</div>

<!-- Gap (flex/grid) -->
<div class="gap-md">...</div>
```

---

## 🧩 Components

### Buttons

**Primary Button**
```html
<button class="btn btn-primary">Primary Action</button>
```
- Background: Deep red (#8B0000)
- Hover: Darker red (#6B0000)
- Use for: Main calls to action

**Secondary Button**
```html
<button class="btn btn-secondary">Secondary Action</button>
```
- Background: White with red border
- Hover: Light gray background
- Use for: Alternative actions

**Ghost Button**
```html
<button class="btn btn-ghost">Tertiary Action</button>
```
- Background: Transparent
- Hover: Light background
- Use for: Less important actions

**Variants:**
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-block">Full Width</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

### Form Inputs

```html
<div class="form-group">
  <label for="input-1" class="form-label required">Label</label>
  <input id="input-1" type="text" class="input" placeholder="...">
  <p class="form-hint">Helpful hint text</p>
</div>

<textarea class="textarea"></textarea>
<select class="select"><option>Option</option></select>
```

**Focus State:** Clear red outline (2px solid, 2px offset)
**Error State:** Red border + error message
**Disabled State:** Reduced opacity, no pointer

### Cards

```html
<div class="card">
  <div class="card-header">Card Title</div>
  <div class="card-body">Content goes here</div>
  <div class="card-footer">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

- Flat design (no shadows)
- Subtle border (#E8E6E1)
- Padding: 16px or 24px

### Alerts

```html
<!-- Error -->
<div class="alert alert-error">
  <div class="alert-icon">⚠</div>
  <div class="alert-content">
    <div class="alert-title">Error Title</div>
    <p>Error description with fix guidance</p>
  </div>
</div>

<!-- Success -->
<div class="alert alert-success">...</div>

<!-- Warning -->
<div class="alert alert-warning">...</div>
```

**Rules:**
- Explain what went wrong + how to fix it
- Never blame the user
- Always pair color with iconography

### Badges

```html
<span class="badge badge-default">Not Started</span>
<span class="badge badge-progress">In Progress</span>
<span class="badge badge-success">✓ Shipped</span>
```

### Empty States

```html
<div class="empty-state">
  <div class="empty-state__icon">📦</div>
  <h3 class="empty-state__title">No Projects</h3>
  <p class="empty-state__description">Description</p>
  <div class="empty-state__action">
    <button class="btn btn-primary">Create Project</button>
  </div>
</div>
```

- Centered layout
- Large icon, helpful title, clear next action
- Never feel "dead"

---

## 📐 Layout Structure

Every page follows this hierarchy:

```
┌──────────────────────────────────┐
│  TOP BAR (64px)                  │
│  • Project name (left)           │
│  • Progress (center)             │
│  • Status badge (right)          │
├──────────────────────────────────┤
│  CONTEXT HEADER                  │
│  • Large serif title             │
│  • Single-line subtitle          │
├────────────────┬─────────────────┤
│  WORKSPACE     │  SECONDARY      │
│  (70% width)   │  PANEL (30%)    │
│  • Main        │  • Explanation  │
│    content     │  • Prompt box   │
│  • Cards       │  • Buttons      │
├────────────────┴─────────────────┤
│  PROOF FOOTER (sticky bottom)    │
│  • Checklist items               │
│  • Proof collection              │
└──────────────────────────────────┘
```

**Responsive Breakpoints:**
- **Desktop:** 1440px+ (default)
- **Tablet:** 768px - 1439px (single column, stacked)
- **Mobile:** 320px - 767px (adjusted spacing)

---

## ⌨️ Interactions

**Transitions:**
- Duration: 150–200ms
- Easing: ease-in-out
- No bounce, no parallax

**Focus State:**
- Outline: 2px solid accent color
- Offset: 2px
- All interactive elements must support keyboard navigation

**Hover:**
- Subtle color/border change
- Always reversible
- Never feels disconnected

---

## 🏗️ Implementation Notes

### Using CSS Variables

```css
/* Colors */
color: var(--color-text-primary);
background-color: var(--color-accent);
border-color: var(--color-border);

/* Typography */
font-family: var(--font-serif);
font-size: var(--font-size-lg);
line-height: var(--line-height-body);

/* Spacing */
padding: var(--spacing-md);
margin-bottom: var(--spacing-lg);
gap: var(--spacing-sm);

/* Timing */
transition: var(--transition-fast);
```

### No Build Tools Required

- Pure CSS (no preprocessing needed)
- CSS custom properties for theming
- No JavaScript dependencies
- Works in all modern browsers

### Naming Conventions

- **Components:** `.btn`, `.card`, `.alert`
- **Variants:** `.btn-primary`, `.btn-secondary`
- **Modifiers:** `.btn-sm`, `.btn-lg`, `.btn-block`
- **BEM-style:** `.card-header`, `.card-body`, `.card-footer`

---

## ✅ Design System Checklist

- ✅ Color system defined (4 colors + 2 variants)
- ✅ Typography hierarchy established (2 fonts, 8 sizes)
- ✅ Spacing scale locked (8, 16, 24, 40, 64px)
- ✅ Layout structure documented (top bar → workspace → sidebar → footer)
- ✅ All core components designed (buttons, inputs, cards, alerts, badges)
- ✅ Interaction rules established (transitions, focus, hover)
- ✅ Error & empty states handled
- ✅ Responsive breakpoints defined
- ✅ Accessibility standards met (contrast ratios, focus states)
- ✅ CSS custom properties implemented

---

## 📖 What's Next?

This design system is a **foundation only**. No product features are included.

To build KodNest Premium, add:
1. Product pages (project dashboard, build interface, etc.)
2. Business logic (authentication, data management, etc.)
3. Feature-specific components (build canvas, code editor, etc.)

The design system will ensure everything looks like **one mind designed it**.

---

## 🤝 Support

All design decisions documented in **DESIGN_SYSTEM.md**.

Customization? Remember:
- ✅ Adjust colors, fonts, or spacing in `design-tokens.css`
- ✅ Add new components in `components.css`
- ❌ Don't break the scale or introduce visual inconsistency

---

**KodNest Premium Build System © 2026**

*Calm • Intentional • Coherent • Confident*
