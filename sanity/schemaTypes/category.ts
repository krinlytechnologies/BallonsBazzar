import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Occasion Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first in filters.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
