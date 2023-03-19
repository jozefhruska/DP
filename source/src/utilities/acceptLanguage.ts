import { LANGUAGE_REGIONS } from '~/constants';

const isMultiRegionLanguage = (
  code: string
): code is keyof typeof LANGUAGE_REGIONS => {
  return (
    Object.keys(LANGUAGE_REGIONS).findIndex((key) => key === code) !== -1
  );
};

export const getAcceptLanguageValue = (): string => {
  const languages = navigator.languages.map((language) => {
    if (language.includes('-')) {
      const [code] = language.split('-');

      if (!isMultiRegionLanguage(code)) {
        return language;
      }

      const availableRegions = LANGUAGE_REGIONS[code];
      const randomIndex = Math.floor(
        Math.random() * (availableRegions.length - 1)
      );

      return code + '-' + availableRegions[randomIndex];
    }

    // TODO: Implement generalization
    return language;
  });

  // TODO: Figure out quality values
  return languages.join(',') + ';q=0.9';
};
