import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import ROUTES from './routes';
import { AuthProvider } from './contexts/AuthContext';
const Home = lazy(() => import('./pages/Home'));

const App = () => {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <AuthProvider>
                    <Layout>
                        <Home />
                    </Layout>
                </AuthProvider>
            </Suspense>
        </>
    );
};

export default App;
