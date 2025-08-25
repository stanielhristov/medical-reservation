import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                <p className="text-gray-600 mb-6">System overview and management tools</p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">This dashboard will show system statistics, user metrics, and administrative controls.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
