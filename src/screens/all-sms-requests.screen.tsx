import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { AppLayout } from '../components/app-layout';
import { useGetSmsRequestsQuery } from '../store/sms.gen.api';
import { AppPagination } from '../components/pagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Loading } from '../components/loading';
import { Pagination } from '../types/pagination';

const DisplaySmsRequestTable = lazy(() => import('../components/display-sms-request-table'));

export function AllSmsRequestsScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();

    const [pagination, setPagination] = useState<Pagination>({
        page: 0, size: 4
    });
    const { data, error, isLoading, isError, isSuccess } = useGetSmsRequestsQuery({
        page: pagination.page, size: pagination.size
    }, {
        pollingInterval: 60_000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        navigate({
            hash: location.hash,
            pathname: location.pathname,
            search: `page=${pagination.page}&size=${pagination.size}`
        }, {
            replace: true
        });
    }, [location.hash, location.pathname, navigate, pagination]);

    useEffect(() => {
        const getInt = (param: string, def = 0) => {
            let int = def;
            const intStr = params.get(param);
            if (intStr !== null && intStr.length > 0) {
                int = Number(intStr);
            }
            return int;
        };

        const page = getInt('page');
        const size = getInt('size', 4);

        setPagination(prevState => ({ ...prevState, page, size }));
    });

    return (
        <AppLayout title='SMS Requests'>
            {isLoading && (
                <Fragment>
                    Loading...
                </Fragment>
            )}

            {isError && (
                <Fragment>
                    Error when fetching objects:
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </Fragment>
            )}

            {isSuccess && (
                <Suspense fallback={<Loading />}>
                    <DisplaySmsRequestTable response={data} />
                </Suspense>
            )}

            <AppPagination
                total={data?.meta?.total ?? 0}
                onChange={setPagination}
                pagination={pagination}
            />
        </AppLayout>
    );
}