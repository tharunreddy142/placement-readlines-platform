import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Share2, CheckCircle2, Calendar, Zap, Target } from 'lucide-react'

export default function Results() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedSection, setExpandedSection] = useState('overview')

    useEffect(() => {
        // Load from localStorage
        const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
        const entry = history.find((e) => e.id === id)

        if (entry) {
            setAnalysis(entry)
            setError('')
        } else {
            setError('Analysis not found. It may have been deleted.')
        }
        setLoading(false)
    }, [id])

    if (loading) {
        return (
            <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading analysis...</p>
                </div>
            </div>
        )
    }

    if (error || !analysis) {
        return (
            <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/analyze')}
                        className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Analysis
                    </button>
                    <div className="bg-white rounded-lg p-8 text-center">
                        <p className="text-gray-600 mb-4">{error || 'Analysis not found'}</p>
                        <button
                            onClick={() => navigate('/analyze')}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Create New Analysis
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const readinessColor =
        analysis.readinessScore >= 70 ? 'text-green-600' : analysis.readinessScore >= 50 ? 'text-yellow-600' : 'text-red-600'
    const readinessBg =
        analysis.readinessScore >= 70 ? 'bg-green-50' : analysis.readinessScore >= 50 ? 'bg-yellow-50' : 'bg-red-50'

    const handleDownload = () => {
        const content = generatePDFContent(analysis)
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
        element.setAttribute('download', `analysis-${analysis.company}-${analysis.id}.txt`)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/analyze')}
                    className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    New Analysis
                </button>

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{analysis.company}</h1>
                            <p className="text-gray-600 text-lg mt-1">{analysis.role}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className={`${readinessBg} rounded-lg p-6 text-center`}>
                            <div className={`text-5xl font-bold ${readinessColor}`}>{analysis.readinessScore}</div>
                            <div className="text-sm text-gray-600 mt-1">Readiness Score</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleDownload}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 font-semibold"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                        <button
                            onClick={() => alert('Share feature coming soon!')}
                            className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center gap-2 font-semibold"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>

                {/* Readiness Score Explanation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700">
                        <strong>Score Calculation:</strong> Base 35 + 5×categories found (max 30) + bonuses for company (10),
                        role (10), and detailed JD (10)
                    </p>
                </div>

                {/* Extracted Skills */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Extracted Skills</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(analysis.extractedSkills.categories).map(([category, skills]) => (
                            <div key={category} className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 text-indigo-600">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7-Day Plan */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Prep Plan</h2>
                    <div className="space-y-4">
                        {analysis.sevenDayPlan.map((day) => (
                            <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                                <div
                                    className="cursor-pointer flex items-center justify-between"
                                    onClick={() =>
                                        setExpandedSection(expandedSection === `day-${day.day}` ? null : `day-${day.day}`)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-600">
                                            {day.day}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{day.title}</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-500">{expandedSection === `day-${day.day}` ? '−' : '+'}</span>
                                </div>
                                {expandedSection === `day-${day.day}` && (
                                    <ul className="mt-4 ml-13 space-y-2 text-gray-700">
                                        {day.tasks.map((task, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Round-wise Checklist */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Preparation Checklist</h2>
                    <div className="space-y-4">
                        {analysis.checklist.map((round, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                <div
                                    className="cursor-pointer flex items-center justify-between"
                                    onClick={() =>
                                        setExpandedSection(expandedSection === `round-${round.round}` ? null : `round-${round.round}`)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <Target className="w-5 h-5 text-indigo-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                Round {round.round}: {round.name}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-gray-500">{expandedSection === `round-${round.round}` ? '−' : '+'}</span>
                                </div>
                                {expandedSection === `round-${round.round}` && (
                                    <ul className="mt-4 ml-8 space-y-2 text-gray-700">
                                        {round.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-indigo-600 rounded mt-0.5 cursor-pointer"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interview Questions */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Likely Interview Questions</h2>
                    <div className="space-y-4">
                        {analysis.interviewQuestions.map((q, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-2">{q.question}</p>
                                        <div className="flex gap-2">
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                {q.category}
                                            </span>
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${q.difficulty === 'Easy'
                                                        ? 'bg-green-100 text-green-700'
                                                        : q.difficulty === 'Medium'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {q.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center text-gray-600 text-sm mb-6">
                    <p>💾 This analysis is saved in your browser's local storage and will persist on refresh.</p>
                </div>
            </div>
        </div>
    )
}

/**
 * Generate text content for download
 */
function generatePDFContent(analysis) {
    const date = new Date(analysis.createdAt).toLocaleDateString()
    let content = `
JOB ANALYSIS REPORT
==================
Company: ${analysis.company}
Role: ${analysis.role}
Date: ${date}
Readiness Score: ${analysis.readinessScore}/100

EXTRACTED SKILLS
================
${Object.entries(analysis.extractedSkills.categories)
            .map(([category, skills]) => `${category}: ${skills.join(', ')}`)
            .join('\n')}

7-DAY PREP PLAN
===============
${analysis.sevenDayPlan.map((day) => `Day ${day.day}: ${day.title}\n${day.tasks.map((t) => `  • ${t}`).join('\n')}`).join('\n\n')}

INTERVIEW PREPARATION CHECKLIST
================================
${analysis.checklist
            .map((round) => `Round ${round.round}: ${round.name}\n${round.items.map((item) => `  ☐ ${item}`).join('\n')}`)
            .join('\n\n')}

LIKELY INTERVIEW QUESTIONS
==========================
${analysis.interviewQuestions.map((q, idx) => `${idx + 1}. ${q.question}\n   Category: ${q.category} | Difficulty: ${q.difficulty}`).join('\n\n')}

Generated by Placement Readiness Platform
${new Date().toLocaleString()}
    `.trim()

    return content
}
