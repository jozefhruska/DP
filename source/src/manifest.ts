import pkg from '../package.json';

const manifest: Omit<
  chrome.runtime.ManifestV3,
  'name' | 'version' | 'manifest_version'
> = {
  action: {
    default_icon: {
      16: 'icons/16.png',
      19: 'icons/19.png',
      32: 'icons/32.png',
      38: 'icons/38.png',
    },
    default_popup: 'src/entries/popup/index.html',
  },
  background: {
    service_worker: 'src/entries/background/main.ts',
  },
  content_scripts: [
    {
      js: ['src/entries/contentScript/primary/main.tsx'],
      matches: ['*://*/*'],
    },
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: 'ruleset',
        enabled: false,
        path: 'rules.json',
      },
    ],
  },
  permissions: ['declarativeNetRequest', 'declarativeNetRequestFeedback'],
  host_permissions: ['*://*/*'],
  icons: {
    16: 'icons/16.png',
    19: 'icons/19.png',
    32: 'icons/32.png',
    38: 'icons/38.png',
    48: 'icons/48.png',
    64: 'icons/64.png',
    96: 'icons/96.png',
    128: 'icons/128.png',
    256: 'icons/256.png',
    512: 'icons/512.png',
  },
  options_ui: {
    page: 'src/entries/options/index.html',
    open_in_tab: true,
  },
};

export function getManifest(): chrome.runtime.ManifestV3 {
  return {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
    manifest_version: 3,
    ...manifest,
  };
}