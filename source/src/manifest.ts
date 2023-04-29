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
  // content_scripts: [
  //   {
  //     js: ['src/entries/contentScript/primary/main.tsx'],
  //     matches: ['*://*/*'],
  //   },
  // ],
  // content_security_policy: {
  //   extension_pages:
  //     "default-src 'self'; style-src-elem 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;",
  // },
  permissions: [
    'declarativeNetRequest',
    'declarativeNetRequestFeedback',
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
  // options_ui: {
  //   page: 'src/entries/options/index.html',
  //   open_in_tab: true,
  // },
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
