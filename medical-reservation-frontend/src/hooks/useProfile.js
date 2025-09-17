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
        emergencyContact: '',
        bloodType: ''
    });

    const [originalProfileData, setOriginalProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        bloodType: ''
    });

    const [personalData, setPersonalData] = useState({
        emergencyContact: '',
        bloodType: ''
    });

    const [originalPersonalData, setOriginalPersonalData] = useState({
        emergencyContact: '',
        bloodType: ''
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
            profileData.dateOfBirth !== originalProfileData.dateOfBirth;

        const addressChanged = 
            addressData.street !== originalAddressData.street ||
            addressData.city !== originalAddressData.city ||
            addressData.stateProvince !== originalAddressData.stateProvince ||
            addressData.postalCode !== originalAddressData.postalCode ||
            addressData.countryCode !== originalAddressData.countryCode;

        return profileChanged || addressChanged;
    }, [profileData, originalProfileData, addressData, originalAddressData]);

    const hasPersonalDataChanged = useMemo(() => {
        return personalData.emergencyContact !== originalPersonalData.emergencyContact ||
               personalData.bloodType !== originalPersonalData.bloodType;
    }, [personalData, originalPersonalData]);

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
                emergencyContact: profile.emergencyContact || '',
                bloodType: profile.bloodType || ''
            };
            
            const personalDataObj = {
                emergencyContact: profile.emergencyContact || '',
                bloodType: profile.bloodType || ''
            };
            
            setProfileData(profileDataObj);
            setOriginalProfileData(profileDataObj);
            setPersonalData(personalDataObj);
            setOriginalPersonalData(personalDataObj);
            
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
                location: doctorProfileData.location && doctorProfileData.location.trim() !== '' ? doctorProfileData.location.trim() : null,

                price: doctorProfileData.price && doctorProfileData.price.trim() !== '' ? parseInt(doctorProfileData.price, 10) : null
            };

            const updatedDoctor = await updateDoctor(doctorData.id, updateData);
            
            setDoctorData(updatedDoctor);
            
            setOriginalDoctorProfileData(doctorProfileData);
            
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

    const updatePersonalInfo = async () => {
        setSaving(true);
        try {
            const updateData = {
                ...profileData,
                emergencyContact: personalData.emergencyContact,
                bloodType: personalData.bloodType
            };

            await updateUserProfile(user.id, updateData);
            
            setOriginalPersonalData(personalData);
            
            // Also update the profile data to keep it in sync
            const updatedProfileData = {
                ...profileData,
                emergencyContact: personalData.emergencyContact,
                bloodType: personalData.bloodType
            };
            setProfileData(updatedProfileData);
            setOriginalProfileData(updatedProfileData);
            
            return true;
        } catch (error) {
            console.error('Error updating personal info:', error);
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
        personalData,
        setPersonalData,
        addressData,
        setAddressData,
        doctorProfileData,
        setDoctorProfileData,
        hasProfileDataChanged,
        hasPersonalDataChanged,
        hasDoctorDataChanged,
        updateProfile,
        updatePersonalInfo,
        updateDoctorProfile
    };
};
