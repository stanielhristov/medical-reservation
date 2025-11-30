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

export const getRoleRoutes = (role, t) => {
    const baseRoutes = [
        { path: '/', name: 'Home', translationKey: 'nav.home' },
        { path: '/about', name: 'About', translationKey: 'nav.about' },
        { path: '/contact', name: 'Contact', translationKey: 'nav.contact' }
    ];

    switch (role) {
        case 'ADMIN':
            return [
                { path: '/admin/dashboard', name: 'Dashboard', translationKey: 'nav.dashboard' },
                { path: '/admin/users', name: 'Users', translationKey: 'nav.users' },
                { path: '/admin/doctors', name: 'Doctors', translationKey: 'nav.doctors' },
                { path: '/admin/appointments', name: 'Appointments', translationKey: 'nav.appointments' },
                { path: '/admin/comments', name: 'Comments', translationKey: 'nav.comments' }
            ];
        case 'DOCTOR':
            return [
                { path: '/doctor/dashboard', name: 'Dashboard', translationKey: 'nav.dashboard' },
                { path: '/doctor/schedule', name: 'Schedule Management', translationKey: 'nav.scheduleManagement' },
                { path: '/doctor/appointments', name: 'Appointments', translationKey: 'nav.appointments' },
                { path: '/doctor/patients', name: 'Patients', translationKey: 'nav.patients' },
                { path: '/doctor/reschedule-requests', name: 'Reschedule Requests', translationKey: 'nav.rescheduleRequests' },
                { path: '/doctor/notifications', name: 'Notifications', translationKey: 'nav.notifications' }
            ];
        case 'USER':
            return [
                { path: '/patient/dashboard', name: 'Dashboard', translationKey: 'nav.dashboard' },
                { path: '/patient/appointments', name: 'Appointments', translationKey: 'nav.appointments' },
                { path: '/patient/doctors', name: 'Doctors', translationKey: 'nav.doctors' },
                { path: '/patient/medical-history', name: 'Medical History', translationKey: 'nav.medicalHistory' },
                { path: '/patient/notifications', name: 'Notifications', translationKey: 'nav.notifications' }
            ];
        default:
            return baseRoutes;
    }
};
