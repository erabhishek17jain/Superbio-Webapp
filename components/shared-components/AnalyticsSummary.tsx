'use client';
import { ISummary } from '@/interfaces/reporting';
import { v4 as uuidv4 } from 'uuid';

interface AnalyticsSummaryProps {
    filters: any;
    summary: ISummary[];
}

export default function AnalyticsSummary(props: AnalyticsSummaryProps) {
    const { filters, summary } = props;

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
        <>
            <div className='flex'>
                <div className='flex w-full flex-col mx-2 sm:mx-0'>
                    <div className={cols}>
                        {analytics?.map((item) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
