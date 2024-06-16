import React from 'react';

export default function Contact() {
    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full items-center justify-between pl-8 pr-4 py-3 border-b h-[80px]'>
                <span className='text-2xl font-semibold ml-6 lg:ml-0 xl:ml-0'>Your Contacts</span>
            </div>
            <div className='flex flex-col gap-4 p-8 justify-between'>
                <div className='flex'>
                    <span className='text-lg font-bold'>E-mail:</span>
                    <span className='text-lg text-[#959595] ml-3'>hello@loqo.ai</span>
                </div>
                <div className='flex'>
                    <span className='text-lg font-bold'>Mobile:</span>
                    <span className='text-lg text-[#959595] ml-3'>+91 7795983243</span>
                </div>
                <div className='flex'>
                    <span className='text-lg font-bold'>WhatsApp:</span>
                    <span className='text-lg text-[#959595] ml-3'>+91 7795983243</span>
                </div>
            </div>
        </div>
    );
}
