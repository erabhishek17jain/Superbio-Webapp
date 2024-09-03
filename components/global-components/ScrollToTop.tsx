import { scrollToElementById } from '@/lib/utils';
import { ArrowUpFromDotIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
    return (
        <div className='fixed right-5 bottom-[72px] sm:bottom-5' onClick={()=>scrollToElementById('camp-top')}>
            <div className={'opacity-100 bg-[#000] inline-flex items-center rounded-full p-3 text-white shadow-sm cursor-pointer'}>
                <ArrowUpFromDotIcon size={24} color='#fff' />
            </div>
        </div>
    );
};
