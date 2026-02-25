import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Code2,
    FileText,
    BookOpen,
    User,
} from 'lucide-react'

export default function Sidebar() {
    const location = useLocation()

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/practice', label: 'Practice', icon: Code2 },
        { path: '/assessments', label: 'Assessments', icon: FileText },
        { path: '/resources', label: 'Resources', icon: BookOpen },
        { path: '/profile', label: 'Profile', icon: User },
    ]

    return (
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-primary">PrepHub</h1>
                <p className="text-sm text-gray-500">Placement Platform</p>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
