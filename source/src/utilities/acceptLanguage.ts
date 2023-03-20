import { LANGUAGE_REGIONS } from '~/constants';
import { AcceptLanguageProtectionMode } from '~/types';

const isMultiRegionLanguage = (
  code: string
): code is keyof typeof LANGUAGE_REGIONS => {
  return (
    Object.keys(LANGUAGE_REGIONS).findIndex((key) => key === code) !== -1
  );
};

export const getAcceptLanguageValue = (
  mode: AcceptLanguageProtectionMode
): string => {
  let languages: string[] = [];

  switch (mode) {
    case AcceptLanguageProtectionMode.RANDOM_REGIONS: {
      navigator.languages.forEach((language) => {
        if (language.includes('-')) {
          const [code] = language.split('-');

          if (!isMultiRegionLanguage(code)) {
            return language;
          }

          const availableRegions = LANGUAGE_REGIONS[code];
          const randomIndex = Math.floor(
            Math.random() * (availableRegions.length - 1)
          );

          languages.push(code + '-' + availableRegions[randomIndex]);
        } else {
          // Leave languages without regions unchanged
          languages.push(language);
        }
      });

      break;
    }

    case AcceptLanguageProtectionMode.REMOVE_REGIONS: {
      languages = navigator.languages.filter((language) => {
        return !language.includes('-');
      });

      break;
    }

    default: {
      languages = [...navigator.languages];
      break;
    }
  }

  // TODO: Figure out quality values
  return languages.join(',') + ';q=0.9';
};
