import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'TroisPrime — Back-office',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Articles')
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('Tous les articles')
                      .child(S.documentTypeList('article').title('Tous les articles')),
                    S.divider(),
                    S.listItem()
                      .title('Veille')
                      .child(
                        S.documentTypeList('article')
                          .title('Veille')
                          .filter('_type == "article" && category == "news"')
                      ),
                    S.listItem()
                      .title("Part'")
                      .child(
                        S.documentTypeList('article')
                          .title("Part'")
                          .filter('_type == "article" && category == "part"')
                      ),
                    S.listItem()
                      .title('Créa')
                      .child(
                        S.documentTypeList('article')
                          .title('Créa')
                          .filter('_type == "article" && category == "crea"')
                      ),
                    S.listItem()
                      .title('Outils')
                      .child(
                        S.documentTypeList('article')
                          .title('Outils')
                          .filter('_type == "article" && category == "outils"')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Tags')
              .child(S.documentTypeList('tag').title('Tags')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
