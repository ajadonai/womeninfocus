import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MailIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  HeartIcon,
  MessageCircleIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Women in Focus — Research & Advocacy',
  description:
    "Women in Focus explores women's negotiation skills, AI equity, and career outcomes through research and advocacy.",
  openGraph: {
    title: 'Women in Focus — Research & Advocacy',
    description: "Advancing women through research & technology.",
  },
};

const PILLARS = [
  {
    num: '01',
    title: 'Survey research',
    desc: 'Large-scale surveys exploring how women approach salary negotiation, promotion asks, and workplace advocacy across industries.',
    accent: 'var(--sage)',
  },
  {
    num: '02',
    title: 'AI & equity',
    desc: 'Investigating how AI tools can either widen or close the negotiation gap\u2009—\u2009from coaching bots to biased hiring algorithms.',
    accent: 'var(--plum)',
  },
  {
    num: '03',
    title: 'Advocacy',
    desc: 'Translating research into actionable frameworks, workshops, and policy recommendations that empower women at every career stage.',
    accent: 'var(--gold)',
  },
];

const STATS = [
  { value: '6+', label: 'Publications' },
  { value: '500+', label: 'Survey responses' },
  { value: '5', label: 'Countries' },
  { value: '1', label: 'Mission' },
];

const FOCUS_AREAS = [
  {
    title: 'Women & negotiation',
    desc: 'Why women negotiate less, what happens when they do, and how to change the default.',
    accent: 'var(--wine-800)',
  },
  {
    title: 'AI in career equity',
    desc: 'Can AI coaching tools actually help\u2009—\u2009or do they replicate the same biases?',
    accent: 'var(--plum)',
  },
  {
    title: 'Cross-cultural dynamics',
    desc: 'Comparing workplace negotiation norms between Nigeria, the US, and beyond.',
    accent: 'var(--sage)',
  },
  {
    title: 'Policy & systemic change',
    desc: 'Moving from individual strategies to institutional reform and pay transparency.',
    accent: 'var(--gold)',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="container-wide hero-inner">
          <div className="hero-grid">
            {/* Left — Copy */}
            <div className="hero-copy">
              <p className="section-label hero-label">
                Researcher&ensp;·&ensp;Advocate&ensp;·&ensp;Writer
              </p>

              <h1 className="hero-heading">
                Advancing women through{' '}
                <em className="hero-accent">research &amp;&nbsp;technology</em>
              </h1>

              <p className="hero-body">
                We study how women negotiate, how AI shapes career equity, and
                what it takes to close the gap. Our work bridges data, lived
                experience, and policy.
              </p>

              <div className="hero-actions">
                <a href="mailto:amalaokafor01@gmail.com" className="btn-primary">
                  <MailIcon size={15} />
                  Get in touch
                </a>
                <Link href="/articles" className="btn-outline">
                  Read our work
                  <ChevronRightIcon size={15} />
                </Link>
              </div>
            </div>

            {/* Right — Quote Card (desktop only) */}
            <aside className="hero-quote-wrapper">
              <div className="hero-quote-shadow" />
              <blockquote className="hero-quote">
                <p className="hero-quote-mark">&ldquo;</p>
                <p className="hero-quote-text">
                  Negotiation isn&apos;t a soft skill&thinsp;—&thinsp;it&apos;s
                  an economic lever. And right now, that lever is broken for half
                  the workforce.
                </p>
                <footer className="hero-quote-footer">
                  <p className="hero-quote-name">Amala Okafor</p>
                  <p className="hero-quote-role">Researcher &amp; Advocate</p>
                </footer>
              </blockquote>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESEARCH PILLARS
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Foundation</p>
          <h2 className="section-heading">Research pillars</h2>

          <div className="pillars-grid">
            {PILLARS.map((p) => (
              <article
                key={p.num}
                className="pillar-card card"
                style={{ '--pillar-accent': p.accent } as React.CSSProperties}
              >
                <div className="pillar-accent-bar" />
                <span className="pillar-num">{p.num}</span>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Impact</p>
          <h2 className="section-heading">By the numbers</h2>

          <div className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card">
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT I WRITE ABOUT
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Themes</p>
          <h2 className="section-heading">Our Workstreams</h2>

          <div className="themes-grid">
            {FOCUS_AREAS.map((a) => (
              <div
                key={a.title}
                className="theme-card card card-static"
                style={{ '--theme-accent': a.accent } as React.CSSProperties}
              >
                <span className="theme-dot" />
                <div>
                  <h4 className="theme-title">{a.title}</h4>
                  <p className="theme-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SURVEY CTA
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <div className="cta-banner wine-gradient">
            <div className="cta-content">
              <div className="cta-copy">
                <div className="cta-eyebrow">
                  <HeartIcon size={14} />
                  <span>Active research</span>
                </div>
                <h3 className="cta-heading">
                  Your voice shapes the&nbsp;research.
                </h3>
                <p className="cta-body">
                  Take the 3-minute anonymous survey and help us understand how
                  women negotiate in the age of&nbsp;AI.
                </p>
              </div>
              <Link href="/survey" className="cta-button">
                <ClipboardCheckIcon size={15} />
                Take the survey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMMUNITY PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Community</p>
          <h2 className="section-heading">From the discussion</h2>

          <div className="community-preview">
            {[
              { quote: 'I finally asked for a raise after three years. The key was having market data ready.', author: 'Anonymous', tag: 'Salary' },
              { quote: 'In Lagos, relationships carry more weight. In New York, it\u2019s about leverage. Both require confidence.', author: 'Anonymous', tag: 'Global' },
              { quote: 'I positioned it as a mutual win. Changed everything about how my manager responded.', author: 'S.M.', tag: 'Strategy' },
            ].map((item) => (
              <div key={item.quote} className="community-card card card-static">
                <p className="community-quote">&ldquo;{item.quote}&rdquo;</p>
                <p className="community-author">
                  {item.author}
                  <span className="community-tag">&ensp;&middot;&ensp;{item.tag}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="community-footer">
            <span className="community-stat">8 stories shared &middot; 286 hearts</span>
            <Link href="/forum" className="btn-outline community-cta">
              <MessageCircleIcon size={14} />
              Join the discussion
              <ChevronRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
