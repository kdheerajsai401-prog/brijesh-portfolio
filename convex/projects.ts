import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { assertAdmin } from './lib/auth';

export const list = query({
  args: {},
  handler: async (ctx) =>
    ctx.db.query('projects').withIndex('by_order').collect(),
});

export const create = mutation({
  args: {
    adminKey: v.string(),
    number: v.string(),
    category: v.string(),
    name: v.string(),
    col1a: v.string(),
    col1b: v.string(),
    col2: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { adminKey, ...data }) => {
    assertAdmin(adminKey);
    return ctx.db.insert('projects', data);
  },
});

export const update = mutation({
  args: {
    adminKey: v.string(),
    id: v.id('projects'),
    number: v.string(),
    category: v.string(),
    name: v.string(),
    col1a: v.string(),
    col1b: v.string(),
    col2: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { adminKey, id, ...data }) => {
    assertAdmin(adminKey);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { adminKey: v.string(), id: v.id('projects') },
  handler: async (ctx, { adminKey, id }) => {
    assertAdmin(adminKey);
    await ctx.db.delete(id);
  },
});
