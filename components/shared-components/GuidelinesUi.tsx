'use client';
import Image from 'next/image';
import guidelinesImg from '@/public/dashboard/guidelines4.svg';
import { XIcon } from 'lucide-react';

export default function GuidelinesUi({ openCloseModal }: any) {
    return (
        <div id='guidelinesPanel' className='fixed top-0 right-0 h-screen z-20'>
            <div className='flex w-2/5 min-w-[225px] flex-col p-6 border-l border-[#cdcdcd] bg-[#F5F8FF] fixed right-0'>
                <p className='flex gap-4 text-lg font-bold items-center mb-2'>
                    <span className='-mr-1' onClick={openCloseModal}>
                        <XIcon color={'#000'} size={24} />
                    </span>
                    <span className='flex gap-2 items-center'>Google Sheets Guidelines</span>
                </p>
                <div className='flex flex-col'>
                    <Image src={guidelinesImg} width={400} height={200} alt='Guidelines' className='w-full' />
                    <span className='test-base mt-5 font-semibold'>Google Sheet Format for Campaign Tracking</span>
                    <ul className='flex flex-col gap-2 text-sm mt-4 mx-4 list-disc'>
                        <li>
                            The sheet should be in the exact same format as shown in the example. Do not use colours, labels or make any extra modification
                            apart from adding your data.
                        </li>
                        <li>The sheet should always be Public with at least View Access enabled.</li>
                        <li>Do not put duplicate links in the sheet and do not put duplicate links across multiple sheets for the same campaign</li>
                        <li>Do not leave any blank row between the links</li>
                        <li>Campaign Phase, Category and Subcategory columns are optional.</li>
                        <ul className='flex flex-col gap-2 text-sm ml-4 list-disc'>
                            <li>
                                If you fill details in those columns, you will be able to directly filter your posts in the dashboard based on those columns
                                values.
                            </li>
                            <li>You can fill any values. For example, you can mention content type (Post, Reel etc.) in the category/subcategory.</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
}
