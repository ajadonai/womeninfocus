import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import type { StructureBuilder } from 'sanity/structure';
import { schemaTypes } from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),
      S.listItem()
        .title('Forum Posts')
        .schemaType('forumPost')
        .child(S.documentTypeList('forumPost').title('Forum Posts')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ]);

export default defineConfig({
  name: 'wif-studio',
  title: 'Women in Focus — CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },
});
