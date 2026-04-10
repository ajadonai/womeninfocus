import { getAllForumPosts, getForumStats } from '@/sanity/lib/fetch';
import { ForumFeed, type ForumStory } from '@/components/ForumFeed';

export const revalidate = 60;

/* ═══════════════════════════════════════════════════
   PLACEHOLDER DATA (shown until real posts exist)
   ═══════════════════════════════════════════════════ */

const PLACEHOLDER_STORIES: ForumStory[] = [
  {
    id: 'p1', displayName: 'Anonymous', timeAgo: '2 days ago', tag: 'Salary',
    title: 'My First Salary Negotiation',
    body: 'I finally asked for a raise after three years at the same company. My hands were shaking the entire time, but I walked out with a 15% increase. The key was having market data ready and practicing my pitch beforehand.',
    hearts: 24, replies: 11,
  },
  {
    id: 'p2', displayName: 'K.', timeAgo: '5 days ago', tag: 'AI Tools',
    title: 'I Used ChatGPT to Practice My Pitch',
    body: "Before my promotion conversation, I role-played different scenarios with an AI chatbot. It helped me anticipate pushback I hadn\u2019t considered. Not perfect, but better than going in cold.",
    hearts: 18, replies: 7,
  },
  {
    id: 'p3', displayName: 'Anonymous', timeAgo: '1 week ago', tag: 'Global',
    title: 'Negotiating in Lagos vs. New York',
    body: "I\u2019ve worked in both cities and the dynamics are completely different. In Lagos, relationships carry more weight. In New York, it\u2019s about leverage. Both require confidence women are rarely taught.",
    hearts: 41, replies: 19,
  },
  {
    id: 'p4', displayName: 'S.M.', timeAgo: '2 weeks ago', tag: 'Strategy',
    title: 'The \u201CCollaborative Negotiation\u201D Framework',
    body: "Instead of framing my ask as adversarial, I positioned it as a mutual win. \u201CHere\u2019s what I can deliver if we align on this.\u201D Changed everything about how my manager responded.",
    hearts: 33, replies: 9,
  },
  {
    id: 'p5', displayName: 'Anonymous', timeAgo: '2 weeks ago', tag: 'Support',
    title: 'When Negotiation Feels Impossible',
    body: "I was told \u2018the budget is frozen\u2019 three times before I learned it was a deflection. The fourth time, I asked to see the compensation band for my role. Suddenly there was room. Don\u2019t accept the first no.",
    hearts: 56, replies: 22,
  },
  {
    id: 'p6', displayName: 'Dr. N.', timeAgo: '3 weeks ago', tag: 'Research',
    title: 'What the Data Says About Women Who Ask',
    body: "I conducted a small study of 30 women in tech who regularly negotiate. The common thread wasn\u2019t confidence\u2009\u2014\u2009it was preparation. Every one of them had a system for tracking their contributions.",
    hearts: 47, replies: 15,
  },
  {
    id: 'p7', displayName: 'Anonymous', timeAgo: '1 month ago', tag: 'Salary',
    title: 'I Negotiated My First Remote Contract',
    body: "Freelancing was new to me and I almost accepted the first offer. A friend told me to ask for 30% more and explain the value. They said yes immediately\u2009\u2014\u2009which means I probably could\u2019ve asked for more.",
    hearts: 29, replies: 8,
  },
  {
    id: 'p8', displayName: 'M.A.', timeAgo: '1 month ago', tag: 'AI Tools',
    title: 'AI Helped Me Decode My Offer Letter',
    body: "I pasted my offer letter into Claude and asked it to identify what was negotiable. It flagged the equity vesting schedule and signing bonus as common leverage points I hadn\u2019t thought about.",
    hearts: 38, replies: 13,
  },
];

/* ═══════════════════════════════════════════════════
   HELPER — time ago from date
   ═══════════════════════════════════════════════════ */

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMonth >= 1) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  if (diffWeek >= 1) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  if (diffDay >= 1) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffHr >= 1) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  return 'just now';
}

/* ═══════════════════════════════════════════════════
   SERVER PAGE
   ═══════════════════════════════════════════════════ */

export default async function ForumPage() {
  const [sanityPosts, stats] = await Promise.all([
    getAllForumPosts(),
    getForumStats(),
  ]);

  // Convert CMS posts to feed format
  const cmsPosts: ForumStory[] = sanityPosts.map((p) => ({
    id: p._id,
    displayName: p.displayName || 'Anonymous',
    timeAgo: timeAgo(p.publishedAt),
    tag: p.tag,
    title: p.title,
    body: p.body,
    hearts: p.hearts,
    replies: 0,
  }));

  // Use CMS posts if available, otherwise placeholders
  const stories = cmsPosts.length > 0 ? cmsPosts : PLACEHOLDER_STORIES;

  const totalStories = stats.postCount > 0 ? stats.postCount : PLACEHOLDER_STORIES.length;
  const totalHearts = stats.totalHearts > 0 ? stats.totalHearts : PLACEHOLDER_STORIES.reduce((sum, s) => sum + s.hearts, 0);

  return (
    <ForumFeed
      stories={stories}
      totalStories={totalStories}
      totalHearts={totalHearts}
    />
  );
}
