import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const ROUTES = [
    {
        name: 'Home',
        icon: false,
        path: '/',
        protected: false,
        component: Home,
        hideInSidebar: true,
        children: [],
    },
    {
        name: 'Page Not Found',
        icon: false,
        path: '*',
        protected: false,
        component: PageNotFound,
        hideInNav: true,
        children: [],
    },
];

export default ROUTES;
