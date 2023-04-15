import { CHROME_VERSION_REGEX, MAC_OS_VERSION_REGEX } from '~/constants';
import ChromiumVersions from '../assets/chromium-versions.json';

export const getUserAgentValue = (
  fullVersion: string,
  platformVersion: string
): string => {
  let userAgentString = navigator.userAgent;

  // Replace the macOS version
  const osMatch = userAgentString.match(MAC_OS_VERSION_REGEX);
  if (!!osMatch && osMatch[1]) {
    userAgentString = userAgentString.replace(
      MAC_OS_VERSION_REGEX,
      platformVersion.replaceAll('.', '_').replaceAll('"', '')
    );
  }

  // Replace the Chrome version
  const browserVersionMatch = userAgentString.match(CHROME_VERSION_REGEX);
  if (!!browserVersionMatch && browserVersionMatch[1]) {
    userAgentString = userAgentString.replace(
      browserVersionMatch[1],
      fullVersion.replaceAll('"', '')
    );
  }

  return userAgentString;
};

export const getFullVersionClientHintValue = async (): Promise<
  string | null
> => {
  if (!navigator.userAgentData) {
    return null;
  }

  const { uaFullVersion } =
    await navigator.userAgentData.getHighEntropyValues(['uaFullVersion']);

  if (!!uaFullVersion) {
    const [majorVersion] = uaFullVersion.split('.');

    // @ts-ignore
    const suitableVersions = ChromiumVersions[majorVersion];

    if (!!suitableVersions && suitableVersions.length > 0) {
      const selectedVersion =
        suitableVersions[
          Math.floor(Math.random() * suitableVersions.length)
        ];

      return `"${selectedVersion}"`;
    }
  }

  return null;
};

export const getMobileClientHintValue = (): string => {
  return Math.random() < 0.5 ? '?0' : '?1';
};

export const getPlatformVersionClientHintValue = async (): Promise<
  string | null
> => {
  if (!navigator.userAgentData) {
    return null;
  }

  const { platformVersion } =
    await navigator.userAgentData.getHighEntropyValues([
      'platformVersion',
    ]);

  if (!!platformVersion) {
    const versionSegments = platformVersion.split('.');

    const lastSegmentIndex = versionSegments.length - 1;
    const increment = Math.floor(Math.random() * 6) - 3;

    versionSegments[lastSegmentIndex] = Math.max(
      parseInt(versionSegments[lastSegmentIndex]) + increment,
      0
    ).toString();

    return `"${versionSegments.join('.')}"`;
  }

  return null;
};
