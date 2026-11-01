import { defineField, defineType } from "sanity";
import { CloudinaryGalleryInput } from "../components/CloudinaryGalleryInput";

export const kit = defineType({
  name: "kit",
  title: "Decoration Kit",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Kit name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (INR)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "priceNote",
      title: "Price note",
      type: "string",
      description: 'Optional, e.g. "starting from" or "per setup".',
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "Shown on the kit card in the storefront grid.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inclusions",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "occasionCategories",
      title: "Occasion categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "cloudinaryImage" }],
      components: { input: CloudinaryGalleryInput },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "In stock", value: "in-stock" },
          { title: "Made to order", value: "made-to-order" },
          { title: "Coming soon", value: "coming-soon" },
        ],
      },
      initialValue: "in-stock",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on storefront hero",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", price: "price", media: "images.0.url" },
    prepare({ title, price }) {
      return {
        title,
        subtitle: typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : undefined,
      };
    },
  },
});
