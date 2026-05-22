import { useCallback, useState } from 'react';

// Stores the admin password in sessionStorage so it survives navigation within
// the tab but clears when the tab closes. Passed to every mutation as adminKey.
const STORAGE_KEY = 'brijesh_admin_key';

export function useAdminKey() {
  const [adminKey, setKey] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : sessionStorage.getItem(STORAGE_KEY),
  );

  const login = useCallback((key: string) => {
    sessionStorage.setItem(STORAGE_KEY, key);
    setKey(key);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setKey(null);
  }, []);

  return { adminKey, login, logout };
}
