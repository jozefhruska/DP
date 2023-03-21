import React, { useId } from 'react';
import { shallow } from 'zustand/shallow';
import { Switch } from '~/components/common/Switch';
import { Label } from '~/components/common/Label';
import { useStore } from '~/utilities/store';
import {
  removeHeaderRule,
  updateHeaderRule,
} from '~/utilities/declarativeNetRequest';
import { Header } from '~/types';
import { getDeviceMemoryValue } from '~/utilities/deviceMemory';

export const DeviceMemoryForm: React.FC = () => {
  const { enabled, setEnabled } = useStore(
    (store) => store.deviceMemory,
    shallow
  );

  const switchId = useId();

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    console.log(checked);

    if (checked) {
      updateHeaderRule(Header.DEVICE_MEMORY, getDeviceMemoryValue());
    } else {
      removeHeaderRule(Header.DEVICE_MEMORY);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Device-Memory</h2>
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
