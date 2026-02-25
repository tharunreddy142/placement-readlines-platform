#!/bin/bash

# Placement Readiness Platform — Quick Commands
# Usage: Copy and paste these commands to quickly set up and run the project

# ============================================================================
# INSTALLATION & SETUP
# ============================================================================

# Step 1: Install Node.js (if not already installed)
# brew install node

# Step 2: Navigate to project directory
cd "/Users/tharunreddyappala/placement readlines web"

# Step 3: Install dependencies
npm install

# ============================================================================
# DEVELOPMENT
# ============================================================================

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# ============================================================================
# GIT OPERATIONS
# ============================================================================

# Check git status
git status

# Add all changes
git add .

# Commit with message
git commit -m "feat: Your commit message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# ============================================================================
# DOCUMENTATION
# ============================================================================

# View design system documentation
open DESIGN_SYSTEM.md

# View React app documentation
open REACT_APP.md

# View setup instructions
open SETUP.md

# View project overview
open PROJECT_OVERVIEW.md

# View component reference
open COMPONENT_REFERENCE.md

# View quick reference
open QUICK_REFERENCE.md

# ============================================================================
# TROUBLESHOOTING
# ============================================================================

# Port 5173 already in use? Kill the process:
lsof -ti:5173 | xargs kill -9

# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite

# ============================================================================
# USEFUL SHORTCUTS
# ============================================================================

# Install a new package
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Check for outdated packages
npm outdated

# Update all packages
npm update

# ============================================================================
# PROJECT STRUCTURE QUICK VIEW
# ============================================================================

# View file tree
tree -I 'node_modules|.git|dist' -L 3

# Count lines of code
find src -name "*.jsx" -o -name "*.css" | xargs wc -l

# ============================================================================
# DEPLOYMENT CHECKLIST
# ============================================================================

# Before deploying:
# 1. Run npm run build
# 2. Check build output (dist/ directory)
# 3. npm run preview to test production build
# 4. Verify all routes work
# 5. Test responsive design
# 6. Push to GitHub
# 7. Deploy to hosting (Vercel, Netlify, etc.)

# Example Vercel deployment:
# npm install -g vercel
# vercel

# Example Netlify deployment:
# npm run build
# # Then drag dist/ folder to netlify.com

# ============================================================================
# IMPORTANT FILES & DIRECTORIES
# ============================================================================

# Configuration
# - tailwind.config.js
# - vite.config.js
# - package.json

# React Components
# - src/App.jsx (main app shell)
# - src/components/Sidebar.jsx
# - src/components/Header.jsx

# Pages
# - src/pages/LandingPage.jsx
# - src/pages/Dashboard.jsx
# - src/pages/Practice.jsx
# - src/pages/Assessments.jsx
# - src/pages/Resources.jsx
# - src/pages/Profile.jsx

# Styling
# - src/index.css (global styles with Tailwind)

# Build Output
# - dist/ (after running npm run build)

# Dependencies
# - node_modules/ (created by npm install)

# ============================================================================
# USEFUL LINKS
# ============================================================================

# React: https://react.dev
# React Router: https://reactrouter.com
# Tailwind CSS: https://tailwindcss.com
# Lucide React: https://lucide.dev
# Vite: https://vitejs.dev
# GitHub: https://github.com/tharunreddy142/placement-readlines-platform.git

# ============================================================================
