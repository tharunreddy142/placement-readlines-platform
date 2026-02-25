import { BarChart3, TrendingUp, Award, Clock } from 'lucide-react'

export default function Dashboard() {
    const stats = [
        {
            label: 'Problems Solved',
            value: '24',
            icon: Award,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            label: 'Accuracy Rate',
            value: '82%',
            icon: TrendingUp,
            color: 'bg-green-100 text-green-600',
        },
        {
            label: 'Time Spent',
            value: '12 hrs',
            icon: Clock,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            label: 'Interviews',
            value: '5',
            icon: BarChart3,
            color: 'bg-orange-100 text-orange-600',
        },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your progress overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                                <Icon size={24} />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <p className="text-gray-600">No recent activity yet. Start practicing to see your progress!</p>
                </div>
            </div>
        </div>
    )
}
