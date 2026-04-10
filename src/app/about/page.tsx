import Link from 'next/link';
import {
  MailIcon,
  ChevronRightIcon,
  HeartIcon,
  UserIcon,
} from '@/components/icons';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ═══════════════════════════════════════════
          WHO WE ARE
          ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="container-wide hero-inner">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="section-label hero-label">
                About Us
              </p>

              <h1 className="hero-heading">
                Who we{' '}
                <em className="hero-accent">are</em>
              </h1>

              <p className="hero-body">
                We are a research and advocacy platform focused on legal and
                policy analysis at the intersection of gender, public health,
                and governance. Our work examines systemic challenges&thinsp;&mdash;&thinsp;from
                maternal health to institutional accountability&thinsp;&mdash;&thinsp;using
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
          WHAT DRIVES US
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="container-wide">
          <p className="section-label">Values</p>
          <h2 className="section-heading">What drives us</h2>

          <div className="pillars-grid">
            {[
              {
                num: '01',
                title: 'Evidence over opinion',
                desc: 'Every claim we make is grounded in data, legal analysis, and peer-reviewed research. We let the evidence lead.',
                accent: 'var(--sage)',
              },
              {
                num: '02',
                title: 'Accountability',
                desc: 'We believe institutions must answer for systemic failures — especially when lives are at stake.',
                accent: 'var(--plum)',
              },
              {
                num: '03',
                title: 'Equity & inclusion',
                desc: 'Our work centres the experiences of women and vulnerable populations who are most affected by policy gaps.',
                accent: 'var(--gold)',
              },
            ].map((p) => (
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
    </div>
  );
}
