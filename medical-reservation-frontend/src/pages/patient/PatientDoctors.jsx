import React from 'react';

const PatientDoctors = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Doctors</h1>
                <p className="text-gray-600 mb-6">Browse and book appointments with qualified healthcare providers</p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">This page will display a list of available doctors with filtering by specialization and booking functionality.</p>
                </div>
            </div>
        </div>
    );
};

export default PatientDoctors;
