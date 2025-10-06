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
import { decryptMemo, encryptMemo } from '@/lib/memoCrypto';

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
        const data = snapshot.docs.map((docSnap) => {
          const memoData = docSnap.data();
          const decryptedContent = decryptMemo(memoData.content, user.uid);

          const isCreated =
            memoData.createdAt?.seconds === memoData.updatedAt?.seconds &&
            memoData.createdAt?.nanoseconds === memoData.updatedAt?.nanoseconds;

          return {
            id: docSnap.id,
            ...memoData,
            content: decryptedContent,
            status: isCreated ? 'Created' : 'Edited',
          } as Memo;
        });

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
      const encryptedContent = encryptMemo(data.content, user.uid);

      await addDoc(collection(db, 'memos'), {
        title: data.title,
        content: encryptedContent,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    [user]
  );

  const updateMemo = useCallback(
    async (id: string, data: MemoUpdate) => {
      if (!user) throw new Error('User not logged in');

      const memoRef = doc(db, 'memos', id);
      const updatePayload: Partial<MemoUpdate> = { updatedAt: serverTimestamp() };

      if (data.content) {
        updatePayload.content = encryptMemo(data.content, user.uid);
      }

      if (data.title) {
        updatePayload.title = data.title;
      }

      await updateDoc(memoRef, updatePayload);
    },
    [user]
  );

  const deleteMemo = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'memos', id));
  }, []);

  const contextValue = useMemo<MemoContextProps>(
    () => ({
      memos,
      loading,
      error,
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
