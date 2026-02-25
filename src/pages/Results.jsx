import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Share2, CheckCircle2, Calendar, Zap, Target, Copy, ChevronDown } from 'lucide-react'
import { buildCompanyIntel, inferIndustry, estimateSizeCategory, typicalHiringFocus } from '../utils/companyIntel'
import {
    loadNormalizedHistory,
    saveNormalizedHistory,
    withUpdatedSkillConfidence,
    computeFinalScore,
    normalizeRoundMapping,
} from '../utils/historySchema'

export default function Results() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedSection, setExpandedSection] = useState('overview')
    const [skillConfidence, setSkillConfidence] = useState({})
    const [liveScore, setLiveScore] = useState(0)
    const [copyFeedback, setCopyFeedback] = useState('')
    const [loadWarning, setLoadWarning] = useState('')

    useEffect(() => {
        const { entries: history, skippedCount } = loadNormalizedHistory()
        const entry = history.find((e) => e.id === id)

        if (entry) {
            // Ensure company intel + round mapping exist
            let updated = false
            if (typeof entry.companyProvided !== 'boolean') {
                entry.companyProvided = Boolean(entry.company && entry.company.trim() && entry.company !== 'Unknown Company')
                updated = true
            }

            if (!entry.companyIntel || !entry.roundMapping) {
                const intel = buildCompanyIntel(entry.companyProvided ? entry.company : '', entry.extractedSkills)
                entry.companyIntel = {
                    name: entry.company,
                    industry: intel.industry,
                    sizeCategory: intel.sizeCategory,
                    hiringFocus: intel.hiringFocus,
                    demo: true,
                }
                entry.roundMapping = normalizeRoundMapping(intel.roundMapping, entry.extractedSkills?.usedFallback)
                updated = true
            }

            if (updated) {
                // persist the enriched entry back to localStorage
                const newHistory = history.map((h) => (h.id === entry.id ? entry : h))
                saveNormalizedHistory(newHistory)
            }

            setAnalysis(entry)
            // Load skill confidence if exists, otherwise initialize
            setSkillConfidence(entry.skillConfidenceMap || {})
            calculateLiveScore(entry.baseScore, entry.skillConfidenceMap || {}, entry.finalScore)
            setLoadWarning(
                skippedCount > 0 ? "One saved entry couldn't be loaded. Create a new analysis." : ''
            )
            setError('')
        } else {
            setError(
                skippedCount > 0
                    ? "One saved entry couldn't be loaded. Create a new analysis."
                    : 'Analysis not found. It may have been deleted.'
            )
        }
        setLoading(false)
    }, [id])

    const calculateLiveScore = (baseScore, confidenceMap, explicitFinalScore = null) => {
        const final = Number.isFinite(explicitFinalScore)
            ? explicitFinalScore
            : computeFinalScore(baseScore, confidenceMap)
        setLiveScore(final)
    }

    const handleSkillToggle = (skill, confidence) => {
        const newConfidence = { ...skillConfidence }
        newConfidence[skill] = confidence
        setSkillConfidence(newConfidence)

        // Update live score
        calculateLiveScore(analysis.baseScore, newConfidence)

        // Save back to localStorage
        const { entries: history } = loadNormalizedHistory()
        const updatedHistory = history.map((entry) => {
            if (entry.id === id) {
                return withUpdatedSkillConfidence(entry, newConfidence)
            }
            return entry
        })
        saveNormalizedHistory(updatedHistory)
    }

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyFeedback(label)
            setTimeout(() => setCopyFeedback(''), 2000)
        })
    }

    const getWeakSkills = () => {
        const weak = []
        Object.entries(skillConfidence).forEach(([skill, confidence]) => {
            if (confidence === 'practice') weak.push(skill)
        })
        return weak.slice(0, 3)
    }

    const generateSevenDayPlanText = () => {
        return analysis.sevenDayPlan
            .map((day) => `Day ${day.day}: ${day.title}\n${day.tasks.map((t) => `  • ${t}`).join('\n')}`)
            .join('\n\n')
    }

    const generateChecklistText = () => {
        return analysis.checklist
            .map((round) => `Round ${round.round}: ${round.name}\n${round.items.map((item) => `  ☐ ${item}`).join('\n')}`)
            .join('\n\n')
    }

    const generateQuestionsText = () => {
        return analysis.interviewQuestions
            .map((q, idx) => `${idx + 1}. ${q.question}\n   Category: ${q.category} | Difficulty: ${q.difficulty}`)
            .join('\n\n')
    }

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
        liveScore >= 70 ? 'text-green-600' : liveScore >= 50 ? 'text-yellow-600' : 'text-red-600'
    const readinessBg =
        liveScore >= 70 ? 'bg-green-50' : liveScore >= 50 ? 'bg-yellow-50' : 'bg-red-50'

    const handleDownload = () => {
        const date = new Date(analysis.createdAt).toLocaleDateString()
        const content = `
JOB ANALYSIS REPORT
==================
Company: ${analysis.company}
Role: ${analysis.role}
Date: ${date}
Base Readiness Score: ${analysis.baseScore}/100
Live Readiness Score (with skill adjustments): ${liveScore}/100

EXTRACTED SKILLS & YOUR CONFIDENCE
===================================
${Object.entries(analysis.extractedSkills.categories)
                .map(([category, skills]) => {
                    const skillLines = skills.map((skill) => {
                        const confidence = skillConfidence[skill] || 'need-practice'
                        const status = confidence === 'know' ? '✓ I KNOW' : '✗ NEED PRACTICE'
                        return `  • ${skill} [${status}]`
                    }).join('\n')
                    return `${category}:\n${skillLines}`
                })
                .join('\n\n')}

7-DAY PREP PLAN
===============
${generateSevenDayPlanText()}

INTERVIEW PREPARATION CHECKLIST
================================
${generateChecklistText()}

LIKELY INTERVIEW QUESTIONS
==========================
${generateQuestionsText()}

Generated by Placement Readiness Platform
${new Date().toLocaleString()}
        `.trim()
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
                            <h1 className="text-3xl font-bold text-gray-900">{analysis.company || 'Unknown Company'}</h1>
                            <p className="text-gray-600 text-lg mt-1">{analysis.role || 'Role not specified'}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className={`${readinessBg} rounded-lg p-6 text-center`}>
                            <div className={`text-5xl font-bold ${readinessColor}`}>{liveScore}</div>
                            <div className="text-sm text-gray-600 mt-1">Live Readiness Score</div>
                            {liveScore !== analysis.baseScore && (
                                <div className="text-xs text-gray-500 mt-2">
                                    (Base: {analysis.baseScore})
                                </div>
                            )}
                        </div>
                    </div>
                    {loadWarning && (
                        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                            <p className="text-sm text-amber-800">{loadWarning}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        <button
                            onClick={() => copyToClipboard(generateSevenDayPlanText(), '7-Day Plan')}
                            className={`px-4 py-2 rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2 ${copyFeedback === '7-Day Plan'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Copy className="w-4 h-4" />
                            {copyFeedback === '7-Day Plan' ? 'Copied!' : 'Copy Plan'}
                        </button>
                        <button
                            onClick={() => copyToClipboard(generateChecklistText(), 'Checklist')}
                            className={`px-4 py-2 rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2 ${copyFeedback === 'Checklist'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Copy className="w-4 h-4" />
                            {copyFeedback === 'Checklist' ? 'Copied!' : 'Copy Check'}
                        </button>
                        <button
                            onClick={() => copyToClipboard(generateQuestionsText(), 'Questions')}
                            className={`px-4 py-2 rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2 ${copyFeedback === 'Questions'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Copy className="w-4 h-4" />
                            {copyFeedback === 'Questions' ? 'Copied!' : 'Copy Q&A'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-semibold flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>

                {/* Company Intel & Score Explanation */}
                {analysis.companyProvided && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{analysis.company}</h3>
                                <p className="text-sm text-gray-600">{analysis.companyIntel?.industry || inferIndustry(analysis.company)}</p>
                                <p className="text-sm text-gray-500 mt-1">Size: {analysis.companyIntel?.sizeCategory || estimateSizeCategory(analysis.company)}</p>
                                <p className="text-sm text-gray-700 mt-3">
                                    <span className="font-semibold">Typical Hiring Focus:</span>{' '}
                                    {analysis.companyIntel?.hiringFocus || typicalHiringFocus(estimateSizeCategory(analysis.company))}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Demo Mode: Company intel generated heuristically.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700">
                        <strong>Score Details:</strong> Base 35 + categories (max 30) + bonuses | <strong>Live adjustments:</strong> +2 for
                        each "I know" skill, -2 for each "Need practice"
                    </p>
                </div>

                {/* Round Mapping Timeline */}
                {analysis.roundMapping && Array.isArray(analysis.roundMapping) && (
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Round Mapping</h2>
                        <div className="relative ml-4 border-l-2 border-indigo-100 pl-6 space-y-6">
                            {analysis.roundMapping.map((r) => (
                                <div key={r.round} className="relative">
                                    <div className="absolute -left-[38px] top-1 w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                                        {r.round}
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold text-gray-900">{`Round ${r.round}: ${r.title}`}</h3>
                                            <span className="text-sm text-gray-500">{r.details}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-2">Why this round matters: {r.why}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Extracted Skills - Interactive */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Extracted Skills</h2>
                    <p className="text-sm text-gray-600 mb-4">Toggle your confidence for each skill to adjust your readiness score:</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(analysis.extractedSkills.categories).map(([category, skills]) => (
                            <div key={category} className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 text-indigo-600">{category}</h3>
                                <div className="space-y-2">
                                    {skills.map((skill, idx) => {
                                        const confidence = skillConfidence[skill]
                                        return (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="flex-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                    {skill}
                                                </div>
                                                <button
                                                    onClick={() => handleSkillToggle(skill, 'know')}
                                                    className={`px-2 py-1 text-xs font-semibold rounded transition ${confidence === 'know'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    I know
                                                </button>
                                                <button
                                                    onClick={() => handleSkillToggle(skill, 'practice')}
                                                    className={`px-2 py-1 text-xs font-semibold rounded transition ${confidence === 'practice'
                                                        ? 'bg-orange-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    Need practice
                                                </button>
                                            </div>
                                        )
                                    })}
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
                    <p>💾 All changes are saved automatically to your history entry.</p>
                </div>

                {/* Action Next Box */}
                {getWeakSkills().length > 0 && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 What's Next?</h3>
                        <p className="text-sm text-gray-700 mb-3">
                            You marked these as areas needing practice:
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {getWeakSkills().map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <p className="text-base font-semibold text-orange-900 mb-3">
                            💡 Suggestion: Start with Day 1 of the prep plan to build these fundamentals.
                        </p>
                        <button
                            onClick={() => setExpandedSection('day-1')}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold flex items-center gap-2"
                        >
                            <ChevronDown className="w-4 h-4" />
                            View Day 1 Plan
                        </button>
                    </div>
                )}
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
