/**
 * Utility functions for blood type formatting
 */

/**
 * Converts blood type enum format to display format
 * @param {string} bloodType - Blood type in enum format (e.g., "B_NEGATIVE", "A_POSITIVE")
 * @returns {string} Blood type in display format (e.g., "B-", "A+")
 */
export const formatBloodType = (bloodType) => {
    if (!bloodType) {
        return 'Not specified';
    }
    
    // Convert enum format to display format
    return bloodType
        .replace('_POSITIVE', '+')
        .replace('_NEGATIVE', '-');
};

/**
 * Blood type enum to display mapping
 */
export const BLOOD_TYPE_DISPLAY_MAP = {
    'A_POSITIVE': 'A+',
    'A_NEGATIVE': 'A-',
    'B_POSITIVE': 'B+',
    'B_NEGATIVE': 'B-',
    'AB_POSITIVE': 'AB+',
    'AB_NEGATIVE': 'AB-',
    'O_POSITIVE': 'O+',
    'O_NEGATIVE': 'O-'
};

/**
 * Get display name for blood type using mapping (more reliable than string replacement)
 * @param {string} bloodType - Blood type in enum format
 * @returns {string} Blood type in display format
 */
export const getBloodTypeDisplay = (bloodType) => {
    if (!bloodType) {
        return 'Not specified';
    }
    
    return BLOOD_TYPE_DISPLAY_MAP[bloodType] || bloodType;
};
