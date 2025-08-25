import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
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
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About MedReserve</h1>
                    <p className="text-xl text-gray-600">Your trusted partner in healthcare management</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600 mb-6">
                            MedReserve is committed to revolutionizing healthcare accessibility by providing a 
                            seamless platform for patients to connect with healthcare providers, manage appointments, 
                            and maintain their medical records.
                        </p>
                        <p className="text-gray-600">
                            We believe that healthcare should be convenient, transparent, and accessible to everyone. 
                            Our platform bridges the gap between patients and healthcare providers, making medical 
                            care more efficient and patient-centered.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Easy appointment booking with qualified healthcare providers
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Comprehensive medical history management
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Real-time notifications and reminders
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Secure and confidential data handling
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Multi-platform accessibility
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Register</h3>
                            <p className="text-gray-600">Create your account and complete your profile</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Book</h3>
                            <p className="text-gray-600">Find and book appointments with healthcare providers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Manage</h3>
                            <p className="text-gray-600">Track your appointments and medical history</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
