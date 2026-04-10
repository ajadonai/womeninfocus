import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MailIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  HeartIcon,
  MessageCircleIcon,
  UserIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Women in Focus — Research & Advocacy',
  description:
    'A research and advocacy platform focused on legal and policy analysis at the intersection of gender, public health, and governance.',
  openGraph: {
    title: 'Women in Focus — Research & Advocacy',
    description: 'Advancing accountability, strengthening institutions, and promoting equitable outcomes for women.',
  },
};

const PILLARS = [
  {
    num: '01',
    title: 'Legal & policy analysis',
    desc: 'Examining systemic challenges through evidence-based research and comparative legal insights to inform policy and strengthen governance.',
    accent: 'var(--sage)',
  },
  {
    num: '02',
    title: 'Public health & equity',
    desc: 'Investigating maternal health, institutional accountability, and rights-based frameworks to drive meaningful change for women and vulnerable populations.',
    accent: 'var(--plum)',
  },
  {
    num: '03',
    title: 'Advocacy & reform',
    desc: 'Translating research into actionable policy recommendations, systemic reform proposals, and frameworks that promote equitable outcomes.',
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
    title: 'Maternal health & governance',
    desc: 'Analysing systemic failures in maternal healthcare and building rights-based frameworks for accountability.',
    accent: 'var(--wine-800)',
  },
  {
    title: 'Gender, negotiation & work',
    desc: 'Research on how women navigate negotiation, career advancement, and the structural barriers they face.',
    accent: 'var(--plum)',
  },
  {
    title: 'Cross-cultural policy',
    desc: 'Comparative analysis across Nigeria, the US, and beyond — examining how legal systems shape outcomes for women.',
    accent: 'var(--sage)',
  },
  {
    title: 'Institutional reform',
    desc: 'Moving from individual strategies to systemic change — strengthening institutions and promoting transparency.',
    accent: 'var(--gold)',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ═══════════════════════════════════════════
          HERO — WHO WE ARE
          ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="container-wide hero-inner">
          <div className="hero-grid">
            {/* Left — Copy */}
            <div className="hero-copy">
              <p className="section-label hero-label">
                Research&ensp;·&ensp;Policy&ensp;·&ensp;Advocacy
              </p>

              <h1 className="hero-heading">
                Advancing women through{' '}
                <em className="hero-accent">research &amp;&nbsp;policy</em>
              </h1>

              <p className="hero-body">
                We are a research and advocacy platform focused on legal and
                policy analysis at the intersection of gender, public health,
                and governance. Our work examines systemic challenges using
                evidence-based research and comparative insights to inform
                policy, strengthen systems, and drive meaningful change.
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
                  Accountability is not a luxury. It is the minimum standard
                  we owe to every woman whose life depends on the systems
                  we build.
                </p>
                <footer className="hero-quote-footer">
                  <p className="hero-quote-name">Women in Focus</p>
                  <p className="hero-quote-role">Research &amp; Advocacy</p>
                </footer>
              </blockquote>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BEHIND THE WORK
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Behind the work</p>
          <h2 className="section-heading">Meet the founder</h2>

          <div className="founder-card card card-static">
            <div className="founder-avatar">
              <UserIcon size={24} />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Amalachukwu Shalom Okafor</h3>
              <p className="founder-role">Legal Scholar &amp; Research Leader</p>
              <p className="founder-bio">
                Amalachukwu Shalom Okafor is a legal scholar and research leader
                with experience at institutions including Harvard University and
                the Massachusetts Institute of Technology (MIT). Her work spans
                law, policy, and technology, with a focus on governance systems,
                maternal health, and rights-based frameworks. She has led complex
                research initiatives, developed policy-driven analysis, and
                published on issues of legal accountability, systemic reform,
                and public health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR MISSION
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <div className="cta-banner wine-gradient">
            <div className="cta-content">
              <div className="cta-copy">
                <div className="cta-eyebrow">
                  <HeartIcon size={14} />
                  <span>Our mission</span>
                </div>
                <h3 className="cta-heading">
                  Rigorous research. Clear&nbsp;analysis. Equitable&nbsp;outcomes.
                </h3>
                <p className="cta-body">
                  Our mission is to produce rigorous research and clear policy
                  analysis that advances accountability, strengthens institutions,
                  and promotes equitable outcomes&thinsp;&mdash;&thinsp;particularly
                  for women and vulnerable populations.
                </p>
              </div>
            </div>
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
          OUR WORKSTREAMS
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
