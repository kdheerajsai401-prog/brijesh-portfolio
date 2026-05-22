import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { assertAdmin } from './lib/auth';

export const list = query({
  args: {},
  handler: async (ctx) =>
    ctx.db.query('services').withIndex('by_order').collect(),
});

export const create = mutation({
  args: {
    adminKey: v.string(),
    number: v.string(),
    name: v.string(),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { adminKey, ...data }) => {
    assertAdmin(adminKey);
    return ctx.db.insert('services', data);
  },
});

export const update = mutation({
  args: {
    adminKey: v.string(),
    id: v.id('services'),
    number: v.string(),
    name: v.string(),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { adminKey, id, ...data }) => {
    assertAdmin(adminKey);
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { adminKey: v.string(), id: v.id('services') },
  handler: async (ctx, { adminKey, id }) => {
    assertAdmin(adminKey);
    await ctx.db.delete(id);
  },
});
