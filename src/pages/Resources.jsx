import { BookOpen, AlertCircle } from 'lucide-react'

export default function Resources() {
    const resources = [
        { id: 1, title: 'Interview Preparation Guide', type: 'PDF', downloads: 245 },
        { id: 2, title: 'Data Structures Cheat Sheet', type: 'PDF', downloads: 512 },
        { id: 3, title: 'Algorithm Tips & Tricks', type: 'Video', downloads: 189 },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
                <p className="text-gray-600">Access study materials and learning resources</p>
            </div>

            {/* Placeholder Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4 mb-8">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Resources Module</h3>
                    <p className="text-blue-700">Browse and download curated learning materials to enhance your preparation.</p>
                </div>
            </div>

            {/* Resources List */}
            <div className="grid gap-4">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-white">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{resource.title}</h3>
                                    <p className="text-sm text-gray-600">Type: {resource.type} • {resource.downloads} downloads</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
