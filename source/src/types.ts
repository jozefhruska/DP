export enum Header {
  ACCEPT_LANGUAGE = 'Accept-Language',
  DEVICE_MEMORY = 'Device-Memory',
  USER_AGENT = 'User-Agent',
  CH_FULL_VERSION = 'SEC-CH-UA-Full-Version',
  CH_MOBILE = 'SEC-CH-UA-Mobile',
  CH_PLATFORM_VERSION = 'SEC-CH-UA-Platform-Version',
  EXTRA = 'Extra',
}

export type StoreValue = {
  initialize: (store: StoreValue) => void;
  acceptLanguage: {
    value: string | null;
    setValue: (value: string | null) => void;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    mode: AcceptLanguageProtectionMode;
    setMode: (mode: AcceptLanguageProtectionMode) => void;
  };
  deviceMemory: {
    value: string | null;
    setValue: (value: string | null) => void;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    minMax: [number, number];
    setMinMax: (minMax: [number, number]) => void;
  };
  extra: {
    value: string | null;
    setValue: (value: string | null) => void;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
  };
  userAgent: {
    values: {
      fullVersion: string | null;
      setFullVersion: (fullVersion: string | null) => void;
      mobile: string | null;
      setMobile: (mobile: string | null) => void;
      platformVersion: string | null;
      setPlatformVersion: (platformVersion: string | null) => void;
    };
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    syncUserAgent: boolean;
    setSyncUserAgent: (syncUserAgent: boolean) => void;
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
