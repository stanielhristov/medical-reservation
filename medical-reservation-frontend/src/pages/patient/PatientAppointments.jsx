import React from 'react';

const PatientAppointments = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
                <p className="text-gray-600 mb-6">Manage your upcoming and past appointments</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">This page will show all patient appointments with booking, cancellation, and rescheduling functionality.</p>
                </div>
            </div>
        </div>
    );
};

export default PatientAppointments;
