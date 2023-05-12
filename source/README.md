# Passive fingerprinting protection

This is a short documentation explaining how to build and run the web extension.

## Usage Notes

The extension manifest is defined in `src/manifest.ts` and used in the vite config.

Background scripts and popup entry points exist in the `src/entries` directory.

## Project Setup

To install the dependencies required to build the browser extension:

```sh
npm install
```

## Commands
### Build
#### Development, HMR

Hot Module Reloading is used to load changes inline without requiring extension rebuilds and extension/page reloads
Currently only works in Chromium based browsers.

```sh
npm run dev
```

#### Development, Watch

Rebuilds extension on file changes. Requires a reload of the extension (and page reload if using content scripts).

```sh
npm run watch
```

#### Production

Minifies and optimizes extension build

```sh
npm run build:chrome
```

```sh
npm run build:firefox
```

Note: Firefox support is experimental as it lacks several Manifest V3 features this extension requires to run.

### Load extension in browser

Loads the contents of the dist directory into the specified browser.

```sh
npm run serve:chrome
```

```sh
npm run serve:firefox
```

It is also possible to load the extension manually:

1. Build the browser extension by following the guide above.
2. Navigate to the extensions page in your browser (e.g., `chrome://extensions/`).
3. Enable the developer mode.
4. Click on "Load unpacked".
5. Select the `./source/dist` folder.
