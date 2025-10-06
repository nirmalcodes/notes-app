import React, { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useMemoContext } from '@/contexts/MemoContext';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const { user } = useAuthContext();
  const { memos, loading, addMemo, updateMemo, deleteMemo } = useMemoContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addMemo({ title, content });
    setTitle('');
    setContent('');
  };

  if (!user) return <p className="p-4 text-center">Please sign in to view memos.</p>;
  if (loading) return <p className="p-4 text-center">Loading memos...</p>;
  console.log('USER: ', user);

  const renderTextWithLineBreaks = (text: string): React.ReactNode => {
    if (!text) return null;

    const lines = text.split('\n');

    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1>Welcome to the Home Page</h1>
        <div className="mx-auto p-4">
          <h1 className="mb-4 text-2xl font-semibold">Your Memos</h1>

          {/* Add new memo */}
          <div className="mb-4 flex flex-col gap-2">
            <input
              className="rounded border p-2"
              placeholder="Memo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="rounded border p-2"
              placeholder="Memo content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleAdd} className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
              Add Memo
            </button>
          </div>

          {/* Memo list */}
          <ul className="space-y-3">
            {memos.map((memo) => (
              <li key={memo.id} className="flex items-center justify-between rounded border p-3">
                <div>
                  <h3 className="font-medium">{memo.title}</h3>
                  <p className="text-sm text-gray-600">{renderTextWithLineBreaks(memo.content)}</p>
                </div>
                <button onClick={() => deleteMemo(memo.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
            {memos.map((memo) => (
              <Card key={memo.id} className="mb-4 break-inside-avoid">
                <CardContent>
                  <h3 className="mb-2 text-lg font-semibold">{memo.title}</h3>
                  <p className="text-sm text-gray-700">{renderTextWithLineBreaks(memo.content)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
