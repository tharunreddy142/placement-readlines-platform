import { Mail, MapPin, AlertCircle } from 'lucide-react'

export default function Profile() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
                <p className="text-gray-600">Manage your account and profile information</p>
            </div>

            {/* Placeholder Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4 mb-8">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Profile Module</h3>
                    <p className="text-blue-700">View and update your profile settings and account information.</p>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl">
                        👤
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                        <p className="text-gray-600">Software Developer</p>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                        <Mail size={20} className="text-primary" />
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">john@example.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                        <MapPin size={20} className="text-primary" />
                        <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium text-gray-900">San Francisco, CA</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Bio</p>
                        <p className="font-medium text-gray-900">Passionate software developer preparing for job interviews</p>
                    </div>
                </div>

                {/* Edit Button */}
                <button className="mt-8 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Edit Profile
                </button>
            </div>
        </div>
    )
}
