import React from 'react';

const PatientNotifications = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>
                <p className="text-gray-600 mb-6">Stay updated with appointment reminders and system messages</p>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800">This page will display all notifications including appointment reminders and system updates.</p>
                </div>
            </div>
        </div>
    );
};

export default PatientNotifications;
