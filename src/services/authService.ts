import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from '@firebase/auth';
import { auth } from './firebase';

// email/ password authentication
export const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

// google authentication
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

// logout
export const logout = () => signOut(auth);

// on auth change
export const onAuthChange = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);
