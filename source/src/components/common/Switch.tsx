import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import clsx from 'clsx';

type Props = {
  size?: 'sm' | 'md';
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & Props
>(({ size = 'md', className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={clsx(
      'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-300 data-[state=checked]:bg-slate-700',
      'dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-700 dark:data-[state=checked]:bg-slate-400',
      size === 'sm' ? 'h-[16px] w-[28px]' : 'h-[20px] w-[36px]',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={clsx(
        'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
        size === 'sm'
          ? 'h-3 w-3 data-[state=checked]:translate-x-3'
          : 'h-4 w-4 data-[state=checked]:translate-x-4'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
