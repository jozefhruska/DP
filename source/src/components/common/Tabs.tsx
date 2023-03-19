import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';

const Root = TabsPrimitive.Root;

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsx(
      'flex items-center justify-center rounded-md border border-slate-200 bg-slate-100',
      'dark:border-slate-700 dark:bg-slate-800',
      className
    )}
    {...props}
  />
));
List.displayName = TabsPrimitive.List.displayName;

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={clsx(
      'inline-flex grow items-center justify-center rounded-md px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm',
      'dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100',
      className
    )}
    {...props}
    ref={ref}
  />
));
Trigger.displayName = TabsPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={clsx(
      'mt-4 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-8 focus-visible:ring-offset-slate-50',
      'dark:focus-visible:ring-offset-slate-900',
      className
    )}
    {...props}
    ref={ref}
  />
));
Content.displayName = TabsPrimitive.Content.displayName;

export { Root, List, Trigger, Content };
