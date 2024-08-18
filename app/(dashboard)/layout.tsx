'use client';
import BottomBar from '@/components/shared-components/BottomBar';
import SideBar from '@/components/shared-components/SideBar';
import { useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const isPublic = searchParams.get('isPublic') === 'true';
    return isPublic ? (
        children
    ) : (
        <main className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='hidden sm:flex mt-[74px] -mb-[74px]'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>{children}</div>
            <div className='flex sm:hidden'>
                <BottomBar />
            </div>
        </main>
    );
}
