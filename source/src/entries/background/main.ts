import { updateHeaderRule } from '~/utilities/declarativeNetRequest';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';
import { Header } from '~/types';

if (process.env.NODE_ENV === 'development' && chrome) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log(info);
  });
}

// TODO: Enable / disable based on the preferences
updateHeaderRule(Header.ACCEPT_LANGUAGE, getAcceptLanguageValue());
