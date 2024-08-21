'use client';

import { PlusCircleIcon } from "lucide-react";

export default function NewCampaign({ action, buttonText, title, description }: any) {
    return (
        <div className='flex flex-col gap-5 items-center justify-center w-96 h-[500px] m-auto'>
            <div className='flex items-center justify-center rounded-lg bg-[#F5F8FF] w-20 h-20'>
                <div className='flex p-1 rounded-lg bg-[#F5F8FF]'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24' id='link'>
                        <path
                            fill='#0151A0'
                            d='M8,12a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,12Zm2,3H7A3,3,0,0,1,7,9h3a1,1,0,0,0,0-2H7A5,5,0,0,0,7,17h3a1,1,0,0,0,0-2Zm7-8H14a1,1,0,0,0,0,2h3a3,3,0,0,1,0,6H14a1,1,0,0,0,0,2h3A5,5,0,0,0,17,7Z'></path>
                    </svg>
                </div>
            </div>
            <div className='text-3xl font-bold'>{title}</div>
            <div className='text-sm text-[#8b8b8b]'>{description}</div>
            <button onClick={action} className='bg-black flex items-center py-3 rounded-xl px-3 sm:px-6 text-white gap-2'>
                <PlusCircleIcon color='#fff' size={22} />
                <span className='flex'>{buttonText}</span>
            </button>
        </div>
    );
}
