import { ContactInfo } from '@/components/website/ContactInfo';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import Link from 'next/link';
import React from 'react';

export default function Contact() {
    return (
        <main className={'flex flex-col pb-20 sm:pb-8'}>
            <div className='flex w-full items-center justify-start pl-4 sm:pl-8 pr-4 py-3 border-b h-16 border-[#cdcdcd]'>
                <div className='flex flex-col w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[17px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <span className='text-lg font-semibold ml-16 sm:ml-0'>Contacts Us</span>
            </div>
            <div className='flex flex-col gap-10 p-5 sm:pb-8 2xl:p-5'>
                <div className='flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-8'>
                    <div className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center lg:items-baseline'>
                        <span className='flex flex-col gap-5'>
                            <p className='text-lg font-light text-secondary md:text-xl 2xl:text-2xl'>
                                Have a question or need assistance? Feel free to reach out to us!
                            </p>
                        </span>
                    </div>
                    <ContactInfo />
                </div>
            </div>
        </main>
    );
}
