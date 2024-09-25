'use client';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { clearFilters } from '@/lib/utils';
import { IColumn } from '@/interfaces/sheet';
import SocialCard from '../profiles/SocialCard';
import JavaNetworkService from '@/services/java.service';
import { ScrollToTop } from '../../global-components/ScrollToTop';

interface IReportingProps {
    meta: any;
    platform: string;
    campaignId: string;
    initialColumns: IColumn[];
    query: { [key: string]: any };
}

export default function Reporting(props: IReportingProps) {
    const { query, meta, campaignId, initialColumns, platform } = props;
    const [screenWidth, setScreenWidth] = useState(0);
    const [columns, setColumns] = useState<IColumn[]>(initialColumns);
    const [loader, setloader] = useState(false);

    const loadMore = async () => {
        if (meta?.total === columns.length) return;
        setloader(true);
        query.page = query.page + 1;
        const resp: any = await JavaNetworkService.instance.getProfilesData(campaignId, clearFilters(query), platform);
        setColumns((prev: any) => [...prev, ...resp?.items]);
        setloader(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {screenWidth > 1280 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4 mt-4'>
                    <div className='w-full md:w-[calc(33.3%-15px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 1 && (
                                    <SocialCard key={'social-1280-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && (
                                    <SocialCard key={'social-1280s-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 0 && (
                                    <SocialCard key={'social-1280ss-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                                )
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 1280 && screenWidth > 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4 mt-4'>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 1 && (
                                    <SocialCard key={'social-640-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && (
                                    <SocialCard key={'social-640s-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                                )
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4 mt-4'>
                    <div className='w-full flex flex-col'>
                        {columns.map((item, index) => (
                            <SocialCard key={'social-s-card-' + index} platform={platform} item={item} index={index} campaignId={campaignId} />
                        ))}
                    </div>
                </div>
            )}
            {columns.length === 0 && screenWidth > 0 && (
                <div className='flex items-center justify-center w-full h-[200px] my-6 mx-auto text-xl font-semibold'>Links not available.</div>
            )}
            {loader && (
                <div className='fixed left-1/2 bottom-[72px] sm:bottom-5'>
                    <div className={'opacity-100 bg-[#000] inline-flex items-center rounded-full p-2 text-white shadow-sm'}>
                        <div className='flex items-center justify-center w-8 h-8 mx-auto'>
                            <div className='flex items-center justify-center w-6 h-6'>
                                <div className='border-t-transparent border-solid animate-spin rounded-full border-white border-[3px] w-full h-full'></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!loader && <InView as='div' onChange={(inView, entry) => inView && loadMore()} className='flex items-center justify-center h-8'></InView>}
            <ScrollToTop />
        </>
    );
}
