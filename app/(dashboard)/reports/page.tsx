import React from 'react';
import ComingSoon from '@/components/ComingSoon';

export default function Reports() {
    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full items-center justify-between pl-8 pr-4 py-3 border-b h-[80px]'>
                <span className='text-2xl font-semibold ml-6 lg:ml-0 xl:ml-0'>Your Reports</span>
            </div>
            <ComingSoon />
        </div>
    );
}
