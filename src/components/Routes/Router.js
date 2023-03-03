import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/quiz',
                element: <Quiz/>
            },
            {
                path: '/result',
                element: <Result/>
            }
        ]
    }
])