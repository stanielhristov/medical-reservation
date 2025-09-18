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
        gender: '',
        emergencyContactName: '',
        emergencyContactRelationship: ''
    });

    const [originalProfileData, setOriginalProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        gender: '',
        emergencyContactName: '',
        emergencyContactRelationship: ''
    });

    const [personalData, setPersonalData] = useState({
        emergencyContact: '',
        bloodType: '',
        gender: ''
    });

    const [originalPersonalData, setOriginalPersonalData] = useState({
        emergencyContact: '',
        bloodType: '',
        gender: ''
    });

    const [medicalData, setMedicalData] = useState({
        bloodType: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        chronicConditions: '',
        allergies: '',
        currentMedications: '',
        pastSurgeries: '',
        familyMedicalHistory: '',
        height: '',
        weight: '',
        bmi: ''
    });

    const [originalMedicalData, setOriginalMedicalData] = useState({
        bloodType: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        chronicConditions: '',
        allergies: '',
        currentMedications: '',
        pastSurgeries: '',
        familyMedicalHistory: '',
        height: '',
        weight: '',
        bmi: ''
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
            profileData.emergencyContact !== originalProfileData.emergencyContact ||
            profileData.gender !== originalProfileData.gender ||
            profileData.emergencyContactName !== originalProfileData.emergencyContactName ||
            profileData.emergencyContactRelationship !== originalProfileData.emergencyContactRelationship;

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
               personalData.bloodType !== originalPersonalData.bloodType ||
               personalData.gender !== originalPersonalData.gender;
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

    const hasMedicalDataChanged = useMemo(() => {
        return medicalData.bloodType !== originalMedicalData.bloodType ||
               medicalData.emergencyContactName !== originalMedicalData.emergencyContactName ||
               medicalData.emergencyContactRelationship !== originalMedicalData.emergencyContactRelationship ||
               medicalData.chronicConditions !== originalMedicalData.chronicConditions ||
               medicalData.allergies !== originalMedicalData.allergies ||
               medicalData.currentMedications !== originalMedicalData.currentMedications ||
               medicalData.pastSurgeries !== originalMedicalData.pastSurgeries ||
               medicalData.familyMedicalHistory !== originalMedicalData.familyMedicalHistory ||
               medicalData.height !== originalMedicalData.height ||
               medicalData.weight !== originalMedicalData.weight ||
               medicalData.bmi !== originalMedicalData.bmi;
    }, [medicalData, originalMedicalData]);

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
                gender: profile.gender || '',
                emergencyContactName: profile.emergencyContactName || '',
                emergencyContactRelationship: profile.emergencyContactRelationship || ''
            };
            
            const personalDataObj = {
                emergencyContact: profile.emergencyContact || '',
                bloodType: profile.bloodType || '',
                gender: profile.gender || ''
            };

            const medicalDataObj = {
                bloodType: profile.bloodType || '',
                emergencyContactName: profile.emergencyContactName || '',
                emergencyContactRelationship: profile.emergencyContactRelationship || '',
                chronicConditions: profile.chronicConditions || '',
                allergies: profile.allergies || '',
                currentMedications: profile.currentMedications || '',
                pastSurgeries: profile.pastSurgeries || '',
                familyMedicalHistory: profile.familyMedicalHistory || '',
                height: profile.height ? profile.height.toString() : '',
                weight: profile.weight ? profile.weight.toString() : '',
                bmi: profile.bmi ? profile.bmi.toString() : ''
            };
            
            setProfileData(profileDataObj);
            setOriginalProfileData(profileDataObj);
            setPersonalData(personalDataObj);
            setOriginalPersonalData(personalDataObj);
            setMedicalData(medicalDataObj);
            setOriginalMedicalData(medicalDataObj);
            
            const parsedAddress = parseAddress(profile.address || '');
            setAddressData(parsedAddress || {
                street: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                countryCode: 'US'
            });
            setOriginalAddressData(parsedAddress || {
                street: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                countryCode: 'US'
            });
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
                fullName: profileData.fullName,
                phone: profileData.phone,
                dateOfBirth: profileData.dateOfBirth,
                emergencyContact: profileData.emergencyContact,
                gender: profileData.gender,
                emergencyContactName: profileData.emergencyContactName,
                emergencyContactRelationship: profileData.emergencyContactRelationship,
                address: formattedAddress || ''
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
                emergencyContact: personalData.emergencyContact?.trim() || null,
                bloodType: personalData.bloodType?.trim() || null,
                gender: personalData.gender?.trim() || null
            };

            // Remove any fields with null values to avoid sending them
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === null || updateData[key] === '') {
                    delete updateData[key];
                }
            });

            await updateUserProfile(user.id, updateData);
            
            setOriginalPersonalData(personalData);
            
            // Also update the profile data to keep it in sync
            const updatedProfileData = {
                ...profileData,
                emergencyContact: personalData.emergencyContact || null,
                bloodType: personalData.bloodType || null,
                gender: personalData.gender || null
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

    const updateMedicalInfo = async () => {
        setSaving(true);
        try {
            const updateData = {
                ...profileData,
                bloodType: medicalData.bloodType?.trim() || null,
                emergencyContactName: medicalData.emergencyContactName?.trim() || null,
                emergencyContactRelationship: medicalData.emergencyContactRelationship?.trim() || null,
                chronicConditions: medicalData.chronicConditions?.trim() || null,
                allergies: medicalData.allergies?.trim() || null,
                currentMedications: medicalData.currentMedications?.trim() || null,
                pastSurgeries: medicalData.pastSurgeries?.trim() || null,
                familyMedicalHistory: medicalData.familyMedicalHistory?.trim() || null,
                height: medicalData.height && medicalData.height.trim() !== '' ? parseFloat(medicalData.height) : null,
                weight: medicalData.weight && medicalData.weight.trim() !== '' ? parseFloat(medicalData.weight) : null,
                bmi: medicalData.bmi && medicalData.bmi.trim() !== '' ? parseFloat(medicalData.bmi) : null
            };

            // Remove any fields with null values to avoid sending them
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === null || updateData[key] === '') {
                    delete updateData[key];
                }
            });

            await updateUserProfile(user.id, updateData);
            
            setOriginalMedicalData(medicalData);
            
            return true;
        } catch (error) {
            console.error('Error updating medical info:', error);
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
        medicalData,
        setMedicalData,
        addressData,
        setAddressData,
        doctorProfileData,
        setDoctorProfileData,
        hasProfileDataChanged,
        hasPersonalDataChanged,
        hasMedicalDataChanged,
        hasDoctorDataChanged,
        updateProfile,
        updatePersonalInfo,
        updateMedicalInfo,
        updateDoctorProfile
    };
};
