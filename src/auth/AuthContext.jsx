import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sendPasswordResetEmail
} from './authHandlers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const value = {
    user,
    loading,
    signUp: async (email, password) => {
      try {
        return await createUserWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }
    },
    signIn: async (email, password) => {
      try {
        return await signInWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }
    },
    googleSignIn: async () => {
      try {
        return await signInWithGoogle();
      } catch (error) {
        throw error;
      }
    },
    logOut: async () => {
      try {
        await signOut();
      } catch (error) {
        throw error;
      }
    },
    resetPassword: async (email) => {
      try {
        await sendPasswordResetEmail(email);
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};