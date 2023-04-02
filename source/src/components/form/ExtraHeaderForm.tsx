import React, { useEffect, useId } from 'react';
import { shallow } from 'zustand/shallow';
import { Switch } from '~/components/common/Switch';
import { Label } from '~/components/common/Label';
import { useStore } from '~/utilities/store';
import {
  removeHeaderRule,
  updateHeaderRule,
} from '~/utilities/declarativeNetRequest';
import { Header } from '~/types';
import { Preview } from '~/components/common/Preview';
import { getExtraValue } from '~/utilities/extra';

export const ExtraHeaderForm: React.FC = () => {
  const { value, setValue, enabled, setEnabled } = useStore(
    (store) => store.extra,
    shallow
  );

  const switchId = useId();

  useEffect(() => {
    if (enabled && value !== null) {
      updateHeaderRule(Header.EXTRA, value);
    } else {
      removeHeaderRule(Header.EXTRA);
    }
  }, [value, enabled]);

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      setValue(getExtraValue());
    } else {
      setValue(null);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Extra</h2>
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
          <Preview header={Header.EXTRA} value={value} />
        </div>
      )}
    </div>
  );
};
