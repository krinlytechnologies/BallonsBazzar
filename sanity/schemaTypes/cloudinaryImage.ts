import { defineField, defineType } from "sanity";
import { createElement } from "react";

/**
 * A single Cloudinary-hosted image. Populated by the custom
 * CloudinaryGalleryInput component (sanity/components/CloudinaryGalleryInput.tsx),
 * which uploads to Cloudinary via a signed server endpoint and writes the
 * resulting asset data here — Sanity never stores the binary itself.
 */
export const cloudinaryImage = defineType({
  name: "cloudinaryImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Delivery URL",
      type: "url",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicId",
      title: "Cloudinary public ID",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what's actually shown — required for every image.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "alt", url: "url" },
    prepare({ title, url }) {
      return {
        title: title || "Untitled image",
        media: url ? createElement("img", { src: url, alt: "" }) : undefined,
      };
    },
  },
});
