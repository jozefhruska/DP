import { VERSION_REGEX } from '~/constants';

export const getUserAgentValue = (): string => {
  return navigator.userAgent.replace(VERSION_REGEX, (match) => {
    const separator = match.includes('.') ? '.' : '_';
    const versionSegments = match.split(separator);

    const lastSegmentIndex = versionSegments.length - 1;
    const increment = Math.floor(Math.random() * 21) - 10;

    versionSegments[lastSegmentIndex] = Math.max(
      parseInt(versionSegments[lastSegmentIndex]) + increment,
      0
    ).toString();

    return versionSegments.join(separator);
  });
};
