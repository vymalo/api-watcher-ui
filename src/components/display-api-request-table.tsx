import React from 'react';
import { GetApiRequestsApiResponse } from '../store/api.gen.api';
import { ApiListItem } from './api-list-item';

interface DisplayApiRequestTableProps {
    response: GetApiRequestsApiResponse;
}

export default function DisplayApiRequestTable({ response }: DisplayApiRequestTableProps) {
    return (
        <div className='flex flex-col-reverse'>
            {response.content.map(({ id, ...rest }, idx) => (
                <ApiListItem idx={idx} key={id.toString()} id={id} {...rest} />
            ))}
        </div>
    );
}