import React from 'react';

const AdminUsers = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management</h1>
                <p className="text-gray-600 mb-6">Manage user accounts and roles</p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">This page will allow admins to view, edit, and manage all user accounts and their roles.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
