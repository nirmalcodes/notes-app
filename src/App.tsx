import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './contexts/AuthContext';
import { MemoProvider } from './contexts/MemoContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/common/ThemeProvider';

const App = () => {
  const isProd = import.meta.env.PROD;
  console.log('Development mode:', !isProd);

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <AuthProvider>
            <MemoProvider>
              <AppRoutes />
              <Toaster richColors />
            </MemoProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
