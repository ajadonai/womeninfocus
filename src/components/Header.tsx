'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/survey', label: 'Survey' },
  { href: '/forum', label: 'Share Your Story' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-border-secondary"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
      }}
    >
      <div className="container-wide flex items-center justify-between h-16">
        {/* Site Name */}
        <Link
          href="/"
          className="font-serif text-ink-primary hover:text-wine-800 transition-colors"
          style={{ fontSize: '1.15rem', letterSpacing: '-0.02em', fontWeight: 700 }}
        >
          Amala Okafor
        </Link>

        {/* Desktop Nav — hidden on mobile (bottom nav handles it) */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-4 py-2 rounded-lg font-sans transition-all duration-200
                  ${isActive
                    ? 'text-wine-800 bg-wine-50 font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-secondary font-medium'
                  }
                `}
                style={{ fontSize: '0.875rem' }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 w-5 rounded-full bg-wine-800"
                    style={{ bottom: 3, height: 2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right — theme toggle only */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
