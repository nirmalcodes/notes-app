import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './contexts/AuthContext';
import { MemoProvider } from './contexts/MemoContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const isProd = import.meta.env.PROD;
  console.log('Development mode:', !isProd);

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <AuthProvider>
          <MemoProvider>
            <AppRoutes />
          </MemoProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
