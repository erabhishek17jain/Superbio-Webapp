import React from 'react';

export default function Loading() {
    return (
        <div className='flex items-center justify-center w-full h-[500px] my-6 mx-auto'>
            <div className='flex items-center justify-center w-32 h-32'>
                <div className='border-t-transparent border-solid animate-spin rounded-full border-black border-8 w-full h-full'></div>
            </div>
        </div>
    );
}