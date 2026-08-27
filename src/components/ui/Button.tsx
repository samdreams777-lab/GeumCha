import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'outline-gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses = {
  primary:
    'bg-seoul-red text-seoul-text hover:bg-seoul-red/90 active:bg-seoul-red focus-visible:ring-2 focus-visible:ring-seoul-red',
  secondary:
    'bg-seoul-surface text-seoul-text border border-seoul-text-muted/30 hover:bg-seoul-text-muted/10 active:bg-seoul-text-muted/20',
  ghost: 'bg-transparent text-seoul-text hover:bg-seoul-text-muted/10 active:bg-seoul-text-muted/20',
  cta: 'bg-seoul-gold text-seoul-black hover:bg-seoul-gold/90 font-semibold px-6 py-3.5 text-lg',
  'outline-gold': 'border-2 border-seoul-gold text-seoul-gold hover:bg-seoul-gold/10 active:bg-seoul-gold/20',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm min-h-[44px]',
  md: 'px-5 py-3 text-base min-h-[44px]',
  lg: 'px-6 py-3.5 text-lg min-h-[48px]',
};

export const buttonBaseClass = (variant: keyof typeof variantClasses = 'primary', size: keyof typeof sizeClasses = 'md', extra = '') =>
  `inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${extra}`;

interface ButtonLinkProps {
  to: string;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
  children: ReactNode;
}

// Link styled as a button (replacement for asChild pattern)
export function ButtonLink({ to, variant = 'primary', size = 'md', className = '', children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonBaseClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', className = '', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonBaseClass(variant, size, className)}
        disabled={disabled || loading}
        {...props}
      >
        {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        {loading && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 10" strokeLinecap="round" />
          </svg>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';