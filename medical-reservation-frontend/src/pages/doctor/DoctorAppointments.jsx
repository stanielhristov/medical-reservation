import React from 'react';

const DoctorAppointments = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointments</h1>
                <p className="text-gray-600 mb-6">View and manage patient appointments</p>
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-indigo-800">This page will show all doctor appointments with options to approve, cancel, or update status.</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointments;
