import React, { useEffect, useId } from 'react';
import { Switch } from '~/components/common/Switch';
import { Label } from '~/components/common/Label';
import { useStore } from '~/utilities/store';
import { shallow } from 'zustand/shallow';
import {
  removeHeaderRule,
  updateHeaderRule,
} from '~/utilities/declarativeNetRequest';
import { Header } from '~/types';
import {
  getFullVersionClientHintValue,
  getMobileClientHintValue,
  getPlatformVersionClientHintValue,
  getUserAgentValue,
} from '~/utilities/userAgent';
import { Preview } from '~/components/common/Preview';

export const UserAgentForm: React.FC = () => {
  const {
    enabled,
    setEnabled,
    syncUserAgent,
    setSyncUserAgent,
    fullVersion,
    setFullVersion,
    mobile,
    setMobile,
    platformVersion,
    setPlatformVersion,
  } = useStore(
    (store) => ({
      enabled: store.userAgent.enabled,
      setEnabled: store.userAgent.setEnabled,
      syncUserAgent: store.userAgent.syncUserAgent,
      setSyncUserAgent: store.userAgent.setSyncUserAgent,
      fullVersion: store.userAgent.values.fullVersion,
      setFullVersion: store.userAgent.values.setFullVersion,
      mobile: store.userAgent.values.mobile,
      setMobile: store.userAgent.values.setMobile,
      platformVersion: store.userAgent.values.platformVersion,
      setPlatformVersion: store.userAgent.values.setPlatformVersion,
    }),
    shallow
  );

  const switchId = useId();
  const userAgentSwitchId = useId();

  useEffect(() => {
    if (enabled) {
      if (fullVersion !== null) {
        updateHeaderRule(Header.CH_FULL_VERSION, fullVersion);
      }

      if (mobile !== null) {
        updateHeaderRule(Header.CH_MOBILE, mobile);
      }

      if (platformVersion !== null) {
        updateHeaderRule(Header.CH_PLATFORM_VERSION, platformVersion);
      }

      if (fullVersion !== null && platformVersion !== null) {
        updateHeaderRule(
          Header.USER_AGENT,
          getUserAgentValue(fullVersion, platformVersion)
        );
      }
    } else {
      removeHeaderRule(Header.CH_FULL_VERSION);
      removeHeaderRule(Header.CH_MOBILE);
      removeHeaderRule(Header.CH_PLATFORM_VERSION);
      removeHeaderRule(Header.USER_AGENT);
    }
  }, [enabled, fullVersion, mobile, platformVersion]);

  const handleEnabledChange = async (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      setFullVersion(await getFullVersionClientHintValue());
      setMobile(getMobileClientHintValue());
      setPlatformVersion(await getPlatformVersionClientHintValue());
    } else {
      setFullVersion(null);
      setMobile(null);
      setPlatformVersion(null);
    }
  };

  const handleSyncUserAgentChange = (checked: boolean) => {
    setSyncUserAgent(checked);

    if (checked && fullVersion !== null && platformVersion !== null) {
      updateHeaderRule(
        Header.USER_AGENT,
        getUserAgentValue(fullVersion, platformVersion)
      );
    } else {
      removeHeaderRule(Header.USER_AGENT);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">
          User-Agent & Client hints
        </h2>
        <div className="flex items-center gap-x-2">
          <Switch
            checked={enabled}
            onCheckedChange={handleEnabledChange}
            id={switchId}
          />
          <Label htmlFor={switchId}>Enabled</Label>
        </div>
      </div>

      <p>
        Modifies the HTTP headers carrying User-Agent information, such as
        the browser and platform versions.
      </p>

      <div className="relative flex flex-col gap-y-2 rounded-md bg-slate-100 px-3 py-3 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <Label htmlFor={userAgentSwitchId}>
            <span className="absolute inset-0" aria-hidden="true" />
            Sync User-Agent versions
          </Label>
          <Switch
            id={userAgentSwitchId}
            checked={syncUserAgent}
            onCheckedChange={handleSyncUserAgentChange}
            disabled={!enabled}
            size="sm"
          />
        </div>

        <p className="text-xs">
          Overrides the User-Agent header reductions to match client hint
          versions. This is generally not recommended.
        </p>
      </div>

      {(fullVersion !== null || mobile !== null) && (
        <div className="flex flex-col gap-y-2">
          <Label>Preview</Label>
          <Preview
            values={{
              [Header.USER_AGENT]:
                !syncUserAgent || !fullVersion || !platformVersion
                  ? null
                  : getUserAgentValue(fullVersion, platformVersion),
              [Header.CH_FULL_VERSION]: fullVersion,
              [Header.CH_MOBILE]: mobile,
              [Header.CH_PLATFORM_VERSION]: platformVersion,
            }}
          />
        </div>
      )}
    </div>
  );
};
