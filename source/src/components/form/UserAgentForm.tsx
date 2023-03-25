import React, { useId } from 'react';
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

export const UserAgentForm: React.FC = () => {
  const { enabled, setEnabled } = useStore(
    (store) => store.userAgent,
    shallow
  );

  const switchId = useId();

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      updateHeaderRule(Header.USER_AGENT, getUserAgentValue());
    } else {
      removeHeaderRule(Header.USER_AGENT);
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
    </div>
  );
};
