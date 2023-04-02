// noinspection JSConstantReassignment

import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import { AcceptLanguageProtectionMode } from '~/types';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';

const TEST_CASES: Record<
  AcceptLanguageProtectionMode,
  [string[], string][]
> = {
  [AcceptLanguageProtectionMode.RANDOM_REGIONS]: [
    [['en-US', 'en'], 'en-US,en;q=0.9'],
    [['en-US', 'fr', 'es'], 'en-US,fr;q=0.9,es;q=0.8'],
    [['en-GB', 'fr'], 'en-US,fr;q=0.9'],
    [['es', 'fr', 'de'], 'es,fr;q=0.9,de;q=0.8'],
    [['fr', 'de', 'ja', 'zh-CN'], 'fr,de;q=0.9,ja;q=0.8,zh-CN;q=0.7'],
    [['pt-BR', 'pt', 'en', 'es'], 'pt-PT,pt;q=0.9,en;q=0.8,es;q=0.7'],
    [
      ['zh-CN', 'en-US', 'en', 'ja'],
      'zh-CN,en-AU;q=0.9,en;q=0.8,ja;q=0.7',
    ],
    [
      ['ja', 'ko', 'zh-CN', 'en-US'],
      'ja,ko;q=0.9,zh-CN;q=0.8,en-AU;q=0.7',
    ],
    [
      ['de', 'fr', 'it', 'es', 'en'],
      'de,fr;q=0.9,it;q=0.8,es;q=0.7,en;q=0.6',
    ],
    [['ru', 'en', 'de'], 'ru,en;q=0.9,de;q=0.8'],
    [['nl', 'en', 'fr', 'de'], 'nl,en;q=0.9,fr;q=0.8,de;q=0.7'],
    [['it', 'fr', 'es', 'de'], 'it,fr;q=0.9,es;q=0.8,de;q=0.7'],
    [['sv', 'da', 'nb', 'fi'], 'sv,da;q=0.9,nb;q=0.8,fi;q=0.7'],
    [['pl', 'cs', 'sk', 'hu'], 'pl,cs;q=0.9,sk;q=0.8,hu;q=0.7'],
    [['ar', 'fa', 'he', 'tr'], 'ar,fa;q=0.9,he;q=0.8,tr;q=0.7'],
    [
      ['ko', 'ja', 'zh-TW', 'zh-CN'],
      'ko,ja;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7',
    ],
    [
      ['en-AU', 'en-GB', 'en', 'fr'],
      'en-US,en-AU;q=0.9,en;q=0.8,fr;q=0.7',
    ],
    [['pt-PT', 'es', 'en'], 'pt-PT,es;q=0.9,en;q=0.8'],
    [['el', 'ro', 'bg', 'sr'], 'el,ro;q=0.9,bg;q=0.8,sr;q=0.7'],
    [['vi', 'th', 'id', 'ms'], 'vi,th;q=0.9,id;q=0.8,ms;q=0.7'],
    [
      ['fr-CA', 'fr-FR', 'fr', 'en'],
      'fr-FR,fr-BE;q=0.9,fr;q=0.8,en;q=0.7',
    ],
    [['ca', 'gl', 'eu', 'oc'], 'ca,gl;q=0.9,eu;q=0.8,oc;q=0.7'],
    [
      ['en-IN', 'en-GB', 'hi', 'bn'],
      'en-US,en-AU;q=0.9,hi;q=0.8,bn;q=0.7',
    ],
  ],
  [AcceptLanguageProtectionMode.REMOVE_REGIONS]: [
    [['en-US', 'en'], 'en'],
    [['en-US', 'fr', 'es'], 'en,fr;q=0.9,es;q=0.8'],
    [['en-GB', 'en-US', 'fr'], 'en,fr;q=0.9'],
    [['es', 'fr', 'de'], 'es,fr;q=0.9,de;q=0.8'],
    [['fr', 'de', 'ja', 'zh-CN'], 'fr,de;q=0.9,ja;q=0.8,zh;q=0.7'],
    [['pt-BR', 'pt', 'en', 'es'], 'pt,en;q=0.9,es;q=0.8'],
    [['zh-CN', 'en-US', 'en', 'ja'], 'zh,en;q=0.9,ja;q=0.8'],
    [['ja', 'ko', 'zh-CN', 'en-US'], 'ja,ko;q=0.9,zh;q=0.8,en;q=0.7'],
    [
      ['de', 'fr', 'it', 'es', 'en'],
      'de,fr;q=0.9,it;q=0.8,es;q=0.7,en;q=0.6',
    ],
    [['ru', 'en', 'de'], 'ru,en;q=0.9,de;q=0.8'],
    [['nl', 'en', 'fr', 'de'], 'nl,en;q=0.9,fr;q=0.8,de;q=0.7'],
    [['it', 'fr', 'es', 'de'], 'it,fr;q=0.9,es;q=0.8,de;q=0.7'],
    [['sv', 'da', 'nb', 'fi'], 'sv,da;q=0.9,nb;q=0.8,fi;q=0.7'],
    [['pl', 'cs', 'sk', 'hu'], 'pl,cs;q=0.9,sk;q=0.8,hu;q=0.7'],
    [['ar', 'fa', 'he', 'tr'], 'ar,fa;q=0.9,he;q=0.8,tr;q=0.7'],
    [['ko', 'ja', 'zh-TW', 'zh-CN'], 'ko,ja;q=0.9,zh;q=0.8'],
    [['en-AU', 'en-GB', 'en', 'fr'], 'en,fr;q=0.9'],
    [['pt-PT', 'pt-BR', 'es', 'en'], 'pt,es;q=0.9,en;q=0.8'],
    [['el', 'ro', 'bg', 'sr'], 'el,ro;q=0.9,bg;q=0.8,sr;q=0.7'],
    [['vi', 'th', 'id', 'ms'], 'vi,th;q=0.9,id;q=0.8,ms;q=0.7'],
    [['fr-CA', 'fr-FR', 'fr', 'en'], 'fr,en;q=0.9'],
    [['ca', 'gl', 'eu', 'oc'], 'ca,gl;q=0.9,eu;q=0.8,oc;q=0.7'],
  ],
};

describe('Utilities - acceptLanguage', () => {
  let originalMath: Math;
  let originalNavigator: Navigator;

  beforeAll(() => {
    originalMath = Math;
    originalNavigator = window.navigator;

    vi.stubGlobal('navigator', {
      languages: undefined,
    });
  });

  afterAll(() => {
    Math.random = originalMath.random;

    vi.unstubAllGlobals();
  });

  describe('getAcceptLanguageValue', () => {
    it.each(TEST_CASES[AcceptLanguageProtectionMode.RANDOM_REGIONS])(
      `Transforms the value correctly in the "${AcceptLanguageProtectionMode.RANDOM_REGIONS}" mode`,
      (languages, output) => {
        Math.random = vi
          .fn()
          .mockReturnValueOnce(0)
          .mockReturnValueOnce(0.5)
          .mockReturnValueOnce(1);

        // @ts-ignore
        window.navigator.languages = languages;

        expect(
          getAcceptLanguageValue(
            AcceptLanguageProtectionMode.RANDOM_REGIONS
          )
        ).toBe(output);
      }
    );

    it.each(TEST_CASES[AcceptLanguageProtectionMode.REMOVE_REGIONS])(
      `Transforms the value correctly in the "${AcceptLanguageProtectionMode.REMOVE_REGIONS}" mode`,
      (languages, output) => {
        Math.random = vi
          .fn()
          .mockReturnValueOnce(0)
          .mockReturnValueOnce(0.5)
          .mockReturnValueOnce(1);

        // @ts-ignore
        window.navigator.languages = languages;

        expect(
          getAcceptLanguageValue(
            AcceptLanguageProtectionMode.REMOVE_REGIONS
          )
        ).toBe(output);
      }
    );
  });
});
