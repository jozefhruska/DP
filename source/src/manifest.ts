import pkg from '../package.json';

const BUILD_TARGET = (process.env.BUILD_TARGET || 'chrome') as
  | 'chrome'
  | 'firefox';

const manifest: Omit<
  chrome.runtime.ManifestV3,
  'name' | 'version' | 'manifest_version'
> = {
  action: {
    default_icon: {
      16: 'icons/16.png',
      32: 'icons/32.png',
      48: 'icons/48.png',
      128: 'icons/128.png',
    },
    default_popup: 'src/entries/popup/index.html',
  },
  ...(BUILD_TARGET === 'chrome'
    ? {
        background: {
          service_worker: 'src/entries/background/main.ts',
        },
      }
    : {}),
  permissions: [
    'activeTab',
    'declarativeNetRequest',
    'declarativeNetRequestFeedback',
    'scripting',
    'storage',
  ],
  host_permissions: ['*://*/*'],
  icons: {
    16: 'icons/16.png',
    32: 'icons/32.png',
    48: 'icons/48.png',
    128: 'icons/128.png',
    512: 'icons/512.png',
  },
  browser_specific_settings: {
    gecko: {
      id: 'pfpp-extension@example.org',
    },
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
