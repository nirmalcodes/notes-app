import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@firebase/auth';
import {
  login as firebaseLogin,
  register as firebaseRegister,
  logout as firebaseLogout,
  onAuthChange,
  loginWithGoogle,
} from '@/services/authService';
import { clearStoredUser, secureLoadUser, secureStoreUser } from '@/lib/crypto';
import { createUserProfile } from '@/services/userService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const cachedUser = secureLoadUser();
  const [user, setUser] = useState<User | null>(cachedUser);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const cached = secureLoadUser();
  //   if (cached) {
  //     setUser(cached as User);
  //     console.log('Cached user:', cached);
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.uid !== user?.uid) {
          setUser(firebaseUser);
          secureStoreUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        }
      } else {
        setUser(null);
        clearStoredUser();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await firebaseLogin(email, password);
    const firebaseUser = result.user;
    setUser(firebaseUser);

    secureStoreUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    });
  };

  const register = async (email: string, password: string) => {
    const result = await firebaseRegister(email, password);
    const firebaseUser = result.user;
    setUser(firebaseUser);

    await createUserProfile(firebaseUser);

    secureStoreUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    });
  };

  const googleLoginHandler = async () => {
    const result = await loginWithGoogle();
    const firebaseUser = result.user;
    setUser(firebaseUser);

    await createUserProfile(firebaseUser);

    secureStoreUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    });
  };

  const logoutHandler = async () => {
    await firebaseLogout();
    setUser(null);
    clearStoredUser();
  };

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      login,
      register,
      googleLogin: googleLoginHandler,
      logout: logoutHandler,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
