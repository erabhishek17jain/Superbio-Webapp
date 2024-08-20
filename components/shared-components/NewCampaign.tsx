'use client';
import Link from 'next/link';

export default function NewCampaign({ params }: any) {
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
            <div className='text-3xl font-bold'>Add links for reporting</div>
            <div className='text-sm text-[#959595]'>
                Empower your reporting capabilities with a quick link addition for seamless campaign insights. Elevate your analytics game in just one click!
            </div>
            <Link
                href={`/${params?.campaignType}/create/${params.campaignId}`}
                className='bg-black flex items-center py-2 rounded-xl pl-4 pr-5 text-white text-sm gap-2'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='stroke-2 stroke-black'>
                    <path
                        d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                        fill='white'
                    />
                </svg>
                <span className='flex'>Add Links</span>
            </Link>
        </div>
    );
}
