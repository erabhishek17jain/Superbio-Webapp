'use client';
import BottomBar from '@/components/shared-components/BottomBar';
import SideBar from '@/components/shared-components/SideBar';
import { useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';

export default function Dashboard({ subComponent }: any) {
    const searchParams = useSearchParams();
    const isPublic = searchParams.get('isPublic') === 'true';
    return isPublic ? (
        subComponent
    ) : (
        <main className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='hidden sm:flex mt-[63px] -mb-[63px]'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>{subComponent}</div>
            <div className='flex sm:hidden'>
                <BottomBar />
            </div>
        </main>
    );
}
