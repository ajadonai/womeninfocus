'use client';

import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-wine-800 text-white hover:bg-wine-700 active:bg-wine-900 shadow-sm hover:shadow-wine',
  secondary:
    'bg-wine-50 text-wine-800 border border-wine-200 hover:bg-wine-100 active:bg-wine-200',
  ghost:
    'bg-transparent text-ink-secondary hover:bg-bg-secondary hover:text-ink-primary active:bg-bg-card',
  outline:
    'bg-transparent text-ink-primary border border-border-primary hover:border-wine-300 hover:text-wine-800 active:bg-wine-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3 text-lg gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-sans font-semibold
          rounded-lg
          transition-all duration-200
          cursor-pointer
          select-none
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
export type { ButtonProps };
