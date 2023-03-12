import browser from 'webextension-polyfill';

console.log('Service worker started.');

browser.declarativeNetRequest.updateSessionRules({
  addRules: [
    {
      id: 3,
      priority: 1,
      action: {
        type: 'modifyHeaders',
        requestHeaders: [
          {
            header: 'accept-language',
            operation: 'set',
            value: 'en-GB,en;q=0.9',
          },
        ],
      },
      condition: {
        urlFilter: 'amiunique.org',
        resourceTypes: ['main_frame'],
      },
    },
  ],
});

console.log(browser.declarativeNetRequest.getSessionRules());
