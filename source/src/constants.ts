import {
  AcceptLanguageProtectionMode,
  Header,
  SelectOption,
} from '~/types';

export const HEADER_RULE_IDS: Record<Header, number> = {
  [Header.USER_AGENT]: 1,
  [Header.ACCEPT_LANGUAGE]: 2,
  [Header.DEVICE_MEMORY]: 3,
  [Header.CH_FULL_VERSION]: 4,
  [Header.CH_MOBILE]: 5,
  [Header.CH_PLATFORM_VERSION]: 6,
  [Header.EXTRA]: 7,
};

export const ACCEPT_LANGUAGE_PROTECTION_OPTIONS: SelectOption<AcceptLanguageProtectionMode>[] =
  [
    {
      value: AcceptLanguageProtectionMode.RANDOM_REGIONS,
      label: 'Change regions (randomize)',
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
  it: ['IT', 'CH'],
  pt: ['PT', 'BR'],
  sv: ['SE', 'FI'],
  no: ['NO', 'NO-NY'],
  nl: ['NL', 'BE'],
  sr: ['SR', 'BA'],
  bs: ['BS', 'BA'],
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

export const MAC_OS_VERSION_REGEX = /(\d+_\d+_\d+)/;

export const CHROME_VERSION_REGEX = /Chrome\/(\d+(\.\d+){0,3})/;

export const VERSION_REGEX =
  /(\d+\.\d+\.\d+(?!\.\d)|\d+\.\d+\.\d+\.\d+|\d+_\d+_\d+)/g;

export const ALLOWED_DEVICE_MEMORY_VALUES = [0.25, 0.5, 1, 2, 4, 8];
