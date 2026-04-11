import { groq } from 'next-sanity';

// ── Articles ──

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    tag,
    publishedAt,
    readTime,
    featured
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    tag,
    publishedAt,
    readTime,
    featured,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`;

export const articleCountQuery = groq`
  count(*[_type == "article"])
`;

// ── Site Settings ──

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    surveyUrl,
    linkedinUrl,
    twitterUrl,
    scholarUrl,
    "resumeUrl": resumeFile.asset->url,
    surveyResponses,
    surveyCountries,
    surveyCompletion
  }
`;

// ── Forum Posts ──

export const allForumPostsQuery = groq`
  *[_type == "forumPost"] | order(publishedAt desc) {
    _id,
    title,
    body,
    displayName,
    tag,
    hearts,
    publishedAt,
    "commentCount": count(*[_type == "forumComment" && references(^._id)])
  }
`;

export const forumPostCountQuery = groq`
  count(*[_type == "forumPost"])
`;

export const forumHeartsQuery = groq`
  math::sum(*[_type == "forumPost"].hearts)
`;

// ── Forum Comments ──

export const commentsByPostQuery = groq`
  *[_type == "forumComment" && post._ref == $postId] | order(createdAt asc) {
    _id,
    displayName,
    body,
    createdAt
  }
`;

// ── Forum Tags ──

export const allForumTagsQuery = groq`
  *[_type == "forumTag"] | order(order asc) {
    _id,
    name,
    color
  }
`;

// ── Top Forum Posts (for homepage quotes) ──

export const topForumPostsQuery = groq`
  *[_type == "forumPost"] | order(hearts desc) [0...3] {
    _id,
    body,
    displayName,
    tag
  }
`;
