import { Link } from 'react-router-dom'
import { ShieldAlert, Rocket, CheckCircle2 } from 'lucide-react'
import { loadPrpChecklistState, countPrpPassed, isPrpChecklistComplete, PRP_TEST_ITEMS } from '../utils/prpChecklist'

export default function PRPShip() {
    const checklist = loadPrpChecklistState()
    const passedCount = countPrpPassed(checklist)
    const unlocked = isPrpChecklistComplete(checklist)

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">PRP Ship Gate</h1>
                    <p className="text-gray-600">Checklist status: {passedCount} / {PRP_TEST_ITEMS.length}</p>

                    {!unlocked ? (
                        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">
                            <div className="flex items-start gap-3">
                                <ShieldAlert className="w-6 h-6 text-red-600 mt-0.5" />
                                <div>
                                    <p className="text-red-800 font-semibold">Shipping is locked.</p>
                                    <p className="text-red-700 mt-1">Complete all 10 checklist items on /prp/07-test before shipping.</p>
                                    <Link
                                        to="/prp/07-test"
                                        className="inline-flex mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                                    >
                                        Go to Test Checklist
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-700 mt-0.5" />
                                <div>
                                    <p className="text-green-900 font-semibold">Shipping unlocked.</p>
                                    <p className="text-green-800 mt-1">All checklist items are complete. You can ship safely.</p>
                                    <button
                                        type="button"
                                        className="inline-flex mt-4 px-4 py-2 bg-green-700 text-white rounded-lg cursor-default font-semibold items-center gap-2"
                                    >
                                        <Rocket className="w-4 h-4" />
                                        Ready to Ship
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

