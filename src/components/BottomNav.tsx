'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  PenIcon,
  ClipboardCheckIcon,
  MessageCircleIcon,
} from '@/components/icons';

const NAV_ITEMS = [
  { href: '/', label: 'About', icon: UserIcon },
  { href: '/articles', label: 'Articles', icon: PenIcon },
  { href: '/survey', label: 'Survey', icon: ClipboardCheckIcon },
  { href: '/forum', label: 'Stories', icon: MessageCircleIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'color-mix(in srgb, var(--bg-card) 92%, transparent)',
        borderTop: '1px solid var(--border-secondary)',
        boxShadow: '0 -4px 20px -4px rgba(45, 32, 36, 0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around" style={{ height: 58 }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-150"
              style={{ color: isActive ? 'var(--wine-800)' : 'var(--ink-faint)' }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                className="font-sans"
                style={{
                  fontSize: '0.625rem',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
