import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import classes from './styles/Layout.module.css';

const Layout = () => {
    return (
        <>
            <Nav />
            <main className={classes.main}>
                <div className={classes.container}>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Layout;