import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PopupContent: React.FC<Props> = ({ children }) => {
  return (
    <main className="px-6 py-5 bg-slate-50 dark:bg-slate-900">
      {children}
    </main>
  );
};
