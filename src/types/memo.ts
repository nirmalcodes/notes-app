import React from 'react';
import type { FieldValue, Timestamp } from '@firebase/firestore';

export interface Memo {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status?: 'Created' | 'Edited';
}
export interface MemoInput {
  title?: string;
  content: string;
}

export interface MemoUpdate {
  title?: string;
  content?: string;
  updatedAt?: FieldValue | Timestamp;
}

export interface MemoListProps {
  memos: Memo[];
  onEdit: (memo: Memo) => void;
  onDelete: (id: string) => void;
}

export interface MemoFormProps {
  initialData?: MemoInput;
  onSubmit: (data: MemoInput) => void;
  submitLabel: string;
}

export interface MemoDetailProps {
  memo: Memo;
  onEdit: (memo: Memo) => void;
  onDelete: (id: string) => void;
}

export interface MemoState {
  memos: Memo[];
  loading: boolean;
  error: string | null;
}

export interface MemoContextProps extends MemoState {
  addMemo: (data: MemoInput) => Promise<void>;
  updateMemo: (id: string, data: MemoUpdate) => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
}

export interface MemoProviderProps {
  children: React.ReactNode;
}
