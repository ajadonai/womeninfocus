'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MenuIcon, XIcon, MailIcon } from '@/components/icons';

const NAV_LINKS = [
  { href: '/', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/survey', label: 'Survey' },
  { href: '/forum', label: 'Share Your Story' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border-secondary"
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
        }}
      >
        <div className="container-wide flex items-center justify-between h-16">
          {/* ── Site Name ── */}
          <Link
            href="/"
            className="font-serif font-semibold text-ink-primary hover:text-wine-800 transition-colors"
            style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}
          >
            Amala Okafor
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'text-wine-800 bg-wine-50'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-secondary'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-wine-800"
                      style={{ bottom: '2px' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-secondary hover:bg-bg-secondary hover:text-ink-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-bg-card border-b border-border-secondary shadow-lg"
            style={{ animation: 'slideDown 200ms ease-out' }}
          >
            <nav className="flex flex-col py-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      px-6 py-3.5 text-base font-medium transition-colors
                      ${isActive
                        ? 'text-wine-800 bg-wine-50'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-secondary'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Contact in mobile menu */}
            <div className="px-6 py-4 border-t border-border-secondary">
              <a
                href="mailto:amalaokafor01@gmail.com"
                className="flex items-center gap-2 text-sm text-ink-tertiary hover:text-wine-800 transition-colors"
              >
                <MailIcon size={15} />
                <span className="font-mono" style={{ fontSize: '0.8125rem' }}>
                  amalaokafor01@gmail.com
                </span>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Slide-down animation */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
