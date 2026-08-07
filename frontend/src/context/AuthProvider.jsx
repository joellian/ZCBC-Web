import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi, tokenStorage, UNAUTHORIZED_EVENT } from '../api';
import { AuthContext } from './authContext';

/**
 * Holds the admin session.
 *
 * The token itself lives in localStorage (see api.js) and is attached to
 * requests by an axios interceptor, so nothing here has to pass it around.
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // On boot, exchange any stored token for the current user. A token that
  // has expired server-side fails here and gets cleared.
  useEffect(() => {
    if (!tokenStorage.get()) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    authApi
      .me()
      .then((me) => !cancelled && setUser(me))
      .catch(() => tokenStorage.clear())
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  // Any 401 from any request drops the session (api.js fires this event).
  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const login = useCallback(async (identifier, password) => {
    const { jwt, user: loggedIn } = await authApi.login(identifier, password);
    tokenStorage.set(jwt);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    // Drop cached data so the next person to log in never sees it.
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: Boolean(user), login, logout }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
