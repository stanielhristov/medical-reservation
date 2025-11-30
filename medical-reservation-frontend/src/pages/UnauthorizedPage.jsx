import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getRoleBasedRedirect } from '../utils/roleBasedNavigation';

const UnauthorizedPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('unauthorized.title')}</h2>
                        <p className="text-gray-600 mb-6">
                            {t('unauthorized.message')}
                        </p>
                        
                        {user ? (
                            <div className="space-y-4">
                                <Link
                                    to={getRoleBasedRedirect(user.role)}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {t('unauthorized.goToDashboard')}
                                </Link>
                                <Link
                                    to="/"
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {t('unauthorized.goToHome')}
                                </Link>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t('unauthorized.login')}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
