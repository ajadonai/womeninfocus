'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  PenIcon,
  UserIcon,
  ClipboardCheckIcon,
  MessageCircleIcon,
  MailIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  FileTextIcon,
  TrashIcon,
  GlobeIcon,
  LinkedInIcon,
  TwitterIcon,
  ScholarIcon,
  MenuIcon,
  XIcon,
} from '@/components/icons';

const TAGS = ['Women & Work', 'AI & Equity', 'Negotiation', 'Research', 'Leadership', 'Policy'];

const WINE_SHADES = [
  { name: '50', var: 'var(--wine-50)' },
  { name: '100', var: 'var(--wine-100)' },
  { name: '200', var: 'var(--wine-200)' },
  { name: '300', var: 'var(--wine-300)' },
  { name: '400', var: 'var(--wine-400)' },
  { name: '500', var: 'var(--wine-500)' },
  { name: '600', var: 'var(--wine-600)' },
  { name: '700', var: 'var(--wine-700)' },
  { name: '800', var: 'var(--wine-800)' },
  { name: '900', var: 'var(--wine-900)' },
  { name: '950', var: 'var(--wine-950)' },
];

const ACCENTS = [
  { name: 'Sage', var: 'var(--sage)' },
  { name: 'Plum', var: 'var(--plum)' },
  { name: 'Gold', var: 'var(--gold)' },
  { name: 'Sky', var: 'var(--sky)' },
  { name: 'Coral', var: 'var(--coral)' },
];

const ALL_ICONS = [
  { name: 'Pen', icon: PenIcon },
  { name: 'User', icon: UserIcon },
  { name: 'Clipboard', icon: ClipboardCheckIcon },
  { name: 'Message', icon: MessageCircleIcon },
  { name: 'Mail', icon: MailIcon },
  { name: 'Heart', icon: HeartIcon },
  { name: 'Share', icon: ShareIcon },
  { name: 'Bookmark', icon: BookmarkIcon },
  { name: 'Search', icon: SearchIcon },
  { name: 'Arrow Up', icon: ArrowUpIcon },
  { name: 'Arrow Down', icon: ArrowDownIcon },
  { name: 'External', icon: ExternalLinkIcon },
  { name: 'Chevron', icon: ChevronRightIcon },
  { name: 'Calendar', icon: CalendarIcon },
  { name: 'Clock', icon: ClockIcon },
  { name: 'Tag', icon: TagIcon },
  { name: 'File', icon: FileTextIcon },
  { name: 'Trash', icon: TrashIcon },
  { name: 'Globe', icon: GlobeIcon },
  { name: 'LinkedIn', icon: LinkedInIcon },
  { name: 'X / Twitter', icon: TwitterIcon },
  { name: 'Scholar', icon: ScholarIcon },
  { name: 'Menu', icon: MenuIcon },
  { name: 'Close', icon: XIcon },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-ink-primary mb-2"
      style={{ fontSize: '1.5rem', letterSpacing: '-0.025em' }}
    >
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink-tertiary mb-6" style={{ fontSize: '0.9375rem' }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-border-secondary my-12" />;
}

export default function DesignSystemPage() {
  const [activeTag, setActiveTag] = useState('Negotiation');

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-200">
      {/* ── Header Bar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border-secondary bg-bg-primary/80"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-serif text-ink-primary font-semibold"
            style={{ fontSize: '1.125rem', letterSpacing: '-0.02em' }}
          >
            Amala Okafor
          </span>
          <span
            className="text-ink-faint font-mono"
            style={{ fontSize: '0.75rem' }}
          >
            Design System v1
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container-wide py-12">
        {/* ═══ Intro ═══ */}
        <div className="mb-16">
          <h1
            className="font-serif text-ink-primary mb-3"
            style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Design System
          </h1>
          <p className="text-ink-secondary" style={{ fontSize: '1.125rem', maxWidth: 600, lineHeight: 1.7 }}>
            The visual foundation for Amala Okafor&apos;s research platform. 
            Wine-forward palette, editorial typography, mature SVG iconography.
            Toggle dark mode above to preview both themes.
          </p>
        </div>

        {/* ═══ Color — Wine Palette ═══ */}
        <section>
          <SectionTitle>Wine Palette</SectionTitle>
          <SectionDesc>Primary accent scale from light blush to deep wine.</SectionDesc>
          <div className="flex flex-wrap gap-3 mb-8">
            {WINE_SHADES.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-lg shadow-sm border border-border-secondary"
                  style={{ backgroundColor: s.var }}
                />
                <span className="font-mono text-ink-tertiary" style={{ fontSize: '0.6875rem' }}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          <SectionTitle>Accent Colors</SectionTitle>
          <SectionDesc>Supporting accents for tags, categories, and visual variety.</SectionDesc>
          <div className="flex flex-wrap gap-3 mb-4">
            {ACCENTS.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-lg shadow-sm border border-border-secondary"
                  style={{ backgroundColor: a.var }}
                />
                <span className="font-mono text-ink-tertiary" style={{ fontSize: '0.6875rem' }}>
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══ Backgrounds & Surfaces ═══ */}
        <section>
          <SectionTitle>Backgrounds &amp; Surfaces</SectionTitle>
          <SectionDesc>Layered surface system for depth and hierarchy.</SectionDesc>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Primary', var: 'var(--bg-primary)' },
              { name: 'Secondary', var: 'var(--bg-secondary)' },
              { name: 'Card', var: 'var(--bg-card)' },
              { name: 'Elevated', var: 'var(--bg-elevated)' },
            ].map((bg) => (
              <div
                key={bg.name}
                className="h-24 rounded-lg border border-border-secondary flex items-end p-3"
                style={{ backgroundColor: bg.var }}
              >
                <span className="font-mono text-ink-tertiary" style={{ fontSize: '0.75rem' }}>
                  {bg.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══ Typography ═══ */}
        <section>
          <SectionTitle>Typography</SectionTitle>
          <SectionDesc>
            Playfair Display for headings. Source Sans 3 for body. JetBrains Mono for code.
          </SectionDesc>

          <div className="space-y-6 mb-8">
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                H1 — Playfair Display 600 / 2.25rem
              </span>
              <h1 className="text-ink-primary">Advancing Women Through Research</h1>
            </div>
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                H2 — Playfair Display 600 / 1.875rem
              </span>
              <h2 className="text-ink-primary">The Negotiation Gap</h2>
            </div>
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                H3 — Playfair Display 600 / 1.5rem
              </span>
              <h3 className="text-ink-primary">AI Equity in Career Outcomes</h3>
            </div>
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                H4 — Playfair Display 600 / 1.25rem
              </span>
              <h4 className="text-ink-primary">Survey Methodology</h4>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                Body — Source Sans 3 400 / 1rem
              </span>
              <p style={{ maxWidth: 600 }}>
                Women who negotiate their starting salary earn on average $1 million more 
                over the course of their careers. Yet research shows that women are 
                significantly less likely to initiate negotiations than their male counterparts.
              </p>
            </div>
            <div>
              <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
                Small — Source Sans 3 400 / 0.875rem
              </span>
              <p className="text-ink-tertiary" style={{ fontSize: '0.875rem', maxWidth: 600 }}>
                Published March 2026 · 8 min read · Women &amp; Work, AI &amp; Equity
              </p>
            </div>
          </div>

          <div>
            <span className="font-mono text-ink-faint block mb-1" style={{ fontSize: '0.6875rem' }}>
              Code — JetBrains Mono 400 / 0.875rem
            </span>
            <code
              className="inline-block px-3 py-2 rounded-md bg-bg-secondary text-wine-800 border border-border-secondary"
              style={{ fontSize: '0.875rem' }}
            >
              const gap = womenNegotiate / menNegotiate;
            </code>
          </div>
        </section>

        <Divider />

        {/* ═══ Buttons ═══ */}
        <section>
          <SectionTitle>Buttons</SectionTitle>
          <SectionDesc>Four variants across three sizes.</SectionDesc>

          <div className="space-y-6">
            <div>
              <span className="font-mono text-ink-faint block mb-3" style={{ fontSize: '0.6875rem' }}>
                Variants
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <span className="font-mono text-ink-faint block mb-3" style={{ fontSize: '0.6875rem' }}>
                Sizes
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <span className="font-mono text-ink-faint block mb-3" style={{ fontSize: '0.6875rem' }}>
                With Icons
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">
                  <MailIcon size={16} /> Contact
                </Button>
                <Button variant="secondary" size="md">
                  <ShareIcon size={16} /> Share
                </Button>
                <Button variant="outline" size="md">
                  <BookmarkIcon size={16} /> Save
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLinkIcon size={14} /> View Source
                </Button>
              </div>
            </div>

            <div>
              <span className="font-mono text-ink-faint block mb-3" style={{ fontSize: '0.6875rem' }}>
                Disabled
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ═══ Tags ═══ */}
        <section>
          <SectionTitle>Tags</SectionTitle>
          <SectionDesc>Filter chips for article categories. Click to toggle.</SectionDesc>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                active={tag === activeTag}
                onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
              />
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══ Cards ═══ */}
        <section>
          <SectionTitle>Cards</SectionTitle>
          <SectionDesc>Content containers with hover elevation.</SectionDesc>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            {/* Article card preview */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag label="AI & Equity" />
                <span className="text-ink-faint font-mono" style={{ fontSize: '0.75rem' }}>
                  Mar 2026
                </span>
              </div>
              <h4 className="font-serif text-ink-primary mb-2" style={{ fontSize: '1.125rem' }}>
                Can AI Close the Negotiation Gap?
              </h4>
              <p className="text-ink-tertiary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                Exploring how AI-powered coaching tools might help women 
                develop stronger negotiation strategies in the workplace.
              </p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border-secondary">
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                  <ArrowUpIcon size={14} /> 42
                </span>
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                  <MessageCircleIcon size={14} /> 8
                </span>
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                  <ClockIcon size={14} /> 6 min
                </span>
              </div>
            </div>

            {/* Forum post card preview */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag label="Negotiation" />
                <span className="text-ink-faint font-mono" style={{ fontSize: '0.75rem' }}>
                  2 days ago
                </span>
              </div>
              <h4 className="font-serif text-ink-primary mb-2" style={{ fontSize: '1.125rem' }}>
                My First Salary Negotiation
              </h4>
              <p className="text-ink-tertiary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                I finally asked for a raise after three years. Here&apos;s what 
                happened and what I wish I&apos;d known going in.
              </p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border-secondary">
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                  <HeartIcon size={14} /> 24
                </span>
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                  <MessageCircleIcon size={14} /> 11
                </span>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ═══ Icons ═══ */}
        <section>
          <SectionTitle>Iconography</SectionTitle>
          <SectionDesc>24 custom SVG line icons. Consistent 1.8px stroke, 24×24 viewBox.</SectionDesc>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {ALL_ICONS.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-bg-secondary transition-colors"
              >
                <Icon size={22} className="text-ink-secondary" />
                <span className="font-mono text-ink-faint text-center" style={{ fontSize: '0.625rem' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══ Ink Scale ═══ */}
        <section>
          <SectionTitle>Text Hierarchy</SectionTitle>
          <SectionDesc>Five-level ink scale for consistent text contrast.</SectionDesc>
          <div className="space-y-3">
            {[
              { name: 'ink-primary', label: 'Primary — Headings, emphasis', cls: 'text-ink-primary' },
              { name: 'ink-secondary', label: 'Secondary — Body text, descriptions', cls: 'text-ink-secondary' },
              { name: 'ink-tertiary', label: 'Tertiary — Metadata, captions', cls: 'text-ink-tertiary' },
              { name: 'ink-faint', label: 'Faint — Timestamps, subtle labels', cls: 'text-ink-faint' },
              { name: 'ink-ghost', label: 'Ghost — Borders, dividers, placeholders', cls: 'text-ink-ghost' },
            ].map((ink) => (
              <div key={ink.name} className="flex items-center gap-4">
                <span className={`font-sans font-medium ${ink.cls}`} style={{ fontSize: '1rem', minWidth: 240 }}>
                  {ink.label}
                </span>
                <span className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
                  {ink.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══ Wine Gradient ═══ */}
        <section>
          <SectionTitle>Gradient &amp; Special Surfaces</SectionTitle>
          <SectionDesc>Wine gradient for hero sections and CTAs.</SectionDesc>
          <div className="wine-gradient rounded-xl p-8 max-w-xl">
            <h3 className="font-serif text-white mb-2" style={{ fontSize: '1.5rem' }}>
              Your voice shapes the research.
            </h3>
            <p className="text-white/80 mb-5" style={{ fontSize: '0.9375rem' }}>
              Take the 3-minute survey and contribute to understanding 
              how women negotiate in the age of AI.
            </p>
            <Button
              variant="outline"
              className="!border-white/40 !text-white hover:!bg-white/10"
            >
              Take the Survey <ChevronRightIcon size={16} />
            </Button>
          </div>
        </section>

        <Divider />

        {/* ═══ Spacing Reference ═══ */}
        <section className="mb-16">
          <SectionTitle>Spacing Scale</SectionTitle>
          <SectionDesc>Consistent spacing using rem-based tokens.</SectionDesc>
          <div className="flex items-end gap-3 flex-wrap">
            {[
              { label: '4', size: '1rem' },
              { label: '6', size: '1.5rem' },
              { label: '8', size: '2rem' },
              { label: '10', size: '2.5rem' },
              { label: '12', size: '3rem' },
              { label: '16', size: '4rem' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div
                  className="bg-wine-200 rounded"
                  style={{ width: s.size, height: s.size }}
                />
                <span className="font-mono text-ink-faint" style={{ fontSize: '0.625rem' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Footer ═══ */}
        <footer className="text-center py-8 border-t border-border-secondary">
          <p className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
            Amala Okafor · Design System · Phase 1
          </p>
        </footer>
      </main>
    </div>
  );
}
