export enum Header {
  ACCEPT_LANGUAGE = 'accept-language',
}

export type StoreValue = {
  initialize: (value: StoreValue) => void;
  acceptLanguage: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    mode: AcceptLanguageProtectionMode;
    setMode: (mode: AcceptLanguageProtectionMode) => void;
  };
};

export enum AcceptLanguageProtectionMode {
  RANDOM_REGIONS = 'random_regions',
  REMOVE_REGIONS = 'remove_regions',
}

export type SelectOption<TValue = string> = {
  value: TValue;
  label: string;
};

export enum PopupTab {
  USER_AGENT = 'user-agent',
  ACCEPT_LANGUAGE = 'accept-language',
  OTHER = 'Other',
}
