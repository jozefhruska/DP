import {
  CHROME_VERSION_REGEX,
  FIREFOX_VERSION_REGEX,
  MAC_OS_VERSION_REGEX,
  SAFARI_VERSION_REGEX,
  WINDOWS_VERSION_REGEX,
} from '~/constants';
import ChromiumVersions from '../assets/chromium-versions.json';

/**
 * Adds a random delta (an increment or a decrement) to the last version segment.
 *
 * @param version Software version segmented into parts delimited by a dot (.).
 */
const addRandomDelta = (version: string) => {
  const versionSegments = version.split('.');

  const lastSegmentIndex = versionSegments.length - 1;
  const increment = Math.floor(Math.random() * 6) - 3;

  versionSegments[lastSegmentIndex] = Math.max(
    parseInt(versionSegments[lastSegmentIndex]) + increment,
    0
  ).toString();

  return versionSegments.join('.');
};

/**
 * Modifies the given User-Agent string by replacing the platform and browser version
 * values with the provided fullVersion and platformVersion.
 *
 * @param {string} fullVersion The full version string to replace the browser version.
 * @param {string} platformVersion The platform version string to replace the platform version.
 * @returns {string} The modified User-Agent string with updated platform and browser versions.
 */
export const getUserAgentValue = (
  fullVersion: string,
  platformVersion: string
): string => {
  let userAgentString = navigator.userAgent;

  // Replace the macOS version
  const osMacMatch = userAgentString.match(MAC_OS_VERSION_REGEX);
  if (!!osMacMatch && osMacMatch[1]) {
    userAgentString = userAgentString.replace(
      osMacMatch[0],
      `Mac OS X ${platformVersion
        .replaceAll('.', '_')
        .replaceAll('"', '')}`
    );
  }

  // Replace the Windows version
  const osWindowsMatch = userAgentString.match(WINDOWS_VERSION_REGEX);
  if (!!osWindowsMatch && osWindowsMatch[1]) {
    userAgentString = userAgentString.replace(
      osWindowsMatch[0],
      `Windows NT ${platformVersion.replaceAll('"', '')}`
    );
  }

  // Replace the Chrome version
  const browserChromeVersionMatch = userAgentString.match(
    CHROME_VERSION_REGEX
  );
  if (!!browserChromeVersionMatch && browserChromeVersionMatch[1]) {
    userAgentString = userAgentString.replace(
      browserChromeVersionMatch[1],
      fullVersion.replaceAll('"', '')
    );
  }

  // Replace the Firefox version
  const browserFirefoxVersionMatch = userAgentString.match(
    FIREFOX_VERSION_REGEX
  );
  if (!!browserFirefoxVersionMatch && browserFirefoxVersionMatch[1]) {
    userAgentString = userAgentString.replace(
      browserFirefoxVersionMatch[1],
      fullVersion.replaceAll('"', '')
    );
  }

  // Replace the Safari version
  const browserSafariVersionMatch = userAgentString.match(
    SAFARI_VERSION_REGEX
  );
  if (!!browserSafariVersionMatch && browserSafariVersionMatch[1]) {
    userAgentString = userAgentString.replace(
      browserSafariVersionMatch[1],
      fullVersion.replaceAll('"', '')
    );
  }

  return userAgentString;
};

/**
 * Retrieves the full browser version from the User-Agent Client Hints API, if available,
 * and returns a randomly selected suitable version or a version with a random delta added.
 *
 * @returns {Promise<string|null>} A Promise that resolves to the modified full browser
 * version as a string, or null if the User-Agent Client Hints API is not available.
 */
export const getFullVersionClientHintValue = async (): Promise<
  string | null
> => {
  if (!navigator.userAgentData) {
    return null;
  }

  const { uaFullVersion } =
    await navigator.userAgentData.getHighEntropyValues(['uaFullVersion']);

  if (!!uaFullVersion) {
    const versionSegments = uaFullVersion.split('.');

    if (versionSegments.length === 4) {
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

    return `"${addRandomDelta(uaFullVersion)}"`;
  }

  return null;
};

/**
 * Generates a random mobile client hint value by returning either '?0' or '?1'.
 *
 * @returns {string} A randomly chosen mobile client hint value ('?0' or '?1').
 */
export const getMobileClientHintValue = (): string => {
  return Math.random() < 0.5 ? '?0' : '?1';
};

/**
 * Retrieves the platform version from the User-Agent Client Hints API, if available,
 * and adds a random delta to the last version segment.
 *
 * @returns {Promise<string|null>} A Promise that resolves to the modified platform version
 * as a string, or null if the User-Agent Client Hints API is not available.
 */
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
    return `"${addRandomDelta(platformVersion)}"`;
  }

  return null;
};
