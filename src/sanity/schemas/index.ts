import { articleSchema } from './article';
import { forumPostSchema } from './forumPost';
import { forumCommentSchema } from './forumComment';
import { siteSettingsSchema } from './siteSettings';

export const schemaTypes = [articleSchema, forumPostSchema, forumCommentSchema, siteSettingsSchema];
