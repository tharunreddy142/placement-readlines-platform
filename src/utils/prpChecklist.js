export const PRP_CHECKLIST_KEY = 'prpTestChecklistV1'

export const PRP_TEST_ITEMS = [
    {
        id: 'jd_required_validation',
        label: 'JD required validation works',
        hint: 'Try submitting Analyze with empty JD and confirm validation blocks submission.',
    },
    {
        id: 'short_jd_warning',
        label: 'Short JD warning shows for <200 chars',
        hint: 'Type a JD below 200 chars and confirm warning text appears.',
    },
    {
        id: 'skills_grouping',
        label: 'Skills extraction groups correctly',
        hint: 'Use a mixed-tech JD and confirm skills appear under the right groups.',
    },
    {
        id: 'round_mapping_dynamic',
        label: 'Round mapping changes based on company + skills',
        hint: 'Compare an enterprise+DSA case vs startup+React/Node case.',
    },
    {
        id: 'score_deterministic',
        label: 'Score calculation is deterministic',
        hint: 'Run the same JD twice and confirm base score is stable.',
    },
    {
        id: 'toggle_updates_live_score',
        label: 'Skill toggles update score live',
        hint: 'Toggle I know/Need practice and verify score updates immediately.',
    },
    {
        id: 'persist_after_refresh',
        label: 'Changes persist after refresh',
        hint: 'Refresh results/history and verify checklist and score changes remain.',
    },
    {
        id: 'history_save_load',
        label: 'History saves and loads correctly',
        hint: 'Create multiple analyses and verify entries survive reload.',
    },
    {
        id: 'export_copy_correct',
        label: 'Export buttons copy the correct content',
        hint: 'Use Copy Plan/Check/Q&A and paste to verify exact section text.',
    },
    {
        id: 'no_console_errors',
        label: 'No console errors on core pages',
        hint: 'Open browser console and navigate dashboard/analyze/results/history.',
    },
]

function buildEmptyState() {
    return PRP_TEST_ITEMS.reduce((acc, item) => {
        acc[item.id] = false
        return acc
    }, {})
}

export function loadPrpChecklistState() {
    try {
        const raw = JSON.parse(localStorage.getItem(PRP_CHECKLIST_KEY) || '{}')
        const base = buildEmptyState()
        Object.keys(base).forEach((id) => {
            base[id] = raw[id] === true
        })
        return base
    } catch (error) {
        return buildEmptyState()
    }
}

export function savePrpChecklistState(state) {
    localStorage.setItem(PRP_CHECKLIST_KEY, JSON.stringify(state))
}

export function countPrpPassed(state) {
    return PRP_TEST_ITEMS.reduce((count, item) => count + (state[item.id] ? 1 : 0), 0)
}

export function isPrpChecklistComplete(state) {
    return countPrpPassed(state) === PRP_TEST_ITEMS.length
}

export function resetPrpChecklistState() {
    const empty = buildEmptyState()
    savePrpChecklistState(empty)
    return empty
}

