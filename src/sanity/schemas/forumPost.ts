import { defineField, defineType } from 'sanity';

export const forumPostSchema = defineType({
  name: 'forumPost',
  title: 'Forum Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'body',
      title: 'Story',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(20).max(2000),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Defaults to "Anonymous" if left blank.',
    }),
    defineField({
      name: 'tag',
      title: 'Topic',
      type: 'string',
      options: {
        list: [
          { title: 'Salary', value: 'Salary' },
          { title: 'AI Tools', value: 'AI Tools' },
          { title: 'Strategy', value: 'Strategy' },
          { title: 'Global', value: 'Global' },
          { title: 'Support', value: 'Support' },
          { title: 'Research', value: 'Research' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hearts',
      title: 'Hearts',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'displayName',
      tag: 'tag',
    },
    prepare({ title, subtitle, tag }) {
      return {
        title,
        subtitle: `${subtitle || 'Anonymous'} · ${tag || 'No topic'}`,
      };
    },
  },
});
