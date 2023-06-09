import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../common/class-names';

const sizes = [
    4, 10, 20, 50, 100
];

export interface SizeSelectionPaginationProps {
    onChange: (value: number) => void;
    size: number;
}

export function SizeSelectionPagination({ size, onChange }: SizeSelectionPaginationProps) {
    return (
        <Listbox value={size} onChange={onChange}>
            {({ open }) => (
                <div className='flex align-middle justify-center items-center'>
                    <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900 mr-2'>
                        items per page
                    </Listbox.Label>
                    <div className='relative mt-2'>
                        <Listbox.Button
                            className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                              <span className='flex items-center'>
                                <span className='ml-3 block truncate'>{size}</span>
                              </span>
                            <span
                                className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options
                                className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {sizes.map((size) => (
                                    <Listbox.Option
                                        key={size}
                                        className={({ active }) => classNames(
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )}
                                        value={size}
                                    >
                                        {({ selected, active }) => (
                                            <Fragment>
                                                <div className='flex items-center'>
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {size}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                    </span>
                                                ) : null}
                                            </Fragment>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    );
}
