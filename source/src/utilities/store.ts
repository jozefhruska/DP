import { create } from 'zustand';
import { AcceptLanguageProtectionMode, StoreValue } from '~/types';

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
      userAgent: {
        ...prevStore.userAgent,
        value: store.userAgent.value,
        enabled: store.userAgent.enabled,
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
    minMax: [1, 5],
    setMinMax: (minMax) =>
      set((store) => ({
        deviceMemory: { ...store.deviceMemory, minMax },
      })),
  },
  userAgent: {
    value: null,
    setValue: (value) =>
      set((store) => ({
        userAgent: { ...store.userAgent, value },
      })),
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
