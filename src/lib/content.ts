import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Reads the site's editable text from Convex and returns a getter with a
// hardcoded fallback, so the UI renders correctly while loading or if the
// backend is unreachable / not yet seeded.
export function useSiteContent() {
  const data = useQuery(api.content.getAll);
  return (key: string, fallback: string): string => data?.[key] ?? fallback;
}
