import React, { useId } from 'react';
import { shallow } from 'zustand/shallow';
import { Label } from '~/components/common/Label';
import * as Select from '~/components/common/Select';
import { ACCEPT_LANGUAGE_PROTECTION_OPTIONS } from '~/constants';
import { Switch } from '~/components/common/Switch';
import { useStore } from '~/utilities/store';
import { AcceptLanguageProtectionMode, Header } from '~/types';
import {
  removeHeaderRule,
  updateHeaderRule,
} from '~/utilities/declarativeNetRequest';
import { getAcceptLanguageValue } from '~/utilities/acceptLanguage';

export const AcceptLanguageForm: React.FC = () => {
  const { enabled, setEnabled, mode, setMode } = useStore(
    (store) => store.acceptLanguage,
    shallow
  );

  const switchId = useId();
  const selectId = useId();

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      updateHeaderRule(
        Header.ACCEPT_LANGUAGE,
        getAcceptLanguageValue(mode)
      );
    } else {
      removeHeaderRule(Header.ACCEPT_LANGUAGE);
    }
  };

  const handleModeChange = (mode: AcceptLanguageProtectionMode) => {
    setMode(mode);

    if (enabled) {
      updateHeaderRule(
        Header.ACCEPT_LANGUAGE,
        getAcceptLanguageValue(mode)
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Accept-Language</h2>
        <div className="flex items-center gap-x-2">
          <Switch
            checked={enabled}
            onCheckedChange={handleEnabledChange}
            id={switchId}
          />
          <Label htmlFor={switchId}>Enabled</Label>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor={selectId}>Mode</Label>
        <Select.Root value={mode} onValueChange={handleModeChange}>
          <Select.Trigger id={selectId}>
            <Select.Value placeholder="Select protection mode..." />
          </Select.Trigger>
          <Select.Content>
            {ACCEPT_LANGUAGE_PROTECTION_OPTIONS.map(({ value, label }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
};
