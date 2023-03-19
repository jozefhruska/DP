import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const Root = SelectPrimitive.Root;

const Group = SelectPrimitive.Group;

const Value = SelectPrimitive.Value;

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      'flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white py-2 px-3 text-xs text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed',
      'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:focus:border-slate-500 dark:focus:ring-slate-500',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 text-slate-500" />
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        'relative z-50 w-full overflow-hidden rounded-md border border-slate-100 bg-white text-slate-700 shadow-md animate-in fade-in-80',
        'dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400',
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1.5">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const Label = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsx(
      'py-1.5 pr-2 pl-8 text-xs font-semibold text-slate-900 dark:text-slate-200',
      className
    )}
    {...props}
  />
));
Label.displayName = SelectPrimitive.Label.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-xs text-slate-700 outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'dark:text-slate-400 dark:focus:bg-slate-700',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 text-slate-500" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

const Separator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx(
      '-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-700',
      className
    )}
    {...props}
  />
));
Separator.displayName = SelectPrimitive.Separator.displayName;

export { Root, Group, Value, Trigger, Content, Label, Item, Separator };
