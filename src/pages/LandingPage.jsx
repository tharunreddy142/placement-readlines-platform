import { useNavigate } from 'react-router-dom'
import { Code2, Video, BarChart3, ArrowRight } from 'lucide-react'

export default function LandingPage() {
    const navigate = useNavigate()

    const features = [
        {
            icon: Code2,
            title: 'Practice Problems',
            description: 'Solve hundreds of coding challenges curated for placements',
        },
        {
            icon: Video,
            title: 'Mock Interviews',
            description: 'Real-time mock interviews with AI-powered feedback',
        },
        {
            icon: BarChart3,
            title: 'Track Progress',
            description: 'Monitor your improvement with detailed analytics',
        },
    ]

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-primary">PrepHub</h1>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center px-6 py-20">
                <div className="text-center max-w-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Ace Your Placement
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Practice, assess, and prepare for your dream job with our comprehensive platform
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Why Choose PrepHub?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mb-4">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-6 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p>&copy; 2026 PrepHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
