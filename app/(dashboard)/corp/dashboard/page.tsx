'use client';
import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import CorpHomePage from '@/components/shared-components/CorpHomePage';
import { useAppDispatch } from '@/context';
import { setCampaignType } from '@/context/user';

export default function PostHomePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <>
            <div className='flex w-full items-center justify-between pl-4 sm:pl-8 pr-4 py-3 border-[#cdcdcd] border-b h-16 z-10'>
                <div className='flex flex-col w-[128px] sm:w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[17px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <div className='flex text-base w-full justify-between items-center h-12 ml-2 sm:ml-0'>
                    <span className='flex'>
                        <span
                            className='cursor-pointer text-[#8b8b8b] mr-3'
                            onClick={() => {
                                router.push('/');
                                dispatch(setCampaignType(''));
                            }}>
                            All Products
                        </span>
                        <span className='hidden sm:flex'>
                            <ChevronRightIcon color='#8b8b8b' size={22} />
                            <span className='ml-3 capitalize font-[500] text-[21px]'>Advance analytics</span>
                        </span>
                    </span>
                </div>
            </div>
            <CorpHomePage />
        </>
    );
}
