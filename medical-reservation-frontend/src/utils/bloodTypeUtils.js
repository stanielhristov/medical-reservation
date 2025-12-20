
import i18n from '../i18n/config';

export const formatBloodType = (bloodType) => {
    if (!bloodType) {
        return i18n.t('common.notProvided');
    }

    return bloodType
        .replace('_POSITIVE', '+')
        .replace('_NEGATIVE', '-');
};

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

export const getBloodTypeDisplay = (bloodType) => {
    if (!bloodType) {
        return i18n.t('common.notProvided');
    }
    
    return BLOOD_TYPE_DISPLAY_MAP[bloodType] || bloodType;
};
