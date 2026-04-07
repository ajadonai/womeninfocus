'use client';

import { useState, useMemo } from 'react';
import {
  PenIcon,
  ClockIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  BookmarkIcon,
  ShareIcon,
  SearchIcon,
} from '@/components/icons';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  upvotes: number;
  comments: number;
  featured?: boolean;
}

const PLACEHOLDER_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Can AI close the negotiation gap?',
    excerpt:
      'Exploring how AI-powered coaching tools might help women develop stronger negotiation strategies in the workplace — and whether the technology can truly level a playing field shaped by decades of systemic bias.',
    tag: 'AI & Equity',
    date: 'Mar 15, 2026',
    readTime: '6 min',
    upvotes: 42,
    comments: 8,
    featured: true,
  },
  {
    id: 2,
    title: "The $1 million question: why women don't negotiate",
    excerpt:
      'Research shows women who negotiate starting salaries earn significantly more over their careers. So what holds them back?',
    tag: 'Negotiation',
    date: 'Feb 28, 2026',
    readTime: '8 min',
    upvotes: 67,
    comments: 14,
  },
  {
    id: 3,
    title: 'Survey insights: negotiation across cultures',
    excerpt:
      'Comparing negotiation patterns among women in Nigeria and the United States — similarities, differences, and implications.',
    tag: 'Research',
    date: 'Jan 12, 2026',
    readTime: '10 min',
    upvotes: 35,
    comments: 6,
  },
  {
    id: 4,
    title: 'From data to policy: making research actionable',
    excerpt:
      'How to translate survey findings into workplace policy recommendations that actually get implemented.',
    tag: 'Policy',
    date: 'Dec 5, 2025',
    readTime: '5 min',
    upvotes: 28,
    comments: 4,
  },
  {
    id: 5,
    title: 'The invisible tax: emotional labor in negotiation',
    excerpt:
      "Women don't just negotiate for less — they navigate a minefield of social penalties that men never face. Here's what the data shows.",
    tag: 'Women & Work',
    date: 'Nov 18, 2025',
    readTime: '7 min',
    upvotes: 53,
    comments: 11,
  },
  {
    id: 6,
    title: 'Redefining leadership: negotiation as a core competency',
    excerpt:
      "Why organizations that teach women to negotiate aren't just being equitable — they're building stronger leadership pipelines.",
    tag: 'Leadership',
    date: 'Oct 30, 2025',
    readTime: '6 min',
    upvotes: 39,
    comments: 9,
  },
  {
    id: 7,
    title: 'What 500 survey responses taught me about asking for more',
    excerpt:
      'The patterns that emerged from our largest dataset yet — and why the findings surprised even us.',
    tag: 'Research',
    date: 'Oct 8, 2025',
    readTime: '9 min',
    upvotes: 44,
    comments: 7,
  },
  {
    id: 8,
    title: 'Bias in the algorithm: when AI hiring tools fail women',
    excerpt:
      'A deep dive into how resume-screening AI can perpetuate gender bias in hiring — and what we can do about it.',
    tag: 'AI & Equity',
    date: 'Sep 22, 2025',
    readTime: '8 min',
    upvotes: 61,
    comments: 16,
  },
  {
    id: 9,
    title: 'The confidence myth: rethinking what holds women back',
    excerpt:
      "It's not about confidence. It's about systems. Here's why the 'lean in' narrative misses the point entirely.",
    tag: 'Women & Work',
    date: 'Sep 5, 2025',
    readTime: '6 min',
    upvotes: 72,
    comments: 21,
  },
  {
    id: 10,
    title: 'Pay transparency laws: progress or performance?',
    excerpt:
      'New legislation is forcing companies to disclose salary ranges. But do these laws actually help women negotiate better?',
    tag: 'Policy',
    date: 'Aug 14, 2025',
    readTime: '7 min',
    upvotes: 31,
    comments: 5,
  },
  {
    id: 11,
    title: 'Negotiation scripts that actually work',
    excerpt:
      'Practical, research-backed language for salary conversations, promotion asks, and benefit negotiations.',
    tag: 'Negotiation',
    date: 'Jul 29, 2025',
    readTime: '5 min',
    upvotes: 88,
    comments: 23,
  },
  {
    id: 12,
    title: 'Leading while female: the double bind of authority',
    excerpt:
      'Women who negotiate assertively are penalized. Women who don\'t are overlooked. The research on this bind — and ways through it.',
    tag: 'Leadership',
    date: 'Jul 10, 2025',
    readTime: '8 min',
    upvotes: 46,
    comments: 12,
  },
];

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

const TAG_LIST = ['All', 'AI & Equity', 'Negotiation', 'Research', 'Policy', 'Women & Work', 'Leadership'];
const ARTICLES_PER_PAGE = 6;

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ArticleStats({ article, showSave = true, showShare = false }: { article: Article; showSave?: boolean; showShare?: boolean }) {
  return (
    <div className="flex items-center gap-4 pt-3 border-t border-border-secondary">
      <span className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
        <ArrowUpIcon size={14} />
        {article.upvotes}
      </span>
      <span className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
        <MessageCircleIcon size={14} />
        {article.comments}
      </span>
      {showSave && (
        <span className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
          <BookmarkIcon size={14} />
          Save
        </span>
      )}
      {showShare && (
        <span className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
          <ShareIcon size={14} />
          Share
        </span>
      )}
    </div>
  );
}

function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-sans font-medium"
      style={{
        fontSize: '0.75rem',
        color,
        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ backgroundColor: color }}
      />
      {tag}
    </span>
  );
}

export default function ArticlesPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  // Filter articles by tag + search
  const filtered = useMemo(() => {
    return PLACEHOLDER_ARTICLES.filter((a) => {
      const matchesTag = activeTag === 'All' || a.tag === activeTag;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchQuery]);

  const featured = filtered.find((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);
  const visible = regular.slice(0, visibleCount);
  const hasMore = visibleCount < regular.length;

  // Reset visible count when filters change
  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  return (
    <div className="container-wide py-14 md:py-20">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <p className="section-label mb-4">
          Published work
        </p>
        <div className="flex items-center gap-2.5 mb-3">
          <PenIcon size={22} className="text-wine-800" />
          <h1
            className="font-serif text-ink-primary"
            style={{ fontSize: '1.875rem', letterSpacing: '-0.03em', fontWeight: 700 }}
          >
            Articles
          </h1>
        </div>
        <p
          className="text-ink-tertiary"
          style={{ fontSize: '1rem', maxWidth: 500, lineHeight: 1.7 }}
        >
          Research, analysis, and commentary on women&apos;s negotiation, AI equity,
          and career outcomes.
        </p>
      </div>

      {/* ── Tag Filter Bar ── */}
      <div className="flex flex-wrap gap-2 pt-4 pb-4 border-b border-border-secondary">
        {TAG_LIST.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagChange(tag)}
            className={`tag ${tag === activeTag ? 'active' : ''}`}
            type="button"
          >
            {tag !== 'All' && (
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: TAG_COLORS[tag] }}
              />
            )}
            {tag}
          </button>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div className="search-wrap mt-5 mb-3 max-w-md">
        <SearchIcon size={16} />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-with-icon"
        />
      </div>

      {/* ── Article Count ── */}
      <p
        className="font-mono text-ink-faint py-3"
        style={{ fontSize: '0.75rem' }}
      >
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        {activeTag !== 'All' && ` in ${activeTag}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* ── Feed ── */}
      <div className="pb-8">
        {/* No results */}
        {filtered.length === 0 && (
          <div className="card p-10 text-center">
            <SearchIcon size={28} className="text-ink-ghost mx-auto mb-3" />
            <p className="font-serif text-ink-primary mb-1" style={{ fontSize: '1.0625rem' }}>
              No articles found
            </p>
            <p className="text-ink-tertiary" style={{ fontSize: '0.875rem' }}>
              Try adjusting your filters or search query.
            </p>
          </div>
        )}

        {/* Featured Article */}
        {featured && (
          <div
            className="relative overflow-hidden cursor-pointer mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--wine-50) 0%, var(--wine-100) 100%)',
              border: '1px solid var(--wine-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
              transition: 'box-shadow 350ms ease, transform 350ms ease',
            }}
          >
            {/* Featured badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono font-medium text-wine-800 mb-4"
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(114, 47, 55, 0.1)',
              }}
            >
              <StarIcon size={11} />
              Featured
            </span>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <TagPill tag={featured.tag} />
              <span className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
                {featured.date}
              </span>
              <span className="text-ink-ghost">·</span>
              <span className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
                {featured.readTime} read
              </span>
            </div>

            <h2
              className="font-serif text-ink-primary mb-2 hover:text-wine-800 transition-colors"
              style={{ fontSize: '1.375rem', lineHeight: 1.25, letterSpacing: '-0.025em' }}
            >
              {featured.title}
            </h2>
            <p
              className="text-ink-secondary mb-4"
              style={{ fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: 640 }}
            >
              {featured.excerpt}
            </p>

            <ArticleStats article={featured} showSave showShare />
          </div>
        )}

        {/* Regular Articles */}
        {visible.map((article, index) => {
          // Number continues from featured (02, 03, 04...)
          const num = String(index + 2).padStart(2, '0');
          return (
            <div
              key={article.id}
              className="card grid gap-4 p-7 mb-4 cursor-pointer"
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <TagPill tag={article.tag} />
                  <span className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
                    {article.date}
                  </span>
                  <span className="text-ink-ghost">·</span>
                  <span className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
                    {article.readTime} read
                  </span>
                </div>

                <h2
                  className="font-serif text-ink-primary mb-1.5 hover:text-wine-800 transition-colors"
                  style={{ fontSize: '1.1875rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}
                >
                  {article.title}
                </h2>
                <p
                  className="text-ink-tertiary mb-3"
                  style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 580 }}
                >
                  {article.excerpt}
                </p>

                <ArticleStats article={article} />
              </div>

              {/* Number on the right — hidden on mobile */}
              <span
                className="hidden sm:block font-serif text-border-secondary self-start pt-1"
                style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1, minWidth: 48, textAlign: 'right' }}
              >
                {num}
              </span>
            </div>
          );
        })}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-ink-secondary bg-bg-secondary border border-border-secondary hover:border-wine-300 hover:text-wine-800 hover:bg-wine-50 transition-all duration-200 cursor-pointer"
              style={{ fontSize: '0.9rem' }}
              type="button"
            >
              Load more articles
              <span className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
                ({regular.length - visibleCount} remaining)
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
