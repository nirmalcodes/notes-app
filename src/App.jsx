import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Layout>
                                        <Home />
                                    </Layout>
                                }
                            />
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </Suspense>
        </>
    );
};

export default App;
