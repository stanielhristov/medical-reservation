
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientDoctors from './pages/patient/PatientDoctors';
import PatientMedicalHistory from './pages/patient/PatientMedicalHistory';
import PatientNotifications from './pages/patient/PatientNotifications';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminAppointments from './pages/admin/AdminAppointments';

// Common Components
import Layout from './components/Layout';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />

                    {/* Patient Routes */}
                    <Route path="/patient/dashboard" element={
                        <ProtectedRoute requiredRoles={['USER']}>
                            <Layout><PatientDashboard /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/patient/appointments" element={
                        <ProtectedRoute requiredRoles={['USER']}>
                            <Layout><PatientAppointments /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/patient/doctors" element={
                        <ProtectedRoute requiredRoles={['USER']}>
                            <Layout><PatientDoctors /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/patient/medical-history" element={
                        <ProtectedRoute requiredRoles={['USER']}>
                            <Layout><PatientMedicalHistory /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/patient/notifications" element={
                        <ProtectedRoute requiredRoles={['USER']}>
                            <Layout><PatientNotifications /></Layout>
                        </ProtectedRoute>
                    } />

                    {/* Doctor Routes */}
                    <Route path="/doctor/dashboard" element={
                        <ProtectedRoute requiredRoles={['DOCTOR']}>
                            <Layout><DoctorDashboard /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/doctor/schedule" element={
                        <ProtectedRoute requiredRoles={['DOCTOR']}>
                            <Layout><DoctorSchedule /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/doctor/appointments" element={
                        <ProtectedRoute requiredRoles={['DOCTOR']}>
                            <Layout><DoctorAppointments /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/doctor/patients" element={
                        <ProtectedRoute requiredRoles={['DOCTOR']}>
                            <Layout><DoctorPatients /></Layout>
                        </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <Layout><AdminDashboard /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <Layout><AdminUsers /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/doctors" element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <Layout><AdminDoctors /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/appointments" element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <Layout><AdminAppointments /></Layout>
                        </ProtectedRoute>
                    } />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;