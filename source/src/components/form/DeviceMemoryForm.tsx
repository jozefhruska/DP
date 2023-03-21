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
import { Slider } from '~/components/common/Slider';

export const DeviceMemoryForm: React.FC = () => {
  const { enabled, setEnabled, minMax, setMinMax } = useStore(
    (store) => store.deviceMemory,
    shallow
  );

  const switchId = useId();

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      updateHeaderRule(Header.DEVICE_MEMORY, getDeviceMemoryValue(minMax));
    } else {
      removeHeaderRule(Header.DEVICE_MEMORY);
    }
  };

  const handleSliderValueChange = (minMax: [number, number]) => {
    setMinMax(minMax);

    if (enabled) {
      updateHeaderRule(Header.DEVICE_MEMORY, getDeviceMemoryValue(minMax));
    }
  };

  const min = 2 ** minMax[0];
  const max = 2 ** minMax[1];

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

      <div className="flex flex-col gap-y-3.5">
        <div className="flex items-center justify-between">
          <span>{min} GB</span>
          <span>{max} GB</span>
        </div>

        <Slider
          min={0}
          max={8}
          step={1}
          value={minMax}
          onValueChange={handleSliderValueChange}
          minStepsBetweenThumbs={1}
        />
      </div>
    </div>
  );
};
