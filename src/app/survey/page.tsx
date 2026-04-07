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
    desc: 'How women approach negotiation in the workplace — salary, promotions, and everyday asks.',
    color: 'var(--wine-800)',
    bg: 'var(--wine-50)',
  },
  {
    icon: ClockIcon,
    title: '2–3 minutes',
    desc: 'Short, thoughtful questions designed to capture your real experience without wasting your time.',
    color: 'var(--plum)',
    bg: 'color-mix(in srgb, var(--plum) 10%, transparent)',
  },
  {
    icon: ShieldIcon,
    title: 'Anonymous',
    desc: 'No emails collected. No tracking. Your data shapes research, not profiles.',
    color: 'var(--sage)',
    bg: 'color-mix(in srgb, var(--sage) 10%, transparent)',
  },
];

const STATS = [
  { value: '500+', label: 'Responses collected', icon: UserIcon },
  { value: '2', label: 'Countries surveyed', icon: GlobeIcon },
  { value: '92%', label: 'Completion rate', icon: ClipboardCheckIcon },
];

const FAQ_ITEMS = [
  {
    q: 'Who can take this survey?',
    a: 'Anyone who identifies as a woman and has experience in the workplace — regardless of industry, role, or location. We especially welcome responses from women in Nigeria and the United States.',
  },
  {
    q: 'How is my data used?',
    a: 'Your responses are aggregated and anonymized for academic research on women\'s negotiation patterns and career outcomes. Findings may appear in published articles, conference presentations, and policy recommendations. No individual response is ever shared.',
  },
  {
    q: 'Can I share this with others?',
    a: 'Absolutely — please do. The more responses we collect, the stronger our research becomes. Share the link with colleagues, friends, or professional networks.',
  },
  {
    q: 'What kind of questions are asked?',
    a: 'The survey covers your negotiation experiences, workplace dynamics, comfort levels, and thoughts on AI-assisted tools. All questions are optional — skip anything you prefer not to answer.',
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-secondary">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <span
          className="font-sans font-medium text-ink-primary group-hover:text-wine-800 transition-colors pr-4"
          style={{ fontSize: '0.9375rem' }}
        >
          {q}
        </span>
        <ChevronDownIcon
          size={16}
          className={`text-ink-faint flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{
          maxHeight: open ? '200px' : '0',
          opacity: open ? 1 : 0,
        }}
      >
        <p
          className="text-ink-secondary pb-4"
          style={{ fontSize: '0.875rem', lineHeight: 1.7 }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function SurveyPage() {
  return (
    <div className="container-narrow py-10 md:py-14">
      {/* ═══════════════════════════════════════════
          PAGE HEADER
          ═══════════════════════════════════════════ */}
      <div className="mb-10 text-center">
        <p
          className="font-mono text-ink-faint mb-3"
          style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Active research
        </p>
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <ClipboardCheckIcon size={22} className="text-wine-800" />
          <h1
            className="font-serif text-ink-primary"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', lineHeight: 1.2, letterSpacing: '-0.025em' }}
          >
            Women, Negotiation &amp; AI
          </h1>
        </div>
        <p
          className="text-ink-secondary mx-auto"
          style={{ fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 520 }}
        >
          Your experience matters. This anonymous survey explores how women
          navigate negotiation at work — and how AI might help level the
          playing field.
        </p>

        {/* Participation pulse */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              backgroundColor: 'var(--sage)',
              animation: 'surveyPulse 2s ease-in-out infinite',
            }}
          />
          <span className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
            Accepting responses now
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          INFO CARDS
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {INFO_CARDS.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="card p-5 text-center">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg mx-auto mb-3"
              style={{ backgroundColor: bg, color }}
            >
              <Icon size={20} />
            </div>
            <h3
              className="font-serif text-ink-primary mb-1.5"
              style={{ fontSize: '1rem' }}
            >
              {title}
            </h3>
            <p className="text-ink-tertiary" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          SURVEY EMBED AREA
          ═══════════════════════════════════════════ */}
      <div className="card overflow-hidden mb-10">
        {/* Embed header bar */}
        <div
          className="flex items-center gap-2 px-5 py-3 border-b border-border-secondary"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <ClipboardCheckIcon size={15} className="text-wine-800" />
          <span className="font-sans font-semibold text-ink-primary" style={{ fontSize: '0.875rem' }}>
            Research Survey
          </span>
          <span className="font-mono text-ink-faint ml-auto" style={{ fontSize: '0.6875rem' }}>
            Google Forms
          </span>
        </div>

        {/* Embed placeholder */}
        <div className="p-8 text-center" style={{ minHeight: 360 }}>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              backgroundColor: 'var(--wine-50)',
              border: '1px dashed var(--wine-200)',
            }}
          >
            <ClipboardCheckIcon size={28} className="text-wine-400" />
          </div>
          <h3
            className="font-serif text-ink-primary mb-2"
            style={{ fontSize: '1.125rem' }}
          >
            Survey coming soon
          </h3>
          <p className="text-ink-tertiary mb-4 mx-auto" style={{ fontSize: '0.9rem', maxWidth: 380, lineHeight: 1.6 }}>
            The Google Form embed will appear here once the survey link is
            finalized. The form loads inline — no redirects.
          </p>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-ink-faint border border-border-secondary"
            style={{ fontSize: '0.75rem' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: 'var(--gold)' }}
            />
            Awaiting embed URL
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PARTICIPATION STATS
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl p-4 text-center"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <Icon size={16} className="text-ink-faint mx-auto mb-2" />
            <p
              className="font-serif text-ink-primary font-semibold"
              style={{ fontSize: '1.5rem', lineHeight: 1.1 }}
            >
              {value}
            </p>
            <p className="text-ink-tertiary mt-1" style={{ fontSize: '0.75rem' }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          WHY YOUR VOICE MATTERS
          ═══════════════════════════════════════════ */}
      <section className="wine-gradient rounded-xl p-8 mb-10">
        <div className="text-center">
          <HeartIcon size={24} className="text-white/60 mx-auto mb-3" />
          <h2
            className="font-serif text-white mb-3"
            style={{ fontSize: '1.375rem', letterSpacing: '-0.02em' }}
          >
            Why Your Voice Matters
          </h2>
          <p
            className="text-white/80 mx-auto mb-6"
            style={{ fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 480 }}
          >
            Every response contributes to a growing body of research that aims
            to understand and dismantle the barriers women face in negotiation.
            Your story — even anonymized — has the power to shift policy,
            reshape training programs, and open new doors.
          </p>

          {/* Impact points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { num: '01', text: 'Informs policy recommendations' },
              { num: '02', text: 'Shapes AI training tools' },
              { num: '03', text: 'Published in open research' },
            ].map(({ num, text }) => (
              <div key={num} className="flex flex-col items-center gap-1">
                <span
                  className="font-mono text-white/40"
                  style={{ fontSize: '0.6875rem' }}
                >
                  {num}
                </span>
                <span
                  className="text-white/90 font-medium"
                  style={{ fontSize: '0.8125rem' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════ */}
      <section className="mb-4">
        <h2
          className="font-serif text-ink-primary mb-1"
          style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}
        >
          Frequently asked
        </h2>
        <p className="text-ink-tertiary mb-5" style={{ fontSize: '0.875rem' }}>
          Common questions about participating in the survey.
        </p>
        <div>
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SHARE CTA
          ═══════════════════════════════════════════ */}
      <div
        className="rounded-xl p-6 text-center border border-border-secondary border-dashed"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <MessageCircleIcon size={20} className="text-ink-faint mx-auto mb-2" />
        <p className="text-ink-secondary font-medium" style={{ fontSize: '0.9375rem' }}>
          Know someone who should take this survey?
        </p>
        <p className="text-ink-tertiary mt-1" style={{ fontSize: '0.8125rem' }}>
          Share this page — every response strengthens the research.
        </p>
      </div>

      {/* ═══ ANIMATIONS ═══ */}
      <style jsx global>{`
        @keyframes surveyPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
