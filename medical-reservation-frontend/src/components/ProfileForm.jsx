import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import AddressInput from './AddressInput';

const ProfileForm = ({ 
    profileData, 
    addressData, 
    onInputChange, 
    onAddressChange,
    onSubmit, 
    saving, 
    hasProfileDataChanged,
    user 
}) => {
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        onInputChange(e, 'profile');
    };

    const handleAddressChange = (field, value) => {
        onAddressChange(field, value);
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <FormField
                    label="Full Name"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    required
                />
                
                <FormField
                    label={
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            Email
                            <div style={{
                                width: '14px',
                                height: '14px',
                                position: 'relative',
                                opacity: '0.7'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: '3px',
                                    width: '8px',
                                    height: '5px',
                                    border: '1.5px solid #6b7280',
                                    borderBottom: 'none',
                                    borderRadius: '3px 3px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '6px',
                                    left: '1px',
                                    width: '12px',
                                    height: '6px',
                                    background: '#6b7280',
                                    borderRadius: '1px'
                                }} />
                            </div>
                        </div>
                    }
                    name="email"
                    type="email"
                    value={profileData.email}
                    readOnly
                    disabled
                    helpText={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <div style={{
                                width: '10px',
                                height: '12px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '1px',
                                    width: '8px',
                                    height: '10px',
                                    border: '1px solid #9ca3af',
                                    borderRadius: '4px 4px 0 4px',
                                    background: 'rgba(156, 163, 175, 0.1)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '3px',
                                    left: '3px',
                                    width: '4px',
                                    height: '2px',
                                    background: '#9ca3af',
                                    borderRadius: '1px'
                                }} />
                            </div>
                            Email cannot be changed
                        </div>
                    }
                />
                
                <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={handleInputChange}
                />
                
                <FormField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                />

                {/* Gender Field */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={profileData.gender || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e")',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            appearance: 'none',
                            cursor: saving ? 'not-allowed' : 'pointer'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>

                <FormField
                    label="Emergency Contact Phone"
                    name="emergencyContact"
                    type="tel"
                    value={profileData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact phone number"
                />

                <FormField
                    label="Emergency Contact Name"
                    name="emergencyContactName"
                    value={profileData.emergencyContactName}
                    onChange={handleInputChange}
                    placeholder="Full name of emergency contact"
                />

                <FormField
                    label="Emergency Contact Relationship"
                    name="emergencyContactRelationship"
                    value={profileData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    placeholder="e.g., Spouse, Parent, Sibling"
                />
            </div>
            
            <AddressInput
                street={addressData.street}
                onStreetChange={(value) => handleAddressChange('street', value)}
                city={addressData.city}
                onCityChange={(value) => handleAddressChange('city', value)}
                stateProvince={addressData.stateProvince}
                onStateProvinceChange={(value) => handleAddressChange('stateProvince', value)}
                postalCode={addressData.postalCode}
                onPostalCodeChange={(value) => handleAddressChange('postalCode', value)}
                countryCode={addressData.countryCode}
                onCountryChange={(value) => handleAddressChange('countryCode', value)}
                disabled={saving}
            />
            
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
            }}>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '1rem 2rem',
                        background: 'rgba(107, 114, 128, 0.1)',
                        color: '#374151',
                        border: '1px solid rgba(107, 114, 128, 0.2)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving || !hasProfileDataChanged}
                    style={{
                        padding: '1rem 2rem',
                        background: (saving || !hasProfileDataChanged)
                            ? 'rgba(107, 114, 128, 0.3)' 
                            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: (saving || !hasProfileDataChanged) ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: (saving || !hasProfileDataChanged) ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {saving ? (
                        <>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '2px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: '2px',
                                    width: '12px',
                                    height: '10px',
                                    border: '2px solid white',
                                    borderTop: 'none',
                                    borderRadius: '0 0 2px 2px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '4px',
                                    width: '8px',
                                    height: '4px',
                                    background: 'white',
                                    borderRadius: '2px 2px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '6px',
                                    left: '6px',
                                    width: '4px',
                                    height: '4px',
                                    background: 'white',
                                    borderRadius: '1px'
                                }} />
                            </div>
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
