import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/Users";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Userform from "./views/UserForm";

const router = createBrowserRouter
([
    // DefaultLayout Paths
    {
        path: '/',
        element: <DefaultLayout />,
        children: 
        [
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: 'users/new',
                element: <Userform key='userCreate'/>
            },
            {
                path: 'users/:id',
                element: <Userform key='userUpdate'/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },

    // GuestLayout Paths
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
    }
])

export default router;