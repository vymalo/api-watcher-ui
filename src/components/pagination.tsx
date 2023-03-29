import React, { useCallback, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames } from '../common/class-names';
import { SizeSelectionPagination } from './size-selection.pagination';
import { Pagination } from '../types/pagination';

interface AppPaginationProps {
    pagination: Pagination;
    total: number;
    onChange: (value: Pagination) => void;
}


export function AppPagination({ pagination: { page, size }, onChange, total }: AppPaginationProps) {
    const onNext = useCallback(() => onChange({ page: 1 + page, size }), [onChange, page, size]);
    const onPrev = useCallback(() => onChange({ page: -1 + page, size }), [onChange, page, size]);

    const onPage = useCallback((newPage: number) => () => onChange({ page: newPage, size }), [onChange, size]);
    const values = useMemo(() => new Array<number>(size === 0 ? 0 : Math.ceil(total / size)).fill(0), [total, size]);
    const hidden = useMemo(() => {
        if (values.length > 6) {
            return [0, values.length - 1];
        }
        return [];
    }, [values]);

    const cannotGoPrev = useMemo(() => page <= 0, [page]);
    const cannotGoNext = useMemo(() => (1 + page) * size >= total, [page, size, total]);

    return (
        <div className='flex border rounded-lg items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6'>
            <div className='flex flex-1 justify-between sm:hidden'>
                <button
                    type='button'
                    disabled={cannotGoPrev}
                    onClick={onPrev}
                    className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                    Previous
                </button>
                <button
                    disabled={cannotGoNext}
                    type='button'
                    onClick={onNext}
                    className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                    Next
                </button>
            </div>

            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between z-10'>
                <div>
                    <p className='text-sm text-gray-700'>
                        Showing <span className='font-medium'>{page * size}</span> to <span
                        className='font-medium'>{Math.min(page * size + size, total)}</span> of{' '}
                        <span className='font-medium'>{total}</span> results
                    </p>
                </div>

                <div>
                    <SizeSelectionPagination size={size} onChange={(size) => onChange({ page, size })} />
                </div>

                <div>
                    <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
                        <button
                            disabled={cannotGoPrev}
                            type='button'
                            onClick={onPrev}
                            className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                        </button>

                        {values.map((_, idx) => {
                            if (idx === page || !(hidden[0] < idx && idx < hidden[1])) {
                                return (
                                    <button
                                        id={idx + '-pagination-button'}
                                        key={idx}
                                        type='button'
                                        onClick={onPage(idx)}
                                        className={classNames(
                                            'relative',
                                            'z-10',
                                            'inline-flex',
                                            'items-center',
                                            'px-4 py-2 text-sm font-semibold',
                                            'focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                            idx === page ? 'bg-indigo-600 text-white' : 'ring-1 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50'
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            }

                            if ((hidden[0] + 1 === idx && idx < page) || (hidden[1] - 1 === idx && page < idx))
                                return (
                                    <span className='px-2' key={idx}>
                                        ...
                                    </span>
                                );

                            return null;
                        })}

                        <button
                            disabled={cannotGoNext}
                            type='button'
                            onClick={onNext}
                            className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
