'use client';

import { useState } from 'react';
import {
  ClipboardCheckIcon,
  ClockIcon,
  GlobeIcon,
  ShieldIcon,
  ChevronDownIcon,
  HeartIcon,
  UserIcon,
  MessageCircleIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const INFO_CARDS = [
  {
    icon: ClipboardCheckIcon,
    title: 'Focus',
    desc: 'How women approach negotiation in the workplace\u2009—\u2009salary, promotions, and everyday asks.',
    accent: 'var(--wine-800)',
    bg: 'var(--wine-50)',
  },
  {
    icon: ClockIcon,
    title: '2\u20133 minutes',
    desc: 'Short, thoughtful questions designed to capture your real experience without wasting your time.',
    accent: 'var(--plum)',
    bg: 'color-mix(in srgb, var(--plum) 10%, transparent)',
  },
  {
    icon: ShieldIcon,
    title: 'Anonymous',
    desc: 'No emails collected. No tracking. Your data shapes research, not profiles.',
    accent: 'var(--sage)',
    bg: 'color-mix(in srgb, var(--sage) 10%, transparent)',
  },
];

const STATS = [
  { value: '500+', label: 'Responses', icon: UserIcon },
  { value: '2', label: 'Countries', icon: GlobeIcon },
  { value: '92%', label: 'Completion', icon: ClipboardCheckIcon },
];

const FAQ_ITEMS = [
  {
    q: 'Who can take this survey?',
    a: 'Anyone who identifies as a woman and has experience in the workplace\u2009—\u2009regardless of industry, role, or location. We especially welcome responses from women in Nigeria and the United States.',
  },
  {
    q: 'How is my data used?',
    a: 'Your responses are aggregated and anonymized for academic research on women\u2019s negotiation patterns and career outcomes. Findings may appear in published articles, conference presentations, and policy recommendations. No individual response is ever shared.',
  },
  {
    q: 'Can I share this with others?',
    a: 'Absolutely\u2009—\u2009please do. The more responses we collect, the stronger our research becomes. Share the link with colleagues, friends, or professional networks.',
  },
  {
    q: 'What kind of questions are asked?',
    a: 'The survey covers your negotiation experiences, workplace dynamics, comfort levels, and thoughts on AI-assisted tools. All questions are optional\u2009—\u2009skip anything you prefer not to answer.',
  },
];

const IMPACT_POINTS = [
  { num: '01', text: 'Informs policy recommendations' },
  { num: '02', text: 'Shapes AI training tools' },
  { num: '03', text: 'Published in open research' },
];

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = q.replace(/\s+/g, '-').toLowerCase().slice(0, 30);

  return (
    <div className="surv-faq-item">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="surv-faq-trigger"
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span className="surv-faq-question">{q}</span>
        <ChevronDownIcon
          size={15}
          className={`surv-faq-chevron ${open ? 'surv-faq-chevron--open' : ''}`}
        />
      </button>
      <div
        id={`faq-${id}`}
        role="region"
        className="surv-faq-answer-wrap"
        style={{ maxHeight: open ? '240px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="surv-faq-answer">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════ */

export function SurveyContent({ surveyUrl }: { surveyUrl: string | null }) {
  return (
    <div className="survey-page">
      <div className="container-narrow">
        {/* ── Page Header ── */}
        <header className="surv-header">
          <p className="section-label">Active research</p>
          <h1 className="surv-title">
            <ClipboardCheckIcon size={22} className="surv-title-icon" />
            Women, Negotiation &amp;&nbsp;AI
          </h1>
          <p className="surv-desc">
            Your experience matters. This anonymous survey explores how women
            navigate negotiation at work&thinsp;&mdash;&thinsp;and how AI might help level
            the playing field.
          </p>
          <div className="surv-pulse-row">
            <span className="surv-pulse-dot" />
            <span className="surv-pulse-text">Accepting responses now</span>
          </div>
        </header>

        {/* ── Info Cards ── */}
        <div className="surv-info-grid">
          {INFO_CARDS.map(({ icon: Icon, title, desc, accent, bg }) => (
            <div
              key={title}
              className="surv-info-card"
              style={{ '--info-accent': accent, '--info-bg': bg } as React.CSSProperties}
            >
              <div className="surv-info-icon">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="surv-info-title">{title}</h3>
                <p className="surv-info-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Survey Embed ── */}
        <div className="surv-embed">
          <div className="surv-embed-bar">
            <ClipboardCheckIcon size={14} className="surv-embed-bar-icon" />
            <span className="surv-embed-bar-title">Research Survey</span>
            <span className="surv-embed-bar-badge">Google Forms</span>
          </div>

          {surveyUrl ? (
            <div className="surv-embed-live">
              <iframe
                src={surveyUrl}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Women, Negotiation & AI Survey"
                className="surv-iframe"
              >
                Loading survey…
              </iframe>
            </div>
          ) : (
            <div className="surv-embed-body">
              <div className="surv-embed-placeholder">
                <ClipboardCheckIcon size={24} />
              </div>
              <h3 className="surv-embed-heading">Survey coming soon</h3>
              <p className="surv-embed-text">
                The Google Form embed will appear here once the survey link is
                finalized. The form loads inline&thinsp;&mdash;&thinsp;no redirects.
              </p>
              <span className="surv-embed-status">
                <span className="surv-embed-status-dot" />
                Awaiting embed URL
              </span>
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="surv-stats">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="surv-stat">
              <Icon size={14} className="surv-stat-icon" />
              <p className="surv-stat-value">{value}</p>
              <p className="surv-stat-label">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Why Your Voice Matters ── */}
        <section className="surv-impact wine-gradient">
          <HeartIcon size={20} className="surv-impact-heart" />
          <h2 className="surv-impact-heading">Why your voice matters</h2>
          <p className="surv-impact-body">
            Every response contributes to research that aims to understand and
            dismantle the barriers women face in negotiation. Your story&thinsp;&mdash;&thinsp;even
            anonymized&thinsp;&mdash;&thinsp;has the power to shift policy, reshape training
            programs, and open new doors.
          </p>
          <div className="surv-impact-points">
            {IMPACT_POINTS.map(({ num, text }) => (
              <div key={num} className="surv-impact-point">
                <span className="surv-impact-num">{num}</span>
                <span className="surv-impact-text">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="surv-faq">
          <h2 className="surv-faq-heading">Frequently asked</h2>
          <p className="surv-faq-subhead">
            Common questions about participating in the survey.
          </p>
          <div className="surv-faq-list">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── Share CTA ── */}
        <div className="surv-share">
          <MessageCircleIcon size={18} className="surv-share-icon" />
          <p className="surv-share-title">
            Know someone who should take this survey?
          </p>
          <p className="surv-share-desc">
            Share this page&thinsp;&mdash;&thinsp;every response strengthens the research.
          </p>
        </div>
      </div>
    </div>
  );
}
