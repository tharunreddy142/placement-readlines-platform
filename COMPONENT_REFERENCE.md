# Component Reference Guide

**KodNest Premium Build System v1.0**

---

## Table of Contents

1. [Buttons](#buttons)
2. [Form Inputs](#form-inputs)
3. [Cards](#cards)
4. [Alerts](#alerts)
5. [Badges](#badges)
6. [Typography](#typography)
7. [Layout Components](#layout-components)
8. [Spacing Utilities](#spacing-utilities)

---

## Buttons

### Primary Button
**Purpose:** Main calls to action, submit forms, confirm decisions

```html
<button class="btn btn-primary">Primary Action</button>
```

**States:**
- Default: Deep red background (#8B0000)
- Hover: Darker red (#6B0000)
- Focus: Red outline (2px, 2px offset)
- Active: Even darker red
- Disabled: Opacity 0.6, not-allowed cursor

**Variations:**
```html
<!-- Size variants -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Full width -->
<button class="btn btn-primary btn-block">Full Width Button</button>

<!-- Disabled state -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- With icon (flex layout) -->
<button class="btn btn-primary">
  <span>✓</span>
  <span>Confirm</span>
</button>
```

---

### Secondary Button
**Purpose:** Alternative actions, less critical operations

```html
<button class="btn btn-secondary">Secondary Action</button>
```

**States:**
- Default: White background, red border
- Hover: Light gray background
- Focus: Red outline
- Active: Slightly darker gray background
- Disabled: Opacity 0.5, not-allowed cursor

**Usage:**
```html
<!-- Cancel/close actions -->
<button class="btn btn-secondary">Cancel</button>

<!-- Less important alternatives -->
<div style="display: flex; gap: var(--spacing-sm);">
  <button class="btn btn-primary">Save</button>
  <button class="btn btn-secondary">Save Draft</button>
</div>
```

---

### Ghost Button
**Purpose:** Tertiary, minimal emphasis actions

```html
<button class="btn btn-ghost">Tertiary Action</button>
```

**States:**
- Default: Transparent background, dark text
- Hover: Light gray background
- Focus: Red outline
- Active: Slightly darker gray
- Disabled: Opacity 0.5

**Usage:**
```html
<!-- Links that look like buttons -->
<button class="btn btn-ghost">Learn more</button>

<!-- Additional options -->
<button class="btn btn-ghost">More options</button>

<!-- Stack in sidebars -->
<div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
  <button class="btn btn-ghost btn-block">Option 1</button>
  <button class="btn btn-ghost btn-block">Option 2</button>
  <button class="btn btn-ghost btn-block">Option 3</button>
</div>
```

---

## Form Inputs

### Basic Input Field
```html
<div class="form-group">
  <label for="email" class="form-label required">Email Address</label>
  <input 
    id="email" 
    type="email" 
    class="input" 
    placeholder="you@example.com"
  >
  <p class="form-hint">We'll never share your email.</p>
</div>
```

**States:**
- Default: White background, light gray border
- Hover: Border darkens slightly
- Focus: Red border, subtle red outline shadow
- Disabled: Light gray background, reduced opacity
- Error: Red border, error shadow

### Error State
```html
<div class="form-group">
  <label for="username" class="form-label required">Username</label>
  <input 
    id="username" 
    type="text" 
    class="input error" 
    value="user@name!"
  >
  <p class="form-error">Username cannot contain special characters.</p>
</div>
```

### Textarea Field
```html
<div class="form-group">
  <label for="message" class="form-label">Message</label>
  <textarea 
    id="message" 
    class="textarea" 
    placeholder="Type your message..."
    rows="4"
  ></textarea>
</div>
```

**Features:**
- Min height: 120px
- Vertically resizable
- Same styling as input fields
- Supports all input states

### Select Dropdown
```html
<div class="form-group">
  <label for="status" class="form-label required">Status</label>
  <select id="status" class="select" required>
    <option value="">— Select Status —</option>
    <option value="draft">Draft</option>
    <option value="published">Published</option>
    <option value="archived">Archived</option>
  </select>
</div>
```

**Features:**
- Custom arrow icon
- Same border styling as inputs
- Full keyboard navigation support

### Checkbox
```html
<div>
  <input type="checkbox" id="agree" class="checkbox">
  <label for="agree">I agree to the terms</label>
</div>

<!-- Multiple checkboxes -->
<fieldset>
  <legend>Select all that apply:</legend>
  <div>
    <input type="checkbox" id="opt1" class="checkbox">
    <label for="opt1">Option 1</label>
  </div>
  <div>
    <input type="checkbox" id="opt2" class="checkbox">
    <label for="opt2">Option 2</label>
  </div>
</fieldset>
```

---

## Cards

### Basic Card
```html
<div class="card">
  <div class="card-header">Card Title</div>
  <div class="card-body">
    <p>Main content goes here.</p>
  </div>
</div>
```

### Card with Footer
```html
<div class="card">
  <div class="card-header">Confirm Action</div>
  <div class="card-body">
    <p>Are you sure you want to proceed?</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Confirm</button>
  </div>
</div>
```

**Footer Notes:**
- Automatically flex-aligned to the right
- Spacing between buttons: `var(--spacing-sm)`
- Use for actions related to card content

### Secondary Card Variant
```html
<div class="card card-secondary">
  <div class="card-header">Secondary Information</div>
  <div class="card-body">Background is slightly different gray.</div>
</div>
```

**Usage:**
- For less critical information
- Supporting/additional content
- Background: #FAFAF8

---

## Alerts

### Error Alert
```html
<div class="alert alert-error">
  <div class="alert-icon">⚠</div>
  <div class="alert-content">
    <div class="alert-title">Error: Invalid Input</div>
    <p>The email format is incorrect. Please check and try again.</p>
  </div>
</div>
```

**Color:** Background #FEE8E5, border #C85A54
**Icon:** Warning symbol (⚠)
**Usage:** Error messages, validation failures, system issues

### Success Alert
```html
<div class="alert alert-success">
  <div class="alert-icon">✓</div>
  <div class="alert-content">
    <div class="alert-title">Success: Changes Saved</div>
    <p>Your project has been saved successfully.</p>
  </div>
</div>
```

**Color:** Background #E8F5E9, border #4A7C5F
**Icon:** Checkmark (✓)
**Usage:** Confirmations, successful operations

### Warning Alert
```html
<div class="alert alert-warning">
  <div class="alert-icon">!</div>
  <div class="alert-content">
    <div class="alert-title">Warning: Large File</div>
    <p>This file exceeds 50MB and may take longer to upload.</p>
  </div>
</div>
```

**Color:** Background #FFF4E6, border #B8860B
**Icon:** Exclamation mark (!)
**Usage:** Cautions, warnings, potential issues

### Info Alert
```html
<div class="alert alert-info">
  <div class="alert-icon">ℹ</div>
  <div class="alert-content">
    <div class="alert-title">Tip: Keyboard Shortcuts</div>
    <p>Use Cmd+S to save, Cmd+Z to undo.</p>
  </div>
</div>
```

---

## Badges

### Default Badge
```html
<span class="badge badge-default">Not Started</span>
```

**Color:** Gray background (#E8E6E1), gray text

### Progress Badge
```html
<span class="badge badge-progress">In Progress (Step 3 of 7)</span>
```

**Color:** Amber background (#FFF4E6), amber text (#B8860B)

### Success Badge
```html
<span class="badge badge-success">✓ Complete</span>
```

**Color:** Green background (#E8F5E9), green text (#4A7C5F)

### Badge in Context
```html
<div style="display: flex; gap: var(--spacing-md); align-items: center;">
  <h3>Project Status</h3>
  <span class="badge badge-progress">In Progress</span>
</div>
```

---

## Typography

### Headings

**Headline XL (48px)**
```html
<h1 class="h1">Page Title or Major Section</h1>
```
- Font: Serif, semi-bold
- Line-height: 1.2
- Letter-spacing: -0.02em
- Use for page titles, main headlines

**Headline L (32px)**
```html
<h2 class="h2">Section Header</h2>
```
- Font: Serif, semi-bold
- Line-height: 1.3
- Use for major section breaks

**Headline M (24px)**
```html
<h3 class="h3">Subsection or Card Title</h3>
```
- Font: Serif, semi-bold
- Use for card headers, subsections

**Headline S (20px)**
```html
<h4 class="h4">Minor Heading</h4>
```
- Font: Serif, semi-bold
- Use for sub-subsections

### Body Text

**Body Large (18px)**
```html
<p class="body-lg">Important introductory text or featured paragraph.</p>
```
- Line-height: 1.8
- Use for introductions, featured content
- Generous spacing for readability

**Body Regular (16px)**
```html
<p class="body">Standard paragraph text for all general content.</p>
```
- Line-height: 1.6
- Default font size for body copy
- Maximum width: 720px for comfortable reading

**Body Small (14px)**
```html
<p class="body-sm">Secondary text, metadata, or supplementary information.</p>
```
- Color: Gray (#666666)
- Use for captions, hints, secondary info

### Code & Monospace
```html
<span class="code">variable_name</span>
```
- Font: Monospace
- Size: 14px
- Background: Light gray (#FAFAF8)
- Padding: 2px 6px
- Border-radius: 4px

---

## Layout Components

### Top Bar
```html
<div class="topbar">
  <div class="topbar__left">Project Name</div>
  <div class="topbar__center">Step 3 of 7</div>
  <div class="topbar__right">
    <span class="badge badge-progress">In Progress</span>
  </div>
</div>
```

**Features:**
- Sticky position
- Height: 64px
- Always visible at top
- Light gray background with border

### Context Header
```html
<div class="context-header">
  <h1 class="context-header__title">Page Title</h1>
  <p class="context-header__subtitle">Brief context or description</p>
</div>
```

**Features:**
- Follows top bar
- Large serif title
- Single-line subtitle
- Clear purpose statement

### Main Workspace
```html
<div class="workspace">
  <!-- Main content here -->
</div>
```

**Features:**
- 70% width on desktop
- White background
- Scrollable if content exceeds height
- 100% width on tablets/mobile

### Secondary Sidebar
```html
<div class="sidebar">
  <div class="card-header">Step Explanation</div>
  <p>Brief description of current step...</p>
  
  <div class="divider"></div>
  
  <div class="prompt-box">
    <div class="prompt-box__code">code snippet here</div>
    <button class="prompt-box__copy-btn">📋</button>
  </div>
  
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <button class="btn btn-primary btn-block">Copy</button>
    <button class="btn btn-secondary btn-block">Build in Lovable</button>
  </div>
</div>
```

**Features:**
- 30% width on desktop
- Light gray background
- Sticky (stays visible while scrolling)
- 100% width on tablets/mobile

### Proof Footer
```html
<div class="proof-footer">
  <div class="proof-footer__content">
    <div class="proof-footer__title">Build Checklist</div>
    <div class="proof-checklist">
      <div class="proof-item">
        <input type="checkbox" id="p1" class="checkbox">
        <label for="p1" class="proof-item__label">UI Built</label>
      </div>
      <div class="proof-item">
        <input type="checkbox" id="p2" class="checkbox">
        <label for="p2" class="proof-item__label">Logic Working</label>
      </div>
    </div>
  </div>
</div>
```

---

## Spacing Utilities

### Margin Bottom
```html
<div class="mb-xs">8px margin bottom</div>
<div class="mb-sm">16px margin bottom</div>
<div class="mb-md">24px margin bottom</div>
<div class="mb-lg">40px margin bottom</div>
<div class="mb-xl">64px margin bottom</div>
```

### Margin Top
```html
<div class="mt-sm">16px margin top</div>
```

### Padding
```html
<div class="p-md">24px padding all sides</div>
```

### Gap (for flex/grid)
```html
<div style="display: flex;" class="gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Empty States

```html
<div class="empty-state">
  <div class="empty-state__icon">📦</div>
  <h3 class="empty-state__title">No Projects Yet</h3>
  <p class="empty-state__description">
    Get started by creating your first project.
  </p>
  <div class="empty-state__action">
    <button class="btn btn-primary">Create First Project</button>
  </div>
</div>
```

**Rules:**
- Large icon (64px)
- Clear, actionable title
- Brief description
- Primary button with next action
- Never feel "dead" or incomplete

---

## Common Patterns

### Form with Validation
```html
<form>
  <div class="form-group">
    <label for="email" class="form-label required">Email</label>
    <input id="email" type="email" class="input" required>
  </div>

  <div class="form-group">
    <label for="password" class="form-label required">Password</label>
    <input 
      id="password" 
      type="password" 
      class="input error"
    >
    <p class="form-error">Password must be at least 8 characters.</p>
  </div>

  <div style="display: flex; gap: var(--spacing-sm);">
    <button type="button" class="btn btn-secondary">Cancel</button>
    <button type="submit" class="btn btn-primary">Sign In</button>
  </div>
</form>
```

### Card List
```html
<div style="display: grid; gap: var(--spacing-md);">
  <div class="card">
    <div class="card-header">Item 1</div>
    <div class="card-body">Description</div>
  </div>
  <div class="card">
    <div class="card-header">Item 2</div>
    <div class="card-body">Description</div>
  </div>
</div>
```

### Status Bar
```html
<div style="display: flex; gap: var(--spacing-md); align-items: center;">
  <span class="badge badge-progress">In Progress</span>
  <span class="badge-default">Step 3 of 7</span>
  <button class="btn btn-sm btn-primary">Continue</button>
</div>
```

---

## Accessibility Checklist

- ✅ All buttons have clear labels
- ✅ Form inputs have associated labels
- ✅ Focus states are visible (2px outline, 2px offset)
- ✅ Color contrast meets WCAG AA (4.5:1)
- ✅ Don't rely on color alone for information
- ✅ Keyboard navigation works throughout
- ✅ Semantic HTML used (heading hierarchy, landmarks)
- ✅ Error messages explain what went wrong + how to fix

---

**For complete design documentation, see DESIGN_SYSTEM.md**
