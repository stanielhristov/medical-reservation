export const getRoleBasedRedirect = (role) => {
    switch (role) {
        case 'ADMIN':
            return '/admin/dashboard';
        case 'DOCTOR':
            return '/doctor/dashboard';
        case 'USER':
            return '/patient/dashboard';
        default:
            return '/';
    }
};

export const getRoleRoutes = (role) => {
    const baseRoutes = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' }
    ];

    switch (role) {
        case 'ADMIN':
            return [
                { path: '/admin/dashboard', name: 'Dashboard' },
                { path: '/admin/users', name: 'User Management' },
                { path: '/admin/doctors', name: 'Doctor Management' },
                { path: '/admin/appointments', name: 'Appointments Overview' }
            ];
        case 'DOCTOR':
            return [
                { path: '/doctor/dashboard', name: 'Dashboard' },
                { path: '/doctor/schedule', name: 'Schedule Management' },
                { path: '/doctor/appointments', name: 'Appointments' },
                { path: '/doctor/patients', name: 'Patients' }
            ];
        case 'USER':
            return [
                { path: '/patient/dashboard', name: 'Dashboard' },
                { path: '/patient/appointments', name: 'Appointments' },
                { path: '/patient/doctors', name: 'Doctors' },
                { path: '/patient/medical-history', name: 'Medical History' },
                { path: '/patient/notifications', name: 'Notifications' }
            ];
        default:
            return baseRoutes;
    }
};
