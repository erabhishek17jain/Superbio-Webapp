'use client';
import Image from 'next/image';
import { useAppDispatch } from '@/context';
import reporting from '@/public/dashboard/reporting.png';
import influencer from '@/public/dashboard/influencer.png';
import { setCampaignType } from '@/context/user';
import { ArrowRightIcon } from 'lucide-react';

const HomePage = (props: any) => {
    const dispatch = useAppDispatch();
    const { selectType, setSelectType } = props;

    return (
        <div className='flex flex-col sm:flex-row gap-10 justify-start items-start p-2 sm:p-6 sm:w-full mg:w-10/12 lg:w-8/12 xl:1/2 overflow-y-auto my-4 sm:my-6 mx-4 sm:mx-8'>
            <div
                className={`flex gap-4 w-full sm:w-96 rounded-sm p-4 bg-[#F7F7F7] ${selectType === 'post' ? 'shadow-[-12px_20px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                onClick={() => setSelectType('post')}>
                <Image src={reporting} alt='Campaign' className='w-16 h-[90px] p-4 pr-0' />
                <div className={`flex flex-col ${selectType === 'post' ? 'mb-0' : 'mb-6'}`}>
                    <span className={'text-black'}>Campaign Reporting</span>
                    <span className='text-[#8b8b8b] text-sm line-clamp-gray line-clamp-2'>Get detailed post metrics & dashboard for you and your brands</span>
                    <div className={`w-full flex justify-end text-black px-3 mt-6 mb-2`}>
                        {selectType === 'post' && (
                            <button className='cursor-pointer flex gap-3 uppercase font-semibold ' onClick={() => dispatch(setCampaignType('post'))}>
                                Get Started
                                <ArrowRightIcon color={'#000'} size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`flex gap-4 w-full sm:w-96 rounded-sm p-4 bg-[#fafafa] ${selectType === 'profile' ? 'shadow-[-12px_20px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                onClick={() => setSelectType('profile')}>
                <Image src={influencer} alt='Influencer' className='w-16 h-[90px] p-4 pr-0' />
                <div className={`flex flex-col ${selectType === 'profile' ? 'mb-0' : 'mb-6'}`}>
                    <span className={'text-black'}>Influencer Analysis</span>
                    <span className='text-[#8b8b8b] text-sm line-clamp-gray line-clamp-2'>Get precise profile analytics of hundreds of influencers</span>
                    <div className={`w-full flex justify-end text-black px-3 mt-6 mb-2`}>
                        {selectType === 'profile' && (
                            <button className='cursor-pointer flex gap-3 uppercase font-semibold' onClick={() => dispatch(setCampaignType('profile'))}>
                                Get Started
                                <ArrowRightIcon color={'#000'} size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
