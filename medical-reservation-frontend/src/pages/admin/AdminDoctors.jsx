import React from 'react';

const AdminDoctors = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Management</h1>
                <p className="text-gray-600 mb-6">Review and approve doctor registration requests</p>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-emerald-800">This page will show pending doctor requests and allow admins to approve or reject applications.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDoctors;
