import React, { useEffect, useId } from 'react';
import browser from 'webextension-polyfill';
import { shallow } from 'zustand/shallow';
import { Label } from '~/components/common/Label';
import * as Select from '~/components/common/Select';
import { ACCEPT_LANGUAGE_PROTECTION_OPTIONS } from '~/constants';
import { Switch } from '~/components/common/Switch';
import { useStore } from '~/utilities/store';
import { StoreValue } from '~/types';

export const AcceptLanguageForm: React.FC = () => {
  const { enabled, setEnabled, mode, setMode } = useStore(
    (store) => store.acceptLanguage,
    shallow
  );

  useEffect(() => {
    void browser.storage.sync
      .get('acceptLanguage')
      .then((defaultValues: StoreValue | {}) => {
        if ('acceptLanguage' in defaultValues) {
          setEnabled(defaultValues.acceptLanguage.enabled);
          setMode(defaultValues.acceptLanguage.mode);
        }
      });
  }, []);

  const switchId = useId();
  const selectId = useId();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Accept-Language</h2>
        <div className="flex items-center gap-x-2">
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            id={switchId}
          />
          <Label htmlFor={switchId}>Enabled</Label>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor={selectId}>Mode</Label>
        <Select.Root value={mode} onValueChange={setMode}>
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
