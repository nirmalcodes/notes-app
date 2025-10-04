import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '@/pages/auth/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/layouts/main-layout';

const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
