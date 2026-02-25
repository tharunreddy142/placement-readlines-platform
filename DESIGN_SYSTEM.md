# KodNest Premium Build System — Design System

## System Philosophy

**Calm • Intentional • Coherent • Confident**

This is not a student project. Every design decision reinforces professional credibility. Visual language is restrained, purposeful, and consistent. No gradients, glassmorphism, neon colors, or animation noise. The system speaks with one voice.

---

## Color System

Intentionally minimal. Four colors across the entire product.

| Token | Color | Usage |
|-------|-------|-------|
| **Background** | `#F7F6F3` | Primary surface, page backgrounds |
| **Primary Text** | `#111111` | Headlines, body copy, primary content |
| **Accent (Deep Red)** | `#8B0000` | Primary buttons, critical actions, focus states |
| **Secondary Neutral** | `#E8E6E1` | Borders, dividers, card backgrounds |
| **Success** | `#4A7C5F` | Positive states, confirmations |
| **Warning** | `#B8860B` | Cautions, warnings, alerts |
| **Disabled** | `#BFBBB3` | Disabled states, placeholder text |

**Accessibility:**
- All text meets WCAG AA contrast ratio (4.5:1 minimum)
- Do not rely on color alone to convey information
- Success/Warning states always pair with iconography

---

## Typography System

### Font Families
- **Headings & Titles:** Serif (Georgia or equivalent system serif)
- **Body, Labels, UI:** Sans-serif (System fonts: -apple-system, BlinkMacSystemFont, Segoe UI)
- No decorative fonts. No variable font weights for decoration.

### Scale & Usage

| Level | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|-------------|------|--------|-------------|-----------------|-------|
| **Headline XL** | Serif | 48px | 600 | 1.2 | -0.02em | Page titles, major sections |
| **Headline L** | Serif | 32px | 600 | 1.3 | -0.01em | Section headers, context |
| **Headline M** | Serif | 24px | 600 | 1.4 | 0 | Card titles, step headers |
| **Headline S** | Serif | 20px | 600 | 1.5 | 0 | Subsection headers |
| **Body Large** | Sans-serif | 18px | 400 | 1.8 | 0 | Primary body text |
| **Body Regular** | Sans-serif | 16px | 400 | 1.6 | 0 | Standard body, form labels |
| **Body Small** | Sans-serif | 14px | 400 | 1.6 | 0 | Secondary text, metadata |
| **Label** | Sans-serif | 13px | 500 | 1.5 | 0.02em | Form labels, badges |
| **Code** | Monospace | 14px | 400 | 1.6 | 0 | Code blocks, prompts |

### Typography Rules
- **Max text block width:** 720px (breathing room, readability)
- **Generous spacing** between headlines and body
- **No random font sizes** — stay on the scale
- **Text alignment:** Left-aligned by default; centered only for major headers

---

## Spacing System

**Consistent scale. Never deviate.**

```
8px   → Micro-spacing (padding within components)
16px  → Base unit (component padding, gaps)
24px  → Section spacing (between major sections)
40px  → Large spacing (section separators)
64px  → Extra large spacing (major layout breaks)
```

**Application:**
- Card padding: `16px` or `24px`
- Button padding: `12px 24px` (vertical × horizontal)
- Component gaps: `16px` or `24px`
- Section margins: `40px` or `64px`
- Never use values like `13px`, `27px`, `42px` (off-scale)

---

## Global Layout Structure

Every page follows this hierarchy:

```
┌─────────────────────────────────────────────────┐
│  [TOP BAR]                                      │
├─────────────────────────────────────────────────┤
│  [CONTEXT HEADER]                               │
├────────────────────────────────────────────────┐│
│  [PRIMARY WORKSPACE 70%] │ [SECONDARY 30%]     ││
│                          │                      ││
│                          │                      ││
├────────────────────────────────────────────────┐│
│  [PROOF FOOTER]                                 │
└─────────────────────────────────────────────────┘
```

### Top Bar (Height: 64px)
- **Background:** `#F7F6F3`
- **Border-bottom:** 1px solid `#E8E6E1`
- **Layout:** Flexbox, space-between alignment
- **Left slot:** Project name (Headline S, bold)
- **Center slot:** Progress indicator (Body Small, neutral)
- **Right slot:** Status badge (Label weight, see component specs below)
- **Padding:** `16px 40px` (vertical × horizontal)

### Context Header (Variable height)
- **Background:** `#F7F6F3`
- **Padding:** `40px 40px 24px 40px`
- **Headline:** Headline L, serif, `#111111`
- **Subtext:** Body Regular, `#666666` (1 line max)
- **Purpose statement:** Clear action (no hype language)
- **Spacing below:** `24px` before primary workspace

### Primary Workspace (70% width)
- **Background:** `#FFFFFF` (white card)
- **Border:** 1px solid `#E8E6E1`
- **Border-radius:** `8px`
- **Padding:** `40px`
- **Scrollable:** Yes, if content exceeds viewport
- **Main interaction area:** Clean, focused, no crowding

### Secondary Panel (30% width)
- **Background:** `#F7F6F3`
- **Padding:** `24px`
- **Border:** 1px solid `#E8E6E1`
- **Border-radius:** `8px`
- **Sticky:** Yes (stays visible on scroll)
- **Content order:**
  1. Step Explanation (Body Regular, 3-4 sentences max)
  2. Copyable Prompt Box (see component specs)
  3. Action Buttons (see component specs)
- **Spacing between elements:** `24px`

### Proof Footer (Height: auto, min 120px)
- **Background:** `#F7F6F3`
- **Border-top:** 2px solid `#8B0000`
- **Padding:** `40px`
- **Position:** Sticky bottom (stays visible on scroll)
- **Content:** Checklist of proof items
- **Spacing:** `24px` between rows

---

## Component Specifications

### Buttons

#### Primary Button
- **Background:** `#8B0000` (deep red)
- **Text:** `#FFFFFF` (white)
- **Padding:** `12px 24px`
- **Border:** None
- **Border-radius:** `6px`
- **Font:** Label weight, 14px
- **Cursor:** Pointer
- **Transition:** `background-color 150ms ease-in-out`
- **Hover:** `background-color: #6B0000` (darker)
- **Active/Focus:** `outline: 2px solid #8B0000, outline-offset: 2px`
- **Disabled:** `background-color: #BFBBB3, cursor: not-allowed, opacity: 0.6`

#### Secondary Button
- **Background:** `#FFFFFF`
- **Text:** `#111111`
- **Border:** 1px solid `#8B0000`
- **Padding:** `12px 24px`
- **Border-radius:** `6px`
- **Font:** Label weight, 14px
- **Transition:** `150ms ease-in-out`
- **Hover:** `background-color: #F7F6F3, border-color: #6B0000`
- **Active/Focus:** `outline: 2px solid #8B0000, outline-offset: 2px`
- **Disabled:** `opacity: 0.5, cursor: not-allowed`

#### Ghost Button (Tertiary)
- **Background:** Transparent
- **Text:** `#111111`
- **Border:** None
- **Padding:** `12px 16px`
- **Border-radius:** `6px`
- **Font:** Label weight, 14px
- **Transition:** `150ms ease-in-out`
- **Hover:** `background-color: #E8E6E1`
- **Active/Focus:** `outline: 2px solid #8B0000, outline-offset: 2px`

### Input Fields

- **Background:** `#FFFFFF`
- **Border:** 1px solid `#E8E6E1`
- **Border-radius:** `6px`
- **Padding:** `12px 16px`
- **Font:** Body Regular, 16px
- **Color:** `#111111`
- **Placeholder:** `#BFBBB3`
- **Transition:** `border-color 150ms ease-in-out, box-shadow 150ms ease-in-out`
- **Hover:** `border-color: #D0CCBF`
- **Focus:** `border-color: #8B0000, box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1)`
- **Error state:** `border-color: #C85A54, box-shadow: 0 0 0 3px rgba(200, 90, 84, 0.1)`
- **Disabled:** `background-color: #F7F6F3, border-color: #D0CCBF, cursor: not-allowed, opacity: 0.6`

### Cards

- **Background:** `#FFFFFF`
- **Border:** 1px solid `#E8E6E1`
- **Border-radius:** `8px`
- **Padding:** `24px` or `40px`
- **Box-shadow:** None (flat design)
- **Transition on hover:** `border-color 150ms ease-in-out` (optional, elevate only if interactive)

### Badge/Status Indicator

- **Font:** Label weight, 13px
- **Padding:** `6px 12px`
- **Border-radius:** `4px`
- **Variants:**
  - **Not Started:** Background `#E8E6E1`, text `#666666`
  - **In Progress:** Background `#FFF4E6`, text `#8B6914` (muted amber)
  - **Shipped:** Background `#E8F5E9`, text `#4A7C5F` (muted green)

### Copyable Prompt Box

- **Background:** `#FAFAF8`
- **Border:** 1px solid `#E8E6E1`
- **Border-radius:** `6px`
- **Padding:** `16px`
- **Font:** Code/Monospace, 13px, `#111111`
- **Max-height:** 200px
- **Overflow:** Auto (scrollable)
- **Action button:** Ghost button (Copy) positioned top-right inside box
- **Line-height:** 1.6

### Form Labels

- **Font:** Label weight, 13px
- **Color:** `#111111`
- **Margin-bottom:** `8px`
- **Required indicator:** Red asterisk `*` (only if truly required)

### Dividers & Borders

- **Color:** `#E8E6E1`
- **Weight:** 1px (horizontal) or 1px (vertical)
- **Margin:** `24px 0` (horizontal dividers between sections)

---

## Interaction Rules

### Transitions & Motion
- **Default transition time:** 150–200ms
- **Easing:** `ease-in-out`
- **No bounce, no parallax, no animation noise**
- **Hover effects:** Subtle color/border shifts only
- **Focus states:** Clear outline (2px, 2px offset)

### State Feedback
- **Hover:** Visual change (color, background, border) — always reversible
- **Active/Pressed:** Same as focus, slightly more pronounced
- **Focus:** Keyboard outline (2px solid accent color, 2px offset)
- **Disabled:** Reduced opacity (0.5–0.6), no pointer events
- **Loading:** Animated icon (subtle spinner, 200ms rotation)

### Keyboard Navigation
- **Tab order:** Left-to-right, top-to-bottom
- **Enter:** Activates buttons, toggles checkboxes
- **Space:** Toggles checkboxes
- **Escape:** Closes modals/popovers
- **Arrow keys:** Navigate lists (if applicable)

---

## Error & Empty States

### Error Messages
- **Layout:** Icon (left) + message (right)
- **Icon:** Warning symbol in accent red
- **Background:** `#FEE8E5` (light warm red)
- **Border-left:** 3px solid `#8B0000`
- **Padding:** `16px 24px`
- **Border-radius:** `6px`
- **Font:** Body Small, `#111111`
- **Tone:** Explain what went wrong + how to fix it. Never blame the user.
- **Example:** "File format must be PNG or JPG. Please upload a valid image and try again."

### Success Messages
- **Layout:** Icon (left) + message (right)
- **Icon:** Checkmark in success green
- **Background:** `#E8F5E9` (light green)
- **Border-left:** 3px solid `#4A7C5F`
- **Padding:** `16px 24px`
- **Border-radius:** `6px`
- **Font:** Body Small, `#111111`

### Empty States
- **Icon:** Centered, 64px, `#E8E6E1`
- **Headline:** Headline M, centered, `#111111`
- **Description:** Body Regular, centered, `#666666`, max 400px width
- **Next action:** Primary button or link (provide clear next step)
- **Never feel dead** — always provide a path forward

---

## Component Patterns

### Status Badges (Top Bar)
Used in progress indicator center area.

```
Not Started  → Grey badge
In Progress  → Amber badge (Step X of Y)
Shipped      → Green badge (✓ Complete)
```

### Secondary Panel Action Buttons
Standard layout (stack vertically, equal width):

1. **Copy** (Primary button, full width)
2. **Build in Lovable** (Secondary button, full width)
3. **It Worked** (Primary button, full width)
4. **Error** (Secondary button, full width)
5. **Add Screenshot** (Ghost button, full width)

Spacing between buttons: `12px`

### Proof Footer Checklist
- **Row layout:** Checkbox + label + input field
- **Spacing:** `16px` between rows
- **Checkboxes:** Standard HTML, styled accent color on focus
- **Proof input:** Text field or file upload

---

## Design System Dos & Don'ts

### ✓ DO
- Use the spacing scale consistently
- Keep components flat (no shadows)
- Maintain calm, confident tone
- Test all states (hover, focus, disabled, error)
- Center content on large screens (max-width: 1440px)
- Use subtle borders for definition
- Provide clear visual hierarchy with typography

### ✗ DON'T
- Add gradients, glassmorphism, or neon
- Use random spacing values
- Mix serif and sans-serif in unexpected ways
- Add unnecessary animations
- Rely on color alone for information
- Use drop shadows or blur effects
- Create visual inconsistency across pages

---

## Implementation Notes

- **CSS custom properties** defined in `design-tokens.css`
- **Base component styles** defined in `components.css`
- **Layout styles** defined in `layout.css`
- All values use pixel units for consistency
- Color variables defined with both hex and rgb values
- Component classes use BEM naming convention where applicable
- No build tools required; pure CSS

---

## Design System Version
**v1.0 — February 2026**
**Status:** Foundation Complete, Ready for Component Implementation
