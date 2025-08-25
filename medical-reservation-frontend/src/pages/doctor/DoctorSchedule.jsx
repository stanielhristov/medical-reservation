import React from 'react';

const DoctorSchedule = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule Management</h1>
                <p className="text-gray-600 mb-6">Set your availability and manage time slots</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">This page will allow doctors to add, edit, and manage their available time slots.</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorSchedule;
