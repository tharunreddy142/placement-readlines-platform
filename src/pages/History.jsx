import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Trash2, Eye, Plus, Calendar } from 'lucide-react'
import { loadNormalizedHistory, saveNormalizedHistory } from '../utils/historySchema'

export default function History() {
    const navigate = useNavigate()
    const [analyses, setAnalyses] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadWarning, setLoadWarning] = useState('')

    const isDev = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) || process.env.NODE_ENV !== 'production'
    const location = useLocation()

    const seedSamples = () => {
        // simple inlined seeder (keeps duplicate checks)
        const samples = [
            {
                id: 'sample-enterprise-1',
                company: 'Amazon',
                role: 'SDE',
                createdAt: new Date().toISOString(),
                readinessScore: 60,
                extractedSkills: { categories: { 'Core CS': ['Algorithms', 'Data Structures'] } },
                sevenDayPlan: [{ day: 1, title: 'DSA fundamentals', tasks: ['Arrays', 'Strings'] }],
                checklist: [{ round: 1, name: 'Online Test', items: ['DSA', 'Aptitude'] }],
                interviewQuestions: [{ question: 'Explain quicksort.', category: 'Core CS', difficulty: 'Medium' }]
            },
            {
                id: 'sample-startup-1',
                company: 'CoolStartup',
                role: 'Frontend Engineer',
                createdAt: new Date().toISOString(),
                readinessScore: 50,
                extractedSkills: { categories: { Web: ['React', 'JavaScript'] } },
                sevenDayPlan: [{ day: 1, title: 'React core', tasks: ['Components', 'State'] }],
                checklist: [{ round: 1, name: 'Practical Coding', items: ['Build feature'] }],
                interviewQuestions: [{ question: 'How to optimize React rendering?', category: 'Web', difficulty: 'Medium' }]
            },
            {
                id: 'sample-midsize-1',
                company: 'Acme Inc',
                role: 'Backend Engineer',
                createdAt: new Date().toISOString(),
                readinessScore: 55,
                extractedSkills: { categories: { 'Core CS': ['Databases'], Web: ['Node.js'] } },
                sevenDayPlan: [{ day: 1, title: 'Backend basics', tasks: ['HTTP', 'DB modeling'] }],
                checklist: [{ round: 1, name: 'Coding & Aptitude', items: ['Coding challenge'] }],
                interviewQuestions: [{ question: 'Explain transactions.', category: 'Core CS', difficulty: 'Medium' }]
            }
        ]

        const existing = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
        const merged = [...existing]
        samples.forEach((s) => {
            if (!merged.find((e) => e.id === s.id)) merged.push(s)
        })
        saveNormalizedHistory(merged)
        loadHistory()
        alert('Seeded sample analyses: ' + samples.map((s) => s.id).join(', '))
    }

    // Auto-run seeder when URL contains ?seed=1 (useful for quick verification).
    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search)
            if (params.get('seed') === '1') {
                seedSamples()
                // remove query param to avoid repeated runs
                navigate(location.pathname, { replace: true })
            }
        } catch (e) {
            // ignore
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = () => {
        const { entries, skippedCount } = loadNormalizedHistory()
        setAnalyses(entries)
        setLoadWarning(skippedCount > 0 ? "One saved entry couldn't be loaded. Create a new analysis." : '')
        setLoading(false)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this analysis?')) {
            const updated = analyses.filter((a) => a.id !== id)
            saveNormalizedHistory(updated)
            setAnalyses(updated)
        }
    }

    const handleClearAll = () => {
        if (window.confirm('This will delete ALL saved analyses. Are you sure?')) {
            saveNormalizedHistory([])
            setAnalyses([])
        }
    }

    const getReadinessColor = (score) => {
        if (score >= 70) return 'text-green-600 bg-green-50'
        if (score >= 50) return 'text-yellow-600 bg-yellow-50'
        return 'text-red-600 bg-red-50'
    }

    if (loading) {
        return (
            <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading history...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
                        <p className="text-gray-600 mt-1">
                            {analyses.length} saved {analyses.length === 1 ? 'analysis' : 'analyses'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {analyses.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                            >
                                Clear All
                            </button>
                        )}
                        {isDev && (
                            <button
                                onClick={seedSamples}
                                title="Seed sample analyses into localStorage (dev only)"
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                            >
                                Seed Samples
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/analyze')}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            New Analysis
                        </button>
                    </div>
                </div>

                {loadWarning && (
                    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">{loadWarning}</p>
                    </div>
                )}

                {/* Empty State */}
                {analyses.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No analyses yet</h2>
                        <p className="text-gray-600 mb-6">
                            Start by analyzing a job description. Your analyses will appear here and be saved in your browser.
                        </p>
                        <button
                            onClick={() => navigate('/analyze')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Analysis
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {analyses.map((analysis) => (
                            <div
                                key={analysis.id}
                                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                    {/* Company & Role */}
                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-gray-900 text-lg">{analysis.company}</h3>
                                        <p className="text-gray-600">{analysis.role}</p>
                                    </div>

                                    {/* Date */}
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(analysis.createdAt).toLocaleDateString()}
                                    </div>

                                    {/* Score */}
                                    <div className={`text-center rounded-lg p-3 ${getReadinessColor(analysis.finalScore ?? analysis.readinessScore)}`}>
                                        <div className="text-2xl font-bold">{analysis.finalScore ?? analysis.readinessScore}</div>
                                        <div className="text-xs font-semibold mt-1">Score</div>
                                    </div>

                                    {/* Extracted Skills Preview */}
                                    <div className="md:col-span-4 mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-600 font-semibold mb-2">Detected:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.keys(analysis.extractedSkills.categories).map((category) => (
                                                <span
                                                    key={category}
                                                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="md:col-span-4 flex gap-3 mt-4 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => navigate(`/results/${analysis.id}`)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-semibold"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDelete(analysis.id)}
                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Box */}
                {analyses.length > 0 && (
                    <>
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-700">
                                <strong>💾 Local Storage:</strong> All analyses are saved in your browser's local storage. They will
                                persist even after you close this tab, but will be cleared if you clear your browser's cache.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
