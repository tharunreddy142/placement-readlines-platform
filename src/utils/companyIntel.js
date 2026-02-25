const KNOWN_ENTERPRISES = [
    'amazon',
    'infosys',
    'tcs',
    'google',
    'microsoft',
    'meta',
    'facebook',
    'apple',
    'wipro',
    'accenture',
    'ibm',
    'oracle',
]

export function inferIndustry(companyName) {
    if (!companyName || !companyName.trim()) return 'Technology Services'

    const lower = companyName.toLowerCase()
    if (lower.includes('bank') || lower.includes('finance') || lower.includes('capital')) return 'Financial Services'
    if (lower.includes('health') || lower.includes('clinic') || lower.includes('medical')) return 'Healthcare'
    if (lower.includes('edu') || lower.includes('school') || lower.includes('university')) return 'Education'

    return 'Technology Services'
}

export function estimateSizeCategory(companyName) {
    if (!companyName || !companyName.trim()) return 'Startup (<200)'

    const lower = companyName.toLowerCase()

    if (KNOWN_ENTERPRISES.some((known) => lower.includes(known))) {
        return 'Enterprise (2000+)'
    }

    if (lower.includes('inc') || lower.includes('ltd') || lower.includes('plc') || lower.includes('solutions')) {
        return 'Mid-size (200–2000)'
    }

    return 'Startup (<200)'
}

export function typicalHiringFocus(sizeCategory) {
    if (sizeCategory.startsWith('Enterprise')) {
        return 'Structured DSA + core fundamentals.'
    }
    if (sizeCategory.startsWith('Startup')) {
        return 'Practical problem solving + stack depth.'
    }
    return 'Balanced fundamentals + practical delivery.'
}

function detectSignals(extractedSkills) {
    const allSkills = extractedSkills?.allSkills || []
    const allLower = allSkills.map((skill) => String(skill).toLowerCase())

    return {
        hasDSA: allLower.some((skill) => skill.includes('dsa') || skill.includes('algorithm') || skill.includes('data structure')),
        hasReactOrNode: allLower.some((skill) => skill.includes('react') || skill.includes('node')),
    }
}

export function generateRoundMapping(sizeCategory, extractedSkills) {
    const { hasDSA, hasReactOrNode } = detectSignals(extractedSkills)

    if (sizeCategory.startsWith('Enterprise') && hasDSA) {
        return [
            {
                round: 1,
                title: 'Online Test',
                details: 'DSA + Aptitude',
                why: 'This round filters high volume applications with consistent scoring.',
            },
            {
                round: 2,
                title: 'Technical',
                details: 'DSA + Core CS',
                why: 'Interviewers validate depth in problem solving and CS fundamentals.',
            },
            {
                round: 3,
                title: 'Tech + Projects',
                details: 'Projects + Architecture',
                why: 'Your implementation quality and ownership are evaluated here.',
            },
            {
                round: 4,
                title: 'HR',
                details: 'Behavioral + Fit',
                why: 'Team fit, communication, and offer-level alignment are finalized.',
            },
        ]
    }

    if (sizeCategory.startsWith('Startup') && hasReactOrNode) {
        return [
            {
                round: 1,
                title: 'Practical Coding',
                details: 'Build/Fix Feature',
                why: 'Startups prioritize immediate execution and code quality.',
            },
            {
                round: 2,
                title: 'System Discussion',
                details: 'Architecture + Trade-offs',
                why: 'You are expected to reason about product constraints end-to-end.',
            },
            {
                round: 3,
                title: 'Culture Fit',
                details: 'Ownership + Collaboration',
                why: 'Small teams optimize for high trust and self-driven execution.',
            },
        ]
    }

    if (sizeCategory.startsWith('Enterprise')) {
        return [
            { round: 1, title: 'Online Test', details: 'Aptitude + Coding', why: 'Initial screening ensures baseline problem-solving ability.' },
            { round: 2, title: 'Technical', details: 'Core CS + Coding', why: 'Core engineering rigor is validated in depth.' },
            { round: 3, title: 'Tech + Projects', details: 'Projects + System', why: 'Past execution and architecture thinking are assessed.' },
            { round: 4, title: 'HR', details: 'Behavioral + Fit', why: 'Cultural fit and practical expectations are aligned.' },
        ]
    }

    if (sizeCategory.startsWith('Mid-size')) {
        return [
            { round: 1, title: 'Coding Screen', details: 'Coding + Aptitude', why: 'Baseline implementation and clarity are checked quickly.' },
            { round: 2, title: 'Technical', details: 'Stack + Core CS', why: 'Role-specific depth and practical trade-off thinking are tested.' },
            { round: 3, title: 'Project Deep Dive', details: 'Projects + Impact', why: 'Ownership and measurable outcomes matter strongly here.' },
            { round: 4, title: 'HR', details: 'Communication + Fit', why: 'Cross-functional fit and expectations are finalized.' },
        ]
    }

    return [
        { round: 1, title: 'Practical Coding', details: 'Task/Feature', why: 'Hands-on output is the fastest signal of readiness.' },
        { round: 2, title: 'Technical Discussion', details: 'Design + Debugging', why: 'Problem decomposition and engineering judgment are evaluated.' },
        { round: 3, title: 'Culture Fit', details: 'Ownership + Communication', why: 'Team velocity depends on strong ownership and collaboration.' },
    ]
}

export function buildCompanyIntel(companyName, extractedSkills) {
    const sizeCategory = estimateSizeCategory(companyName)

    return {
        name: companyName,
        industry: inferIndustry(companyName),
        sizeCategory,
        hiringFocus: typicalHiringFocus(sizeCategory),
        roundMapping: generateRoundMapping(sizeCategory, extractedSkills),
        demo: true,
    }
}

