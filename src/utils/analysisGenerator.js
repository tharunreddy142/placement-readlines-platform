/**
 * Analysis Generator
 * Creates preparation plans, checklists, and interview questions based on extracted skills
 */

/**
 * Generate round-wise preparation checklist
 * @param {object} extractedSkills - Skills extracted from JD
 * @returns {array} Array of rounds with checklist items
 */
export function generateChecklist(extractedSkills) {
    const categories = extractedSkills.categories || {}
    const hasCore = categories['Core CS']
    const hasLanguages = categories['Languages']
    const hasWeb = categories['Web']
    const hasData = categories['Data']
    const hasCloud = categories['Cloud/DevOps']
    const hasTesting = categories['Testing']

    return [
        {
            round: 1,
            name: 'Aptitude & Basics',
            items: [
                'Review logical reasoning and quantitative aptitude',
                'Practice 20+ aptitude problems with time limit',
                'Refresh basic computer fundamentals',
                'Cover communication and soft skills basics',
                'Solve 10 previous year aptitude questions if available',
                hasLanguages ? 'Understand basic syntax of preferred language' : 'Learn fundamentals of any programming language',
            ],
        },
        {
            round: 2,
            name: 'DSA & Core CS',
            items: [
                hasCore ? 'Master core CS concepts detected in JD' : 'Study fundamentals: Data Structures, Algorithms, OS, DBMS',
                'Practice 40+ DSA problems (easy to medium)',
                hasCore && categories['Core CS'].includes('DBMS') ? 'Focus on SQL queries and indexing' : 'Basic database fundamentals',
                hasCore && categories['Core CS'].includes('Networks') ? 'Understand networking basics and protocols' : 'Learn network fundamentals',
                hasCore && categories['Core CS'].includes('OS') ? 'Study process management and memory management' : 'OS basics',
                hasCore && categories['Core CS'].includes('OOP') ? 'Strong grasp of OOP principles' : 'OOP fundamentals',
            ],
        },
        {
            round: 3,
            name: 'Technical Interview & Projects',
            items: [
                hasWeb ? 'Build or update project using detected web stack' : 'Create a portfolio project',
                hasWeb ? 'Practice system design questions for detected tech' : 'Basic system design concepts',
                hasLanguages ? `Solve medium DSA problems in ${categories['Languages'][0]}` : 'Solve medium DSA problems',
                hasData ? 'Optimize queries and understand data modeling' : 'Database design basics',
                'Prepare project explanation and technical deep dives',
                hasCloud ? 'Understand deployment and DevOps basics' : 'Understand production fundamentals',
            ],
        },
        {
            round: 4,
            name: 'Managerial & HR',
            items: [
                'Prepare STAR format answers for 20+ behavioral questions',
                'Practice explaining projects and technical decisions',
                'Understand company culture and values',
                'Prepare thoughtful questions for interviewers',
                'Mock interview with friend or mentor',
                'Final review of resume and key achievements',
            ],
        },
    ]
}

/**
 * Generate 7-day prep plan
 * @param {object} extractedSkills - Skills extracted from JD
 * @returns {array} Array of daily plans
 */
export function generateSevenDayPlan(extractedSkills) {
    const categories = extractedSkills.categories || {}
    const hasWeb = categories['Web']
    const hasData = categories['Data']
    const hasCloud = categories['Cloud/DevOps']

    return [
        {
            day: 1,
            title: 'Fundamentals & Core CS',
            tasks: [
                'Review OS basics (processes, memory, threads)',
                'Study DBMS fundamentals',
                'Practice 5 basic DSA problems (arrays/strings)',
                'Soft skills: Articulation practice',
            ],
        },
        {
            day: 2,
            title: 'Deepen Core CS',
            tasks: [
                'Study OOP principles in depth',
                'Learn networking essentials',
                'Practice 5 DSA problems (linked lists)',
                'Prepare elevator pitch about yourself',
            ],
        },
        {
            day: 3,
            title: 'DSA Intensive I',
            tasks: [
                'Practice 8 DSA problems (trees/graphs)',
                'Solve medium-level problems',
                'Time yourself (30 min per problem)',
                'Review and optimize solutions',
            ],
        },
        {
            day: 4,
            title: 'DSA Intensive II + Coding',
            tasks: [
                'Practice 8 DSA problems (dynamic programming)',
                hasWeb ? 'Review core concepts of detected web tech' : 'Practice coding fundamentals',
                'Solve coding challenges on platform',
                'Debug and optimize code',
            ],
        },
        {
            day: 5,
            title: 'Project & Resume Alignment',
            tasks: [
                hasWeb ? 'Build or showcase project with detected stack' : 'Work on portfolio project',
                'Align resume with job description',
                hasData ? 'Practice database design and queries' : 'Review database fundamentals',
                'Prepare project demo explanation',
            ],
        },
        {
            day: 6,
            title: 'Mock Interviews & Questions',
            tasks: [
                'Prepare answers to 15 likely interview questions',
                'Do mock technical interview (record if possible)',
                'Practice explaining technical concepts clearly',
                hasCloud ? 'Understand deployment pipeline basics' : 'Learn about your tech stack\'s deployment',
            ],
        },
        {
            day: 7,
            title: 'Revision & Weak Areas',
            tasks: [
                'Identify weak DSA topics from previous days',
                'Practice 10 problems on weakest topics',
                'Review all prepared answers',
                'Full mock interview + HR round simulation',
                'Prepare questions to ask interviewers',
                'Final confidence check',
            ],
        },
    ]
}

/**
 * Generate likely interview questions based on detected skills
 * @param {object} extractedSkills - Skills extracted from JD
 * @returns {array} Array of 10 likely interview questions
 */
export function generateInterviewQuestions(extractedSkills) {
    const categories = extractedSkills.categories || {}
    const questions = []

    // Add questions based on detected skills
    if (categories['Core CS']?.includes('DBMS') || categories['Data']?.length > 0) {
        questions.push({
            question: 'Explain database indexing and when you would use it.',
            category: 'Data & DBMS',
            difficulty: 'Medium',
        })
        questions.push({
            question: 'What is the difference between SQL and NoSQL? When would you use each?',
            category: 'Data & DBMS',
            difficulty: 'Medium',
        })
    }

    if (categories['Core CS']?.includes('DSA') || categories['Languages']?.length > 0) {
        questions.push({
            question: 'Explain how you would optimize a linear search in a sorted array.',
            category: 'DSA',
            difficulty: 'Hard',
        })
        questions.push({
            question: 'What is the difference between time and space complexity? Give an example.',
            category: 'DSA',
            difficulty: 'Medium',
        })
    }

    if (categories['Web']?.includes('React')) {
        questions.push({
            question: 'Explain state management options in React and when to use Redux vs Context API.',
            category: 'Web - React',
            difficulty: 'Hard',
        })
        questions.push({
            question: 'What is the virtual DOM and how does React use it for optimization?',
            category: 'Web - React',
            difficulty: 'Medium',
        })
    }

    if (categories['Web']?.length > 0) {
        questions.push({
            question: 'Describe the lifecycle of an HTTP request in a web application.',
            category: 'Web',
            difficulty: 'Medium',
        })
    }

    if (categories['Core CS']?.includes('OS')) {
        questions.push({
            question: 'Explain process vs thread and their trade-offs.',
            category: 'OS',
            difficulty: 'Medium',
        })
    }

    if (categories['Cloud/DevOps']?.length > 0) {
        questions.push({
            question: `Describe your experience with ${categories['Cloud/DevOps'][0]} and how you would deploy an application.`,
            category: 'Cloud/DevOps',
            difficulty: 'Hard',
        })
    }

    // Add generic questions to reach 10
    const genericQuestions = [
        {
            question: 'Tell me about yourself and your journey in tech.',
            category: 'HR',
            difficulty: 'Easy',
        },
        {
            question: 'What is a challenging problem you solved recently? Walk us through your approach.',
            category: 'Problem Solving',
            difficulty: 'Hard',
        },
        {
            question: 'How do you stay updated with the latest technologies and trends?',
            category: 'Learning',
            difficulty: 'Easy',
        },
        {
            question: 'Describe a situation where you had to collaborate in a team. What did you learn?',
            category: 'HR',
            difficulty: 'Medium',
        },
        {
            question: 'Why are you interested in this role and our company?',
            category: 'HR',
            difficulty: 'Easy',
        },
    ]

    // Fill up to 10 questions
    while (questions.length < 10 && genericQuestions.length > 0) {
        questions.push(genericQuestions.shift())
    }

    return questions.slice(0, 10)
}

/**
 * Generate complete analysis
 * @param {object} extractedSkills - Skills from extraction
 * @param {string} company - Company name
 * @param {string} role - Role name
 * @param {string} jdText - Full JD text
 * @param {number} readinessScore - Calculated readiness score
 * @returns {object} Complete analysis object
 */
export function generateCompleteAnalysis(extractedSkills, company, role, jdText, readinessScore) {
    return {
        extractedSkills,
        checklist: generateChecklist(extractedSkills),
        sevenDayPlan: generateSevenDayPlan(extractedSkills),
        interviewQuestions: generateInterviewQuestions(extractedSkills),
        readinessScore,
        generatedAt: new Date().toISOString(),
    }
}

export default {
    generateChecklist,
    generateSevenDayPlan,
    generateInterviewQuestions,
    generateCompleteAnalysis,
}
