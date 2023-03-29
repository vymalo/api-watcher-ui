import {ReactNode} from "react";

interface AppLayoutProps {
    title?: string;
    children: ReactNode;
}

export function AppLayout({title, children}: AppLayoutProps) {
    return (
        <div>
            {title && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                    </div>
                </header>
            )}

            <main className='p-3 sm:p-0 min-h-full'>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}