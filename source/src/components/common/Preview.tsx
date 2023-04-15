import React from 'react';
import { Header } from '~/types';

type Props = {
  values: Partial<Record<Header, string | null>>;
};

export const Preview: React.FC<Props> = ({ values }) => (
  <div className="rounded-md border border-slate-200 bg-slate-100 py-2 px-3 leading-normal dark:border-slate-700 dark:bg-slate-800">
    {Object.entries(values)
      .filter(([, value]) => !!value)
      .map(([header, value]) => (
        <div key={header}>
          <strong className="font-medium">{header}:</strong> {value}
        </div>
      ))}
  </div>
);
