'use client';
import React from 'react';
import { useAppSelector } from '@/context';

export default function Profile() {
    const { user } = useAppSelector((state) => state.user);
    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full items-center justify-between pl-8 pr-4 py-3 border-b h-[80px]'>
                <span className='text-2xl font-semibold lg:ml-0 xl:ml-0'>User Profile</span>
            </div>
            <div className='flex flex-col gap-1 p-8 justify-between'>
                {user.profilePic !== '' ? (
                    <div
                        className='w-32 h-32 bg-[#e2e8f0] rounded-full border border-gray-300 bg-cover bg-center'
                        style={{ backgroundImage: `url("${user.profilePic}")` }}></div>
                ) : (
                    <div
                        key={'profilepic'}
                        className='relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full border border-gray-300 bg-cover bg-[#e2e8f0]'>
                        <span className='font-medium text-2xl text-gray-600 '>{user.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                )}
                <div className='flex mt-5'>
                    <span className='text-lg font-bold'>Name:</span>
                    <span className='text-lg text-[#959595] ml-3'>{user.name}</span>
                </div>
                <div className='flex'>
                    <span className='text-lg font-bold'>Mobile:</span>
                    <span className='text-lg text-[#959595] ml-3'>{user.mobileNo}</span>
                </div>
                <div className='flex'>
                    <span className='text-lg font-bold'>E-Mail:</span>
                    <span className='text-lg text-[#959595] ml-3'>{user.email}</span>
                </div>
            </div>
        </div>
    );
}
