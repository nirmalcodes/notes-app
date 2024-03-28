import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import { AuthProvider } from './contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ROUTES from './routes';

const Home = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <AuthProvider>
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
                </AuthProvider>
            </Suspense>
        </>
    );
};

export default App;
