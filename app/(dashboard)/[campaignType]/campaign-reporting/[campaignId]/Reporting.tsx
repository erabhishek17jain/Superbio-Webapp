'use client';
import React from 'react';
import Link from 'next/link';
import { BiArrowFromBottom } from 'react-icons/bi';
import { IColumn } from '@/services/sheet.service';
import SocialCard from '@/components/SocialCard';
import { InView } from 'react-intersection-observer';

interface IReportingProps {
    initialColumns: IColumn[];
    meta: { [key: string]: any };
    isPublic: boolean;
    campaignId: string;
    total: number;
}

export default function Reporting(props: IReportingProps) {
    const { meta, isPublic, total } = props;
    const [screenWidth, setScreenWidth] = React.useState(0);
    const [columns, setColumns] = React.useState<IColumn[]>(props.initialColumns.slice(0, 6));
    const [isLoadMore] = React.useState(false);
    const [loader, setloader] = React.useState(false);

    const loadMore = async () => {
        if (total === columns.length) {
            return;
        }
        setloader(true);
        setTimeout(() => {
            setColumns((prev: any) => [...prev, ...props.initialColumns.slice(prev.length, prev.length + 6)]);
            setloader(false);
        }, 2000);
    };

    React.useEffect(() => {
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
                                (index + 1) % 3 === 1 && <SocialCard key={'social-1280-card-' + index} item={item} isPublic={isPublic} index={index} />
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && <SocialCard key={'social-1280s-card-' + index} item={item} isPublic={isPublic} index={index} />
                        )}
                    </div>
                    <div className='w-full md:w-[calc(33.3%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 0 && <SocialCard key={'social-1280ss-card-' + index} item={item} isPublic={isPublic} index={index} />
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 1280 && screenWidth > 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4'>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 1 && <SocialCard key={'social-640-card-' + index} item={item} isPublic={isPublic} index={index} />
                        )}
                    </div>
                    <div className='w-full md:w-[calc(50%-8px)] flex flex-col'>
                        {columns.map(
                            (item, index) =>
                                (index + 1) % 3 === 2 && <SocialCard key={'social-640s-card-' + index} item={item} isPublic={isPublic} index={index} />
                        )}
                    </div>
                </div>
            )}
            {screenWidth <= 640 && (
                <div className='flex mb-3 flex-col md:flex-row flex-wrap gap-5 md:gap-4'>
                    <div className='w-full flex flex-col'>
                        {columns.map((item, index) => (
                            <SocialCard key={'social-s-card-' + index} item={item} isPublic={isPublic} index={index} />
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
                <div className='flex items-center justify-center w-full h-[200px] my-6 mx-auto text-xl font-semibold'>No Links Found</div>
            )}
            {columns.length !== 0 && columns.length < meta.total && (
                <div className='flex justify-center w-full my-5'>
                    <button className='flex items-center bg-black ml-5 p-2 px-4 rounded-lg space-x-2 disabled:opacity-40' disabled={isLoadMore}>
                        <span className='text-white'>
                            {isLoadMore && (
                                <div className='flex items-center justify-center w-full mx-auto gap-2'>
                                    <div className='flex items-center justify-center w-7 h-7'>
                                        <div className='border-t-transparent border-solid animate-spin rounded-full border-white border-4 w-full h-full'></div>
                                    </div>
                                    Loading...
                                </div>
                            )}
                        </span>
                    </button>
                </div>
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
            <InView as='div' onChange={(inView, entry) => inView && loadMore()} className='flex items-center justify-center h-8'></InView>
            <Link className='fixed right-5 bottom-[72px] sm:bottom-5' href='#camp-top'>
                <div className={'opacity-100 bg-[#000] inline-flex items-center rounded-full p-3 text-white shadow-sm'}>
                    <BiArrowFromBottom className='h-6 w-6' aria-hidden='true' />
                </div>
            </Link>
        </div>
    );
}
