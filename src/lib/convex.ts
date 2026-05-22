import { ConvexReactClient } from 'convex/react';

const url = import.meta.env.VITE_CONVEX_URL;
if (!url) {
  // Safety net: without a URL the client throws and the whole app white-screens.
  // Fall back to a placeholder so sections render their hardcoded fallback data
  // instead. VITE_CONVEX_URL should be set in every environment.
  console.warn('VITE_CONVEX_URL is not set — rendering fallback content only.');
}

export const convex = new ConvexReactClient(
  url || 'https://placeholder.convex.cloud',
);
