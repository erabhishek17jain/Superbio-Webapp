'use client';
import Image from 'next/image';
import guidelinesImg from '@/public/guidelines4.svg';

export default function GuidelinesUi() {
    const toggleFilter = () => {
        const panel = document.getElementById('guidelinesPanel');
        if (panel) {
            panel.classList.toggle('hidden');
        }
    };

    return (
        <div id='guidelinesPanel' className='w-full fixed top-0 right-0 border-l border-[#E6E6E6] h-screen bg-black bg-opacity-40 z-20'>
            <div className='flex w-2/5 min-w-[225px] flex-col p-6 bg-white fixed right-0'>
                <p className='flex justify-between text-lg font-bold'>
                    <span className='flex gap-2 items-center mb-2'>Google Sheets Guidelines</span>
                    <span className='-mr-1' onClick={() => toggleFilter()}>
                        <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                            <g id='SVGRepo_iconCarrier'>
                                <path
                                    d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z'
                                    fill='#0F0F0F'></path>
                            </g>
                        </svg>
                    </span>
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
