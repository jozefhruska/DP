import { create } from 'zustand';
import { AcceptLanguageProtectionMode, StoreValue } from '~/types';
import { ALLOWED_DEVICE_MEMORY_VALUES } from '~/constants';

/**
 * Creates a zustand store for managing application state.
 *
 * @typedef {import('zustand').SetState<StoreValue>} SetState
 * @type {import('zustand').CreateState<StoreValue>}
 */
export const useStore = create<StoreValue>((set) => ({
  initialize: (store) =>
    set((prevStore) => ({
      initialize: prevStore.initialize,
      acceptLanguage: {
        ...prevStore.acceptLanguage,
        value: store.acceptLanguage.value,
        enabled: store.acceptLanguage.enabled,
        mode: store.acceptLanguage.mode,
      },
      deviceMemory: {
        ...prevStore.deviceMemory,
        value: store.deviceMemory.value,
        enabled: store.deviceMemory.enabled,
        minMax: store.deviceMemory.minMax,
      },
      extra: {
        ...prevStore.extra,
        value: store.extra.value,
        enabled: store.extra.enabled,
      },
      userAgent: {
        ...prevStore.userAgent,
        values: {
          ...prevStore.userAgent.values,
          fullVersion: store.userAgent.values.fullVersion,
          mobile: store.userAgent.values.mobile,
          platformVersion: store.userAgent.values.platformVersion,
        },
        enabled: store.userAgent.enabled,
        syncUserAgent: store.userAgent.syncUserAgent,
      },
    })),
  acceptLanguage: {
    value: null,
    setValue: (value) =>
      set((store) => ({
        acceptLanguage: { ...store.acceptLanguage, value },
      })),
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        acceptLanguage: { ...store.acceptLanguage, enabled },
      })),
    mode: AcceptLanguageProtectionMode.RANDOM_REGIONS,
    setMode: (mode) =>
      set((store) => ({
        acceptLanguage: { ...store.acceptLanguage, mode },
      })),
  },
  deviceMemory: {
    value: null,
    setValue: (value) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, value },
      })),
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, enabled },
      })),
    minMax: [0, ALLOWED_DEVICE_MEMORY_VALUES.length - 1],
    setMinMax: (minMax) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, minMax },
      })),
  },
  extra: {
    value: null,
    setValue: (value) =>
      set((store) => ({
        extra: { ...store.extra, value },
      })),
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        extra: { ...store.extra, enabled },
      })),
  },
  userAgent: {
    values: {
      fullVersion: null,
      setFullVersion: (fullVersion) =>
        set((store) => ({
          userAgent: {
            ...store.userAgent,
            values: {
              ...store.userAgent.values,
              fullVersion,
            },
          },
        })),
      mobile: null,
      setMobile: (mobile) =>
        set((store) => ({
          userAgent: {
            ...store.userAgent,
            values: {
              ...store.userAgent.values,
              mobile,
            },
          },
        })),
      platformVersion: null,
      setPlatformVersion: (platformVersion) =>
        set((store) => ({
          userAgent: {
            ...store.userAgent,
            values: {
              ...store.userAgent.values,
              platformVersion,
            },
          },
        })),
    },
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        userAgent: { ...store.userAgent, enabled },
      })),
    syncUserAgent: false,
    setSyncUserAgent: (syncUserAgent) =>
      set((store) => ({
        userAgent: { ...store.userAgent, syncUserAgent },
      })),
  },
}));

/**
 * Determines if the provided store object is initialized already.
 *
 * @param {StoreValue | {}} store The store object to check for initialization.
 * @returns {store is StoreValue} A boolean indicating whether the store is initialized.
 */
export const isStoreInitialized = (
  store: StoreValue | {}
): store is StoreValue => {
  return store.hasOwnProperty('acceptLanguage');
};
