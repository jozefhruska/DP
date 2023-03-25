import { create } from 'zustand';
import { AcceptLanguageProtectionMode, StoreValue } from '~/types';

export const useStore = create<StoreValue>((set) => ({
  initialize: (store) =>
    set((prevStore) => ({
      initialize: prevStore.initialize,
      acceptLanguage: {
        ...prevStore.acceptLanguage,
        enabled: store.acceptLanguage.enabled,
        mode: store.acceptLanguage.mode,
      },
      deviceMemory: {
        ...prevStore.deviceMemory,
        enabled: store.deviceMemory.enabled,
        minMax: store.deviceMemory.minMax,
      },
      userAgent: {
        ...prevStore.userAgent,
        enabled: store.userAgent.enabled,
      },
    })),
  acceptLanguage: {
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
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, enabled },
      })),
    minMax: [1, 5],
    setMinMax: (minMax) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, minMax },
      })),
  },
  userAgent: {
    enabled: false,
    setEnabled: (enabled) =>
      set((store) => ({
        userAgent: { ...store.userAgent, enabled },
      })),
  },
}));

export const isStoreInitialized = (
  store: StoreValue | {}
): store is StoreValue => {
  return store.hasOwnProperty('acceptLanguage');
};
