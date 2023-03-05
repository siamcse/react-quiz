import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signup',
                element: <PublicRoute><Signup /></PublicRoute>
            },
            {
                path: '/login',
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: '/quiz/:id',
                element: <PrivateRoute><Quiz /></PrivateRoute>
            },
            {
                path: '/result/:id',
                element: <PrivateRoute><Result /></PrivateRoute>
            }
        ]
    }
])