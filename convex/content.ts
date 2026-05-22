import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { assertAdmin } from './lib/auth';

// Returns all site text as a { key: value } map for easy lookup in the UI.
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query('siteContent').collect();
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;
    return map;
  },
});

export const set = mutation({
  args: { adminKey: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, { adminKey, key, value }) => {
    assertAdmin(adminKey);
    const existing = await ctx.db
      .query('siteContent')
      .withIndex('by_key', (q) => q.eq('key', key))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value });
    } else {
      await ctx.db.insert('siteContent', { key, value });
    }
  },
});
