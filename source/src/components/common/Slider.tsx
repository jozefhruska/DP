import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    value={value}
    className={clsx(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={clsx(
        'relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200',
        'dark:bg-slate-800'
      )}
    >
      <SliderPrimitive.Range className="absolute h-full bg-slate-600 dark:bg-slate-700" />
    </SliderPrimitive.Track>

    {!!value?.length &&
      value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={clsx(
            'block h-5 w-5 rounded-full border-2 border-slate-600 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:pointer-events-none disabled:opacity-50',
            'dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900'
          )}
        />
      ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
