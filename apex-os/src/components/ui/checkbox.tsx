import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

// "Complete" motion (260ms): the box fills success-green and the check path
// draws itself in. Reduced-motion users get the end state instantly.
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'tap peer relative grid h-5 w-5 shrink-0 place-items-center rounded-[7px] border-[1.5px] border-zinc-700 bg-transparent transition-[background-color,border-color] [transition-duration:260ms] ease-out',
      // extends the tap area to ~44px without changing the visual size
      'before:absolute before:-inset-3 before:content-[""]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-success data-[state=checked]:bg-success',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator forceMount className="grid place-items-center">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path
          className="apex-check-path"
          d="M3.5 8.5l3 3 6-7"
          stroke="rgb(5 6 8)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
