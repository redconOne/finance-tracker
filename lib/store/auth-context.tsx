'use client';

import React, { createContext } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {
  children: React.ReactNode;
};

type authContextType = {
  user: any;
  loading: boolean;
  googleLoginHandler: React.MouseEventHandler<HTMLButtonElement>;
  logout: React.MouseEventHandler<HTMLButtonElement>;
};

export const authContext = createContext<authContextType>({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }: Props) {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    logout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
