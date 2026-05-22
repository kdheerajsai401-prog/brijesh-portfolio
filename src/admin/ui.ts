// Shared Tailwind class strings for the admin CMS UI (dark theme).
export const inputClass =
  'w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40';
export const labelClass = 'text-xs uppercase tracking-wide text-white/50';
export const card =
  'rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3';
export const btnPrimary =
  'rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-40';
export const btnGhost =
  'rounded-lg px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors';
export const btnDanger =
  'rounded-lg px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10 transition-colors';

// Most mutations fail with an "Unauthorized" error when the stored password is
// wrong. Panels call this to detect that case and bounce back to the login.
export function isAuthError(e: unknown): boolean {
  return String(e).includes('Unauthorized');
}
