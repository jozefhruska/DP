import browser from 'webextension-polyfill';
import { updateHeaderRule } from '~/utilities/declarativeNetRequest';
import { Header, StoreValue } from '~/types';
import { isStoreInitialized } from '~/utilities/store';

if (process.env.NODE_ENV === 'development' && chrome) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log(info);
  });
}

browser.storage.sync.get().then((store: StoreValue | {}) => {
  if (isStoreInitialized(store)) {
    if (store.userAgent.enabled && store.userAgent.value !== null) {
      updateHeaderRule(Header.USER_AGENT, store.userAgent.value);
    }

    if (
      store.acceptLanguage.enabled &&
      store.acceptLanguage.value !== null
    ) {
      updateHeaderRule(Header.ACCEPT_LANGUAGE, store.acceptLanguage.value);
    }

    if (store.deviceMemory.enabled && store.deviceMemory.value !== null) {
      updateHeaderRule(Header.DEVICE_MEMORY, store.deviceMemory.value);
    }
  }
});
