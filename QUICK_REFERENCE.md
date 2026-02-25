# KodNest Premium Build System — Quick Reference

## 📁 File Structure

```
/
├── DESIGN_SYSTEM.md          ← READ THIS FIRST (Complete documentation)
├── COMPONENT_REFERENCE.md    ← Component usage guide with examples
├── README.md                 ← Getting started & overview
├── design-tokens.css         ← All design variables & tokens
├── layout.css                ← Global layout structure
├── components.css            ← Reusable component styles
└── index.html                ← Interactive showcase
```

---

## 🎨 Design System at a Glance

| Category | Details |
|----------|---------|
| **Philosophy** | Calm • Intentional • Coherent • Confident |
| **Colors** | 4 max: Background (#F7F6F3), Text (#111111), Accent (#8B0000), Border (#E8E6E1) |
| **Typography** | Serif (headers) + Sans-serif (body) — 8 sizes, never decorative |
| **Spacing** | 8px, 16px, 24px, 40px, 64px only — NEVER random values |
| **Transitions** | 150–200ms, ease-in-out, no bounce/parallax |
| **Components** | Buttons, Inputs, Cards, Alerts, Badges, Typography, Layout |
| **No CSS Tools** | Pure CSS, no build tools needed |

---

## 🧩 Essential Components

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-primary btn-block">Full Width</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

### Form Inputs
```html
<div class="form-group">
  <label for="input" class="form-label required">Label</label>
  <input id="input" type="text" class="input" placeholder="...">
  <p class="form-hint">Help text</p>
</div>
<textarea class="textarea"></textarea>
<select class="select"><option>Option</option></select>
<input type="checkbox" class="checkbox">
```

### Cards
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

### Alerts
```html
<div class="alert alert-error">
  <div class="alert-icon">⚠</div>
  <div class="alert-content">
    <div class="alert-title">Error Title</div>
    <p>Error message with fix guidance</p>
  </div>
</div>
<!-- Also: alert-success, alert-warning, alert-info -->
```

### Badges
```html
<span class="badge badge-default">Not Started</span>
<span class="badge badge-progress">In Progress</span>
<span class="badge badge-success">✓ Complete</span>
```

### Typography
```html
<div class="h1">Headline XL (48px)</div>
<div class="h2">Headline L (32px)</div>
<div class="h3">Headline M (24px)</div>
<p class="body-lg">Body Large (18px)</p>
<p class="body">Body Regular (16px)</p>
<p class="body-sm">Body Small (14px)</p>
<span class="code">code snippet</span>
```

---

## 🏗️ Global Layout

Every page structure:
```
┌─ TOP BAR (sticky) ────────────────────────┐
│ Project Name | Progress | Status Badge   │
├─ CONTEXT HEADER ─────────────────────────┤
│ Large Title                               │
│ Subtitle                                  │
├────────────────┬──────────────────────────┤
│ PRIMARY        │ SECONDARY                │
│ WORKSPACE      │ PANEL                    │
│ (70%)          │ (30%, sticky)            │
│                │                          │
├────────────────┴──────────────────────────┤
│ PROOF FOOTER (sticky bottom)              │
│ ☐ Item 1  ☐ Item 2  ☐ Item 3            │
└──────────────────────────────────────────┘
```

---

## 🎯 CSS Custom Properties

### Colors
```css
--color-background: #F7F6F3
--color-surface: #FFFFFF
--color-text-primary: #111111
--color-text-secondary: #666666
--color-accent: #8B0000
--color-success: #4A7C5F
--color-warning: #B8860B
--color-border: #E8E6E1
```

### Fonts
```css
--font-serif: Georgia, serif
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
--font-mono: "Courier New", monospace
```

### Sizes
```css
--font-size-xl: 48px   /* h1 */
--font-size-lg: 32px   /* h2 */
--font-size-md: 24px   /* h3 */
--font-size-sm: 20px   /* h4 */
--font-size-base: 16px /* body */
--font-size-small: 14px
--font-size-xs: 13px
```

### Spacing Scale
```css
--spacing-xs: 8px
--spacing-sm: 16px
--spacing-md: 24px
--spacing-lg: 40px
--spacing-xl: 64px
```

### Timing
```css
--transition-fast: 150ms ease-in-out
--transition-normal: 200ms ease-in-out
```

---

## 📏 Spacing Utilities

**Margin Bottom:** `.mb-xs` `.mb-sm` `.mb-md` `.mb-lg` `.mb-xl`
**Margin Top:** `.mt-xs` `.mt-sm` `.mt-md` `.mt-lg` `.mt-xl`
**Padding:** `.p-xs` `.p-sm` `.p-md` `.p-lg` `.p-xl`
**Gap:** `.gap-xs` `.gap-sm` `.gap-md` `.gap-lg` `.gap-xl`

---

## ✅ Quick Checklist for New Pages

- [ ] Use consistent spacing (8, 16, 24, 40, 64px only)
- [ ] Follow layout structure (top bar → context → workspace/sidebar → footer)
- [ ] Use semantic HTML (proper heading hierarchy)
- [ ] All interactive elements have focus states
- [ ] Use only the 4 core colors + success/warning
- [ ] Test on mobile (responsive breakpoints at 767px, 1199px)
- [ ] All buttons have clear labels
- [ ] Error messages explain what went wrong + how to fix
- [ ] Empty states provide next action, never feel "dead"
- [ ] No gradients, shadows, or animation noise

---

## 🚀 How to Use

### View the Design System
Open `index.html` in a browser to see all components, colors, and spacing.

### Build a New Page
1. Copy the layout structure from `index.html`
2. Use semantic HTML (header, main, footer, section, article)
3. Import CSS files: `design-tokens.css` → `layout.css` → `components.css`
4. Use component classes from this quick reference
5. Reference `COMPONENT_REFERENCE.md` for detailed examples

### Customize
Edit `design-tokens.css` to change:
- Colors (--color-*)
- Fonts (--font-*)
- Spacing (--spacing-*)
- Transitions (--transition-*)

---

## 🎨 Color Swatches (Copy-Paste Ready)

```
Background:      #F7F6F3
Primary Text:    #111111
Accent:          #8B0000
Success:         #4A7C5F
Warning:         #B8860B
Error:           #C85A54
Border:          #E8E6E1
Border Dark:     #D0CCBF
Disabled:        #BFBBB3
Secondary Gray:  #666666
```

---

## 📚 Documentation Map

| Need | File |
|------|------|
| Complete design philosophy & rules | DESIGN_SYSTEM.md |
| Component examples & code snippets | COMPONENT_REFERENCE.md |
| Getting started, integration guide | README.md |
| CSS variables, design tokens | design-tokens.css |
| Global layout (top bar, workspace, etc.) | layout.css |
| Component styles (buttons, cards, etc.) | components.css |
| Visual showcase of all components | index.html |

---

## ⌨️ Component Class Reference

```
Buttons:
  .btn, .btn-primary, .btn-secondary, .btn-ghost
  .btn-sm, .btn-lg, .btn-block, .btn-icon

Forms:
  .input, .textarea, .select, .checkbox, .radio
  .form-group, .form-label, .form-hint, .form-error

Cards:
  .card, .card-secondary
  .card-header, .card-body, .card-footer

Alerts:
  .alert, .alert-error, .alert-success, .alert-warning, .alert-info
  .alert-icon, .alert-content, .alert-title

Badges:
  .badge, .badge-default, .badge-progress, .badge-success

Typography:
  .h1, .h2, .h3, .h4
  .body-lg, .body, .body-sm
  .code

Layout:
  .page-wrapper, .topbar, .context-header
  .main-content, .workspace, .sidebar
  .proof-footer, .proof-checklist, .proof-item

Utilities:
  .mb-*, .mt-*, .p-*, .gap-*
  .sr-only (screen reader only)
  .flex-center, .grid-2, .grid-3

Empty States:
  .empty-state, .empty-state__icon
  .empty-state__title, .empty-state__description
  .empty-state__action
```

---

## 🔗 Next Steps

1. **View the design:** Open `index.html` in a browser
2. **Read the docs:** Start with `DESIGN_SYSTEM.md`
3. **Reference components:** Use `COMPONENT_REFERENCE.md` for examples
4. **Build pages:** Follow layout structure from `index.html`
5. **Test responsively:** Check mobile (max-width: 767px) and tablet (max-width: 1199px)

---

**KodNest Premium Build System © 2026**

*Professional. Intentional. One Mind. No Compromises.*
