import browser from 'webextension-polyfill';
import { Header } from '~/types';
import { HEADER_RULE_IDS } from '~/constants';

/**
 * Updates the specified header rule by setting a new value for the header
 * using the Declarative Net Request API.
 *
 * @param {Header} header The header to update.
 * @param {string} value The new value to set for the header.
 */
export const updateHeaderRule = (header: Header, value: string) => {
  const id = HEADER_RULE_IDS[header];

  void browser.declarativeNetRequest.updateSessionRules({
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

/**
 * Removes the specified header rule using the Declarative Net Request API.
 *
 * @param {Header} header The header for which the rule should be removed.
 */
export const removeHeaderRule = (header: Header) => {
  const id = HEADER_RULE_IDS[header];

  void browser.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [id],
  });
};
