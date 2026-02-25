import { FileText, AlertCircle } from 'lucide-react'

export default function Assessments() {
    const assessments = [
        { id: 1, title: 'Full-Stack Coding Assessment', date: 'Feb 28, 2026', status: 'Available' },
        { id: 2, title: 'Data Structures Quiz', date: 'Mar 5, 2026', status: 'Upcoming' },
        { id: 3, title: 'Behavioral Interview', date: 'Mar 10, 2026', status: 'Upcoming' },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
                <p className="text-gray-600">Take assessments to evaluate your readiness</p>
            </div>

            {/* Placeholder Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4 mb-8">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Assessments Module</h3>
                    <p className="text-blue-700">Track and take assessments to test your knowledge and skills.</p>
                </div>
            </div>

            {/* Assessments List */}
            <div className="grid gap-4">
                {assessments.map((assessment) => (
                    <div
                        key={assessment.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{assessment.title}</h3>
                                    <p className="text-sm text-gray-600">Date: {assessment.date}</p>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${assessment.status === 'Available'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {assessment.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
