import { create } from 'zustand';
import { AcceptLanguageProtectionMode, StoreValue } from '~/types';

export const useStore = create<StoreValue>((set) => ({
  initialize: (value: StoreValue) => set({ ...value }),
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
}));

export const isStoreInitialized = (
  store: StoreValue | {}
): store is StoreValue => {
  return store.hasOwnProperty('acceptLanguage');
};
