import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// One control radius (12px), 44px touch height on phones, 90ms press feedback.
const buttonVariants = cva(
  'tap inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[background-color,border-color,color,opacity,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary font-bold text-white hover:bg-primary/90',
        destructive:
          'border border-danger/25 bg-danger/12 font-bold text-red-400 hover:bg-danger/20',
        outline:
          'border border-line-strong bg-transparent text-foreground hover:bg-white/[0.05]',
        secondary:
          'border border-line-strong bg-white/[0.04] text-foreground hover:bg-white/[0.07]',
        ghost: 'text-fg-muted hover:bg-white/[0.06] hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 md:h-10 md:px-4',
        sm: 'h-9 rounded-[10px] px-3 text-xs',
        lg: 'h-12 px-8 text-[15px]',
        icon: 'h-11 w-11 md:h-10 md:w-10',
        'icon-sm': 'h-9 w-9 rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
