# Placement Readiness Platform — React Application

A modern, professional placement interview preparation platform built with **React 18**, **React Router**, **Tailwind CSS**, and **Lucide React icons**.

## 🎯 Overview

The Placement Readiness Platform helps students prepare for placement interviews through practice problems, mock interviews, assessments, and resource management.

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework:** React 18.2.0
- **Routing:** React Router DOM 6.20.0
- **Styling:** Tailwind CSS 3.3.6
- **Build Tool:** Vite 5.0.0
- **Icons:** Lucide React 0.294.0
- **CSS Processing:** PostCSS + Autoprefixer

### Project Structure

```
src/
├── main.jsx                    # App entry point with routing configuration
├── App.jsx                     # App shell (layout with sidebar, header, outlet)
├── index.css                   # Global styles (Tailwind imports)
│
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar with active route highlighting
│   └── Header.jsx             # Top header bar with branding and user avatar
│
└── pages/
    ├── LandingPage.jsx        # Public landing page with hero + features
    ├── Dashboard.jsx          # Dashboard with stats cards
    ├── Practice.jsx           # Practice problems page
    ├── Assessments.jsx        # Mock assessments page
    ├── Resources.jsx          # Study materials download page
    └── Profile.jsx            # User profile page
```

## 🚀 Quick Start

### 1. Install Node.js
```bash
brew install node  # macOS
# or download from https://nodejs.org/
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

## 🎨 Design System

### Color Scheme (Indigo/Purple)
```
Primary:      #6366f1  (hsl(245, 58%, 51%))
Primary Dark: #4f46e5  (hover state)
Primary Light: #818cf8 (hover state for secondary elements)
```

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│  Header: "Placement Prep" + User Avatar       │
├──────────────┬──────────────────────────────────┤
│ Sidebar Nav  │  Main Content Area (Outlet)      │
│              │                                  │
│ • Dashboard  │  Dashboard / Practice /          │
│ • Practice   │  Assessments / Resources / etc   │
│ • Assessments│                                  │
│ • Resources  │                                  │
│ • Profile    │                                  │
└──────────────┴──────────────────────────────────┘
```

## 📄 Pages & Routes

### Public Routes
- **`/`** — Landing Page
  - Hero section: "Ace Your Placement"
  - Features grid (3 columns)
  - "Get Started" button → navigates to Dashboard

### Protected Routes (App Shell)
- **`/dashboard`** — Dashboard
  - Stats cards (Problems Solved, Accuracy, Time Spent, Interviews)
  - Recent activity placeholder
  
- **`/practice`** — Practice Problems
  - Problem list with difficulty and status
  - Placeholder for coding interface
  
- **`/assessments`** — Assessments
  - Mock assessment schedule
  - Status badges (Available, Upcoming)
  
- **`/resources`** — Resources
  - Study materials (PDFs, videos)
  - Download buttons
  
- **`/profile`** — Profile
  - User information display
  - Profile details (email, location, bio)
  - Edit profile button

## 🔧 Configuration Files

### `vite.config.js`
- Vite setup with React plugin
- Development server on port 5173

### `tailwind.config.js`
- Custom primary color configuration (indigo/purple)
- Responsive breakpoints

### `postcss.config.js`
- Tailwind CSS processing
- Autoprefixer for browser compatibility

### `package.json`
- All dependencies and dev scripts
- Build, preview, and linting commands

## ✨ Features

### Landing Page
✅ Responsive hero section  
✅ Feature grid with icons (3 columns)  
✅ Call-to-action button  
✅ Professional footer

### Dashboard App Shell
✅ Persistent sidebar navigation  
✅ Active route highlighting  
✅ Top header bar with branding  
✅ React Router Outlet for page switching  
✅ User avatar placeholder

### Navigation
✅ Lucide React icons for all menu items  
✅ Active state styling  
✅ Smooth route transitions  
✅ Mobile responsive design

### Styling
✅ Tailwind CSS utility classes  
✅ Consistent indigo/purple color scheme  
✅ Professional card-based layout  
✅ Status badges with colors  
✅ Hover effects and transitions

## 📱 Responsive Design

- **Desktop:** Full sidebar, multi-column grids
- **Tablet:** Adjusted spacing and layout
- **Mobile:** Sidebar collapses (can be enhanced with toggle)

## 🎯 Component Highlights

### Sidebar Navigation
- Links to all main features
- Active route highlighting
- Lucide React icons
- Professional styling

### Header
- Branding ("Placement Prep")
- User avatar placeholder (circular badge)
- Clean, minimal design

### Pages
- Placeholder content with info boxes
- Ready for feature implementation
- Consistent styling across all pages

## 🚀 Available Scripts

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (configured)
```

## 🔄 Routing Setup

The app uses nested routing with React Router:

```javascript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route element={<App />}>  {/* App shell */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/practice" element={<Practice />} />
    <Route path="/assessments" element={<Assessments />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>
```

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YourColorHex',
  'primary-dark': '#DarkerShade',
  'primary-light': '#LighterShade',
}
```

### Modify Navigation Items
Edit `src/components/Sidebar.jsx`:
```javascript
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  // Add/remove items here
]
```

## 📦 Dependencies

### Production
- `react` — UI library
- `react-dom` — React DOM renderer
- `react-router-dom` — Client-side routing
- `lucide-react` — Icon library

### Development
- `vite` — Build tool
- `@vitejs/plugin-react` — React support for Vite
- `tailwindcss` — Utility-first CSS framework
- `postcss` — CSS processing
- `autoprefixer` — Browser prefixes
- `eslint` — Code linting
- `eslint-plugin-react` — React-specific linting

## ✅ Next Steps

1. Install Node.js if not already installed
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the development server
4. Implement actual features in placeholder pages
5. Add authentication as needed
6. Connect to backend API
7. Deploy to production (Vercel, Netlify, etc.)

## 🚨 Troubleshooting

**Port 5173 already in use?**
```bash
lsof -ti:5173 | xargs kill -9
# or change port in vite.config.js
```

**Tailwind styles not applying?**
```bash
# Make sure you've run npm install
# Restart the dev server
npm run dev
```

**React Router not working?**
- Ensure `<BrowserRouter>` wraps the app in `main.jsx`
- Check route paths match exactly
- Use `<Link>` for navigation (not `<a>` tags)

---

**Ready to customize and extend!** 🎉

For setup instructions, see [SETUP.md](SETUP.md)
