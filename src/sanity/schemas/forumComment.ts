import { defineField, defineType } from 'sanity';

export const forumCommentSchema = defineType({
  name: 'forumComment',
  title: 'Forum Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Parent Post',
      type: 'reference',
      to: [{ type: 'forumPost' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Defaults to "Anonymous" if left blank.',
    }),
    defineField({
      name: 'body',
      title: 'Comment',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(2).max(1000),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'body',
      subtitle: 'displayName',
    },
    prepare({ title, subtitle }) {
      return {
        title: title?.length > 60 ? title.slice(0, 60) + '…' : title,
        subtitle: subtitle || 'Anonymous',
      };
    },
  },
});
