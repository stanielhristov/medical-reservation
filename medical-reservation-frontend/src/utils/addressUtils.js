import { COUNTRIES } from './countryData';

export const parseAddress = (addressString) => {
    if (!addressString || typeof addressString !== 'string') {
        return {
            street: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            countryCode: 'US'
        };
    }

    const parts = addressString.split(',').map(part => part.trim()).filter(part => part);
    
    if (parts.length === 0) {
        return {
            street: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            countryCode: 'US'
        };
    }

    let countryCode = 'US';
    let addressParts = [...parts];
    
    if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        const foundCountry = COUNTRIES.find(country => 
            country.name.toLowerCase() === lastPart.toLowerCase()
        );
        if (foundCountry) {
            countryCode = foundCountry.code;
            addressParts = parts.slice(0, -1);
        }
    }

    const result = {
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: countryCode
    };

    if (addressParts.length >= 1) result.street = addressParts[0];
    if (addressParts.length >= 2) result.city = addressParts[1];
    if (addressParts.length >= 3) result.stateProvince = addressParts[2];
    if (addressParts.length >= 4) result.postalCode = addressParts[3];

    return result;
};

export const formatAddress = (addressData, selectedCountry) => {
    const { street, city, stateProvince, postalCode } = addressData;
    const addressParts = [street, city, stateProvince, postalCode, selectedCountry?.name]
        .filter(part => part && part.trim() !== '');
    
    return addressParts.length > 0 ? addressParts.join(', ') : null;
};
