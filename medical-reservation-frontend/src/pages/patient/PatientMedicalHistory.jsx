import React from 'react';

const PatientMedicalHistory = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical History</h1>
                <p className="text-gray-600 mb-6">View your medical records and uploaded documents</p>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-purple-800">This page will show patient medical history, doctor notes, and uploaded medical documents.</p>
                </div>
            </div>
        </div>
    );
};

export default PatientMedicalHistory;
