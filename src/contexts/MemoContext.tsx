import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Memo, MemoContextProps, MemoInput, MemoProviderProps, MemoUpdate } from '@/types/memo';
import { useAuthContext } from './AuthContext';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@firebase/firestore';
import { db } from '@/services/firebase';
import CryptoJS from 'crypto-js';

const MemoContext = createContext<MemoContextProps | undefined>(undefined);

export const MemoProvider = ({ children }: MemoProviderProps) => {
  const { user, loading: authLoading } = useAuthContext();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setMemos([]);
      setLoading(false);
      return;
    }

    const memosRef = collection(db, 'memos');
    const q = query(memosRef, where('createdBy', '==', user.uid), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (docSnap) =>
            ({
              id: docSnap.id,
              ...docSnap.data(),
              content:
                CryptoJS.AES.decrypt(docSnap.data().content, user.uid).toString(CryptoJS.enc.Utf8) ||
                docSnap.data().content,
            }) as Memo
        );
        setMemos(data);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching memos:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  const addMemo = useCallback(
    async (data: MemoInput) => {
      if (!user) throw new Error('User not logged in');
      await addDoc(collection(db, 'memos'), {
        ...data,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    [user]
  );

  const updateMemo = useCallback(async (id: string, data: MemoUpdate) => {
    const memoRef = doc(db, 'memos', id);
    await updateDoc(memoRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }, []);

  const deleteMemo = useCallback(async (id: string) => {
    const memoRef = doc(db, 'memos', id);
    await deleteDoc(memoRef);
  }, []);

  const contextValue = useMemo<MemoContextProps>(
    () => ({
      memos,
      loading,
      error,
      fetchMemos: async () => {},
      addMemo,
      updateMemo,
      deleteMemo,
    }),
    [memos, loading, error, addMemo, updateMemo, deleteMemo]
  );

  return <MemoContext.Provider value={contextValue}>{children}</MemoContext.Provider>;
};

export const useMemoContext = () => {
  const context = useContext(MemoContext);
  if (!context) throw new Error('useMemoContext must be used within a MemoProvider');
  return context;
};
