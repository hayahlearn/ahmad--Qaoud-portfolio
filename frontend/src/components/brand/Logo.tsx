import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'accent';
  showText?: boolean;
}

export function Logo({ className, size = 'md', variant = 'default', showText = true }: LogoProps) {
  const { language } = useLanguage();

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const taglineSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  };

  const arabicLetterSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className={cn('flex items-center gap-3 group', className)}>
      {/* Logo Mark - Updated with Arabic letters */}
      <div className={cn('relative', sizeClasses[size])}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform"
        >
          <defs>
            <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect x="5" y="5" width="90" height="90" rx="22" fill="url(#logoGrad2)" stroke="url(#goldGrad2)" strokeWidth="2" />

          {/* A Shape */}
          <path d="M30 75 L50 25 L70 75" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          {/* Q Crossbar/Accent - The Golden Bridge */}
          <path d="M38 60 H62" stroke="url(#goldGrad2)" strokeWidth="5" strokeLinecap="round" />

          {/* Q Tail / Tech Dot */}
          <circle cx="70" cy="75" r="5" fill="url(#goldGrad2)" />
        </svg>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-amber-400 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Text - Now supports Arabic */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            'font-bold tracking-tight leading-none',
            textSizeClasses[size],
            variant === 'white' ? 'text-white' : 'text-foreground'
          )}>
            {language === 'ar' ? 'أحمد قاعود' : 'Ahmad Qaoud'}
          </span>
          <span className={cn(
            'font-medium tracking-wide',
            taglineSizeClasses[size],
            variant === 'white' ? 'text-white/80' : 'text-accent'
          )}>
            {language === 'ar' ? 'نصنع القيمة' : 'We Create Value'}
          </span>
        </div>
      )}
    </div>
  );
}

// Icon-only version
export function LogoIcon({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'white' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full drop-shadow-sm', className)}
    >
      <defs>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="22"
        fill={variant === 'white' ? 'white' : 'url(#iconGrad)'}
        stroke={variant === 'white' ? 'none' : 'url(#iconGold)'}
        strokeWidth={variant === 'white' ? '0' : '2'}
      />

      {/* A Shape */}
      <path
        d="M30 75 L50 25 L70 75"
        stroke={variant === 'white' ? '#0f172a' : 'white'}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Q Crossbar/Accent */}
      <path
        d="M38 60 H62"
        stroke={variant === 'white' ? '#d97706' : 'url(#iconGold)'}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Q Tail / Tech Dot */}
      <circle
        cx="70"
        cy="75"
        r="5"
        fill={variant === 'white' ? '#d97706' : 'url(#iconGold)'}
      />
    </svg>
  );
}
