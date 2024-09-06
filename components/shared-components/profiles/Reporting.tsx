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
    isPublic: boolean;
    campaignId: string;
    initialColumns: IColumn[];
    query: { [key: string]: any };
}

export default function Reporting(props: IReportingProps) {
    const { query, meta, campaignId, isPublic, initialColumns } = props;
    const [screenWidth, setScreenWidth] = useState(0);
    const [columns, setColumns] = useState<IColumn[]>(initialColumns);
    const [loader, setloader] = useState(false);

    const loadMore = async () => {
        if (meta?.total === columns.length) return;
        setloader(true);
        query.page = query.page + 1;
        const resp: any = await JavaNetworkService.instance.getPostsData(campaignId, clearFilters(query));
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 mt-4'>
                {columns.map((item, index) => (
                    <SocialCard key={'social-s-card-' + index} item={item} isPublic={isPublic} index={index} columns={columns} setColumns={setColumns} />
                ))}
            </div>
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
