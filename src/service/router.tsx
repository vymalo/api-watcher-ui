import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Root } from '../screens/root';
import { NotFoundScreen } from '../screens/not-found.screen';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFoundScreen />,
        children: [
            {
                path: '',
                // https://reactrouter.com/en/main/components/navigate
                Component: () => <Navigate to='/api-requests' replace />
            },
            {
                path: 'api-requests',
                lazy: () => import('../screens/all-api-requests.screen').then((m) => ({ Component: m.AllApiRequestsScreen }))
            },
            {
                path: 'api-requests/:request_id',
                lazy: () => import('../screens/single-api-request.screen').then((m) => ({ Component: m.SingleApiRequestScreen }))
            }
        ]
    }
]);