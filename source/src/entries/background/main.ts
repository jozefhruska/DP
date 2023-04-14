import browser from 'webextension-polyfill';
import { updateHeaderRule } from '~/utilities/declarativeNetRequest';
import { Header, StoreValue } from '~/types';
import { isStoreInitialized } from '~/utilities/store';
import { getUserAgentValue } from '~/utilities/userAgent';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';
import { getDeviceMemoryValue } from '~/utilities/deviceMemory';
import { getExtraValue } from '~/utilities/extra';

if (process.env.NODE_ENV === 'development' && chrome) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log(info);
  });
}

browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.get().then(async (store: StoreValue | {}) => {
    if (isStoreInitialized(store)) {
      const updatedStore = { ...store };

      // Regenerate header values
      updatedStore.userAgent.value = getUserAgentValue();
      updatedStore.acceptLanguage.value = getAcceptLanguageValue(
        updatedStore.acceptLanguage.mode
      );
      updatedStore.deviceMemory.value = getDeviceMemoryValue(
        updatedStore.deviceMemory.minMax
      );
      updatedStore.extra.value = getExtraValue();

      // Update rules
      if (
        updatedStore.userAgent.enabled &&
        updatedStore.userAgent.value !== null
      ) {
        updateHeaderRule(Header.USER_AGENT, updatedStore.userAgent.value);
      }

      if (
        updatedStore.acceptLanguage.enabled &&
        updatedStore.acceptLanguage.value !== null
      ) {
        updateHeaderRule(
          Header.ACCEPT_LANGUAGE,
          updatedStore.acceptLanguage.value
        );
      }

      if (
        updatedStore.deviceMemory.enabled &&
        updatedStore.deviceMemory.value !== null
      ) {
        updateHeaderRule(
          Header.DEVICE_MEMORY,
          updatedStore.deviceMemory.value
        );
      }

      if (
        updatedStore.extra.enabled &&
        updatedStore.extra.value !== null
      ) {
        updateHeaderRule(Header.EXTRA, updatedStore.extra.value);
      }

      await browser.storage.sync.set(updatedStore);
    }
  });
});
