import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    document.title = '404 - Page Not Found';

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <AlertCircle className="h-24 w-24 text-blue-700" />
                </div>

                {/* Error Message */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-gray-50">404</h1>
                    <h2 className="text-xl font-semibold text-gray-100">Page Not Found</h2>
                    <p className="text-gray-100">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-800 hover:bg-blue-900 text-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Go Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 hover:bg-neutral-950 text-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;