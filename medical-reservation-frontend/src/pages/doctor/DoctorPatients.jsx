import React from 'react';

const DoctorPatients = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Patients</h1>
                <p className="text-gray-600 mb-6">Access patient records and add medical notes</p>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <p className="text-teal-800">This page will allow doctors to view patient medical history and add new medical records.</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorPatients;
