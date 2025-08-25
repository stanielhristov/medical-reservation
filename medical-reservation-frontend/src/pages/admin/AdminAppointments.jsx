import React from 'react';

const AdminAppointments = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointments Overview</h1>
                <p className="text-gray-600 mb-6">Global view of all system appointments</p>
                
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                    <p className="text-violet-800">This page will provide a comprehensive view of all appointments across the system with intervention capabilities.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminAppointments;
