'use client';

import { LayoutPanelLeftIcon, PlusCircleIcon } from 'lucide-react';

export default function NewCampaign({ action, buttonText, title, description }: any) {
    return (
        <div className='flex flex-col gap-5 items-center justify-center w-96 h-[500px] m-auto'>
            <div className='flex items-center justify-center rounded-lg bg-[#F5F8FF] w-20 h-20'>
                <div className='flex p-1 rounded-lg bg-[#F5F8FF]'>
                    <LayoutPanelLeftIcon size={50} color='#0151A0' />
                </div>
            </div>
            <div className='text-3xl font-bold'>{title}</div>
            <div className='text-sm text-[#8b8b8b]'>{description}</div>
            <button onClick={action} className='cursor-pointer bg-black flex items-center py-3 rounded-xl px-3 sm:px-6 text-white gap-2'>
                <PlusCircleIcon color='#fff' size={22} />
                <span className='flex'>{buttonText}</span>
            </button>
        </div>
    );
}
