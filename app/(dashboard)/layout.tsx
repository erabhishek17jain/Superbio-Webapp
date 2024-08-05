'use client';
import SideBar from '@/components/SideBar';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import bgImage from '@/public/background.svg';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isPublic = searchParams.get('isPublic') === 'true';
    return isPublic ? (
        children
    ) : (
        <main
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
            className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='flex mt-[73px]'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>{children}</div>
        </main>
    );
}
