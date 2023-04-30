import browser from 'webextension-polyfill';
import {
  removeHeaderRule,
  updateHeaderRule,
} from '~/utilities/declarativeNetRequest';
import { Header, StoreValue } from '~/types';
import { isStoreInitialized } from '~/utilities/store';
import {
  getFullVersionClientHintValue,
  getMobileClientHintValue,
  getPlatformVersionClientHintValue,
  getUserAgentValue,
} from '~/utilities/userAgent';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';
import { getDeviceMemoryValue } from '~/utilities/deviceMemory';
import { getExtraValue } from '~/utilities/extra';

if (process.env.NODE_ENV === 'development' && chrome) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log(info);
  });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    try {
      await browser.storage.sync
        .get()
        .then(async (store: StoreValue | {}) => {
          if (!isStoreInitialized(store)) {
            return;
          }

          await chrome.scripting.executeScript({
            target: { tabId },
            func: (
              userAgent: string | null,
              acceptLanguage: string | null,
              deviceMemory: string | null
            ) => {
              (function () {
                /**
                 * Extracts languages from the Accept-Language HTTP header.
                 *
                 * @param {string} acceptLanguage The Accept-Language HTTP header string.
                 * @returns {string[]} An array of extracted languages.
                 */
                const extractLanguages = (
                  acceptLanguage: string
                ): string[] => {
                  const languageList = acceptLanguage.split(',');

                  return languageList.map((lang) => {
                    const langWithoutQuality = lang.split(';')[0];
                    return langWithoutQuality.trim();
                  });
                };

                // @ts-expect-error
                const originalNavigator = navigator.__proto__;
                const modifiedNavigator = Object.create(originalNavigator);

                // Replace the Navigator.userAgent property
                if (userAgent !== null) {
                  Object.defineProperty(modifiedNavigator, 'userAgent', {
                    value: userAgent,
                    writable: false,
                    enumerable: true,
                    configurable: true,
                  });
                }

                // Replace the Navigator.language and Navigator.languages properties
                if (acceptLanguage !== null) {
                  const languages = extractLanguages(acceptLanguage);

                  Object.defineProperty(modifiedNavigator, 'language', {
                    value: languages[0],
                    writable: false,
                    enumerable: true,
                    configurable: true,
                  });

                  Object.defineProperty(modifiedNavigator, 'languages', {
                    value: languages,
                    writable: false,
                    enumerable: true,
                    configurable: true,
                  });
                }

                // Replace the Navigator.deviceMemory property if supported
                if (deviceMemory !== null && 'deviceMemory' in navigator) {
                  Object.defineProperty(
                    modifiedNavigator,
                    'deviceMemory',
                    {
                      value: deviceMemory,
                      writable: false,
                      enumerable: true,
                      configurable: true,
                    }
                  );
                }

                // @ts-expect-error
                navigator.__proto__ = modifiedNavigator;
              })();
            },
            args: [
              store.userAgent.enabled &&
              store.userAgent.syncUserAgent &&
              store.userAgent.values.fullVersion &&
              store.userAgent.values.platformVersion
                ? getUserAgentValue(
                    store.userAgent.values.fullVersion,
                    store.userAgent.values.platformVersion
                  )
                : null,
              store.acceptLanguage.enabled && store.acceptLanguage.value
                ? store.acceptLanguage.value
                : null,
              store.deviceMemory.enabled && store.deviceMemory.value
                ? store.deviceMemory.value
                : null,
            ],
            injectImmediately: true,
            world: 'MAIN',
          });
        });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  }
});

browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.get().then(async (store: StoreValue | {}) => {
    if (!isStoreInitialized(store)) {
      return;
    }

    try {
      const updatedStore = { ...store };

      if (updatedStore.userAgent.enabled) {
        const [fullVersion, platformVersion] = await Promise.all([
          getFullVersionClientHintValue(),
          getPlatformVersionClientHintValue(),
        ]);

        // Assign new values for this session
        updatedStore.userAgent.values.fullVersion = fullVersion;
        updatedStore.userAgent.values.mobile = getMobileClientHintValue();
        updatedStore.userAgent.values.platformVersion = platformVersion;

        // Update the SEC-CH-UA-Full-Version rule
        if (updatedStore.userAgent.values.fullVersion !== null) {
          updateHeaderRule(
            Header.CH_FULL_VERSION,
            updatedStore.userAgent.values.fullVersion
          );
        }

        // Update the SEC-CH-UA-Mobile rule
        updateHeaderRule(
          Header.CH_MOBILE,
          updatedStore.userAgent.values.mobile
        );

        // Update the SEC-CH-UA-Platform-Version rule
        if (updatedStore.userAgent.values.platformVersion !== null) {
          updateHeaderRule(
            Header.CH_PLATFORM_VERSION,
            updatedStore.userAgent.values.platformVersion
          );
        }

        // Update the User-Agent rule if the sync option is enabled
        if (
          updatedStore.userAgent.syncUserAgent &&
          fullVersion !== null &&
          platformVersion !== null
        ) {
          updateHeaderRule(
            Header.USER_AGENT,
            getUserAgentValue(fullVersion, platformVersion)
          );
        }
      } else {
        // Clear all values and rules if the protection is disabled
        updatedStore.userAgent.values.fullVersion = null;
        updatedStore.userAgent.values.mobile = null;
        updatedStore.userAgent.values.platformVersion = null;

        removeHeaderRule(Header.CH_FULL_VERSION);
        removeHeaderRule(Header.CH_MOBILE);
        removeHeaderRule(Header.CH_PLATFORM_VERSION);
        removeHeaderRule(Header.USER_AGENT);
      }

      if (updatedStore.acceptLanguage.enabled) {
        // Regenerate new value for this session
        updatedStore.acceptLanguage.value = getAcceptLanguageValue(
          updatedStore.acceptLanguage.mode
        );

        // Update the Accept-Language rule
        updateHeaderRule(
          Header.ACCEPT_LANGUAGE,
          updatedStore.acceptLanguage.value
        );
      } else {
        // Clear the value and the rule if the protection is disabled
        updatedStore.acceptLanguage.value = null;

        removeHeaderRule(Header.ACCEPT_LANGUAGE);
      }

      if (updatedStore.deviceMemory.enabled) {
        // Regenerate new value for this session
        updatedStore.deviceMemory.value = getDeviceMemoryValue(
          updatedStore.deviceMemory.minMax
        );

        // Update the Device-Memory rule
        updateHeaderRule(
          Header.DEVICE_MEMORY,
          updatedStore.deviceMemory.value
        );
      } else {
        // Clear the value and the rule if the protection is disabled
        updatedStore.deviceMemory.value = null;

        removeHeaderRule(Header.DEVICE_MEMORY);
      }

      if (updatedStore.extra.enabled) {
        // Regenerate new value for this session
        updatedStore.extra.value = getExtraValue();

        // Update the Extra rule
        updateHeaderRule(Header.EXTRA, updatedStore.extra.value);
      } else {
        // Clear the value and the rule if the protection is disabled
        updatedStore.extra.value = null;

        removeHeaderRule(Header.EXTRA);
      }

      await browser.storage.sync.set(updatedStore);
    } catch (error) {
      console.error('Error initializing rules:', error);
    }
  });
});
