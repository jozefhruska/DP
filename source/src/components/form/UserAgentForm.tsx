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
import { getUserAgentValue } from '~/utilities/userAgent';
import { Preview } from '~/components/common/Preview';

export const UserAgentForm: React.FC = () => {
  const { value, setValue, enabled, setEnabled } = useStore(
    (store) => store.userAgent,
    shallow
  );

  const switchId = useId();

  useEffect(() => {
    if (enabled && value !== null) {
      updateHeaderRule(Header.USER_AGENT, value);
    } else {
      removeHeaderRule(Header.USER_AGENT);
    }
  }, [value, enabled]);

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      setValue(getUserAgentValue());
    } else {
      setValue(null);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">User-Agent</h2>
        <div className="flex items-center gap-x-2">
          <Switch
            checked={enabled}
            onCheckedChange={handleEnabledChange}
            id={switchId}
          />
          <Label htmlFor={switchId}>Enabled</Label>
        </div>
      </div>

      {value !== null && (
        <div className="flex flex-col gap-y-2">
          <Label>Preview</Label>
          <Preview header={Header.USER_AGENT} value={value} />
        </div>
      )}
    </div>
  );
};
