import React from 'react';

const DoctorDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Dashboard</h1>
                <p className="text-gray-600 mb-6">Manage your appointments and patient interactions</p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">This dashboard will show upcoming appointments, patient requests, and schedule management tools.</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
