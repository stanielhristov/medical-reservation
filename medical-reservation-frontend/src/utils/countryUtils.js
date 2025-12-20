import i18n from '../i18n/config';

export const translateCountryName = (countryCode, countryName) => {
    if (!countryCode || !countryName) return countryName;
    
    const currentLang = i18n.language || 'en';
    if (currentLang === 'en') {
        return countryName;
    }
    
    const translationKey = `countries.${countryCode}`;
    const translated = i18n.t(translationKey);

    if (translated === translationKey) {
        return countryName;
    }
    
    return translated;
};

