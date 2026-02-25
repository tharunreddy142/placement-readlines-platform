/**
 * Skill Extraction Utility
 * Detects keywords from JD text and categorizes them
 * Case-insensitive matching across 6 main categories
 */

const SKILL_CATEGORIES = {
    'Core CS': {
        keywords: ['dsa', 'data structure', 'algorithm', 'oop', 'object-oriented', 'dbms', 'database', 'os', 'operating system', 'network', 'networking', 'tcp', 'udp', 'http', 'https'],
        examples: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
        weight: 1,
    },
    'Languages': {
        keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'csharp', 'golang', 'go', 'kotlin', 'rust', 'ruby', 'php', 'c '],
        examples: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go'],
        weight: 1,
    },
    'Web': {
        keywords: ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'graphql', 'apollo', 'html', 'css', 'vue', 'vuejs', 'angular', 'svelte'],
        examples: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
        weight: 1,
    },
    'Data': {
        keywords: ['sql', 'mongodb', 'nosql', 'postgresql', 'postgres', 'mysql', 'redis', 'elasticsearch', 'firebase', 'dynamodb', 'cassandra', 'oracle', 'database'],
        examples: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
        weight: 1,
    },
    'Cloud/DevOps': {
        keywords: ['aws', 'amazon', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'gitlab', 'github action', 'linux', 'terraform', 'ansible', 'helm'],
        examples: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
        weight: 1,
    },
    'Testing': {
        keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jasmine', 'mocha', 'testing', 'test automation', 'unit test', 'integration test', 'e2e', 'mock', 'stub'],
        examples: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
        weight: 1,
    },
}

/**
 * Extract skills from JD text
 * @param {string} jdText - Job description text
 * @returns {object} Extracted skills grouped by category with metadata
 */
export function extractSkills(jdText) {
    if (!jdText || typeof jdText !== 'string') {
        return {
            categories: {},
            allSkills: [],
            categoriesFound: 0,
            scoreContribution: 0,
        }
    }

    const jdLower = jdText.toLowerCase()
    const extracted = {}
    let categoriesFound = 0

    // Extract skills per category
    Object.entries(SKILL_CATEGORIES).forEach(([category, data]) => {
        const foundSkills = new Set()

        data.keywords.forEach((keyword) => {
            // Use word boundaries to avoid partial matches
            const regex = new RegExp(`\\b${keyword.replace(/\+/g, '\\+')}\\b`, 'gi')
            if (regex.test(jdLower)) {
                // Add a normalized version
                const normalized = data.examples.find(
                    (ex) => ex.toLowerCase().includes(keyword) || keyword.includes(ex.toLowerCase())
                ) || keyword.charAt(0).toUpperCase() + keyword.slice(1)
                foundSkills.add(normalized)
            }
        })

        if (foundSkills.size > 0) {
            extracted[category] = Array.from(foundSkills)
            categoriesFound++
        }
    })

    // If no categories found, mark as general fresher
    if (categoriesFound === 0) {
        extracted['General'] = ['Fresher Stack']
        categoriesFound = 1
    }

    return {
        categories: extracted,
        allSkills: Object.values(extracted).flat(),
        categoriesFound,
        scoreContribution: Math.min(categoriesFound * 5, 30), // Max 30 points for categories
    }
}

/**
 * Get skill score contribution
 * @param {object} skills - Extracted skills object
 * @param {string} company - Company name (optional)
 * @param {string} role - Role name (optional)
 * @param {string} jdText - JD text (to check length)
 * @returns {number} Score contribution (0-100, before capping)
 */
export function calculateReadinessScore(skills, company, role, jdText) {
    let score = 35 // Base score

    // Add points for detected categories (max 30)
    score += skills.scoreContribution

    // Add points for company (10)
    if (company && company.trim()) {
        score += 10
    }

    // Add points for role (10)
    if (role && role.trim()) {
        score += 10
    }

    // Add points for detailed JD (10)
    if (jdText && jdText.length > 800) {
        score += 10
    }

    // Cap at 100
    return Math.min(score, 100)
}

export default {
    extractSkills,
    calculateReadinessScore,
    SKILL_CATEGORIES,
}
