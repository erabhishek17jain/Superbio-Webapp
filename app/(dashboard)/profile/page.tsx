'use client';
import React from 'react';
import { useAppSelector } from '@/context';
import { ProfileForm } from '@/components/Profile/ProfileForm';

export default function Profile() {
    const { user } = useAppSelector((state) => state.user);
    return (
        <main className={'flex flex-col gap-10 pb-20 pt-2 sm:pb-8'}>
            <div className='flex flex-col w-full overflow-hidden'>
                <div className='flex w-full items-center justify-between pl-8 pr-4 py-3 border-b h-[80px]'>
                    <span className='text-2xl font-semibold lg:ml-0 xl:ml-0'>Your Profile</span>
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
