"use client";
import SideBar from '@/components/SideBar';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isPublic = searchParams.get('isPublic') === 'true';
    return isPublic ? children : (
        <div className='flex w-full h-screen '>
            <div className='flex'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>{children}</div>
        </div>
    );
}
