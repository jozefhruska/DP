import React from 'react';
import { Header } from '~/types';

type Props = {
  header: Header;
  value: string;
};

export const Preview: React.FC<Props> = ({ header, value }) => (
  <div className="rounded-md border border-slate-200 bg-slate-100 py-2 px-3 leading-normal dark:border-slate-700 dark:bg-slate-800">
    <strong className="font-medium">{header}:</strong> {value}
  </div>
);
