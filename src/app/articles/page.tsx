import { getAllArticles } from '@/sanity/lib/fetch';
import { ArticlesFeed, type ArticleItem } from '@/components/ArticlesFeed';

// Revalidate every 60 seconds so new Sanity content appears without redeploying
export const revalidate = 60;

/* ═══════════════════════════════════════════════════
   TAG → COLOR MAP
   ═══════════════════════════════════════════════════ */

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

/* ═══════════════════════════════════════════════════
   PLACEHOLDER DATA (shown until CMS content exists)
   ═══════════════════════════════════════════════════ */

const PLACEHOLDER_ARTICLES: ArticleItem[] = [
  {
    id: 'p1', title: 'Can AI close the negotiation gap?',
    excerpt: 'Exploring how AI-powered coaching tools might help women develop stronger negotiation strategies in the workplace\u2009—\u2009and whether the technology can truly level a playing field shaped by decades of systemic bias.',
    tag: 'AI & Equity', date: 'Mar 15, 2026', readTime: '6 min', upvotes: 42, comments: 8, featured: true, color: 'var(--plum)',
  },
  {
    id: 'p2', title: 'The $1 million question: why women don\u2019t negotiate',
    excerpt: 'Research shows women who negotiate starting salaries earn significantly more over their careers. So what holds them back?',
    tag: 'Negotiation', date: 'Feb 28, 2026', readTime: '8 min', upvotes: 67, comments: 14, color: 'var(--sage)',
  },
  {
    id: 'p3', title: 'Survey insights: negotiation across cultures',
    excerpt: 'Comparing negotiation patterns among women in Nigeria and the United States\u2009—\u2009similarities, differences, and implications.',
    tag: 'Research', date: 'Jan 12, 2026', readTime: '10 min', upvotes: 35, comments: 6, color: '#9B7DB8',
  },
  {
    id: 'p4', title: 'From data to policy: making research actionable',
    excerpt: 'How to translate survey findings into workplace policy recommendations that actually get implemented.',
    tag: 'Policy', date: 'Dec 5, 2025', readTime: '5 min', upvotes: 28, comments: 4, color: 'var(--coral)',
  },
  {
    id: 'p5', title: 'The invisible tax: emotional labor in negotiation',
    excerpt: "Women don\u2019t just negotiate for less\u2009—\u2009they navigate a minefield of social penalties that men never face.",
    tag: 'Women & Work', date: 'Nov 18, 2025', readTime: '7 min', upvotes: 53, comments: 11, color: 'var(--wine-800)',
  },
  {
    id: 'p6', title: 'Redefining leadership: negotiation as a core competency',
    excerpt: "Why organizations that teach women to negotiate aren\u2019t just being equitable\u2009—\u2009they\u2019re building stronger leadership pipelines.",
    tag: 'Leadership', date: 'Oct 30, 2025', readTime: '6 min', upvotes: 39, comments: 9, color: 'var(--gold)',
  },
  {
    id: 'p7', title: 'What 500 survey responses taught me about asking for more',
    excerpt: 'The patterns that emerged from our largest dataset yet\u2009—\u2009and why the findings surprised even us.',
    tag: 'Research', date: 'Oct 8, 2025', readTime: '9 min', upvotes: 44, comments: 7, color: '#9B7DB8',
  },
  {
    id: 'p8', title: 'Bias in the algorithm: when AI hiring tools fail women',
    excerpt: 'A deep dive into how resume-screening AI can perpetuate gender bias in hiring\u2009—\u2009and what we can do about it.',
    tag: 'AI & Equity', date: 'Sep 22, 2025', readTime: '8 min', upvotes: 61, comments: 16, color: 'var(--plum)',
  },
  {
    id: 'p9', title: 'The confidence myth: rethinking what holds women back',
    excerpt: "It\u2019s not about confidence. It\u2019s about systems. Here\u2019s why the \u2018lean in\u2019 narrative misses the point.",
    tag: 'Women & Work', date: 'Sep 5, 2025', readTime: '6 min', upvotes: 72, comments: 21, color: 'var(--wine-800)',
  },
  {
    id: 'p10', title: 'Pay transparency laws: progress or performance?',
    excerpt: 'New legislation is forcing companies to disclose salary ranges. But do these laws actually help women negotiate better?',
    tag: 'Policy', date: 'Aug 14, 2025', readTime: '7 min', upvotes: 31, comments: 5, color: 'var(--coral)',
  },
  {
    id: 'p11', title: 'Negotiation scripts that actually work',
    excerpt: 'Practical, research-backed language for salary conversations, promotion asks, and benefit negotiations.',
    tag: 'Negotiation', date: 'Jul 29, 2025', readTime: '5 min', upvotes: 88, comments: 23, color: 'var(--sage)',
  },
  {
    id: 'p12', title: 'Leading while female: the double bind of authority',
    excerpt: "Women who negotiate assertively are penalized. Women who don\u2019t are overlooked. The research on this bind\u2009—\u2009and ways through it.",
    tag: 'Leadership', date: 'Jul 10, 2025', readTime: '8 min', upvotes: 46, comments: 12, color: 'var(--gold)',
  },
];

/* ═══════════════════════════════════════════════════
   SERVER PAGE — fetches CMS, merges with placeholders
   ═══════════════════════════════════════════════════ */

export default async function ArticlesPage() {
  const sanityArticles = await getAllArticles();

  // Convert Sanity articles to the feed format
  const cmsArticles: ArticleItem[] = sanityArticles.map((a) => ({
    id: a._id,
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tag,
    date: new Date(a.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    readTime: `${a.readTime} min`,
    upvotes: 0,
    comments: 0,
    featured: a.featured,
    color: TAG_COLORS[a.tag] || 'var(--wine-800)',
    slug: a.slug,
  }));

  // Use CMS articles if available, otherwise show placeholders
  const articles = cmsArticles.length > 0 ? cmsArticles : PLACEHOLDER_ARTICLES;

  return <ArticlesFeed articles={articles} />;
}
