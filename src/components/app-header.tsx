import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../service/store';
import { classNames } from '../common/class-names';

const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Sms Requests', href: '/sms-requests' }
];

export function AppHeader() {
    const socketConnectionStatus = useAppSelector((state) => state.socket.connected);
    return (
        <div className='min-h-full sticky'>
            <Disclosure as='nav' className='bg-gray-800'>
                {({ open }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                            <div className='flex h-16 items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0'>
                                        <img
                                            className='h-8 w-8'
                                            src='/icons/android-chrome-512x512.png'
                                            alt='SMS API Watcher'
                                        />
                                    </div>
                                    <div className='hidden sm:block'>
                                        <div className='ml-10 flex items-baseline space-x-4'>
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({ isActive }) => classNames(
                                                        isActive
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-sm px-3 py-2 text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden sm:block'>
                                    <div className='ml-4 flex items-center sm:ml-6'>
                                        {!socketConnectionStatus && (
                                            <button
                                                type='button'
                                                className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                            >
                                                <span className='sr-only'>View notifications</span>
                                                <BellIcon className='h-6 w-6' aria-hidden='true' />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='-mr-2 flex sm:hidden'>
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className='inline-flex items-center justify-center rounded-sm bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                        <span className='sr-only'>Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                                        ) : (
                                            <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className='sm:hidden'>
                            <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as={NavLink}
                                        to={item.href}
                                        className={({ isActive }) => classNames(
                                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-sm px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className='border-t border-gray-700 pt-4 pb-3'>
                                <div className='flex items-center px-5'>
                                    {!socketConnectionStatus && (
                                        <button
                                            type='button'
                                            className='ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                        >
                                            <span className='sr-only'>View notifications</span>
                                            <BellIcon className='h-6 w-6' aria-hidden='true' />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
