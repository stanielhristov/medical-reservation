import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [nextAppointment, setNextAppointment] = useState(null);
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // This would be the actual API calls once the backend controllers are implemented
            // For now, we'll show placeholder data
            setNextAppointment({
                id: 1,
                doctorName: "Dr. Smith",
                specialization: "Cardiology",
                appointmentTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
                status: "CONFIRMED"
            });
            
            setRecentAppointments([
                {
                    id: 1,
                    doctorName: "Dr. Johnson",
                    specialization: "General Practice",
                    appointmentTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                    status: "COMPLETED"
                },
                {
                    id: 2,
                    doctorName: "Dr. Williams",
                    specialization: "Dermatology",
                    appointmentTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
                    status: "COMPLETED"
                }
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.fullName || user?.email}!
                </h1>
                <p className="text-gray-600">
                    Here's an overview of your medical appointments and health information.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">📅</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Next Appointment</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {nextAppointment ? nextAppointment.appointmentTime.toLocaleDateString() : 'None scheduled'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">✓</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Completed Appointments</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {recentAppointments.filter(apt => apt.status === 'COMPLETED').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">🔔</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Notifications</p>
                            <p className="text-lg font-semibold text-gray-900">0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next Appointment Card */}
            {nextAppointment && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Upcoming Appointment</h2>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{nextAppointment.doctorName}</h3>
                            <p className="text-gray-600">{nextAppointment.specialization}</p>
                            <p className="text-gray-600">
                                {nextAppointment.appointmentTime.toLocaleDateString()} at{' '}
                                {nextAppointment.appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                nextAppointment.status === 'CONFIRMED' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {nextAppointment.status}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                View Details
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">
                                Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {recentAppointments.length > 0 ? (
                        recentAppointments.map((appointment) => (
                            <div key={appointment.id} className="px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{appointment.doctorName}</h3>
                                    <p className="text-gray-600">{appointment.specialization}</p>
                                    <p className="text-sm text-gray-500">
                                        {appointment.appointmentTime.toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                        appointment.status === 'COMPLETED' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                            No recent appointments
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <div className="text-center">
                        <div className="text-2xl mb-2">📅</div>
                        <div className="font-medium">Book Appointment</div>
                    </div>
                </button>
                <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                    <div className="text-center">
                        <div className="text-2xl mb-2">👨‍⚕️</div>
                        <div className="font-medium">Find Doctors</div>
                    </div>
                </button>
                <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
                    <div className="text-center">
                        <div className="text-2xl mb-2">📋</div>
                        <div className="font-medium">Medical History</div>
                    </div>
                </button>
                <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
                    <div className="text-center">
                        <div className="text-2xl mb-2">🔔</div>
                        <div className="font-medium">Notifications</div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PatientDashboard;
