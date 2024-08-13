'use client';
import React from 'react';
import { useAppSelector } from '@/context';
import { ProfileForm } from '@/components/Profile/ProfileForm';
import DynamicLogo from '@/components/DynamicLogo';
import Link from 'next/link';

export default function Profile() {
    const { user } = useAppSelector((state) => state.user);
    return (
        <main className={'flex flex-col gap-10 pb-20 sm:pb-8'}>
            <div className='flex flex-col w-full overflow-hidden'>
                <div className='flex w-full items-center justify-start pl-8 pr-4 py-3 border-b h-[75px] border-[#CDCDCD]'>
                    <div className='flex flex-col w-10 items-center'>
                        <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                            <DynamicLogo />
                        </Link>
                    </div>
                    <span className='text-2xl font-semibold pl-12 sm:pl-0 lg:ml-0 xl:ml-0'>Your Profile</span>
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
