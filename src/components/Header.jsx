import { User as UserIcon } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Placement Prep</h2>
                    <p className="text-sm text-gray-500">Master your interview skills</p>
                </div>

                {/* User Avatar */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                        <UserIcon size={24} />
                    </div>
                </div>
            </div>
        </header>
    )
}
