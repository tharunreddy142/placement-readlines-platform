import React, { useState, useEffect } from 'react'
import { CheckCircle2, Calendar, Zap } from 'lucide-react'
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts'

// Circular Progress Component
function CircularProgress({ value, max = 100, size = 200, strokeWidth = 8 }) {
    const percentage = (value / max) * 100
    const circumference = 2 * Math.PI * (size / 2 - strokeWidth)
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - strokeWidth / 2}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle with animation */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - strokeWidth / 2}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 0.8s ease-in-out',
                    }}
                />
            </svg>
            {/* Center text */}
            <div className="absolute flex flex-col items-center justify-center" style={{ marginTop: -size / 2 }}>
                <div className="text-4xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-600">Readiness Score</div>
            </div>
        </div>
    )
}

// Skill Breakdown with Radar Chart
function SkillBreakdown() {
    const data = [
        { skill: 'DSA', value: 75 },
        { skill: 'System Design', value: 60 },
        { skill: 'Communication', value: 80 },
        { skill: 'Resume', value: 85 },
        { skill: 'Aptitude', value: 70 },
    ]

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                    <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

// Continue Practice Card
function ContinuePractice() {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Continue Practice</h3>

            <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Last Topic</div>
                <div className="text-2xl font-bold text-gray-900">Dynamic Programming</div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-primary">3/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
                        style={{ width: '30%' }}
                    ></div>
                </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition-colors">
                Continue
            </button>
        </div>
    )
}

// Weekly Goals Component
function WeeklyGoals() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const activeDay = [true, true, false, true, true, false, false] // Days with activity

    return (
        <div className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700">Problems Solved</span>
                    <span className="text-sm font-bold text-primary">12/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-500"
                        style={{ width: '60%' }}
                    ></div>
                </div>
            </div>

            <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Week Activity</div>
                <div className="flex justify-between items-center gap-2">
                    {days.map((day, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-xs font-semibold transition-all ${activeDay[index]
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                {activeDay[index] ? <CheckCircle2 size={20} /> : day.charAt(0)}
                            </div>
                            <span className="text-xs text-gray-600">{day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Upcoming Assessments Component
function UpcomingAssessments() {
    const assessments = [
        { id: 1, title: 'DSA Mock Test', date: 'Tomorrow', time: '10:00 AM', icon: '📝' },
        { id: 2, title: 'System Design Review', date: 'Wed', time: '2:00 PM', icon: '🏗️' },
        { id: 3, title: 'HR Interview Prep', date: 'Friday', time: '11:00 AM', icon: '💼' },
    ]

    return (
        <div className="space-y-3">
            {assessments.map((assessment) => (
                <div
                    key={assessment.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all"
                >
                    <div className="text-2xl mt-1">{assessment.icon}</div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Calendar size={14} />
                            <span>{assessment.date} at {assessment.time}</span>
                        </div>
                    </div>
                    <button className="mt-2 px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                        View
                    </button>
                </div>
            ))}
        </div>
    )
}

// Main Dashboard Component
export default function Dashboard() {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        setIsAnimating(true)
    }, [])

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Track your placement preparation journey</p>
            </div>

            {/* Overall Readiness - Full Width */}
            <div className="mb-8 bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Overall Readiness</h2>
                <div className="flex justify-center">
                    {isAnimating && <CircularProgress value={72} max={100} size={220} strokeWidth={10} />}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        You're doing great! Keep practicing to improve your readiness score.
                    </p>
                </div>
            </div>

            {/* Two Column Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Skill Breakdown */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Breakdown</h2>
                    <SkillBreakdown />
                </div>

                {/* Continue Practice */}
                <div>
                    <ContinuePractice />
                </div>
            </div>

            {/* Weekly Goals and Upcoming Assessments */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Weekly Goals */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Goals</h2>
                    <WeeklyGoals />
                </div>

                {/* Upcoming Assessments */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Zap size={24} className="text-primary" />
                        Upcoming Assessments
                    </h2>
                    <UpcomingAssessments />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Problems', value: '84', icon: '📊' },
                    { label: 'Current Streak', value: '5 days', icon: '🔥' },
                    { label: 'Accuracy', value: '82%', icon: '✅' },
                    { label: 'Study Hours', value: '12.5', icon: '⏱️' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
