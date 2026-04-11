import { getClient, getFreshClient } from './client';
import {
  allArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  articleCountQuery,
  siteSettingsQuery,
  allForumPostsQuery,
  forumPostCountQuery,
  forumHeartsQuery,
  commentsByPostQuery,
  allForumTagsQuery,
  topForumPostsQuery,
} from './queries';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  tag: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  body?: unknown[]; // Portable Text blocks
}

export interface SiteSettings {
  surveyUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  scholarUrl: string | null;
  resumeUrl: string | null;
  surveyResponses: string | null;
  surveyCountries: string | null;
  surveyCompletion: string | null;
}

export interface SanityForumPost {
  _id: string;
  title: string;
  body: string;
  displayName: string | null;
  tag: string;
  hearts: number;
  publishedAt: string;
  commentCount: number;
}

export interface SanityForumComment {
  _id: string;
  displayName: string | null;
  body: string;
  createdAt: string;
}

export interface ForumStats {
  postCount: number;
  totalHearts: number;
}

export interface ForumTag {
  _id: string;
  name: string;
  color: string;
}

/* ═══════════════════════════════════════════════════
   SANITY CHECK — is CMS configured?
   ═══════════════════════════════════════════════════ */

function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

/* ═══════════════════════════════════════════════════
   FETCHERS (graceful fallback if Sanity isn't set up)
   ═══════════════════════════════════════════════════ */

export async function getAllArticles(): Promise<SanityArticle[]> {
  if (!isSanityConfigured()) return [];

  try {
    const articles = await getClient().fetch<SanityArticle[]>(allArticlesQuery);
    return articles || [];
  } catch (error) {
    console.warn('Sanity fetch failed, using placeholder data:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  if (!isSanityConfigured()) return null;

  try {
    const article = await getClient().fetch<SanityArticle | null>(articleBySlugQuery, { slug });
    return article;
  } catch (error) {
    console.warn('Sanity fetch failed for slug:', slug, error);
    return null;
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  try {
    const slugs = await getClient().fetch<string[]>(articleSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.warn('Sanity slugs fetch failed:', error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured()) return null;

  try {
    const settings = await getClient().fetch<SiteSettings | null>(siteSettingsQuery);
    return settings;
  } catch (error) {
    console.warn('Sanity settings fetch failed:', error);
    return null;
  }
}

export async function getAllForumPosts(): Promise<SanityForumPost[]> {
  if (!isSanityConfigured()) return [];

  try {
    const posts = await getFreshClient().fetch<SanityForumPost[]>(allForumPostsQuery);
    return posts || [];
  } catch (error) {
    console.warn('Sanity forum fetch failed:', error);
    return [];
  }
}

export async function getForumStats(): Promise<ForumStats> {
  if (!isSanityConfigured()) return { postCount: 0, totalHearts: 0 };

  try {
    const [postCount, totalHearts] = await Promise.all([
      getFreshClient().fetch<number>(forumPostCountQuery),
      getFreshClient().fetch<number>(forumHeartsQuery),
    ]);
    return { postCount: postCount || 0, totalHearts: totalHearts || 0 };
  } catch (error) {
    console.warn('Sanity forum stats fetch failed:', error);
    return { postCount: 0, totalHearts: 0 };
  }
}

export async function getCommentsByPost(postId: string): Promise<SanityForumComment[]> {
  if (!isSanityConfigured()) return [];

  try {
    const comments = await getFreshClient().fetch<SanityForumComment[]>(commentsByPostQuery, { postId });
    return comments || [];
  } catch (error) {
    console.warn('Sanity comments fetch failed:', error);
    return [];
  }
}

export async function getArticleCount(): Promise<number> {
  if (!isSanityConfigured()) return 0;

  try {
    const count = await getClient().fetch<number>(articleCountQuery);
    return count || 0;
  } catch (error) {
    console.warn('Sanity article count fetch failed:', error);
    return 0;
  }
}

// Default tags used when CMS tags aren't set up yet
const DEFAULT_TAGS: ForumTag[] = [
  { _id: 'default-salary', name: 'Salary', color: '#722F37' },
  { _id: 'default-ai', name: 'AI Tools', color: '#8B5E83' },
  { _id: 'default-strategy', name: 'Strategy', color: '#7A9E7E' },
  { _id: 'default-global', name: 'Global', color: '#7BA3C4' },
  { _id: 'default-support', name: 'Support', color: '#D4846A' },
  { _id: 'default-research', name: 'Research', color: '#C49A6C' },
];

export async function getForumTags(): Promise<ForumTag[]> {
  if (!isSanityConfigured()) return DEFAULT_TAGS;

  try {
    const tags = await getFreshClient().fetch<ForumTag[]>(allForumTagsQuery);
    return tags && tags.length > 0 ? tags : DEFAULT_TAGS;
  } catch (error) {
    console.warn('Sanity forum tags fetch failed:', error);
    return DEFAULT_TAGS;
  }
}

export interface TopForumPost {
  _id: string;
  body: string;
  displayName: string | null;
  tag: string;
}

export async function getTopForumPosts(): Promise<TopForumPost[]> {
  if (!isSanityConfigured()) return [];

  try {
    const posts = await getFreshClient().fetch<TopForumPost[]>(topForumPostsQuery);
    return posts || [];
  } catch (error) {
    console.warn('Sanity top posts fetch failed:', error);
    return [];
  }
}
