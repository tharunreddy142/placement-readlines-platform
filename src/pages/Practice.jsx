import { Code2, AlertCircle } from 'lucide-react'

export default function Practice() {
    const problems = [
        { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'Solved' },
        { id: 2, title: 'Reverse String', difficulty: 'Easy', status: 'Not Attempted' },
        { id: 3, title: 'Binary Tree Traversal', difficulty: 'Medium', status: 'In Progress' },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Problems</h1>
                <p className="text-gray-600">Solve coding problems to improve your skills</p>
            </div>

            {/* Placeholder Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4 mb-8">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Practice Module</h3>
                    <p className="text-blue-700">This is a placeholder for the Practice module. Browse and solve coding problems here.</p>
                </div>
            </div>

            {/* Problems List */}
            <div className="grid gap-4">
                {problems.map((problem) => (
                    <div
                        key={problem.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-white">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{problem.title}</h3>
                                    <p className="text-sm text-gray-600">Difficulty: {problem.difficulty}</p>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${problem.status === 'Solved'
                                        ? 'bg-green-100 text-green-700'
                                        : problem.status === 'In Progress'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {problem.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
