'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  PenIcon,
  ClipboardCheckIcon,
  MessageCircleIcon,
} from '@/components/icons';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/about', label: 'About', icon: UserIcon },
  { href: '/articles', label: 'Articles', icon: PenIcon },
  { href: '/survey', label: 'Survey', icon: ClipboardCheckIcon },
  { href: '/forum', label: 'Discussion', icon: MessageCircleIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`bottom-nav-link ${isActive ? 'bottom-nav-link--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="bottom-nav-label">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
