import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    // ==================================================================================== //

    let isAuth = false;

    if (localStorage.getItem('access_token')) {
        if (JSON.parse(localStorage.getItem('access_token'))) {
            if (
                JSON.parse(localStorage.getItem('access_token')).expires_in >
                Date.now()
            ) {
                isAuth = true;
            }
        }
    }

    // ==================================================================================== //

    return isAuth ? (
        <Outlet
            {...rest}
            element={(props) => {
                <Component {...props} />;
            }}
        />
    ) : (
        <Navigate to='/login' replace />
    );
};
