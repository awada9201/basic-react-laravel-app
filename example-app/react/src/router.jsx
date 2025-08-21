import {createBrowserRouter} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Components
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';

// Views
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Signup from './views/Signup';
import NotFound from './views/NotFound';
import Users from './views/Users';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children:
        [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: 
        [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },

])

export default router;