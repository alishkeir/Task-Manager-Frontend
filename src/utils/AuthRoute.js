import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = ({ component: Component, ...rest }) => {
    // ==================================================================================== //

    let isAuth = true;

    if (localStorage.getItem('access_token')) {
        if (JSON.parse(localStorage.getItem('access_token'))) {
            if (
                JSON.parse(localStorage.getItem('access_token')).expires_in <
                Date.now()
            ) {
                isAuth = false;
            }
        } else {
            isAuth = false;
        }
    } else {
        isAuth = false;
    }

    // ==================================================================================== //

    return !isAuth ? (
        <Outlet
            {...rest}
            element={(props) => {
                <Component {...props} />;
            }}
        />
    ) : (
        <Navigate to='/' replace />
    );
};
