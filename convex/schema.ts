import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// CMS data model for the Brijesh portfolio.
// `siteContent` is a flexible key/value store for editable text (hero, about,
// instagram, contact). The other three tables back the repeating sections.
export default defineSchema({
  siteContent: defineTable({
    key: v.string(),
    value: v.string(),
  }).index('by_key', ['key']),

  services: defineTable({
    number: v.string(),
    name: v.string(),
    description: v.string(),
    order: v.number(),
  }).index('by_order', ['order']),

  projects: defineTable({
    number: v.string(),
    category: v.string(),
    name: v.string(),
    // Image URLs (external or resolved Convex storage URLs).
    col1a: v.string(),
    col1b: v.string(),
    col2: v.string(),
    order: v.number(),
  }).index('by_order', ['order']),

  galleryImages: defineTable({
    src: v.string(),
    alt: v.string(),
    order: v.number(),
  }).index('by_order', ['order']),
});
