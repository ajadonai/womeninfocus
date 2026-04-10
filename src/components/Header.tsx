'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/survey', label: 'Survey' },
  { href: '/forum', label: 'Discussion' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container-wide site-header-inner">
        <Link href="/" className="site-logo" aria-label="Women in Focus — Home">
          <span className="site-logo-text">Women in Focus</span>
          <span className="site-logo-dot" aria-hidden="true" />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link ${isActive ? 'site-nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && <span className="site-nav-indicator" />}
              </Link>
            );
          })}
        </nav>

        <div className="site-header-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
