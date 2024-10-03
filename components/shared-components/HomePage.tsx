'use client';
import Image from 'next/image';
import { useAppDispatch } from '@/context';
import reporting from '@/public/dashboard/reporting.png';
import influencer from '@/public/dashboard/influencer.png';
import { setCampaignType } from '@/context/user';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DynamicLogo from '../global-components/DynamicLogo';
import Link from 'next/link';

const products = [
    {
        type: 'post',
        img: reporting,
        btnText: 'Get started',
        title: 'Campaign Reporting',
        description: 'Get detailed post metrics & dashboard for you and your brands',
    },
    {
        type: 'profile',
        img: influencer,
        btnText: 'Get started',
        title: 'Influencer Analysis',
        description: 'Get precise profile analytics of hundreds of influencers',
    },
    {
        type: 'orgs',
        img: influencer,
        btnText: 'Get started',
        title: 'Agency Managed Influencer',
        description: 'Get precise profile analytics of influencers of your agency',
    },
    // {
    //     type: 'analytics',
    //     img: reporting,
    //     btnText: 'Get started',
    //     title: 'Advance analytics',
    //     description: 'Get precise profile analytics of hundreds of influencers',
    // },
];

const HomePage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [selectType, setSelectType] = useState('campaign');

    return (
        <>
            <div className='flex w-full items-center justify-between pl-4 sm:pl-8 pr-4 py-3 border-[#cdcdcd] border-b h-16 z-10'>
                <div className='flex flex-col w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[17px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <div className='flex w-full justify-between items-center h-12'>
                    <span className='hidden sm:flex gap-2 lg:ml-0 xl:ml-0'>
                        <span
                            className='text-lg cursor-pointer font-semibold'
                            onClick={() => {
                                router.push('/');
                                dispatch(setCampaignType(''));
                            }}>
                            All Products
                        </span>
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 overflow-auto mb-[4.5rem] justify-start items-start p-2 sm:p-6 sm:w-full overflow-y-auto my-4 sm:my-6 mx-4 sm:mx-8'>
                {products.map((item: any) => (
                    <div
                        key={item.type}
                        className={`flex gap-4 w-full sm:w-full w-96 rounded-sm p-4 bg-[#F7F7F7] ${selectType === item.type ? 'shadow-[-12px_20px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                        onClick={() => setSelectType(item.type)}>
                        <Image src={item.img} alt='Campaign' className='w-16 h-[90px] p-4 pr-0' />
                        <div className={`flex flex-col ${selectType === item.type ? 'mb-0' : 'mb-6'}`}>
                            <span className={'text-black'}>{item.title}</span>
                            <span className='text-[#8b8b8b] text-sm line-clamp-gray line-clamp-2'>{item.description}</span>
                            <div className={`w-full flex justify-end text-black px-3 mt-6 mb-2`}>
                                {selectType === item.type && (
                                    <button
                                        className='cursor-pointer flex gap-3 uppercase font-semibold '
                                        onClick={() => {
                                            router.push(`/${item.type}/dashboard`);
                                            dispatch(setCampaignType(item.type));
                                        }}>
                                        {item.btnText}
                                        <ArrowRightIcon color={'#000'} size={24} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;
