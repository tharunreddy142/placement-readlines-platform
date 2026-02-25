# Placement Readiness Platform — Setup Guide

## Prerequisites

### Install Node.js and npm

**Option 1: Using Homebrew (Recommended for macOS)**
```bash
brew install node
```

**Option 2: Download from Node.js website**
Visit https://nodejs.org/ and download the LTS version

**Verify Installation:**
```bash
node --version
npm --version
```

## Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/tharunreddyappala/placement readlines web"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install:
   - React 18.2.0
   - React Router DOM 6.20.0
   - Tailwind CSS 3.3.6
   - Lucide React 0.294.0
   - Vite 5.0.0

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── main.jsx              # React entry point with routing
├── App.jsx               # App shell with sidebar, header, outlet
├── index.css             # Global styles with Tailwind directives
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── Header.jsx        # Top header bar
└── pages/
    ├── LandingPage.jsx   # Landing/home page
    ├── Dashboard.jsx     # Dashboard page (placeholder)
    ├── Practice.jsx      # Practice problems (placeholder)
    ├── Assessments.jsx   # Assessments (placeholder)
    ├── Resources.jsx     # Resources (placeholder)
    └── Profile.jsx       # User profile (placeholder)
```

## Features Implemented

### Landing Page
- ✅ Hero section with "Ace Your Placement" heading
- ✅ Features grid with 3 cards (Practice Problems, Mock Interviews, Track Progress)
- ✅ "Get Started" button that navigates to Dashboard
- ✅ Footer with copyright text

### App Shell (Dashboard)
- ✅ Sidebar navigation with links to Dashboard, Practice, Assessments, Resources, Profile
- ✅ Lucide React icons for each nav item
- ✅ Header showing "Placement Prep" and user avatar placeholder
- ✅ Main content area with React Router Outlet

### Color Scheme
- ✅ Indigo/purple primary color: `#6366f1` (hsl(245, 58%, 51%))
- ✅ Primary dark: `#4f46e5`
- ✅ Primary light: `#818cf8`

### Pages (Placeholder)
- ✅ Dashboard — Stats cards and recent activity
- ✅ Practice — Problem list with difficulty and status
- ✅ Assessments — Assessment schedule
- ✅ Resources — Downloadable materials
- ✅ Profile — User profile information

## Routing

| Route | Component |
|-------|-----------|
| `/` | LandingPage |
| `/dashboard` | Dashboard |
| `/practice` | Practice |
| `/assessments` | Assessments |
| `/resources` | Resources |
| `/profile` | Profile |

## Styling

The app uses **Tailwind CSS** for styling:
- Pre-configured with indigo/purple color scheme
- Responsive design with Tailwind's breakpoints
- Lucide React icons throughout the interface

## Next Steps

1. Install Node.js if not already installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Visit `http://localhost:5173` in your browser
5. Click "Get Started" on the landing page to navigate to the dashboard

## Customization

To modify colors, edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',
  'primary-dark': '#4f46e5',
  'primary-light': '#818cf8',
}
```

## Troubleshooting

**Issue: npm command not found**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation
- Verify with `npm --version`

**Issue: Port 5173 already in use**
- Edit `vite.config.js` and change the port number
- Or kill the process: `lsof -ti:5173 | xargs kill -9`

---

**Ready to go!** 🚀
