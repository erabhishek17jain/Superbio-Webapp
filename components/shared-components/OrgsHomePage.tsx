'use client';
import Image from 'next/image';
import { useAppSelector } from '@/context';
import reporting from '@/public/dashboard/reporting.png';
import influencer from '@/public/dashboard/influencer.png';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const products = [
    {
        type: 'create',
        img: influencer,
        btnText: 'Get started',
        title: 'Manage Influencers',
        description: 'Get precise profile analytics of hundreds of influencers',
    },
    {
        type: 'report',
        img: reporting,
        btnText: 'Get started',
        title: 'View Influencers',
        description: 'Get precise profile analytics of hundreds of influencers',
    },
];

const OrgsHomePage = () => {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);
    const [selectType, setSelectType] = useState('create');

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 overflow-auto mb-[4.5rem] justify-start items-start p-2 sm:p-6 sm:w-full mg:w-10/12 lg:w-8/12 xl:1/2 overflow-y-auto my-4 sm:my-6 mx-4 sm:mx-8'>
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
                                        router.push(`/orgs/active/${item.type}/${user?.orgsId.$oid}`);
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
    );
};

export default OrgsHomePage;
