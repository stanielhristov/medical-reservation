import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-600">
                                MedReserve
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">Get in touch with our support team</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                                <p className="text-gray-600">support@medreserve.com</p>
                                <p className="text-gray-600">Available 24/7 for your assistance</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                                <p className="text-gray-600">Mon-Fri: 8:00 AM - 8:00 PM</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency</h3>
                                <p className="text-gray-600">For medical emergencies, please call 911</p>
                                <p className="text-gray-600">This platform is not for emergency services</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I book an appointment?</h3>
                                <p className="text-gray-600">
                                    Register as a patient, browse available doctors, select your preferred time slot, 
                                    and confirm your appointment.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel or reschedule?</h3>
                                <p className="text-gray-600">
                                    Yes, you can cancel or reschedule appointments from your dashboard. 
                                    Please provide at least 24 hours notice when possible.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I become a doctor on the platform?</h3>
                                <p className="text-gray-600">
                                    Register with your professional credentials and submit a doctor request. 
                                    Our admin team will review and approve qualified applications.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my medical data secure?</h3>
                                <p className="text-gray-600">
                                    Yes, we use industry-standard encryption and follow HIPAA compliance 
                                    guidelines to protect your medical information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
