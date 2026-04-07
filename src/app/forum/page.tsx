'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  MessageCircleIcon,
  HeartIcon,
  CalendarIcon,
  SendIcon,
  ShieldIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

interface Story {
  id: number;
  displayName: string;
  timeAgo: string;
  tag: string;
  title: string;
  body: string;
  hearts: number;
  replies: number;
}

/* ═══════════════════════════════════════════════════
   PLACEHOLDER DATA
   ═══════════════════════════════════════════════════ */

const PLACEHOLDER_STORIES: Story[] = [
  {
    id: 1,
    displayName: 'Anonymous',
    timeAgo: '2 days ago',
    tag: 'Salary',
    title: 'My First Salary Negotiation',
    body: 'I finally asked for a raise after three years at the same company. My hands were shaking the entire time, but I walked out with a 15% increase. The key was having market data ready and practicing my pitch beforehand.',
    hearts: 24,
    replies: 11,
  },
  {
    id: 2,
    displayName: 'K.',
    timeAgo: '5 days ago',
    tag: 'AI Tools',
    title: 'I Used ChatGPT to Practice My Pitch',
    body: "Before my promotion conversation, I role-played different scenarios with an AI chatbot. It helped me anticipate pushback I hadn't considered. Not perfect, but better than going in cold.",
    hearts: 18,
    replies: 7,
  },
  {
    id: 3,
    displayName: 'Anonymous',
    timeAgo: '1 week ago',
    tag: 'Global',
    title: 'Negotiating in Lagos vs. New York',
    body: "I've worked in both cities and the dynamics are completely different. In Lagos, relationships carry more weight. In New York, it's about leverage. Both require confidence women are rarely taught.",
    hearts: 41,
    replies: 19,
  },
  {
    id: 4,
    displayName: 'S.M.',
    timeAgo: '2 weeks ago',
    tag: 'Strategy',
    title: 'The "Collaborative Negotiation" Framework',
    body: 'Instead of framing my ask as adversarial, I positioned it as a mutual win. "Here\'s what I can deliver if we align on this." Changed everything about how my manager responded.',
    hearts: 33,
    replies: 9,
  },
  {
    id: 5,
    displayName: 'Anonymous',
    timeAgo: '2 weeks ago',
    tag: 'Support',
    title: 'When Negotiation Feels Impossible',
    body: "I was told 'the budget is frozen' three times before I learned it was a deflection. The fourth time, I asked to see the compensation band for my role. Suddenly there was room. Don't accept the first no.",
    hearts: 56,
    replies: 22,
  },
  {
    id: 6,
    displayName: 'Dr. N.',
    timeAgo: '3 weeks ago',
    tag: 'Research',
    title: 'What the Data Says About Women Who Ask',
    body: "I conducted a small study of 30 women in tech who regularly negotiate. The common thread wasn't confidence — it was preparation. Every one of them had a system for tracking their contributions.",
    hearts: 47,
    replies: 15,
  },
  {
    id: 7,
    displayName: 'Anonymous',
    timeAgo: '1 month ago',
    tag: 'Salary',
    title: 'I Negotiated My First Remote Contract',
    body: "Freelancing was new to me and I almost accepted the first offer. A friend told me to ask for 30% more and explain the value. They said yes immediately — which means I probably could've asked for more.",
    hearts: 29,
    replies: 8,
  },
  {
    id: 8,
    displayName: 'M.A.',
    timeAgo: '1 month ago',
    tag: 'AI Tools',
    title: 'AI Helped Me Decode My Offer Letter',
    body: "I pasted my offer letter into Claude and asked it to identify what was negotiable. It flagged the equity vesting schedule and signing bonus as common leverage points I hadn't thought about.",
    hearts: 38,
    replies: 13,
  },
];

/* ═══════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════ */

const TAG_COLORS: Record<string, string> = {
  Salary: 'var(--wine-800)',
  'AI Tools': 'var(--plum)',
  Global: 'var(--sky)',
  Strategy: 'var(--sage)',
  Support: 'var(--coral)',
  Research: 'var(--gold)',
};

const TOPIC_FILTERS = ['All', 'Salary', 'AI Tools', 'Strategy', 'Global', 'Support', 'Research'];
const STORIES_PER_PAGE = 4;

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

/** Topic tag pill — matches Articles page pattern */
function TopicPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <span
      className="inline-flex items-center gap-1.5 font-sans font-medium"
      style={{ fontSize: '0.75rem', color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {tag}
    </span>
  );
}

/** Avatar circle — color-coded by topic */
function Avatar({ displayName, tag }: { displayName: string; tag: string }) {
  const isAnon = displayName === 'Anonymous';
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-white flex-shrink-0"
      style={{ backgroundColor: color, fontSize: '0.75rem' }}
    >
      {isAnon ? '?' : displayName[0].toUpperCase()}
    </div>
  );
}

/** Custom dropdown select for topic */
function TopicSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const topics = TOPIC_FILTERS.filter((t) => t !== 'All');

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-bg-card border border-border-secondary text-ink-primary font-sans cursor-pointer hover:border-wine-300 transition-colors"
        style={{ fontSize: '0.875rem' }}
      >
        <span className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: TAG_COLORS[value] || 'var(--wine-800)' }}
          />
          {value}
        </span>
        <ChevronDownIcon
          size={14}
          className={`text-ink-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute top-full left-0 right-0 z-20 mt-1 py-1 rounded-lg bg-bg-card border border-border-secondary overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  onChange(topic);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3.5 py-2 text-left font-sans transition-colors cursor-pointer ${
                  value === topic
                    ? 'bg-wine-50 text-wine-800'
                    : 'text-ink-secondary hover:bg-bg-secondary hover:text-ink-primary'
                }`}
                style={{ fontSize: '0.8125rem' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: TAG_COLORS[topic] }}
                />
                {topic}
                {value === topic && <CheckIcon size={13} className="ml-auto text-wine-800" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Success toast notification */
function SuccessToast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-8 left-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-bg-card border border-border-secondary font-sans"
      style={{
        animation: 'forumToastIn 300ms ease-out',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        fontSize: '0.875rem',
        transform: 'translateX(-50%)',
      }}
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--sage)', color: 'white' }}
      >
        <CheckIcon size={13} />
      </span>
      <span className="text-ink-primary font-medium">Story submitted for review!</span>
    </div>
  );
}

/** Individual story card */
function StoryCard({
  story,
  isLiked,
  onToggleLike,
}: {
  story: Story;
  isLiked: boolean;
  onToggleLike: () => void;
}) {
  return (
    <article
      className="card p-7 transition-all duration-200"
      style={{ cursor: 'default' }}
    >
      {/* Meta row */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar displayName={story.displayName} tag={story.tag} />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-sans font-medium text-ink-primary" style={{ fontSize: '0.875rem' }}>
            {story.displayName}
          </span>
          <span className="text-ink-ghost">·</span>
          <TopicPill tag={story.tag} />
          <span className="text-ink-ghost">·</span>
          <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.75rem' }}>
            <CalendarIcon size={12} />
            {story.timeAgo}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3
        className="font-serif text-ink-primary mb-2"
        style={{ fontSize: '1.125rem', lineHeight: 1.3, letterSpacing: '-0.015em' }}
      >
        {story.title}
      </h3>
      <p
        className="text-ink-secondary mb-4"
        style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}
      >
        {story.body}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-5 pt-3 border-t border-border-secondary">
        <button
          type="button"
          onClick={onToggleLike}
          className="flex items-center gap-1.5 transition-colors cursor-pointer"
          style={{
            fontSize: '0.8125rem',
            color: isLiked ? 'var(--coral)' : 'var(--ink-faint)',
          }}
          aria-label={isLiked ? 'Unlike story' : 'Like story'}
        >
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill={isLiked ? 'var(--coral)' : 'none'}
            stroke={isLiked ? 'var(--coral)' : 'currentColor'}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200"
            style={{ transform: isLiked ? 'scale(1.1)' : 'scale(1)' }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          {story.hearts + (isLiked ? 1 : 0)}
        </button>
        <span
          className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors"
          style={{ fontSize: '0.8125rem' }}
        >
          <MessageCircleIcon size={14} />
          {story.replies} {story.replies === 1 ? 'reply' : 'replies'}
        </span>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function ForumPage() {
  /* ── Filter state ── */
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);

  /* ── Form state ── */
  const [formOpen, setFormOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Salary');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ── Heart state (localStorage) ── */
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('amala-forum-likes');
      if (stored) {
        setLikedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('amala-forum-likes', JSON.stringify([...next]));
      } catch {
        /* localStorage unavailable */
      }
      return next;
    });
  }, []);

  /* ── Filtered stories ── */
  const filtered = useMemo(() => {
    return PLACEHOLDER_STORIES.filter((s) => activeTag === 'All' || s.tag === activeTag);
  }, [activeTag]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(STORIES_PER_PAGE);
  };

  /* ── Community stats ── */
  const totalHearts = PLACEHOLDER_STORIES.reduce((sum, s) => sum + s.hearts, 0);

  /* ── Form submit ── */
  const handleSubmit = () => {
    if (!storyBody.trim() || !storyTitle.trim()) return;
    setSubmitting(true);

    // Simulate submission delay — will connect to Sanity in Phase 7
    setTimeout(() => {
      setSubmitting(false);
      setShowToast(true);
      setStoryTitle('');
      setStoryBody('');
      setDisplayName('');
      setSelectedTopic('Salary');
      setFormOpen(false);
    }, 800);
  };

  const canSubmit = storyTitle.trim().length > 0 && storyBody.trim().length >= 20;

  return (
    <>
      <div className="container-wide py-14 md:py-20">
        {/* ═══════════════════════════════════════════
            PAGE HEADER
            ═══════════════════════════════════════════ */}
        <div className="mb-8">
          <p className="section-label mb-4">
            Community
          </p>
          <div className="flex items-center gap-2.5 mb-3">
            <MessageCircleIcon size={22} className="text-wine-800" />
            <h1
              className="font-serif text-ink-primary"
              style={{ fontSize: '1.875rem', letterSpacing: '-0.03em', fontWeight: 700 }}
            >
              Share Your Story
            </h1>
          </div>
          <p
            className="text-ink-tertiary"
            style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}
          >
            A safe space for women to share negotiation experiences, exchange
            strategies, and lift each other up. Post anonymously or with a display
            name — no account needed.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-5 mt-4">
            <span className="font-mono" style={{ fontSize: '0.75rem' }}>
              <span className="text-ink-primary font-medium">{PLACEHOLDER_STORIES.length}</span>{' '}
              <span className="text-ink-faint">stories</span>
            </span>
            <span className="text-ink-ghost">·</span>
            <span className="font-mono" style={{ fontSize: '0.75rem' }}>
              <span className="text-ink-primary font-medium">{totalHearts}</span>{' '}
              <span className="text-ink-faint">hearts</span>
            </span>
            <span className="text-ink-ghost">·</span>
            <span className="font-mono" style={{ fontSize: '0.75rem' }}>
              <span className="text-ink-primary font-medium">6</span>{' '}
              <span className="text-ink-faint">topics</span>
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SUBMISSION FORM
            ═══════════════════════════════════════════ */}
        <div className="mb-6">
          {!formOpen ? (
            /* ── Collapsed CTA ── */
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-bg-secondary border border-border-secondary border-dashed hover:border-wine-300 hover:bg-wine-50 transition-all duration-200 cursor-pointer group"
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--wine-800)' }}
              >
                <SendIcon size={15} className="text-white" />
              </span>
              <span className="text-left">
                <span
                  className="block font-sans font-semibold text-ink-primary group-hover:text-wine-800 transition-colors"
                  style={{ fontSize: '0.9375rem' }}
                >
                  Share your experience
                </span>
                <span className="block text-ink-tertiary" style={{ fontSize: '0.8125rem' }}>
                  Your story can help someone else. No account needed.
                </span>
              </span>
            </button>
          ) : (
            /* ── Expanded form ── */
            <div
              className="rounded-xl border border-border-secondary overflow-hidden"
              style={{ animation: 'forumSlideDown 250ms ease-out' }}
            >
              {/* Form header */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b border-border-secondary bg-bg-secondary"
              >
                <span className="flex items-center gap-2">
                  <SendIcon size={15} className="text-wine-800" />
                  <span className="font-sans font-semibold text-ink-primary" style={{ fontSize: '0.9375rem' }}>
                    Share your experience
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-ink-faint hover:text-ink-primary transition-colors text-lg leading-none cursor-pointer px-1"
                  aria-label="Close form"
                >
                  ×
                </button>
              </div>

              <div className="p-5 bg-bg-card">
                {/* Row: Name + Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label
                      className="block font-sans text-ink-tertiary mb-1.5"
                      style={{ fontSize: '0.75rem', fontWeight: 500 }}
                    >
                      Display name{' '}
                      <span className="text-ink-faint font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Anonymous"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      maxLength={30}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-card border border-border-secondary text-ink-primary font-sans placeholder:text-ink-faint focus:outline-none focus:border-wine-400 transition-colors"
                      style={{ fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-sans text-ink-tertiary mb-1.5"
                      style={{ fontSize: '0.75rem', fontWeight: 500 }}
                    >
                      Topic
                    </label>
                    <TopicSelect value={selectedTopic} onChange={setSelectedTopic} />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label
                    className="block font-sans text-ink-tertiary mb-1.5"
                    style={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Give your story a title..."
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    maxLength={100}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-bg-card border border-border-secondary text-ink-primary font-sans placeholder:text-ink-faint focus:outline-none focus:border-wine-400 transition-colors"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>

                {/* Story body */}
                <div className="mb-4">
                  <label
                    className="block font-sans text-ink-tertiary mb-1.5"
                    style={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Your story{' '}
                    <span className="text-ink-faint font-normal">(min. 20 characters)</span>
                  </label>
                  <textarea
                    placeholder="What happened? What did you learn? Your story can help someone else..."
                    value={storyBody}
                    onChange={(e) => setStoryBody(e.target.value)}
                    rows={4}
                    maxLength={2000}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-bg-card border border-border-secondary text-ink-primary font-sans placeholder:text-ink-faint focus:outline-none focus:border-wine-400 transition-colors resize-none"
                    style={{ fontSize: '0.875rem', lineHeight: 1.6 }}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="font-mono text-ink-ghost" style={{ fontSize: '0.6875rem' }}>
                      {storyBody.length} / 2,000
                    </span>
                  </div>
                </div>

                {/* Footer: notice + submit */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-ink-faint" style={{ fontSize: '0.75rem' }}>
                    <ShieldIcon size={13} />
                    All stories are moderated before publishing
                  </span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    className={`
                      inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg
                      font-sans font-semibold transition-all duration-200
                      ${canSubmit && !submitting
                        ? 'bg-wine-800 text-white hover:bg-wine-700 active:bg-wine-900 shadow-sm hover:shadow-wine cursor-pointer'
                        : 'bg-bg-secondary text-ink-faint border border-border-secondary cursor-not-allowed'
                      }
                    `}
                    style={{ fontSize: '0.875rem' }}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          style={{ animation: 'forumSpin 600ms linear infinite' }}
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <SendIcon size={14} />
                        Submit story
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════
            TOPIC FILTER BAR
            ═══════════════════════════════════════════ */}
        <div className="flex flex-wrap gap-2 pt-4 pb-4 border-b border-border-secondary">
          {TOPIC_FILTERS.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTagChange(topic)}
              className={`tag ${topic === activeTag ? 'active' : ''}`}
              type="button"
            >
              {topic !== 'All' && (
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: TAG_COLORS[topic] }}
                />
              )}
              {topic}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            STORY COUNT
            ═══════════════════════════════════════════ */}
        <p className="font-mono text-ink-faint py-3" style={{ fontSize: '0.75rem' }}>
          {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
          {activeTag !== 'All' && ` in ${activeTag}`}
        </p>

        {/* ═══════════════════════════════════════════
            STORY FEED
            ═══════════════════════════════════════════ */}
        <div className="space-y-3 pb-8">
          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="card p-10 text-center">
              <MessageCircleIcon size={28} className="text-ink-ghost mx-auto mb-3" />
              <p className="font-serif text-ink-primary mb-1" style={{ fontSize: '1.0625rem' }}>
                No stories yet
              </p>
              <p className="text-ink-tertiary" style={{ fontSize: '0.875rem' }}>
                Be the first to share a{activeTag !== 'All' ? ` ${activeTag.toLowerCase()}` : ''} story.
              </p>
            </div>
          )}

          {/* Story cards */}
          {visible.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isLiked={likedIds.has(story.id)}
              onToggleLike={() => toggleLike(story.id)}
            />
          ))}

          {/* Load more */}
          {hasMore && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + STORIES_PER_PAGE)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-ink-secondary bg-bg-secondary border border-border-secondary hover:border-wine-300 hover:text-wine-800 hover:bg-wine-50 transition-all duration-200 cursor-pointer"
                style={{ fontSize: '0.9rem' }}
                type="button"
              >
                Load more stories
                <span className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
                  ({filtered.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ═══ SUCCESS TOAST ═══ */}
      <SuccessToast show={showToast} onClose={() => setShowToast(false)} />

      {/* ═══ KEYFRAME ANIMATIONS ═══ */}
      <style jsx global>{`
        @keyframes forumToastIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes forumSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes forumSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
