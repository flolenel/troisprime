import { defineField, defineType } from 'sanity'

export const tagSchema = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du tag',
      type: 'string',
      validation: (rule) => rule.required().min(1).max(50),
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        news: 'News',
        part: "Part'",
        crea: 'Créa',
        outils: 'Outils',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
      }
    },
  },
})
