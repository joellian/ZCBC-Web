import { createContext } from 'react';

/**
 * Lives in its own module so that AuthProvider.jsx exports only a component.
 * (React Fast Refresh cannot handle a file that mixes components with other
 * exports — that is what the react-refresh/only-export-components lint rule
 * is warning about.)
 */
export const AuthContext = createContext(null);
