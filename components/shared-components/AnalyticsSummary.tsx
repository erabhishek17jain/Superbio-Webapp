'use client';
import { ISummary } from '@/interfaces/reporting';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EstimatedReachModal from '../modals/EstimatedReachModal';
import { ICampaign } from '@/interfaces/campaign';

interface AnalyticsSummaryProps {
    filters: any;
    summary: ISummary[];
    campaign: ICampaign;
}

export default function AnalyticsSummary(props: AnalyticsSummaryProps) {
    const { filters, summary, campaign } = props;
    const [showEstimatedModal, setshowEstimatedModal] = useState(false);

    const openCloseEstimatedModal = () => {
        setshowEstimatedModal(!showEstimatedModal);
    };

    const analytics: ISummary[] = summary?.filter((el) => {
        if (filters && filters['platform']?.includes('instagram')) {
            return !(el.title !== 'likes' && el.title !== 'views' && el.title !== 'comments' && el.title !== 'Estimated Reach');
        } else {
            return el;
        }
    });

    let cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 w-full gap-4';
    if (analytics?.length === 6) cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 w-full gap-4';
    if (analytics?.length === 7) cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 w-full gap-4';

    return (
        <div className='flex'>
            <div className='flex w-full flex-col mx-2 sm:mx-0'>
                <div className={cols}>
                    {analytics?.map((item) => (
                        <div className='flex relative' key={item.title}>
                            {item.title === 'Estimated Reach' && (
                                <div className='absolute -right-[14px] -top-[8px] w-8 h-8 cursor-pointer' onClick={openCloseEstimatedModal}>
                                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' id='edit' width={24} height={24}>
                                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <path
                                                d='M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z'
                                                stroke='#000'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'></path>
                                            <path
                                                d='M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13'
                                                stroke='#000'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'></path>
                                        </g>
                                    </svg>
                                </div>
                            )}
                            <div
                                key={uuidv4()}
                                className={`flex justify-start flex-col sm:justify-center shadow-inner ${item.color} w-full p-4 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}>
                                <div className='flex gap-2 justify-between sm:w-auto'>
                                    <div className={`flex items-center justify-center ${item.color} bg-opacity-60 w-10 h-10 mr-3 rounded-full`}>
                                        {item.icon}
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='text-2xl text-black-100'>{item?.count}</p>
                                    </div>
                                </div>
                                <div className='flex h-9 items-end justify-between w-full'>
                                    <p className='text-xs text-black-500'>
                                        {item.title === 'Estimated Reach' || item.title === 'Posts'
                                            ? item.title
                                            : `Only ${item.basedOn} ${item.title === 'views' && filters && filters['platform']?.includes('instagram') ? 'reel' : ''} posts have ${item.title}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showEstimatedModal && <EstimatedReachModal campaign={campaign.id} openCloseModal={openCloseEstimatedModal} />}
        </div>
    );
}
