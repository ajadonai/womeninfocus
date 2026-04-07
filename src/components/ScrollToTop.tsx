'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@/components/icons';

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className="fixed z-40 right-5 w-10 h-10 rounded-full bg-bg-card border border-border-secondary text-ink-secondary hover:text-wine-800 hover:border-wine-300 transition-all duration-200 flex items-center justify-center cursor-pointer"
      style={{
        bottom: 'max(1.5rem, calc(5rem + env(safe-area-inset-bottom, 0px)))',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <ArrowUpIcon size={16} />
    </button>
  );
}
