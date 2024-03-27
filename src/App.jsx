import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import ROUTES from './routes';
const Home = lazy(() => import('./pages/Home'));

const App = () => {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Layout>
                    <Home />
                </Layout>
            </Suspense>
        </>
    );
};

export default App;
