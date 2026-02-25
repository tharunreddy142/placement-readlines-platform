import { useMemo, useState } from 'react'
import { CheckSquare, RotateCcw, AlertTriangle } from 'lucide-react'
import {
    PRP_TEST_ITEMS,
    loadPrpChecklistState,
    savePrpChecklistState,
    countPrpPassed,
    isPrpChecklistComplete,
    resetPrpChecklistState,
} from '../utils/prpChecklist'

export default function PRPTestChecklist() {
    const [checklist, setChecklist] = useState(() => loadPrpChecklistState())
    const passedCount = useMemo(() => countPrpPassed(checklist), [checklist])
    const allPassed = useMemo(() => isPrpChecklistComplete(checklist), [checklist])

    const handleToggle = (id) => {
        const updated = { ...checklist, [id]: !checklist[id] }
        setChecklist(updated)
        savePrpChecklistState(updated)
    }

    const handleReset = () => {
        const resetState = resetPrpChecklistState()
        setChecklist(resetState)
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">PRP Test Checklist</h1>
                            <p className="text-gray-600 mt-2">Tests Passed: {passedCount} / 10</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset checklist
                        </button>
                    </div>

                    {!allPassed && (
                        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5" />
                            <p className="text-amber-800 font-medium">Fix issues before shipping.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="space-y-4">
                        {PRP_TEST_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-lg border p-4 transition ${checklist[item.id]
                                    ? 'border-green-200 bg-green-50'
                                    : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checklist[item.id] === true}
                                        onChange={() => handleToggle(item.id)}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="flex-1">
                                        <p className="text-gray-900 font-medium">{item.label}</p>
                                        {item.hint && <p className="text-sm text-gray-600 mt-1">How to test: {item.hint}</p>}
                                    </div>
                                    {checklist[item.id] && <CheckSquare className="w-5 h-5 text-green-600" />}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

