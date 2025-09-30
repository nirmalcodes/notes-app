import type { User } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from './firebase';

export const createUserProfile = async (user: User) => {
  if (!user?.uid) {
    throw new Error('User is not defined');
  }

  const userRef = doc(db, 'users', user.uid);
  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'user',
      plan: 'free',
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};
