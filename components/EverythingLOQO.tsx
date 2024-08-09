'use client';
import { useRef } from 'react';
import Image from 'next/image';
import everything1 from '@/public/everything1.svg';
import everything2 from '@/public/everything2.svg';
import everything3 from '@/public/everything3.svg';
import everything4 from '@/public/everything4.svg';

export const EverythingLOQO = () => {
    const ref = useRef(null);
    return (
        <section ref={ref} id='' className='pt-6 pb-5 flex flex-col justify-center'>
            {/* <Image src={campTracker} alt='campTracker' className='w-full mb-8 sm:mb-12' /> */}
            <div className='flex flex-col gap-y-2 xl:w-1/2'>
                <h2 className='text-2xl font-normal'>Everything you need to track campaign ROIs</h2>
                <p className='text-pretty text-base font-light text-gray-500'>Enjoy LOQO’s powerful features and measure your ROIs with ease</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-6 mt-8 sm:mt-12'>
                <div className='w-full sm:w-2/3 bg-[#F7F7F7] pt-6 shadow-lg rounded-lg'>
                    <div className='text-base font-semibold px-6'>Post Preview</div>
                    <div className='text-sm font-light px-6'>Get convenient influencer post previews directly on your dashboard</div>
                    <div className='flex w-full justify-end'>
                        <Image src={everything1} alt='everything1' className='w-[95%] -mt-6 sm:-mt-12' />
                    </div>
                </div>
                <div className='w-full sm:w-1/3 bg-[#F7F7F7] pt-6 shadow-lg rounded-lg'>
                    <div className='text-base font-semibold px-6'>Spreadsheet enabled</div>
                    <div className='text-sm font-light px-6'>Upload your usual Spreadsheet & leave the detailed reporting to us</div>
                    <div className='flex w-full justify-end'>
                        <Image src={everything2} alt='everything2' className='w-[95%] -mt-16 sm:-mt-12' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-6 mt-6'>
                <div className='w-full sm:w-1/3 bg-[#F7F7F7] pt-6 shadow-lg rounded-lg'>
                    <div className='text-base font-semibold px-6'>Shareable Dashboard</div>
                    <div className='text-sm font-light px-6'>Skip the slide presentations with LOQO’s data-rich shareable dashboard.</div>
                    <div className='flex w-full justify-end'>
                        <Image src={everything3} alt='everything1' className='w-[95%] -mt-3 sm:-mt-12' />
                    </div>
                </div>
                <div className='w-full sm:w-2/3 bg-[#F7F7F7] pt-6 shadow-lg rounded-lg'>
                    <div className='text-base font-semibold px-6'>Designed for Teams</div>
                    <div className='text-sm font-light px-6'>Collaborate and work like as if you’re right next to each other</div>
                    <div className='flex w-full justify-end'>
                        <Image src={everything4} alt='everything1' className='w-[95%] -mt-3 sm:-mt-12' />
                    </div>
                </div>
            </div>
        </section>
    );
};
