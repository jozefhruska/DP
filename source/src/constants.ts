import {
  AcceptLanguageProtectionMode,
  Header,
  SelectOption,
} from '~/types';

export const HEADER_RULE_IDS: Record<Header, number> = {
  [Header.ACCEPT_LANGUAGE]: 1,
  [Header.DEVICE_MEMORY]: 2,
};

export const ACCEPT_LANGUAGE_PROTECTION_OPTIONS: SelectOption<AcceptLanguageProtectionMode>[] =
  [
    {
      value: AcceptLanguageProtectionMode.RANDOM_REGIONS,
      label: 'Change regions randomly',
    },
    {
      value: AcceptLanguageProtectionMode.REMOVE_REGIONS,
      label: 'Remove regions (generalize)',
    },
  ];

export const LANGUAGE_REGIONS = {
  en: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'],
  fr: ['FR', 'CA', 'BE', 'CH', 'LU'],
  es: [
    'ES',
    'MX',
    'AR',
    'CO',
    'PE',
    'VE',
    'CL',
    'EC',
    'GT',
    'CU',
    'BO',
    'DO',
    'HN',
    'PY',
    'SV',
    'NI',
    'CR',
    'PA',
    'PR',
    'UY',
  ],
  de: ['DE', 'AT', 'CH', 'LI'],
  nl: ['NL', 'BE'],
  ar: [
    'SA',
    'IQ',
    'EG',
    'DZ',
    'MA',
    'SD',
    'SY',
    'TN',
    'YE',
    'OM',
    'PS',
    'BH',
    'QA',
    'AE',
    'LB',
    'KW',
  ],
  zh: ['CN', 'TW', 'HK', 'SG'],
};
