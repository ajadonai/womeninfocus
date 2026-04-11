'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  MessageCircleIcon,
  CalendarIcon,
  SendIcon,
  ShieldIcon,
  ChevronDownIcon,
  CheckIcon,
  HeartIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

export interface ForumStory {
  id: string;
  displayName: string;
  timeAgo: string;
  tag: string;
  title: string;
  body: string;
  hearts: number;
  replies: number;
}

interface Comment {
  _id: string;
  displayName: string | null;
  body: string;
  createdAt: string;
}

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
   HELPERS
   ═══════════════════════════════════════════════════ */

function commentTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay >= 1) return `${diffDay}d ago`;
  if (diffHr >= 1) return `${diffHr}h ago`;
  if (diffMin >= 1) return `${diffMin}m ago`;
  return 'just now';
}

/* ═══════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════ */

function TopicPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <span className="forum-topic-pill" style={{ '--topic-color': color } as React.CSSProperties}>
      <span className="forum-topic-dot" />
      {tag}
    </span>
  );
}

function Avatar({ displayName, tag }: { displayName: string; tag: string }) {
  const isAnon = displayName === 'Anonymous';
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <div className="forum-avatar" style={{ backgroundColor: color }}>
      {isAnon ? '?' : displayName[0].toUpperCase()}
    </div>
  );
}

function MiniAvatar({ displayName }: { displayName: string }) {
  const isAnon = displayName === 'Anonymous';
  return (
    <div className="forum-mini-avatar">
      {isAnon ? '?' : displayName[0].toUpperCase()}
    </div>
  );
}

function TopicSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const topics = TOPIC_FILTERS.filter((t) => t !== 'All');

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input w-full flex items-center justify-between cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="forum-topic-dot" style={{ '--topic-color': TAG_COLORS[value] || 'var(--wine-800)' } as React.CSSProperties} />
          {value}
        </span>
        <ChevronDownIcon size={14} className={`text-ink-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="forum-dropdown" role="listbox" aria-label="Select topic">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                role="option"
                aria-selected={value === topic}
                onClick={() => { onChange(topic); setOpen(false); }}
                className={`forum-dropdown-item ${value === topic ? 'forum-dropdown-item--active' : ''}`}
              >
                <span className="forum-topic-dot" style={{ '--topic-color': TAG_COLORS[topic] } as React.CSSProperties} />
                {topic}
                {value === topic && <CheckIcon size={13} className="ml-auto" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SuccessToast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="forum-toast" role="status" aria-live="polite">
      <span className="forum-toast-check" aria-hidden="true">
        <CheckIcon size={13} />
      </span>
      <span className="forum-toast-text">Story submitted for review!</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COMMENT SECTION
   ═══════════════════════════════════════════════════ */

function CommentSection({ postId, commentCount }: { postId: string; commentCount: number }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [commentName, setCommentName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localCount, setLocalCount] = useState(commentCount);

  const fetchComments = useCallback(async () => {
    if (loaded) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/forum/comments?postId=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
        setLocalCount(data.comments?.length || 0);
      }
    } catch { /* ignore */ }
    setLoading(false);
    setLoaded(true);
  }, [postId, loaded]);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !loaded) fetchComments();
  };

  const handleSubmit = async () => {
    if (!commentBody.trim() || commentBody.trim().length < 2) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/forum/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          body: commentBody.trim(),
          displayName: commentName.trim() || 'Anonymous',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments(prev => [...prev, data.comment]);
        setLocalCount(prev => prev + 1);
        setCommentBody('');
      }
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  return (
    <div className="forum-comments-section">
      <button
        type="button"
        onClick={handleToggle}
        className={`forum-story-replies ${open ? 'forum-story-replies--active' : ''}`}
      >
        <MessageCircleIcon size={13} />
        <span>{localCount}</span>
        <ChevronDownIcon size={11} className={`forum-replies-chevron ${open ? 'forum-replies-chevron--open' : ''}`} />
      </button>

      {open && (
        <div className="forum-comments-body">
          {loading && (
            <div className="forum-comments-loading">
              <span className="forum-spinner" /> Loading comments...
            </div>
          )}

          {!loading && comments.length === 0 && (
            <p className="forum-comments-empty">No comments yet. Be the first to respond.</p>
          )}

          {comments.map((c) => (
            <div key={c._id} className="forum-comment">
              <MiniAvatar displayName={c.displayName || 'Anonymous'} />
              <div className="forum-comment-content">
                <div className="forum-comment-meta">
                  <span className="forum-comment-author">{c.displayName || 'Anonymous'}</span>
                  <span className="forum-comment-time">{commentTimeAgo(c.createdAt)}</span>
                </div>
                <p className="forum-comment-body">{c.body}</p>
              </div>
            </div>
          ))}

          {/* Comment input */}
          <div className="forum-comment-input-wrap">
            <input
              type="text"
              placeholder="Name (optional)"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              maxLength={30}
              className="forum-comment-name-input"
            />
            <div className="forum-comment-input-row">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                maxLength={1000}
                className="forum-comment-text-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && commentBody.trim().length >= 2) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={commentBody.trim().length < 2 || submitting}
                className={`forum-comment-send ${commentBody.trim().length >= 2 && !submitting ? 'forum-comment-send--active' : ''}`}
                aria-label="Send comment"
              >
                {submitting ? <span className="forum-spinner forum-spinner--sm" /> : <SendIcon size={13} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STORY CARD
   ═══════════════════════════════════════════════════ */

function StoryCard({
  story,
  isLiked,
  onToggleLike,
  heartCount,
}: {
  story: ForumStory;
  isLiked: boolean;
  onToggleLike: () => void;
  heartCount: number;
}) {
  return (
    <article className="forum-story-card">
      <div className="forum-story-meta">
        <Avatar displayName={story.displayName} tag={story.tag} />
        <div className="forum-story-meta-text">
          <span className="forum-story-author">{story.displayName}</span>
          <span className="forum-story-sep">&middot;</span>
          <span className="forum-story-date">
            <CalendarIcon size={11} />
            {story.timeAgo}
          </span>
        </div>
        <TopicPill tag={story.tag} />
      </div>
      <h3 className="forum-story-title">{story.title}</h3>
      <p className="forum-story-body">{story.body}</p>
      <div className="forum-story-actions">
        <button
          type="button"
          onClick={onToggleLike}
          className={`forum-story-heart ${isLiked ? 'forum-story-heart--active' : ''}`}
        >
          <HeartIcon size={14} />
          <span>{heartCount}</span>
        </button>
        <CommentSection postId={story.id} commentCount={story.replies} />
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   FORUM FEED
   ═══════════════════════════════════════════════════ */

export function ForumFeed({
  stories,
  totalStories,
  totalHearts,
}: {
  stories: ForumStory[];
  totalStories: number;
  totalHearts: number;
}) {
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);
  const [formOpen, setFormOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Salary');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Hearts: localStorage tracks which posts this user liked, heartCounts tracks live counts
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [heartCounts, setHeartCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    stories.forEach(s => { counts[s.id] = s.hearts; });
    return counts;
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wif-forum-likes');
      if (stored) setLikedIds(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  const toggleLike = useCallback(async (id: string) => {
    const wasLiked = likedIds.has(id);
    const action = wasLiked ? 'unlike' : 'like';

    // Optimistic update
    setLikedIds(prev => {
      const next = new Set(prev);
      if (wasLiked) next.delete(id); else next.add(id);
      try { localStorage.setItem('wif-forum-likes', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
    setHeartCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + (wasLiked ? -1 : 1)),
    }));

    // Persist to Sanity
    try {
      const res = await fetch('/api/forum/heart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, action }),
      });
      if (res.ok) {
        const data = await res.json();
        setHeartCounts(prev => ({ ...prev, [id]: data.hearts }));
      }
    } catch {
      // Revert on failure
      setLikedIds(prev => {
        const next = new Set(prev);
        if (wasLiked) next.add(id); else next.delete(id);
        try { localStorage.setItem('wif-forum-likes', JSON.stringify([...next])); } catch { /* ignore */ }
        return next;
      });
      setHeartCounts(prev => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) + (wasLiked ? 1 : -1)),
      }));
    }
  }, [likedIds]);

  const filtered = useMemo(() => {
    return stories.filter((s) => activeTag === 'All' || s.tag === activeTag);
  }, [stories, activeTag]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(STORIES_PER_PAGE);
  };

  const handleSubmit = async () => {
    if (!storyBody.trim() || !storyTitle.trim()) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: storyTitle.trim(),
          story: storyBody.trim(),
          displayName: displayName.trim() || 'Anonymous',
          topic: selectedTopic,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setShowToast(true);
      setStoryTitle('');
      setStoryBody('');
      setDisplayName('');
      setSelectedTopic('Salary');
      setFormOpen(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = storyTitle.trim().length > 0 && storyBody.trim().length >= 20;

  return (
    <>
      <div className="forum-page">
        <div className="container-wide">
          {/* ── Header ── */}
          <header className="forum-header">
            <p className="section-label">Community</p>
            <div className="forum-title-row">
              <MessageCircleIcon size={20} className="forum-title-icon" />
              <h1 className="forum-page-title">Discussion</h1>
            </div>
            <p className="forum-page-desc">
              A safe space for women to share negotiation experiences, exchange
              strategies, and lift each other up. Post anonymously or with a
              display name&thinsp;&mdash;&thinsp;no account needed.
            </p>
            <div className="forum-stats-row">
              <span className="forum-stat-inline">
                <strong>{totalStories}</strong> stories
              </span>
              <span className="forum-stat-sep">&middot;</span>
              <span className="forum-stat-inline">
                <strong>{totalHearts}</strong> hearts
              </span>
              <span className="forum-stat-sep">&middot;</span>
              <span className="forum-stat-inline">
                <strong>6</strong> topics
              </span>
            </div>
          </header>

          {/* ── Submission Form ── */}
          <div className="forum-form-wrap">
            {!formOpen ? (
              <button type="button" onClick={() => setFormOpen(true)} className="forum-form-cta group">
                <span className="forum-form-cta-icon">
                  <SendIcon size={14} className="text-white" />
                </span>
                <span className="forum-form-cta-text">
                  <span className="forum-form-cta-title">Share your experience</span>
                  <span className="forum-form-cta-sub">Your story can help someone else. No account needed.</span>
                </span>
              </button>
            ) : (
              <div className="forum-form-expanded">
                <div className="forum-form-bar">
                  <span className="forum-form-bar-left">
                    <SendIcon size={14} className="forum-title-icon" />
                    <span className="forum-form-bar-title">Share your experience</span>
                  </span>
                  <button type="button" onClick={() => setFormOpen(false)} className="forum-form-close" aria-label="Close form">&times;</button>
                </div>
                <div className="forum-form-body">
                  <div className="forum-form-row">
                    <div>
                      <label className="forum-label">
                        Display name <span className="forum-label-opt">(optional)</span>
                      </label>
                      <input type="text" placeholder="Anonymous" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={30} className="input" />
                    </div>
                    <div>
                      <label className="forum-label">Topic</label>
                      <TopicSelect value={selectedTopic} onChange={setSelectedTopic} />
                    </div>
                  </div>
                  <div className="forum-form-field">
                    <label className="forum-label">Title</label>
                    <input type="text" placeholder="Give your story a title..." value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} maxLength={100} className="input" />
                  </div>
                  <div className="forum-form-field">
                    <label className="forum-label">
                      Your story <span className="forum-label-opt">(min. 20 characters)</span>
                    </label>
                    <textarea placeholder="What happened? What did you learn? Your story can help someone else..." value={storyBody} onChange={(e) => setStoryBody(e.target.value)} rows={4} maxLength={2000} className="input" />
                    <div className="forum-char-count">
                      {storyBody.length} / 2,000
                    </div>
                  </div>
                  {submitError && (
                    <p className="forum-submit-error">{submitError}</p>
                  )}
                  <div className="forum-form-footer">
                    <span className="forum-form-notice">
                      <ShieldIcon size={12} />
                      All stories are moderated before publishing
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || submitting}
                      className={`forum-submit-btn ${canSubmit && !submitting ? 'forum-submit-btn--active' : ''}`}
                    >
                      {submitting ? (
                        <>
                          <span className="forum-spinner" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <SendIcon size={13} />
                          Submit story
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Topic Filter ── */}
          <div className="forum-filters">
            <div className="art-tags-scroll">
              {TOPIC_FILTERS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTagChange(topic)}
                  className={`tag ${topic === activeTag ? 'active' : ''}`}
                  type="button"
                >
                  {topic !== 'All' && (
                    <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: TAG_COLORS[topic] }} />
                  )}
                  {topic}
                </button>
              ))}
            </div>
            <p className="forum-count" aria-live="polite" role="status">
              {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              {activeTag !== 'All' && ` in ${activeTag}`}
            </p>
          </div>

          {/* ── Story Feed ── */}
          <div className="forum-feed">
            {filtered.length === 0 && (
              <div className="forum-empty card">
                <MessageCircleIcon size={22} className="forum-empty-icon" />
                <p className="forum-empty-title">No stories yet</p>
                <p className="forum-empty-desc">Be the first to share a{activeTag !== 'All' ? ` ${activeTag.toLowerCase()}` : ''} story.</p>
              </div>
            )}

            {visible.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                isLiked={likedIds.has(story.id)}
                onToggleLike={() => toggleLike(story.id)}
                heartCount={heartCounts[story.id] ?? story.hearts}
              />
            ))}

            {hasMore && (
              <div className="forum-load-more">
                <button
                  onClick={() => setVisibleCount((prev) => prev + STORIES_PER_PAGE)}
                  className="art-load-btn"
                  type="button"
                >
                  Load more stories
                  <span className="art-load-remaining">({filtered.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SuccessToast show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
