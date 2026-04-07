'use client';

import { useTheme } from '@/components/ThemeProvider';
import { SunIcon, MoonIcon } from '@/components/icons';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center
        w-10 h-10
        rounded-lg
        bg-transparent
        text-ink-secondary
        hover:bg-bg-secondary hover:text-ink-primary
        transition-all duration-200
        cursor-pointer
        ${className}
      `}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      type="button"
    >
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: theme === 'light' ? 1 : 0,
          transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
        }}
      >
        <SunIcon size={18} />
      </span>
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: theme === 'dark' ? 1 : 0,
          transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
        }}
      >
        <MoonIcon size={18} />
      </span>
    </button>
  );
}
