/**
 * seedHistory.js
 *
 * Browser snippet to seed sample `analysisHistory` entries into localStorage for testing.
 * Usage: open your app in a browser, open DevTools Console, paste the contents of this file and run `seedSampleHistory()`.
 */

function _nowIso(daysOffset = 0) {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    return d.toISOString()
}

function seedSampleHistory() {
    const samples = [
        {
            id: 'sample-enterprise-1',
            company: 'Amazon',
            role: 'SDE',
            createdAt: _nowIso(-2),
            readinessScore: 60,
            extractedSkills: {
                categories: {
                    'Core CS': ['Algorithms', 'Data Structures', 'Complexity Analysis'],
                    'System Design': ['Scalability', 'Caching']
                }
            },
            sevenDayPlan: [
                { day: 1, title: 'DSA fundamentals', tasks: ['Arrays & Strings', 'Two pointers'] },
                { day: 2, title: 'Practice problems', tasks: ['Heap problems', 'Sorting'] }
            ],
            checklist: [
                { round: 1, name: 'Online Test', items: ['DSA problems', 'Aptitude'] },
                { round: 2, name: 'Technical Interview', items: ['Deep DSA', 'Core CS questions'] }
            ],
            interviewQuestions: [
                { question: 'Explain quicksort and its average/worst case.', category: 'Core CS', difficulty: 'Medium' },
            ]
        },

        {
            id: 'sample-startup-1',
            company: 'CoolStartup',
            role: 'Frontend Engineer',
            createdAt: _nowIso(-1),
            readinessScore: 50,
            extractedSkills: {
                categories: {
                    'Web': ['React', 'JavaScript', 'CSS'],
                    'Tools': ['Webpack', 'Vite']
                }
            },
            sevenDayPlan: [
                { day: 1, title: 'React core', tasks: ['Components & Props', 'State & Effects'] },
                { day: 2, title: 'Build small app', tasks: ['Routing', 'Forms'] }
            ],
            checklist: [
                { round: 1, name: 'Practical Coding', items: ['Build feature', 'Fix bug'] },
                { round: 2, name: 'System Discussion', items: ['API design', 'Trade-offs'] }
            ],
            interviewQuestions: [
                { question: 'How do you optimize React rendering?', category: 'Web', difficulty: 'Medium' }
            ]
        },

        {
            id: 'sample-midsize-1',
            company: 'Acme Inc',
            role: 'Backend Engineer',
            createdAt: _nowIso(-3),
            readinessScore: 55,
            extractedSkills: {
                categories: {
                    'Core CS': ['Databases', 'Concurrency'],
                    'Web': ['Node.js', 'REST']
                }
            },
            sevenDayPlan: [
                { day: 1, title: 'Backend basics', tasks: ['HTTP & REST', 'DB modeling'] },
                { day: 2, title: 'Practice', tasks: ['API design', 'Testing'] }
            ],
            checklist: [
                { round: 1, name: 'Coding & Aptitude', items: ['Coding challenge', 'Basic aptitude'] },
                { round: 2, name: 'Technical Interview', items: ['System questions', 'DB design'] }
            ],
            interviewQuestions: [
                { question: 'Explain transactions and isolation levels.', category: 'Core CS', difficulty: 'Medium' }
            ]
        }
    ]

    // Read existing history and append samples (avoid duplicates)
    const existing = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
    const merged = [...existing]

    samples.forEach((s) => {
        if (!merged.find((e) => e.id === s.id)) merged.push(s)
    })

    localStorage.setItem('analysisHistory', JSON.stringify(merged))
    console.log('Seeded analysisHistory with sample entries. IDs: ', samples.map((s) => s.id))
}

// Expose to window for easy running in browser console
window.seedSampleHistory = seedSampleHistory

// Auto-run if executed directly in console
if (typeof window !== 'undefined' && window.document) {
    console.log('seedHistory.js loaded — run seedSampleHistory() to insert samples into localStorage')
}
