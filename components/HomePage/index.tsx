'use client';
import Image from 'next/image';
import { useAppDispatch } from '@/context';
import reporting from '@/public/dashboard/reporting.png';
import influencer from '@/public/dashboard/influencer.png';
import { setCampaignType } from '@/context/user';

const HomePage = (props: any) => {
    const dispatch = useAppDispatch();
    const { selectType, setSelectType } = props;

    return (
        <div className='flex flex-col sm:flex-row gap-10 justify-start items-start p-6 sm:w-full mg:w-10/12 lg:w-8/12 xl:1/2 overflow-y-auto my-6 mx-8'>
            <div
                className={`flex gap-4 w-full sm:w-96 rounded-sm p-4 bg-[#F7F7F7] ${selectType === 'campaign' ? 'shadow-[-12px_20px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                onClick={() => setSelectType('campaign')}>
                <Image src={reporting} alt='Campaign' className='w-16 h-[90px] p-4 pr-0' />
                <div className={`flex flex-col ${selectType === 'campaign' ? 'mb-0' : 'mb-6'}`}>
                    <span className={'text-black'}>Campaign Reporting</span>
                    <span className='text-[#7D7D7D] text-sm line-clamp-gray line-clamp-2'>Get detailed post metrics & dashboard for you and your brands</span>
                    <div className={`w-full flex justify-end text-black px-3 mt-6 mb-2`}>
                        {selectType === 'campaign' && (
                            <button className='flex gap-3 uppercase font-semibold ' onClick={() => dispatch(setCampaignType('campaign'))}>
                                Get Started
                                <svg width='24px' height='24px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='none'>
                                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                    <g id='SVGRepo_iconCarrier'>
                                        <path
                                            fill={'#000000'}
                                            d='M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z'></path>
                                    </g>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`flex gap-4 w-full sm:w-96 rounded-sm p-4 bg-[#fafafa] ${selectType === 'influncer' ? 'shadow-[-12px_20px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                onClick={() => setSelectType('influncer')}>
                <Image src={influencer} alt='Influencer' className='w-16 h-[90px] p-4 pr-0' />
                <div className={`flex flex-col ${selectType === 'influncer' ? 'mb-0' : 'mb-6'}`}>
                    <span className={'text-black'}>Influencer Analysis</span>
                    <span className='text-[#7D7D7D] text-sm line-clamp-gray line-clamp-2'>Get precise profile analytics of hundreds of influencers</span>
                    <div className={`w-full flex justify-end text-black px-3 mt-6 mb-2`}>
                        {selectType === 'influncer' && (
                            <button className='flex gap-3 uppercase font-semibold ' onClick={() => dispatch(setCampaignType('influncer'))}>
                                Get Started
                                <svg width='24px' height='24px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='none'>
                                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                    <g id='SVGRepo_iconCarrier'>
                                        <path
                                            fill={'#000000'}
                                            d='M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z'></path>
                                    </g>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
