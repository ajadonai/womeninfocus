import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MailIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  HeartIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Amala Okafor — Research & Advocacy',
  description:
    "Amala Okafor is a researcher studying women's negotiation skills, AI equity, and career outcomes.",
  openGraph: {
    title: 'Amala Okafor — Research & Advocacy',
    description: "Advancing women through research & technology.",
  },
};

const PILLARS = [
  {
    num: '01',
    title: 'Survey research',
    desc: 'Large-scale surveys exploring how women approach salary negotiation, promotion asks, and workplace advocacy across industries.',
    color: '#7A9E7E',
  },
  {
    num: '02',
    title: 'AI & equity',
    desc: 'Investigating how AI tools can either widen or close the negotiation gap — from coaching bots to biased hiring algorithms.',
    color: '#8B5E83',
  },
  {
    num: '03',
    title: 'Advocacy',
    desc: 'Translating research into actionable frameworks, workshops, and policy recommendations that empower women at every career stage.',
    color: '#C49A6C',
  },
];

const STATS = [
  { value: '6+', label: 'Publications' },
  { value: '500+', label: 'Survey responses' },
  { value: '2', label: 'Countries' },
  { value: '1', label: 'Mission' },
];

const FOCUS_AREAS = [
  {
    title: 'Women & negotiation',
    desc: 'Why women negotiate less, what happens when they do, and how to change the default.',
    color: '#722F37',
  },
  {
    title: 'AI in career equity',
    desc: 'Can AI coaching tools actually help — or do they replicate the same biases?',
    color: '#8B5E83',
  },
  {
    title: 'Cross-cultural dynamics',
    desc: 'Comparing workplace negotiation norms between Nigeria, the US, and beyond.',
    color: '#7A9E7E',
  },
  {
    title: 'Policy & systemic change',
    desc: 'Moving from individual strategies to institutional reform and pay transparency.',
    color: '#C49A6C',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section
        style={{ background: 'var(--bg-hero)' }}
      >
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <p className="section-label mb-5">
                Researcher · Advocate · Writer
              </p>
              <h1
                className="font-serif text-ink-primary mb-7"
                style={{
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.04em',
                  fontWeight: 700,
                }}
              >
                Advancing women<br />
                through{' '}
                <span
                  className="italic"
                  style={{
                    color: 'var(--wine-700)',
                    textDecorationLine: 'underline',
                    textDecorationColor: 'var(--wine-200)',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '8px',
                    textDecorationStyle: 'solid',
                  }}
                >
                  research &amp;<br />technology
                </span>
              </h1>
              <p
                className="text-ink-secondary mb-10"
                style={{ fontSize: '1.125rem', lineHeight: 1.8, maxWidth: 480 }}
              >
                I study how women negotiate, how AI shapes career equity, and what
                it takes to close the gap. My work bridges data, lived experience,
                and policy.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="mailto:amalaokafor01@gmail.com" className="btn-primary">
                  <MailIcon size={16} />
                  Get in touch
                </a>
                <Link href="/articles" className="btn-outline">
                  Read my work
                  <ChevronRightIcon size={16} />
                </Link>
              </div>
            </div>

            {/* Right — Quote Card */}
            <div className="relative hidden lg:block">
              {/* Decorative offset */}
              <div
                className="absolute"
                style={{
                  top: 12,
                  left: 12,
                  right: -12,
                  bottom: -12,
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(145deg, var(--wine-100), var(--wine-200))',
                  zIndex: 0,
                }}
              />
              <div
                className="relative"
                style={{
                  zIndex: 1,
                  padding: '2.25rem',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-secondary)',
                }}
              >
                <p
                  className="font-serif"
                  style={{ fontSize: '4.5rem', lineHeight: 0.7, color: 'var(--wine-200)', marginBottom: '0.75rem' }}
                >
                  &ldquo;
                </p>
                <p
                  className="font-serif italic"
                  style={{ fontSize: '1.1875rem', lineHeight: 1.65, color: 'var(--ink-secondary)', marginBottom: '1.75rem' }}
                >
                  Negotiation isn&apos;t a soft skill — it&apos;s an economic lever.
                  And right now, that lever is broken for half the workforce.
                </p>
                <div style={{ borderTop: '1px solid var(--border-secondary)', paddingTop: '1.25rem' }}>
                  <p className="font-sans" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink-primary)' }}>
                    Amala Okafor
                  </p>
                  <p className="font-sans" style={{ fontSize: '0.8rem', color: 'var(--ink-tertiary)' }}>
                    Researcher &amp; Advocate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle divider */}
      <div className="container-wide">
        <div style={{ width: 48, height: 3, borderRadius: 999, background: 'var(--wine-300)', margin: '0 0 3rem' }} />
      </div>

      {/* ═══════════════════════════════════════════
          RESEARCH PILLARS
          ═══════════════════════════════════════════ */}
      <section className="container-wide mb-24">
        <p className="section-label">Foundation</p>
        <h2
          className="font-serif text-ink-primary mb-10"
          style={{ fontSize: '1.875rem', letterSpacing: '-0.03em' }}
        >
          Research pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="card"
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                  background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                }}
              />
              {/* Number badge */}
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 44, height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: `color-mix(in srgb, ${p.color} 12%, transparent)`,
                  color: p.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {p.num}
              </div>
              <h3 className="font-serif text-ink-primary mb-3" style={{ fontSize: '1.1875rem', fontWeight: 600 }}>
                {p.title}
              </h3>
              <p className="text-ink-tertiary" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════ */}
      <section className="container-wide mb-24">
        <p className="section-label">Impact</p>
        <h2
          className="font-serif text-ink-primary mb-10"
          style={{ fontSize: '1.875rem', letterSpacing: '-0.03em' }}
        >
          By the numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                padding: '2rem 1.25rem',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-secondary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: '2.5rem', fontWeight: 700,
                  color: 'var(--wine-800)', lineHeight: 1,
                  letterSpacing: '-0.04em', marginBottom: '0.5rem',
                }}
              >
                {s.value}
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-tertiary)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT I WRITE ABOUT
          ═══════════════════════════════════════════ */}
      <section className="container-wide mb-24">
        <p className="section-label">Themes</p>
        <h2
          className="font-serif text-ink-primary mb-10"
          style={{ fontSize: '1.875rem', letterSpacing: '-0.03em' }}
        >
          What I write about
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FOCUS_AREAS.map((a) => (
            <div
              key={a.title}
              className="card card-static"
              style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              {/* Color dot with ring */}
              <div
                className="flex-shrink-0"
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  backgroundColor: a.color, marginTop: 4,
                  boxShadow: `0 0 0 4px color-mix(in srgb, ${a.color} 15%, transparent)`,
                }}
              />
              <div>
                <h4 className="font-serif text-ink-primary mb-2" style={{ fontSize: '1.0625rem', fontWeight: 600 }}>
                  {a.title}
                </h4>
                <p className="text-ink-tertiary" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SURVEY CTA
          ═══════════════════════════════════════════ */}
      <section className="container-wide mb-24">
        <div
          className="wine-gradient"
          style={{
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-wine)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HeartIcon size={15} className="text-white/50" />
                <span className="font-mono text-white/50" style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Active research
                </span>
              </div>
              <h3 className="font-serif text-white mb-3" style={{ fontSize: '1.625rem', letterSpacing: '-0.02em' }}>
                Your voice shapes the research.
              </h3>
              <p className="text-white/75" style={{ fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: 440 }}>
                Take the 3-minute anonymous survey and help us understand how
                women negotiate in the age of AI.
              </p>
            </div>
            <Link
              href="/survey"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-sans font-semibold flex-shrink-0"
              style={{
                fontSize: '0.9375rem',
                borderRadius: 'var(--radius-md)',
                background: '#fff',
                color: 'var(--wine-800)',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 250ms ease',
              }}
            >
              <ClipboardCheckIcon size={16} />
              Take the survey
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESUME / CV
          ═══════════════════════════════════════════ */}
      <section className="container-wide mb-24">
        <p className="section-label">Documents</p>
        <h2
          className="font-serif text-ink-primary mb-10"
          style={{ fontSize: '1.875rem', letterSpacing: '-0.03em' }}
        >
          Resume / CV
        </h2>
        <div
          className="flex items-center justify-between max-w-xl"
          style={{
            padding: '1.5rem 1.75rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-card)',
            border: '2px dashed var(--border-primary)',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--wine-50)', color: 'var(--wine-400)' }}
            >
              <FileTextIcon size={22} />
            </div>
            <div>
              <h4 className="font-serif text-ink-primary" style={{ fontSize: '1.0625rem', fontWeight: 600 }}>
                Curriculum vitae
              </h4>
              <p className="text-ink-tertiary" style={{ fontSize: '0.85rem' }}>
                Downloadable resume coming soon.
              </p>
            </div>
          </div>
          <span
            className="font-mono text-ink-faint"
            style={{
              fontSize: '0.6875rem', padding: '0.35rem 0.85rem',
              borderRadius: 999, border: '1px solid var(--border-secondary)',
              background: 'var(--bg-secondary)',
            }}
          >
            Pending
          </span>
        </div>
      </section>
    </div>
  );
}
