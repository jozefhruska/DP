import browser from 'webextension-polyfill';
import { updateHeaderRule } from '~/utilities/declarativeNetRequest';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';
import { Header, StoreValue } from '~/types';
import { isStoreInitialized } from '~/utilities/store';
import { getDeviceMemoryValue } from '~/utilities/deviceMemory';

if (process.env.NODE_ENV === 'development' && chrome) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log(info);
  });
}

browser.storage.sync.get().then((store: StoreValue | {}) => {
  if (isStoreInitialized(store)) {
    if (store.acceptLanguage.enabled) {
      updateHeaderRule(
        Header.ACCEPT_LANGUAGE,
        getAcceptLanguageValue(store.acceptLanguage.mode)
      );
    }

    if (store.deviceMemory.enabled) {
      updateHeaderRule(
        Header.DEVICE_MEMORY,
        getDeviceMemoryValue(store.deviceMemory.minMax)
      );
    }
  }
});
