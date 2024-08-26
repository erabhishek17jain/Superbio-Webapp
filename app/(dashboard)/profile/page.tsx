'use client';
import React from 'react';
import { useAppSelector } from '@/context';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import Link from 'next/link';
import { ProfileForm } from '@/components/shared-components/Profile';

export default function Profile() {
    const { user } = useAppSelector((state) => state.user);
    return (
        <main className={'flex flex-col gap-10 pb-20 sm:pb-8'}>
            <div className='flex flex-col w-full overflow-hidden'>
                <div className='flex w-full items-center justify-start pl-8 pr-4 py-3 border-b h-16 border-[#cdcdcd]'>
                    <div className='flex flex-col w-8 items-center h-[50px]'>
                        <Link href={'/home'} className='w-20 absolute left-6 top-[14px]'>
                            <DynamicLogo />
                        </Link>
                    </div>
                    <span className='text-lg font-semibold pl-12 sm:pl-0 lg:ml-0 xl:ml-0'>Your Profile</span>
                </div>
                <div className='flex flex-col gap-1 p-8 justify-between'>
                    <div className='flex w-full flex-col justify-between gap-4 sm:items-center lg:items-baseline'>
                        <ProfileForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
