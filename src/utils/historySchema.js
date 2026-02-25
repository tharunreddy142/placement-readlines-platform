const FALLBACK_OTHER_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects']

const SKILL_LABELS = {
    coreCS: 'Core CS',
    languages: 'Languages',
    web: 'Web',
    data: 'Data',
    cloud: 'Cloud/DevOps',
    testing: 'Testing',
    other: 'Other',
}

function isValidIsoDate(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function ensureIsoDate(value, fallback = new Date().toISOString()) {
    if (isValidIsoDate(value)) return value
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString()
    return fallback
}

function uniqueStrings(values) {
    if (!Array.isArray(values)) return []
    return Array.from(
        new Set(
            values
                .filter((value) => typeof value === 'string')
                .map((value) => value.trim())
                .filter(Boolean)
        )
    )
}

function toFocusAreas(details, fallback = []) {
    if (Array.isArray(details)) return uniqueStrings(details)
    if (typeof details === 'string' && details.trim()) {
        return uniqueStrings(details.split('+').map((part) => part.trim()))
    }
    return uniqueStrings(fallback)
}

export function computeFinalScore(baseScore, skillConfidenceMap) {
    const base = Number.isFinite(baseScore) ? baseScore : 35
    const adjustment = Object.values(skillConfidenceMap || {}).reduce((sum, confidence) => {
        if (confidence === 'know') return sum + 2
        if (confidence === 'practice') return sum - 2
        return sum
    }, 0)
    return Math.max(0, Math.min(100, base + adjustment))
}

export function createExtractedSkillsModel(rawExtractedSkills) {
    const raw = rawExtractedSkills || {}
    const rawCategories = raw.categories && typeof raw.categories === 'object' ? raw.categories : {}

    const coreCS = uniqueStrings(raw.coreCS || rawCategories['Core CS'])
    const languages = uniqueStrings(raw.languages || rawCategories['Languages'])
    const web = uniqueStrings(raw.web || rawCategories['Web'])
    const data = uniqueStrings(raw.data || rawCategories['Data'])
    const cloud = uniqueStrings(raw.cloud || rawCategories['Cloud/DevOps'])
    const testing = uniqueStrings(raw.testing || rawCategories['Testing'])
    const other = uniqueStrings(raw.other || rawCategories['Other'] || rawCategories['General'])

    const noDetectedSkills = [coreCS, languages, web, data, cloud, testing, other].every((arr) => arr.length === 0)
    const safeOther = noDetectedSkills ? [...FALLBACK_OTHER_SKILLS] : other

    const categories = {}
    if (coreCS.length) categories['Core CS'] = coreCS
    if (languages.length) categories['Languages'] = languages
    if (web.length) categories['Web'] = web
    if (data.length) categories['Data'] = data
    if (cloud.length) categories['Cloud/DevOps'] = cloud
    if (testing.length) categories['Testing'] = testing
    if (safeOther.length) categories['Other'] = safeOther

    return {
        coreCS,
        languages,
        web,
        data,
        cloud,
        testing,
        other: safeOther,
        categories,
        allSkills: [...coreCS, ...languages, ...web, ...data, ...cloud, ...testing, ...safeOther],
        usedFallback: noDetectedSkills,
    }
}

function defaultRoundMapping(usedFallback) {
    if (usedFallback) {
        return [
            {
                round: 1,
                roundTitle: 'Round 1: Basics Screen',
                focusAreas: ['Communication', 'Basic coding'],
                whyItMatters: 'This checks baseline communication clarity and coding fundamentals.',
            },
            {
                round: 2,
                roundTitle: 'Round 2: Practical Problem Solving',
                focusAreas: ['Problem solving', 'Projects'],
                whyItMatters: 'Interviewers validate real-world thinking and structured execution.',
            },
            {
                round: 3,
                roundTitle: 'Round 3: Final Fit',
                focusAreas: ['Ownership', 'Collaboration'],
                whyItMatters: 'Team fit and growth potential are finalized before offer decisions.',
            },
        ]
    }

    return [
        {
            round: 1,
            roundTitle: 'Round 1: Screening',
            focusAreas: ['Coding', 'Aptitude'],
            whyItMatters: 'Initial filtering confirms baseline readiness.',
        },
        {
            round: 2,
            roundTitle: 'Round 2: Technical',
            focusAreas: ['Core CS', 'Stack depth'],
            whyItMatters: 'Technical depth and decision quality are evaluated in detail.',
        },
        {
            round: 3,
            roundTitle: 'Round 3: Fit',
            focusAreas: ['Projects', 'Behavioral'],
            whyItMatters: 'Execution quality and collaboration style are assessed.',
        },
    ]
}

export function normalizeRoundMapping(rawRoundMapping, usedFallback = false) {
    const source = Array.isArray(rawRoundMapping) && rawRoundMapping.length ? rawRoundMapping : defaultRoundMapping(usedFallback)

    return source.map((item, index) => {
        const roundNumber = Number.isFinite(item?.round) ? item.round : index + 1
        const baseTitle = item?.roundTitle || item?.title || `Round ${roundNumber}`
        const focusAreas = toFocusAreas(
            item?.focusAreas !== undefined ? item.focusAreas : item?.details,
            []
        )
        const whyItMatters = typeof item?.whyItMatters === 'string' && item.whyItMatters.trim()
            ? item.whyItMatters.trim()
            : (typeof item?.why === 'string' && item.why.trim() ? item.why.trim() : 'This round evaluates role-critical skills and readiness.')

        return {
            round: roundNumber,
            roundTitle: baseTitle.startsWith('Round') ? baseTitle : `Round ${roundNumber}: ${baseTitle}`,
            focusAreas,
            whyItMatters,
            title: baseTitle.replace(/^Round\s*\d+:\s*/i, ''),
            details: focusAreas.join(' + '),
            why: whyItMatters,
        }
    })
}

function defaultChecklist(usedFallback) {
    if (usedFallback) {
        return [
            {
                round: 1,
                roundTitle: 'Round 1: Basics',
                items: ['Practice self-introduction', 'Review basic coding syntax', 'Solve 5 easy problems'],
            },
            {
                round: 2,
                roundTitle: 'Round 2: Practical',
                items: ['Explain one project end-to-end', 'Practice debugging aloud', 'Solve 5 medium problems'],
            },
            {
                round: 3,
                roundTitle: 'Round 3: Fit',
                items: ['Prepare STAR answers', 'List ownership examples', 'Prepare role/company questions'],
            },
        ]
    }

    return []
}

export function normalizeChecklist(rawChecklist, usedFallback = false) {
    const source = Array.isArray(rawChecklist) && rawChecklist.length ? rawChecklist : defaultChecklist(usedFallback)

    return source.map((item, index) => {
        const roundNumber = Number.isFinite(item?.round) ? item.round : index + 1
        const roundTitle = typeof item?.roundTitle === 'string' && item.roundTitle.trim()
            ? item.roundTitle.trim()
            : (typeof item?.name === 'string' && item.name.trim()
                ? `Round ${roundNumber}: ${item.name.trim()}`
                : `Round ${roundNumber}`)
        const items = uniqueStrings(item?.items)

        return {
            round: roundNumber,
            roundTitle,
            name: roundTitle.replace(/^Round\s*\d+:\s*/i, ''),
            items,
        }
    })
}

function defaultPlan7Days(usedFallback) {
    if (usedFallback) {
        return [
            { day: 1, focus: 'Communication baseline', tasks: ['Practice concise self-introduction', 'Record and review clarity'] },
            { day: 2, focus: 'Problem solving basics', tasks: ['Solve 5 easy coding problems', 'Write clean explanations'] },
            { day: 3, focus: 'Coding fluency', tasks: ['Practice arrays/strings questions', 'Revise syntax essentials'] },
            { day: 4, focus: 'Project storytelling', tasks: ['Document one project architecture', 'Prepare impact metrics'] },
            { day: 5, focus: 'Practical debugging', tasks: ['Fix 3 buggy snippets', 'Explain debugging steps out loud'] },
            { day: 6, focus: 'Mock interview', tasks: ['Run 1 technical mock', 'Run 1 behavioral mock'] },
            { day: 7, focus: 'Revision', tasks: ['Review weak areas', 'Final confidence pass'] },
        ]
    }
    return []
}

export function normalizePlan7Days(rawPlan, usedFallback = false) {
    const source = Array.isArray(rawPlan) && rawPlan.length ? rawPlan : defaultPlan7Days(usedFallback)

    return source.map((item, index) => {
        const day = Number.isFinite(item?.day) ? item.day : index + 1
        const focus = typeof item?.focus === 'string' && item.focus.trim()
            ? item.focus.trim()
            : (typeof item?.title === 'string' && item.title.trim() ? item.title.trim() : `Day ${day} Focus`)
        const tasks = uniqueStrings(item?.tasks)

        return {
            day,
            focus,
            title: focus,
            tasks,
        }
    })
}

function defaultQuestions(usedFallback) {
    if (usedFallback) {
        return [
            'How do you communicate technical ideas to non-technical teammates?',
            'Describe a problem you solved with limited information.',
            'Walk me through a basic coding problem and your approach.',
            'Which project are you most proud of and why?',
            'How do you handle feedback and iteration?',
        ]
    }

    return [
        'Tell me about yourself and your technical journey.',
        'Explain a challenging problem and how you solved it.',
        'Why are you interested in this role and company?',
    ]
}

export function normalizeQuestions(rawQuestions, usedFallback = false) {
    if (Array.isArray(rawQuestions) && rawQuestions.length) {
        if (typeof rawQuestions[0] === 'string') {
            const cleaned = uniqueStrings(rawQuestions)
            if (cleaned.length) return cleaned
        }

        const fromObjects = uniqueStrings(
            rawQuestions.map((item) => (typeof item?.question === 'string' ? item.question : ''))
        )
        if (fromObjects.length) return fromObjects
    }

    return defaultQuestions(usedFallback)
}

export function buildInterviewQuestionsForUI(questions) {
    return (questions || []).map((question) => ({
        question,
        category: 'General',
        difficulty: 'Medium',
    }))
}

export function sanitizeSkillConfidenceMap(rawMap) {
    if (!rawMap || typeof rawMap !== 'object' || Array.isArray(rawMap)) return {}

    const cleaned = {}
    Object.entries(rawMap).forEach(([skill, confidence]) => {
        if (typeof skill !== 'string' || !skill.trim()) return
        if (confidence !== 'know' && confidence !== 'practice') return
        cleaned[skill] = confidence
    })
    return cleaned
}

export function normalizeHistoryEntry(rawEntry) {
    if (!rawEntry || typeof rawEntry !== 'object' || Array.isArray(rawEntry)) return null

    if (rawEntry.id === undefined || rawEntry.id === null) return null
    const id = String(rawEntry.id).trim()
    if (!id) return null

    const createdAt = ensureIsoDate(rawEntry.createdAt)
    const jdText = typeof rawEntry.jdText === 'string' ? rawEntry.jdText : ''
    if (!jdText.trim()) return null

    const company = typeof rawEntry.company === 'string' ? rawEntry.company.trim() : ''
    const role = typeof rawEntry.role === 'string' ? rawEntry.role.trim() : ''

    const extractedSkills = createExtractedSkillsModel(rawEntry.extractedSkills)
    const roundMapping = normalizeRoundMapping(rawEntry.roundMapping, extractedSkills.usedFallback)
    const checklist = normalizeChecklist(rawEntry.checklist, extractedSkills.usedFallback)
    const plan7Days = normalizePlan7Days(rawEntry.plan7Days || rawEntry.sevenDayPlan, extractedSkills.usedFallback)
    const questions = normalizeQuestions(rawEntry.questions || rawEntry.interviewQuestions, extractedSkills.usedFallback)

    const baseScore = Number.isFinite(rawEntry.baseScore)
        ? Math.max(0, Math.min(100, rawEntry.baseScore))
        : (Number.isFinite(rawEntry.readinessScore) ? Math.max(0, Math.min(100, rawEntry.readinessScore)) : 35)
    const skillConfidenceMap = sanitizeSkillConfidenceMap(rawEntry.skillConfidenceMap)
    const finalScore = Number.isFinite(rawEntry.finalScore)
        ? Math.max(0, Math.min(100, rawEntry.finalScore))
        : (Number.isFinite(rawEntry.liveScore)
            ? Math.max(0, Math.min(100, rawEntry.liveScore))
            : computeFinalScore(baseScore, skillConfidenceMap))
    const updatedAt = ensureIsoDate(rawEntry.updatedAt, createdAt)

    return {
        id,
        createdAt,
        company,
        role,
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        skillConfidenceMap,
        finalScore,
        updatedAt,

        // Compatibility fields used by existing UI.
        companyProvided: Boolean(company),
        readinessScore: baseScore,
        liveScore: finalScore,
        sevenDayPlan: plan7Days.map((day) => ({ day: day.day, title: day.focus, tasks: day.tasks })),
        interviewQuestions: buildInterviewQuestionsForUI(questions),
    }
}

export function loadNormalizedHistory() {
    try {
        const parsed = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
        if (!Array.isArray(parsed)) {
            return { entries: [], skippedCount: 1 }
        }

        const entries = []
        let skippedCount = 0
        parsed.forEach((entry) => {
            const normalized = normalizeHistoryEntry(entry)
            if (!normalized) {
                skippedCount++
                return
            }
            entries.push(normalized)
        })

        return { entries, skippedCount }
    } catch (error) {
        return { entries: [], skippedCount: 1 }
    }
}

export function saveNormalizedHistory(entries) {
    localStorage.setItem('analysisHistory', JSON.stringify(entries))
}

export function withUpdatedSkillConfidence(entry, skillConfidenceMap) {
    const normalizedMap = sanitizeSkillConfidenceMap(skillConfidenceMap)
    const finalScore = computeFinalScore(entry.baseScore, normalizedMap)

    return {
        ...entry,
        skillConfidenceMap: normalizedMap,
        finalScore,
        updatedAt: new Date().toISOString(),
        liveScore: finalScore,
    }
}

export { FALLBACK_OTHER_SKILLS, SKILL_LABELS }
