import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { assertAdmin } from './lib/auth';

// The admin panel uploads images directly to Convex storage:
//   1. call generateUploadUrl -> POST the file to that URL -> get a storageId
//   2. call resolveUrl(storageId) -> get a stable public URL to save on a row
export const generateUploadUrl = mutation({
  args: { adminKey: v.string() },
  handler: async (ctx, { adminKey }) => {
    assertAdmin(adminKey);
    return await ctx.storage.generateUploadUrl();
  },
});

export const resolveUrl = mutation({
  args: { adminKey: v.string(), storageId: v.id('_storage') },
  handler: async (ctx, { adminKey, storageId }) => {
    assertAdmin(adminKey);
    return await ctx.storage.getUrl(storageId);
  },
});
