import ComingSoon from '@/components/global-components/ComingSoon';
import React from 'react';

export default function Reports() {
    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full items-center justify-between pl-8 pr-4 py-3 border-b h-[80px]'>
                <span className='text-2xl font-semibold'>Your Reports</span>
            </div>
            <ComingSoon />
        </div>
    );
}
