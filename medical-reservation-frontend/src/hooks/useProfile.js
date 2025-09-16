import { useState, useEffect, useMemo } from 'react';
import { getUserProfile, updateUserProfile } from '../api/profile';
import { getDoctorByUserId, updateDoctor } from '../api/doctors';
import { parseAddress, formatAddress } from '../utils/addressUtils';
import { COUNTRY_MAP } from '../utils/countryData';

export const useProfile = (user) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [doctorData, setDoctorData] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);

    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: ''
    });

    const [originalProfileData, setOriginalProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: ''
    });

    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: 'US'
    });

    const [originalAddressData, setOriginalAddressData] = useState({
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: 'US'
    });

    const [doctorProfileData, setDoctorProfileData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: '',
        price: '',
        location: ''
    });

    const [originalDoctorProfileData, setOriginalDoctorProfileData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: '',
        price: '',
        location: ''
    });

    const hasProfileDataChanged = useMemo(() => {
        const profileChanged = 
            profileData.fullName !== originalProfileData.fullName ||
            profileData.phone !== originalProfileData.phone ||
            profileData.dateOfBirth !== originalProfileData.dateOfBirth ||
            profileData.emergencyContact !== originalProfileData.emergencyContact;

        const addressChanged = 
            addressData.street !== originalAddressData.street ||
            addressData.city !== originalAddressData.city ||
            addressData.stateProvince !== originalAddressData.stateProvince ||
            addressData.postalCode !== originalAddressData.postalCode ||
            addressData.countryCode !== originalAddressData.countryCode;

        return profileChanged || addressChanged;
    }, [profileData, originalProfileData, addressData, originalAddressData]);

    const hasDoctorDataChanged = useMemo(() => {
        return doctorProfileData.specialization !== originalDoctorProfileData.specialization ||
               doctorProfileData.bio !== originalDoctorProfileData.bio ||
               doctorProfileData.licenseNumber !== originalDoctorProfileData.licenseNumber ||
               doctorProfileData.education !== originalDoctorProfileData.education ||
               doctorProfileData.experience !== originalDoctorProfileData.experience ||
               doctorProfileData.price !== originalDoctorProfileData.price ||
               doctorProfileData.location !== originalDoctorProfileData.location;
    }, [doctorProfileData, originalDoctorProfileData]);

    useEffect(() => {
        fetchUserProfile();
        if (user?.role === 'DOCTOR') {
            setIsDoctor(true);
            fetchDoctorProfile();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const profile = await getUserProfile(user.id);
            const profileDataObj = {
                fullName: profile.fullName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
                address: profile.address || '',
                emergencyContact: profile.emergencyContact || ''
            };
            
            setProfileData(profileDataObj);
            setOriginalProfileData(profileDataObj);
            
            const parsedAddress = parseAddress(profile.address);
            setAddressData(parsedAddress);
            setOriginalAddressData(parsedAddress);
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorProfile = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const doctor = await getDoctorByUserId(user.id);
            setDoctorData(doctor);
            const doctorDataObj = {
                specialization: doctor.specialization || '',
                bio: doctor.bio || '',
                licenseNumber: doctor.licenseNumber || '',
                education: doctor.education || '',
                experience: doctor.experience || '',
                price: doctor.price ? doctor.price.toString() : '',
                location: doctor.location || ''
            };
            setDoctorProfileData(doctorDataObj);
            setOriginalDoctorProfileData(doctorDataObj);
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
            throw error;
        }
    };

    const updateProfile = async () => {
        setSaving(true);
        try {
            const selectedCountry = COUNTRY_MAP.get(addressData.countryCode);
            const formattedAddress = formatAddress(addressData, selectedCountry);

            const updateData = {
                ...profileData,
                address: formattedAddress || profileData.address
            };

            await updateUserProfile(user.id, updateData);
            
            setOriginalProfileData(profileData);
            setOriginalAddressData(addressData);
            
            return true;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    const updateDoctorProfile = async () => {
        setSaving(true);
        try {
            if (!doctorData?.id) {
                throw new Error('Doctor data not available');
            }

            const updateData = {
                ...doctorProfileData,
                // Trim and normalize location field
                location: doctorProfileData.location && doctorProfileData.location.trim() !== '' ? doctorProfileData.location.trim() : null,
                // Parse price properly, ensuring empty strings become null
                price: doctorProfileData.price && doctorProfileData.price.trim() !== '' ? parseInt(doctorProfileData.price, 10) : null
            };

            const updatedDoctor = await updateDoctor(doctorData.id, updateData);
            
            // Update the doctor data with the fresh data from the server
            setDoctorData(updatedDoctor);
            
            // Update the original state to reflect the new baseline
            setOriginalDoctorProfileData(doctorProfileData);
            
            // Trigger a refresh for other parts of the app that display doctor data
            localStorage.setItem('doctorProfileUpdated', Date.now().toString());
            window.dispatchEvent(new CustomEvent('doctorProfileUpdated', { 
                detail: { doctorId: doctorData.id, updatedData: updatedDoctor } 
            }));
            
            return true;
        } catch (error) {
            console.error('Error updating doctor profile:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    return {
        loading,
        saving,
        isDoctor,
        doctorData,
        profileData,
        setProfileData,
        addressData,
        setAddressData,
        doctorProfileData,
        setDoctorProfileData,
        hasProfileDataChanged,
        hasDoctorDataChanged,
        updateProfile,
        updateDoctorProfile
    };
};
