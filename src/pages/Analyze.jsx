import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, AlertCircle } from 'lucide-react'
import { extractSkills, calculateReadinessScore } from '../utils/skillExtraction'
import { generateCompleteAnalysis } from '../utils/analysisGenerator'
import { buildCompanyIntel } from '../utils/companyIntel'

export default function Analyze() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setError('')
    }

    const handleAnalyze = (e) => {
        e.preventDefault()

        // Validation
        if (!formData.jdText.trim()) {
            setError('Please paste a job description')
            return
        }

        if (formData.jdText.trim().length < 50) {
            setError('Job description seems too short. Please provide more details.')
            return
        }

        setLoading(true)

        // Simulate slight delay for UX
        setTimeout(() => {
            try {
                // Extract skills
                const extractedSkills = extractSkills(formData.jdText)

                // Calculate readiness score
                const readinessScore = calculateReadinessScore(
                    extractedSkills,
                    formData.company,
                    formData.role,
                    formData.jdText
                )

                // Generate complete analysis
                const analysis = generateCompleteAnalysis(
                    extractedSkills,
                    formData.company,
                    formData.role,
                    formData.jdText,
                    readinessScore
                )

                const companyProvided = Boolean(formData.company && formData.company.trim())
                const normalizedCompany = companyProvided ? formData.company.trim() : 'Unknown Company'
                const intel = buildCompanyIntel(formData.company, extractedSkills)

                // Save to localStorage
                const historyEntry = {
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    company: normalizedCompany,
                    role: formData.role || 'Unknown Role',
                    companyProvided,
                    companyIntel: {
                        name: normalizedCompany,
                        industry: intel.industry,
                        sizeCategory: intel.sizeCategory,
                        hiringFocus: intel.hiringFocus,
                        demo: true,
                    },
                    roundMapping: intel.roundMapping,
                    jdText: formData.jdText,
                    ...analysis,
                }

                // Get existing history
                const existingHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
                existingHistory.unshift(historyEntry)
                localStorage.setItem('analysisHistory', JSON.stringify(existingHistory))

                // Navigate to results with ID
                navigate(`/results/${historyEntry.id}`)
            } catch (err) {
                setError('An error occurred during analysis. Please try again.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }, 500)
    }

    const handleSampleJD = () => {
        setFormData({
            company: 'TechCorp Solutions',
            role: 'Senior Full Stack Engineer',
            jdText: `We are looking for a Senior Full Stack Engineer with 3+ years of experience.

Required Skills:
- Strong proficiency in JavaScript/TypeScript
- Experience with React and Node.js
- SQL and MongoDB experience
- REST APIs and GraphQL
- Docker and Kubernetes basics
- AWS or GCP experience
- System design knowledge
- Strong DSA fundamentals
- Experience with testing frameworks like Jest and Cypress

Responsibilities:
- Develop scalable web applications
- Design and optimize database queries
- Implement CI/CD pipelines
- Write clean, maintainable code
- Collaborate with team members
- Participate in code reviews
- Contribute to system architecture decisions

Preferred Qualifications:
- Open source contributions
- Experience with Next.js
- DevOps knowledge
- Microservices architecture
- PostgreSQL expertise
- Knowledge of distributed systems`,
        })
        setError('')
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyze Job Description</h1>
                    <p className="text-gray-600">
                        Paste a job description and we'll extract key skills, generate a personalized prep plan, and
                        create likely interview questions.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <form onSubmit={handleAnalyze}>
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Company */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g., Google, Amazon, Startup XYZ"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">Optional but helps us personalize the analysis</p>
                        </div>

                        {/* Role */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="e.g., Senior Backend Engineer, Junior Frontend Developer"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">Optional but helps us tailor the preparation</p>
                        </div>

                        {/* JD Text */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
                            <textarea
                                name="jdText"
                                value={formData.jdText}
                                onChange={handleChange}
                                placeholder="Paste the complete job description here..."
                                rows={12}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-mono text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Minimum 50 characters required</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Analyze Now
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleSampleJD}
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
                            >
                                Load Sample
                            </button>
                        </div>
                    </form>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">What We Extract</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>✓ Core CS concepts (DSA, OOP, DBMS, OS, Networks)</li>
                            <li>✓ Programming languages required</li>
                            <li>✓ Web technologies (React, Node.js, etc.)</li>
                            <li>✓ Data tools (SQL, MongoDB, Redis, etc.)</li>
                            <li>✓ DevOps & Cloud (AWS, Docker, K8s, etc.)</li>
                            <li>✓ Testing frameworks & tools</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">What You Get</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>✓ Personalized readiness score (0-100)</li>
                            <li>✓ Round-wise preparation checklist</li>
                            <li>✓ 7-day intensive prep plan</li>
                            <li>✓ 10 likely interview questions</li>
                            <li>✓ All analysis saved to history</li>
                            <li>✓ Works completely offline</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
