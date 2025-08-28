import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [pendingDoctorRequests, setPendingDoctorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Load statistics
            const statsResponse = await adminAPI.getStatistics();
            setStatistics(statsResponse.data);

            // Load recent users (first 5)
            const usersResponse = await adminAPI.getAllUsers();
            const sortedUsers = usersResponse.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
            setRecentUsers(sortedUsers);

            // Load pending doctor requests
            const doctorRequestsResponse = await adminAPI.getPendingDoctorRequests();
            setPendingDoctorRequests(doctorRequestsResponse.data);

        } catch (err) {
            console.error('Error loading dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
                <button 
                    onClick={loadDashboardData}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">System overview and management tools</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                <dd className="text-lg font-medium text-gray-900">{statistics.totalUsers}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Patients</dt>
                                <dd className="text-lg font-medium text-gray-900">{statistics.totalPatients}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v4a1 1 0 001.496.868l7-4a1 1 0 000-1.736l-7-4z"/>
                                    <path fillRule="evenodd" d="M14 6a1 1 0 00-1.496-.868l-3 1.714a1 1 0 001.496.868l3-1.714A1 1 0 0014 6z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Doctors</dt>
                                <dd className="text-lg font-medium text-gray-900">{statistics.totalDoctors}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Appointments</dt>
                                <dd className="text-lg font-medium text-gray-900">{statistics.totalAppointments}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Users and Pending Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
                        <div className="space-y-4">
                            {recentUsers.length > 0 ? (
                                recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {user.fullName?.charAt(0) || '?'}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.isActive 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(user.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent users</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pending Doctor Requests */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Pending Doctor Requests ({pendingDoctorRequests.length})
                        </h3>
                        <div className="space-y-4">
                            {pendingDoctorRequests.length > 0 ? (
                                pendingDoctorRequests.slice(0, 5).map((request) => (
                                    <div key={request.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{request.userName}</p>
                                            <p className="text-sm text-gray-500">{request.specialization}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                                Pending
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(request.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No pending requests</p>
                            )}
                        </div>
                        {pendingDoctorRequests.length > 5 && (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    +{pendingDoctorRequests.length - 5} more requests
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                        onClick={() => window.location.href = '/admin/users'}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Manage Users
                    </button>
                    <button 
                        onClick={() => window.location.href = '/admin/appointments'}
                        className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        View Appointments
                    </button>
                    <button 
                        onClick={() => window.location.href = '/admin/doctors'}
                        className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        Manage Doctors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
