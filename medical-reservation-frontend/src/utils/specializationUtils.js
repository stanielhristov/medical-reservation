import i18n from '../i18n/config';

// Mapping from English specialization names to translation keys
const SPECIALIZATION_KEY_MAP = {
    'Anesthesiology': 'specializations.anesthesiology',
    'Cardiology': 'specializations.cardiology',
    'Cardiovascular Surgery': 'specializations.cardiovascularSurgery',
    'Dermatology': 'specializations.dermatology',
    'Emergency Medicine': 'specializations.emergencyMedicine',
    'Endocrinology': 'specializations.endocrinology',
    'Family Medicine': 'specializations.familyMedicine',
    'Gastroenterology': 'specializations.gastroenterology',
    'General Surgery': 'specializations.generalSurgery',
    'Geriatrics': 'specializations.geriatrics',
    'Hematology': 'specializations.hematology',
    'Infectious Disease': 'specializations.infectiousDisease',
    'Internal Medicine': 'specializations.internalMedicine',
    'Nephrology': 'specializations.nephrology',
    'Neurology': 'specializations.neurology',
    'Neurosurgery': 'specializations.neurosurgery',
    'Obstetrics and Gynecology': 'specializations.obstetricsAndGynecology',
    'Oncology': 'specializations.oncology',
    'Ophthalmology': 'specializations.ophthalmology',
    'Orthopedic Surgery': 'specializations.orthopedicSurgery',
    'Otolaryngology (ENT)': 'specializations.otolaryngology',
    'Pathology': 'specializations.pathology',
    'Pediatrics': 'specializations.pediatrics',
    'Physical Medicine and Rehabilitation': 'specializations.physicalMedicineAndRehabilitation',
    'Plastic Surgery': 'specializations.plasticSurgery',
    'Psychiatry': 'specializations.psychiatry',
    'Pulmonology': 'specializations.pulmonology',
    'Radiology': 'specializations.radiology',
    'Rheumatology': 'specializations.rheumatology',
    'Sports Medicine': 'specializations.sportsMedicine',
    'Urology': 'specializations.urology',
    'Vascular Surgery': 'specializations.vascularSurgery',
    'All Specializations': 'specializations.allSpecializations',
    'General Practice': 'specializations.familyMedicine' // Fallback for General Practice
};

/**
 * Translates a specialization name to the current language
 * @param {string} specialization - The English specialization name
 * @returns {string} - The translated specialization name
 */
export const translateSpecialization = (specialization) => {
    if (!specialization) return '';
    
    const key = SPECIALIZATION_KEY_MAP[specialization];
    if (key) {
        return i18n.t(key);
    }
    
    // Fallback: return original if no translation found
    return specialization;
};

/**
 * Translates an array of specializations
 * @param {string[]} specializations - Array of English specialization names
 * @returns {string[]} - Array of translated specialization names
 */
export const translateSpecializations = (specializations) => {
    if (!Array.isArray(specializations)) return [];
    
    return specializations.map(spec => {
        if (spec === 'All Specializations') {
            return i18n.t('specializations.allSpecializations');
        }
        return translateSpecialization(spec);
    });
};

