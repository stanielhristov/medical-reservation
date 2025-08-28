import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';


const COUNTRIES = [
    { code: 'US', name: 'United States', flag: '🇺🇸', phone: '+1' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phone: '+44' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', phone: '+1' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', phone: '+61' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', phone: '+49' },
    { code: 'FR', name: 'France', flag: '🇫🇷', phone: '+33' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', phone: '+39' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', phone: '+34' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phone: '+31' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phone: '+41' },
    { code: 'IN', name: 'India', flag: '🇮🇳', phone: '+91' },
    { code: 'CN', name: 'China', flag: '🇨🇳', phone: '+86' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', phone: '+81' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', phone: '+55' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', phone: '+52' },
    // All other countries alphabetically
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phone: '+93' },
    { code: 'AL', name: 'Albania', flag: '🇦🇱', phone: '+355' },
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿', phone: '+213' },
    { code: 'AS', name: 'American Samoa', flag: '🇦🇸', phone: '+1684' },
    { code: 'AD', name: 'Andorra', flag: '🇦🇩', phone: '+376' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴', phone: '+244' },
    { code: 'AI', name: 'Anguilla', flag: '🇦🇮', phone: '+1264' },
    { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', phone: '+1268' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', phone: '+54' },
    { code: 'AM', name: 'Armenia', flag: '🇦🇲', phone: '+374' },
    { code: 'AW', name: 'Aruba', flag: '🇦🇼', phone: '+297' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', phone: '+43' },
    { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', phone: '+994' },
    { code: 'BS', name: 'Bahamas', flag: '🇧🇸', phone: '+1242' },
    { code: 'BH', name: 'Bahrain', flag: '🇧🇭', phone: '+973' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phone: '+880' },
    { code: 'BB', name: 'Barbados', flag: '🇧🇧', phone: '+1246' },
    { code: 'BY', name: 'Belarus', flag: '🇧🇾', phone: '+375' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', phone: '+32' },
    { code: 'BZ', name: 'Belize', flag: '🇧🇿', phone: '+501' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯', phone: '+229' },
    { code: 'BM', name: 'Bermuda', flag: '🇧🇲', phone: '+1441' },
    { code: 'BT', name: 'Bhutan', flag: '🇧🇹', phone: '+975' },
    { code: 'BO', name: 'Bolivia', flag: '🇧🇴', phone: '+591' },
    { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', phone: '+387' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼', phone: '+267' },
    { code: 'BN', name: 'Brunei', flag: '🇧🇳', phone: '+673' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', phone: '+359' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', phone: '+226' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮', phone: '+257' },
    { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', phone: '+238' },
    { code: 'KH', name: 'Cambodia', flag: '🇰🇭', phone: '+855' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲', phone: '+237' },
    { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', phone: '+1345' },
    { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', phone: '+236' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩', phone: '+235' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', phone: '+56' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', phone: '+57' },
    { code: 'KM', name: 'Comoros', flag: '🇰🇲', phone: '+269' },
    { code: 'CG', name: 'Congo', flag: '🇨🇬', phone: '+242' },
    { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩', phone: '+243' },
    { code: 'CK', name: 'Cook Islands', flag: '🇨🇰', phone: '+682' },
    { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', phone: '+506' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', phone: '+225' },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷', phone: '+385' },
    { code: 'CU', name: 'Cuba', flag: '🇨🇺', phone: '+53' },
    { code: 'CW', name: 'Curaçao', flag: '🇨🇼', phone: '+599' },
    { code: 'CY', name: 'Cyprus', flag: '🇨🇾', phone: '+357' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', phone: '+420' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', phone: '+45' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', phone: '+253' },
    { code: 'DM', name: 'Dominica', flag: '🇩🇲', phone: '+1767' },
    { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', phone: '+1809' },
    { code: 'EC', name: 'Ecuador', flag: '🇪🇨', phone: '+593' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', phone: '+20' },
    { code: 'SV', name: 'El Salvador', flag: '🇸🇻', phone: '+503' },
    { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', phone: '+240' },
    { code: 'ER', name: 'Eritrea', flag: '🇪🇷', phone: '+291' },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', phone: '+372' },
    { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', phone: '+268' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', phone: '+251' },
    { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰', phone: '+500' },
    { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', phone: '+298' },
    { code: 'FJ', name: 'Fiji', flag: '🇫🇯', phone: '+679' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', phone: '+358' },
    { code: 'GF', name: 'French Guiana', flag: '🇬🇫', phone: '+594' },
    { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', phone: '+689' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦', phone: '+241' },
    { code: 'GM', name: 'Gambia', flag: '🇬🇲', phone: '+220' },
    { code: 'GE', name: 'Georgia', flag: '🇬🇪', phone: '+995' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', phone: '+233' },
    { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', phone: '+350' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', phone: '+30' },
    { code: 'GL', name: 'Greenland', flag: '🇬🇱', phone: '+299' },
    { code: 'GD', name: 'Grenada', flag: '🇬🇩', phone: '+1473' },
    { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', phone: '+590' },
    { code: 'GU', name: 'Guam', flag: '🇬🇺', phone: '+1671' },
    { code: 'GT', name: 'Guatemala', flag: '🇬🇹', phone: '+502' },
    { code: 'GG', name: 'Guernsey', flag: '🇬🇬', phone: '+44' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳', phone: '+224' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', phone: '+245' },
    { code: 'GY', name: 'Guyana', flag: '🇬🇾', phone: '+592' },
    { code: 'HT', name: 'Haiti', flag: '🇭🇹', phone: '+509' },
    { code: 'HN', name: 'Honduras', flag: '🇭🇳', phone: '+504' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', phone: '+852' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺', phone: '+36' },
    { code: 'IS', name: 'Iceland', flag: '🇮🇸', phone: '+354' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phone: '+62' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷', phone: '+98' },
    { code: 'IQ', name: 'Iraq', flag: '🇮🇶', phone: '+964' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', phone: '+353' },
    { code: 'IM', name: 'Isle of Man', flag: '🇮🇲', phone: '+44' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱', phone: '+972' },
    { code: 'JM', name: 'Jamaica', flag: '🇯🇲', phone: '+1876' },
    { code: 'JE', name: 'Jersey', flag: '🇯🇪', phone: '+44' },
    { code: 'JO', name: 'Jordan', flag: '🇯🇴', phone: '+962' },
    { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', phone: '+7' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', phone: '+254' },
    { code: 'KI', name: 'Kiribati', flag: '🇰🇮', phone: '+686' },
    { code: 'KP', name: 'North Korea', flag: '🇰🇵', phone: '+850' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', phone: '+82' },
    { code: 'KW', name: 'Kuwait', flag: '🇰🇼', phone: '+965' },
    { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', phone: '+996' },
    { code: 'LA', name: 'Laos', flag: '🇱🇦', phone: '+856' },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻', phone: '+371' },
    { code: 'LB', name: 'Lebanon', flag: '🇱🇧', phone: '+961' },
    { code: 'LS', name: 'Lesotho', flag: '🇱🇸', phone: '+266' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷', phone: '+231' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾', phone: '+218' },
    { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', phone: '+423' },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹', phone: '+370' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phone: '+352' },
    { code: 'MO', name: 'Macao', flag: '🇲🇴', phone: '+853' },
    { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', phone: '+389' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬', phone: '+261' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼', phone: '+265' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phone: '+60' },
    { code: 'MV', name: 'Maldives', flag: '🇲🇻', phone: '+960' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', phone: '+223' },
    { code: 'MT', name: 'Malta', flag: '🇲🇹', phone: '+356' },
    { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', phone: '+692' },
    { code: 'MQ', name: 'Martinique', flag: '🇲🇶', phone: '+596' },
    { code: 'MR', name: 'Mauritania', flag: '🇲🇷', phone: '+222' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺', phone: '+230' },
    { code: 'YT', name: 'Mayotte', flag: '🇾🇹', phone: '+262' },
    { code: 'FM', name: 'Micronesia', flag: '🇫🇲', phone: '+691' },
    { code: 'MD', name: 'Moldova', flag: '🇲🇩', phone: '+373' },
    { code: 'MC', name: 'Monaco', flag: '🇲🇨', phone: '+377' },
    { code: 'MN', name: 'Mongolia', flag: '🇲🇳', phone: '+976' },
    { code: 'ME', name: 'Montenegro', flag: '🇲🇪', phone: '+382' },
    { code: 'MS', name: 'Montserrat', flag: '🇲🇸', phone: '+1664' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦', phone: '+212' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', phone: '+258' },
    { code: 'MM', name: 'Myanmar', flag: '🇲🇲', phone: '+95' },
    { code: 'NA', name: 'Namibia', flag: '🇳🇦', phone: '+264' },
    { code: 'NR', name: 'Nauru', flag: '🇳🇷', phone: '+674' },
    { code: 'NP', name: 'Nepal', flag: '🇳🇵', phone: '+977' },
    { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', phone: '+687' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', phone: '+64' },
    { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', phone: '+505' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪', phone: '+227' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phone: '+234' },
    { code: 'NU', name: 'Niue', flag: '🇳🇺', phone: '+683' },
    { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫', phone: '+672' },
    { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵', phone: '+1670' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', phone: '+47' },
    { code: 'OM', name: 'Oman', flag: '🇴🇲', phone: '+968' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phone: '+92' },
    { code: 'PW', name: 'Palau', flag: '🇵🇼', phone: '+680' },
    { code: 'PS', name: 'Palestine', flag: '🇵🇸', phone: '+970' },
    { code: 'PA', name: 'Panama', flag: '🇵🇦', phone: '+507' },
    { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', phone: '+675' },
    { code: 'PY', name: 'Paraguay', flag: '🇵🇾', phone: '+595' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪', phone: '+51' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', phone: '+63' },
    { code: 'PN', name: 'Pitcairn', flag: '🇵🇳', phone: '+64' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', phone: '+48' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', phone: '+351' },
    { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', phone: '+1787' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦', phone: '+974' },
    { code: 'RE', name: 'Réunion', flag: '🇷🇪', phone: '+262' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴', phone: '+40' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', phone: '+7' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', phone: '+250' },
    { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱', phone: '+590' },
    { code: 'SH', name: 'Saint Helena', flag: '🇸🇭', phone: '+290' },
    { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', phone: '+1869' },
    { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', phone: '+1758' },
    { code: 'MF', name: 'Saint Martin', flag: '🇲🇫', phone: '+590' },
    { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲', phone: '+508' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', phone: '+1784' },
    { code: 'WS', name: 'Samoa', flag: '🇼🇸', phone: '+685' },
    { code: 'SM', name: 'San Marino', flag: '🇸🇲', phone: '+378' },
    { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹', phone: '+239' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phone: '+966' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳', phone: '+221' },
    { code: 'RS', name: 'Serbia', flag: '🇷🇸', phone: '+381' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨', phone: '+248' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', phone: '+232' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', phone: '+65' },
    { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽', phone: '+1721' },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰', phone: '+421' },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮', phone: '+386' },
    { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', phone: '+677' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴', phone: '+252' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phone: '+27' },
    { code: 'GS', name: 'South Georgia', flag: '🇬🇸', phone: '+500' },
    { code: 'SS', name: 'South Sudan', flag: '🇸🇸', phone: '+211' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phone: '+94' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩', phone: '+249' },
    { code: 'SR', name: 'Suriname', flag: '🇸🇷', phone: '+597' },
    { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯', phone: '+47' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', phone: '+46' },
    { code: 'SY', name: 'Syria', flag: '🇸🇾', phone: '+963' },
    { code: 'TW', name: 'Taiwan', flag: '🇹🇼', phone: '+886' },
    { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', phone: '+992' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', phone: '+255' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', phone: '+66' },
    { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', phone: '+670' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬', phone: '+228' },
    { code: 'TK', name: 'Tokelau', flag: '🇹🇰', phone: '+690' },
    { code: 'TO', name: 'Tonga', flag: '🇹🇴', phone: '+676' },
    { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', phone: '+1868' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳', phone: '+216' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', phone: '+90' },
    { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', phone: '+993' },
    { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨', phone: '+1649' },
    { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', phone: '+688' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', phone: '+256' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', phone: '+380' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phone: '+971' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾', phone: '+598' },
    { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', phone: '+998' },
    { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', phone: '+678' },
    { code: 'VA', name: 'Vatican City', flag: '🇻🇦', phone: '+39' },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪', phone: '+58' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phone: '+84' },
    { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬', phone: '+1284' },
    { code: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮', phone: '+1340' },
    { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫', phone: '+681' },
    { code: 'EH', name: 'Western Sahara', flag: '🇪🇭', phone: '+212' },
    { code: 'YE', name: 'Yemen', flag: '🇾🇪', phone: '+967' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲', phone: '+260' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', phone: '+263' }
];

const MEDICAL_SPECIALIZATIONS = [
    'Anesthesiology',
    'Cardiology',
    'Cardiovascular Surgery',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    'General Surgery',
    'Geriatrics',
    'Hematology',
    'Infectious Disease',
    'Internal Medicine',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Obstetrics and Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedic Surgery',
    'Otolaryngology (ENT)',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Plastic Surgery',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Rheumatology',
    'Sports Medicine',
    'Urology',
    'Vascular Surgery'
];

const COUNTRY_MAP = new Map(COUNTRIES.map(country => [country.code, country]));

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

// Helper function to validate date of birth
const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return { isValid: false, message: '' };
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = calculateAge(dateOfBirth);
    
    if (birthDate > today) {
        return { isValid: false, message: 'Date of birth cannot be in the future' };
    }
    
    if (age > 120) {
        return { isValid: false, message: 'Please enter a valid date of birth' };
    }
    
    if (age < 0) {
        return { isValid: false, message: 'Please enter a valid date of birth' };
    }
    
    return { isValid: true, message: '' };
};

export default function RegisterForm() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('USER');
    

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [addressCountry, setAddressCountry] = useState('US');
    
    const [phoneCountry, setPhoneCountry] = useState('US');
    const [emergencyPhoneCountry, setEmergencyPhoneCountry] = useState('US');
    
    // Doctor-specific fields
    const [specialization, setSpecialization] = useState('');
    const [bio, setBio] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState('');
    const navigate = useNavigate();

    const handlePhoneNumberChange = useCallback((e) => {
        setPhoneNumber(e.target.value);
    }, []);

    const handleEmergencyPhoneChange = useCallback((e) => {
        setEmergencyPhone(e.target.value);
    }, []);

    const handlePhoneCountryChange = useCallback((countryCode) => {
        setPhoneCountry(countryCode);
    }, []);

    const handleEmergencyPhoneCountryChange = useCallback((countryCode) => {
        setEmergencyPhoneCountry(countryCode);
    }, []);

    // Optimized address change handlers
    const handleStreetChange = useCallback((e) => {
        setStreet(e.target.value);
    }, []);

    const handleCityChange = useCallback((e) => {
        setCity(e.target.value);
    }, []);

    const handleStateProvinceChange = useCallback((e) => {
        setStateProvince(e.target.value);
    }, []);

    const handlePostalCodeChange = useCallback((e) => {
        setPostalCode(e.target.value);
    }, []);

    const handleAddressCountryChange = useCallback((countryCode) => {
        setAddressCountry(countryCode);
    }, []);

    const handleDateOfBirthChange = useCallback((e) => {
        const newDate = e.target.value;
        setDateOfBirth(newDate);
        
        const validation = validateDateOfBirth(newDate);
        if (!validation.isValid) {
            setDateError(validation.message);
        } else {
            setDateError('');
        }
    }, []);

    // Memoized phone input component for better performance
    const PhoneInput = useCallback(({ label, value, onChange, countryCode, onCountryChange, disabled, required = false, placeholder }) => {
        const selectedCountry = useMemo(() =>
            COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
            [countryCode]
        );
        
        const handleCountryChange = useCallback((e) => {
            onCountryChange(e.target.value);
        }, [onCountryChange]);
        
        return (
            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {/* Country Selector */}
                    <div style={{ position: 'relative', minWidth: '120px' }}>
                        <select
                            value={countryCode}
                            onChange={handleCountryChange}
                            disabled={disabled}
                            style={{
                                width: '100%',
                                padding: '0.875rem 0.5rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                background: '#f9fafb',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {COUNTRIES.map(country => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Phone Number Input */}
                    <input
                        type="tel"
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        style={{
                            flex: 1,
                            padding: '0.875rem 1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                        }}
                        placeholder={placeholder || 'Enter your phone number'}
                    />
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginTop: '0.25rem',
                    marginLeft: '0.5rem'
                }}>
                    Selected: {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.phone})
                </div>
            </div>
        );
    }, []);

    // Memoized address input component for better performance
    const AddressInput = useCallback(({ 
        street, onStreetChange, 
        city, onCityChange, 
        stateProvince, onStateProvinceChange, 
        postalCode, onPostalCodeChange, 
        countryCode, onCountryChange, 
        disabled 
    }) => {
        const selectedCountry = useMemo(() => 
            COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
            [countryCode]
        );
        
        const handleCountryChange = useCallback((e) => {
            onCountryChange(e.target.value);
        }, [onCountryChange]);
        
        return (
            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    Address
                </label>
                
                {/* Street Address */}
                <div style={{ marginBottom: '0.75rem' }}>
                    <input
                        type="text"
                        value={street}
                        onChange={onStreetChange}
                        disabled={disabled}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                        }}
                        placeholder="Street address"
                    />
                </div>

                {/* City and State/Province Row */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <input
                        type="text"
                        value={city}
                        onChange={onCityChange}
                        disabled={disabled}
                        style={{
                            flex: 2,
                            padding: '0.875rem 1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                        }}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        value={stateProvince}
                        onChange={onStateProvinceChange}
                        disabled={disabled}
                        style={{
                            flex: 1,
                            padding: '0.875rem 1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                        }}
                        placeholder="State/Province"
                    />
                </div>

                {/* Postal Code and Country Row */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={onPostalCodeChange}
                        disabled={disabled}
                        style={{
                            flex: 1,
                            padding: '0.875rem 1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                        }}
                        placeholder="Postal/ZIP Code"
                    />
                    <div style={{ flex: 2, position: 'relative' }}>
                        <select
                            value={countryCode}
                            onChange={handleCountryChange}
                            disabled={disabled}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                background: '#f9fafb',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {COUNTRIES.map(country => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginTop: '0.5rem',
                    marginLeft: '0.5rem'
                }}>
                    Selected country: {selectedCountry.flag} {selectedCountry.name}
                </div>
            </div>
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (dateError) {
            setError('Please fix the date of birth error before submitting');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (role === 'DOCTOR') {
            if (!specialization.trim()) {
                setError('Specialization is required for doctor registration');
                setLoading(false);
                return;
            }
            if (!licenseNumber.trim()) {
                setError('Medical license number is required for doctor registration');
                setLoading(false);
                return;
            }
        }

        try {
            const selectedPhoneCountry = COUNTRY_MAP.get(phoneCountry) || COUNTRIES[0];
            const formattedPhoneNumber = phoneNumber ? `${selectedPhoneCountry.phone}${phoneNumber}` : null;

            const selectedAddressCountry = COUNTRY_MAP.get(addressCountry) || COUNTRIES[0];
            const addressParts = [
                street,
                city,
                stateProvince,
                postalCode,
                selectedAddressCountry.name
            ].filter(part => part && part.trim() !== '');
            const formattedAddress = addressParts.length > 0 ? addressParts.join(', ') : null;
            
            const requestData = {
                fullName,
                email,
                phoneNumber: formattedPhoneNumber,
                password,
                role,
                dateOfBirth: dateOfBirth,
                address: formattedAddress,
            };


            if (role === 'DOCTOR') {
                const selectedEmergencyCountry = COUNTRY_MAP.get(emergencyPhoneCountry) || COUNTRIES[0];
                const formattedEmergencyPhone = emergencyPhone ? `${selectedEmergencyCountry.phone}${emergencyPhone}` : null;
                
                requestData.emergencyPhone = formattedEmergencyPhone;
                requestData.specialization = specialization || null;
                requestData.bio = bio || null;
                requestData.licenseNumber = licenseNumber || null;
                requestData.education = education || null;
                requestData.experience = experience || null;
            }

            const response = await axios.post('/auth/register', requestData);

            if (role === 'DOCTOR') {
                setSuccess('Doctor registration successful! You now have doctor privileges. Redirecting to login...');
            } else {
                setSuccess('Registration successful! Redirecting to login...');
            }
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Minimalistic background decoration */}
            <div style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: '180px',
                height: '180px',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '15%',
                width: '140px',
                height: '140px',
                background: 'rgba(22, 163, 74, 0.06)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                padding: '3rem',
                width: '100%',
                maxWidth: '480px',
                minWidth: '350px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(34, 197, 94, 0.1)',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
                    }}>
                        <span style={{ fontSize: '2rem', color: 'white' }}>👤</span>
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Create Account
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: 1.5
                    }}>
                        Join our medical portal today
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'rgba(248, 113, 113, 0.1)',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(248, 113, 113, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#16a34a',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* User Type Selection - First Field */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#374151',
                            fontSize: '1rem'
                        }}>
                            I want to register as:
                        </label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 1.5rem',
                                border: `2px solid ${role === 'USER' ? '#22c55e' : '#e5e7eb'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                backgroundColor: role === 'USER' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                                transition: 'all 0.2s ease',
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="USER"
                                    checked={role === 'USER'}
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ fontSize: '1.25rem' }}>👤</span>
                                <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>Patient</span>
                            </label>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 1.5rem',
                                border: `2px solid ${role === 'DOCTOR' ? '#22c55e' : '#e5e7eb'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                backgroundColor: role === 'DOCTOR' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                                transition: 'all 0.2s ease',
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="DOCTOR"
                                    checked={role === 'DOCTOR'}
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ fontSize: '1.25rem' }}>👨‍⚕️</span>
                                <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>Doctor</span>
                            </label>
                        </div>
                    </div>

                    {/* Full Name Field */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                background: '#f9fafb',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#374151',
                                transition: 'all 0.2s ease'
                            }}
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                background: '#f9fafb',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#374151',
                                transition: 'all 0.2s ease'
                            }}
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Phone Number Field */}
                    <PhoneInput
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        countryCode={phoneCountry}
                        onCountryChange={handlePhoneCountryChange}
                        disabled={loading}
                        required={true}
                        placeholder="Enter your phone number"
                    />

                    {/* Date of Birth Field */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            📅 Date of Birth
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={handleDateOfBirthChange}
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: dateError ? '2px solid #ef4444' : '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: '#f9fafb',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151',
                                    transition: 'all 0.2s ease',
                                    paddingRight: '3rem'
                                }}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {dateOfBirth && calculateAge(dateOfBirth) !== null && (
                                <div style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: '#10b981',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    pointerEvents: 'none'
                                }}>
                                    {calculateAge(dateOfBirth)} years
                                </div>
                            )}
                        </div>
                        {dateError && (
                            <div style={{
                                marginTop: '0.5rem',
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                ⚠️ {dateError}
                            </div>
                        )}
                        {dateOfBirth && !dateError && calculateAge(dateOfBirth) !== null && (
                            <div style={{
                                marginTop: '0.5rem',
                                color: '#10b981',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                ✓ Age: {calculateAge(dateOfBirth)} years old
                            </div>
                        )}
                    </div>

                    {/* Address Fields */}
                    <AddressInput
                        street={street}
                        onStreetChange={handleStreetChange}
                        city={city}
                        onCityChange={handleCityChange}
                        stateProvince={stateProvince}
                        onStateProvinceChange={handleStateProvinceChange}
                        postalCode={postalCode}
                        onPostalCodeChange={handlePostalCodeChange}
                        countryCode={addressCountry}
                        onCountryChange={handleAddressCountryChange}
                        disabled={loading}
                    />



                    {/* Emergency Phone - Only for Doctors */}
                    {role === 'DOCTOR' && (
                        <PhoneInput
                            label="Emergency Phone Number"
                            value={emergencyPhone}
                            onChange={handleEmergencyPhoneChange}
                            countryCode={emergencyPhoneCountry}
                            onCountryChange={handleEmergencyPhoneCountryChange}
                            disabled={loading}
                            required={false}
                            placeholder="Enter emergency phone number"
                        />
                    )}

                    {/* Doctor-specific fields */}
                    {role === 'DOCTOR' && (
                        <>
                            {/* Medical License Number */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Medical License Number <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={licenseNumber}
                                    onChange={e => setLicenseNumber(e.target.value)}
                                    required={role === 'DOCTOR'}
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '0.95rem',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#374151',
                                        transition: 'all 0.2s ease'
                                    }}
                                    placeholder="Enter your medical license number"
                                />
                            </div>

                            {/* Specialization */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Specialization <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <select
                                    value={specialization}
                                    onChange={e => setSpecialization(e.target.value)}
                                    required={role === 'DOCTOR'}
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '0.95rem',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#374151',
                                        transition: 'all 0.2s ease',
                                        appearance: 'none',
                                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                        paddingRight: '2.5rem'
                                    }}
                                >
                                    <option value="">Select a specialization</option>
                                    {MEDICAL_SPECIALIZATIONS.map(spec => (
                                        <option key={spec} value={spec}>
                                            {spec}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Education */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Education
                                </label>
                                <textarea
                                    value={education}
                                    onChange={e => setEducation(e.target.value)}
                                    disabled={loading}
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '0.95rem',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#374151',
                                        transition: 'all 0.2s ease',
                                        resize: 'vertical',
                                        minHeight: '80px'
                                    }}
                                    placeholder="Enter your medical education background"
                                />
                            </div>

                            {/* Experience */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Experience
                                </label>
                                <textarea
                                    value={experience}
                                    onChange={e => setExperience(e.target.value)}
                                    disabled={loading}
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '0.95rem',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#374151',
                                        transition: 'all 0.2s ease',
                                        resize: 'vertical',
                                        minHeight: '80px'
                                    }}
                                    placeholder="Describe your professional experience"
                                />
                            </div>

                            {/* Bio */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Professional Bio
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    disabled={loading}
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '0.95rem',
                                        background: '#f9fafb',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#374151',
                                        transition: 'all 0.2s ease',
                                        resize: 'vertical',
                                        minHeight: '100px'
                                    }}
                                    placeholder="Write a brief professional bio for patients to read"
                                />
                            </div>
                        </>
                    )}

                    {/* Password Field */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease'
                        }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 3rem 0.875rem 1rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151'
                                }}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    color: '#9ca3af',
                                    padding: '0.25rem'
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Confirm Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease'
                        }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 3rem 0.875rem 1rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151'
                                }}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    color: '#9ca3af',
                                    padding: '0.25rem'
                                }}
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: loading 
                                ? '#d1d5db'
                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: loading 
                                ? 'none'
                                : '0 4px 12px rgba(34, 197, 94, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.25)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.2)';
                            }
                        }}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Creating Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Enhanced Footer */}
                <div style={{ 
                    marginTop: '2.5rem',
                    paddingTop: '2.5rem',
                    borderTop: '1px solid rgba(34, 197, 94, 0.15)',
                    position: 'relative'
                }}>
                    {/* Background decoration */}
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        {/* Icon and heading */}
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            margin: '0 auto 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
                            position: 'relative'
                        }}>
                            <span style={{ fontSize: '1.75rem', color: 'white' }}>🔐</span>
                            <div style={{
                                position: 'absolute',
                                inset: '-2px',
                                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                borderRadius: '18px',
                                zIndex: -1
                            }} />
                        </div>

                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.75rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Already a Member?
                        </h3>
                        
                        <p style={{ 
                            color: '#6b7280', 
                            marginBottom: '2rem', 
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            maxWidth: '280px',
                            margin: '0 auto 2rem'
                        }}>
                            Welcome back! Sign in to access your healthcare dashboard and manage your appointments.
                        </p>

                        {/* Enhanced Sign In Button */}
                        <a 
                            href="/login" 
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                                color: '#22c55e',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                borderRadius: '14px',
                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.2)';
                                e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.1)';
                                e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            }}
                        >
                            <span style={{
                                width: '20px',
                                height: '20px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                color: 'white'
                            }}>🚀</span>
                            Sign In
                        </a>

                        {/* Additional info */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(34, 197, 94, 0.03)',
                            borderRadius: '12px',
                            border: '1px solid rgba(34, 197, 94, 0.08)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2rem',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        color: 'white'
                                    }}>⚡</div>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>
                                        Fast Access
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        color: 'white'
                                    }}>🔒</div>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>
                                        Secure Login
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        color: 'white'
                                    }}>📋</div>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>
                                        Full Dashboard
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}