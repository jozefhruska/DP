import { LANGUAGE_REGIONS } from '~/constants';
import { AcceptLanguageProtectionMode } from '~/types';

/**
 * Determines if the provided language code is a multi-region language.
 *
 * @param {string} code The language code to check for multi-region support.
 * @returns {code is keyof typeof LANGUAGE_REGIONS} A boolean indicating whether the language code is a multi-region language.
 */
const isMultiRegionLanguage = (
  code: string
): code is keyof typeof LANGUAGE_REGIONS => {
  return (
    Object.keys(LANGUAGE_REGIONS).findIndex((key) => key === code) !== -1
  );
};

/**
 * Generates an Accept-Language header value based on the provided protection mode.
 *
 * @param {AcceptLanguageProtectionMode} mode The protection mode to be used when generating the Accept-Language header value.
 * @returns {string} A string representing the Accept-Language header value.
 */
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
      languages = navigator.languages.map((language) => {
        if (language.includes('-')) {
          const [code] = language.split('-');

          return code;
        } else {
          return language;
        }
      });

      break;
    }

    default: {
      languages = [...navigator.languages];
      break;
    }
  }

  // De-duplicate languages
  languages = languages.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  // Join the languages and generate quality values
  return languages
    .map((lang, index) => {
      if (index === 0) {
        return lang;
      } else {
        const qValue = 1.0 - index * 0.1;
        return `${lang};q=${qValue.toFixed(1)}`;
      }
    })
    .join(',');
};
