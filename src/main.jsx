import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Practice from './pages/Practice.jsx'
import Assessments from './pages/Assessments.jsx'
import Resources from './pages/Resources.jsx'
import Profile from './pages/Profile.jsx'
import Analyze from './pages/Analyze.jsx'
import Results from './pages/Results.jsx'
import History from './pages/History.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<App />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/analyze" element={<Analyze />} />
                    <Route path="/results/:id" element={<Results />} />
                    <Route path="/history" element={<History />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
