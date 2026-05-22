// Simple shared-secret admin gate for the v1 CMS.
// The password is stored as a Convex deployment env var (ADMIN_PASSWORD) and
// passed by the /admin panel with every mutation. Public queries stay open
// (read-only data for the public site); all writes require the secret.
export function assertAdmin(adminKey: string): void {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      'ADMIN_PASSWORD is not configured. Run: npx convex env set ADMIN_PASSWORD <password>',
    );
  }
  if (adminKey !== expected) {
    throw new Error('Unauthorized: incorrect admin password.');
  }
}
