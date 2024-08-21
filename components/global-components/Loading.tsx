import { LoaderIcon } from 'lucide-react';
import React from 'react';

export default function Loading() {
    return (
        <div role='status' className='flex flex-col h-screen w-full justify-center items-center w-16'>
            <LoaderIcon color='#000' size={24} />
            <span className='sr-only'>Loading...</span>
        </div>
    );
}
