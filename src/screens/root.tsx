import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/app-header';

export function Root() {
    return (
        <Fragment>
            <AppHeader />
            <Outlet />
        </Fragment>
    );
}