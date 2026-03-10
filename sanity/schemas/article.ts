import { defineField, defineType } from 'sanity'

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().min(1).max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Brouillon', value: 'draft' },
          { title: 'Publié', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: "Part'", value: 'part' },
          { title: 'Créa', value: 'crea' },
          { title: 'Outils', value: 'outils' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
          options: {
            filter: ({ document }: { document: { category?: string } }) => {
              if (!document.category) return {}
              return {
                filter: 'category == $category',
                params: { category: document.category },
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Image(s)',
      description: 'Ajoutez une ou plusieurs images. Si plusieurs, elles défileront au survol.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1).error('Au moins une image est requise'),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      description: 'Résumé affiché sur la carte (150–200 caractères recommandés)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'link1Text',
      title: 'Lien 1 — Libellé',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'link1Url',
      title: 'Lien 1 — URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'link2Text',
      title: 'Lien 2 — Libellé (optionnel)',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'link2Url',
      title: 'Lien 2 — URL (optionnel)',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'link3Text',
      title: 'Lien 3 — Libellé (optionnel)',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'link3Url',
      title: 'Lien 3 — URL (optionnel)',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  groups: [
    { name: 'links', title: 'Liens externes' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      const categoryLabels: Record<string, string> = {
        news: 'News',
        part: "Part'",
        crea: 'Créa',
        outils: 'Outils',
      }
      const statusEmoji = status === 'published' ? '✅' : '📝'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: categoryLabels[subtitle] || subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date de publication (récent en premier)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
