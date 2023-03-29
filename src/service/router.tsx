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
                Component: () => <Navigate to='/sms-requests' replace />
            },
            {
                path: 'sms-requests',
                lazy: () => import('../screens/all-sms-requests.screen').then((m) => ({ Component: m.AllSmsRequestsScreen }))
            },
            {
                path: 'sms-requests/:request_id',
                lazy: () => import('../screens/single-sms-request.screen').then((m) => ({ Component: m.SingleSmsRequestScreen }))
            }
        ]
    }
]);