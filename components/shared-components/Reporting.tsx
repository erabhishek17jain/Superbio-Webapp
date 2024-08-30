'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';
import { clearFilters } from '@/lib/utils';
import { IColumn } from '@/interfaces/sheet';
import SocialCard from './SocialCard';
import JavaNetworkService from '@/services/java.service';
import { ArrowUpFromDotIcon } from 'lucide-react';

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
        <div>
            {screenWidth > 1280 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4'>
                    <div className='w-full md:w-[calc(33.3%-15px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 1 && (
                                    <SocialCard
                                        key={'social-1280-card-' + index}
                                        item={item}
                                        isPublic={isPublic}
                                        index={index}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && (
                                    <SocialCard
                                        key={'social-1280s-card-' + index}
                                        item={item}
                                        isPublic={isPublic}
                                        index={index}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 0 && (
                                    <SocialCard
                                        key={'social-1280ss-card-' + index}
                                        item={item}
                                        isPublic={isPublic}
                                        index={index}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                )
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 1280 && screenWidth > 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4'>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 1 && (
                                    <SocialCard
                                        key={'social-640-card-' + index}
                                        item={item}
                                        isPublic={isPublic}
                                        index={index}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                )
                        )}
                    </div>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && (
                                    <SocialCard
                                        key={'social-640s-card-' + index}
                                        item={item}
                                        isPublic={isPublic}
                                        index={index}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                )
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4'>
                    <div className='w-full flex flex-col'>
                        {columns.map((item, index) => (
                            <SocialCard
                                key={'social-s-card-' + index}
                                item={item}
                                isPublic={isPublic}
                                index={index}
                                columns={columns}
                                setColumns={setColumns}
                            />
                        ))}
                    </div>
                </div>
            )}
            {screenWidth === 0 && (
                <div className='flex items-center justify-center w-full h-[200px] my-6 mx-auto'>
                    <div className='flex items-center justify-center w-32 h-32'>
                        <div className='border-t-transparent border-solid animate-spin rounded-full border-black border-8 w-full h-full'></div>
                    </div>
                </div>
            )}
            {columns.length === 0 && screenWidth > 0 && (
                <div className='flex items-center justify-center w-full h-[200px] my-6 mx-auto text-xl font-semibold'>Links not available.</div>
            )}
            {loader && (
                <Link className='fixed left-1/2 bottom-[72px] sm:bottom-5' href='#camp-top'>
                    <div className={'opacity-100 bg-[#000] inline-flex items-center rounded-full p-2 text-white shadow-sm'}>
                        <div className='flex items-center justify-center w-8 h-8 mx-auto'>
                            <div className='flex items-center justify-center w-6 h-6'>
                                <div className='border-t-transparent border-solid animate-spin rounded-full border-white border-[3px] w-full h-full'></div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {!loader && <InView as='div' onChange={(inView, entry) => inView && loadMore()} className='flex items-center justify-center h-8'></InView>}
            <Link className='fixed right-5 bottom-[72px] sm:bottom-5' href='#camp-top'>
                <div className={'opacity-100 bg-[#000] inline-flex items-center rounded-full p-3 text-white shadow-sm'}>
                    <ArrowUpFromDotIcon size={24} color='#fff' />
                </div>
            </Link>
        </div>
    );
}
