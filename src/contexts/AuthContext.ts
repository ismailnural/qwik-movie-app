import { createContext } from '@builder.io/qwik';

export type AuthState = {
  username?: string;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthState>('auth-context');
