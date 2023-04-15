import React from 'react';
import { apiApi } from '../store/api.gen.api';

interface ApiListItemProps {
    idx: number;

    [key: string]: any;
}

export function ApiListItem({ id, created_at, idx, ...rest }: ApiListItemProps) {
    apiApi.usePrefetch('getAnApiRequest', {});
    return (
        <div id={'card-' + id} className={`order-${idx} flex flex-col bg-white border shadow-sm rounded-xl mb-5`}>
            <div className='overflow-y-auto p-4 md:p-5'>
                <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                    {id}
                </h3>
                <p className='mt-2 text-gray-800 dark:text-gray-400 mb-2'>
                    {created_at}
                </p>

                <pre className='bg-gray-200 rounded-lg p-4'>{JSON.stringify(rest, null, 4)}</pre>
            </div>
        </div>
    );
}