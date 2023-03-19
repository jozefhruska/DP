import browser from 'webextension-polyfill';
import { Header } from '~/types';
import { HEADER_RULE_IDS } from '~/constants';

export const updateHeaderRule = (header: Header, value: string) => {
  const id = HEADER_RULE_IDS[header];

  browser.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [id],
    addRules: [
      {
        id,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            {
              header: header,
              operation: 'set',
              value,
            },
          ],
        },
        condition: {
          urlFilter: '*://*/*',
          resourceTypes: ['main_frame'],
        },
      },
    ],
  });
};
