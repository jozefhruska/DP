import React from 'react';
import { Fingerprint } from 'lucide-react';
import pkg from '../../package.json';

export const PopupHeader: React.FC = () => {
  return (
    <header className="flex items-center gap-x-2.5 border-b border-slate-200 bg-white py-4 px-6 dark:border-slate-700 dark:bg-slate-800">
      <Fingerprint className="h-5 w-5 text-slate-500" />
      <h1 className="text-base font-semibold">{pkg.displayName}</h1>
    </header>
  );
};
