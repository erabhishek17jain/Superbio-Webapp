'use client';
import Dropdown from '@/components/global-components/Dropdown';
import {
    ArrowDownAZIcon,
    ArrowDownZAIcon,
    ArrowUpDownIcon,
    CalendarCheck2Icon,
    EyeIcon,
    HeartIcon,
    Instagram,
    MessageCircleIcon,
    Repeat2Icon,
    SlidersHorizontalIcon,
} from 'lucide-react';
import TwitterIcon from '../../icons/TwitterIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface FilterAndSortingProps {
    meta: any;
    shouldShowSort: boolean;
    query: any;
    filters: any;
    selectFilter: any;
    filtersOptions: AvailableFilters;
}

export default function FilterAndSorting(props: FilterAndSortingProps) {
    const { meta, shouldShowSort, query, filters, selectFilter, filtersOptions } = props;
    const [isFilter, setIsFilter] = useState(false);
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    const sortBy = query.sortBy;

    const setOpenFilter = (open: boolean) => {
        setIsFilter(open);
        document.getElementById('filterPanel')?.classList.toggle('hidden');
    };

    const setCampFilters = (filters: { sortBy: string; sortDirection: string }) => {
        const url = new URL(window.location.href);
        url.searchParams.set('sortBy', filters.sortBy);
        url.searchParams.set('sortDirection', filters.sortDirection);
        window.location.href = url.href;
    };

    const changePlatform = (platform: string) => {
        selectFilter(true, 'platform', platform);
    };

    useEffect(() => {
        if (filters) {
            const index = Object.keys(filters)?.filter((item: any) => filters[item].length > 0);
            if (index.length > 0 && !isSmallDevice) {
                setIsFilter(true);
                document.getElementById('filterPanel')?.classList.toggle('hidden');
            }
        }
    }, []);

    const isInstagram = filters && filters['platform']?.includes('instagram');
    const sortByOptions = [
        {
            id: 'likes',
            title: 'Likes',
            action: () => setCampFilters({ sortBy: 'likes', sortDirection: query.sortDirection }),
            icon: <HeartIcon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'views',
            title: 'Views',
            action: () => setCampFilters({ sortBy: 'views', sortDirection: query.sortDirection }),
            icon: <EyeIcon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'comments',
            title: 'Comments',
            action: () => setCampFilters({ sortBy: 'comments', sortDirection: query.sortDirection }),
            icon: <MessageCircleIcon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'reposts',
            title: isInstagram ? 'Video Shares' : 'Reposts',
            action: () => setCampFilters({ sortBy: 'reposts', sortDirection: query.sortDirection }),
            icon: <Repeat2Icon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'postedAt',
            title: 'Posted Time',
            action: () => setCampFilters({ sortBy: 'postedAt', sortDirection: query.sortDirection }),
            icon: <CalendarCheck2Icon color={'#8b8b8b'} size={20} />,
        },
    ];

    const sorted = sortByOptions.find((item) => item.id === sortBy);

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8b8b8b] sm:text-center md:text-left text-sm sm:text-sm mt-2'>
            <div className='flex gap-3'>
                <div className='flex gap-5'>
                    <div
                        onClick={() => changePlatform('all')}
                        className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                            filters && filters['platform']?.length === 0 ? 'text-white bg-black' : 'text-black'
                        }`}>
                        All
                    </div>
                    {filtersOptions && filtersOptions['platform']?.includes('twitter') && (
                        <div
                            onClick={() => changePlatform('twitter')}
                            className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                filters && filters['platform']?.includes('twitter') ? 'text-white bg-[#1257a0]' : 'text-black'
                            }`}>
                            <TwitterIcon color={filters && filters['platform']?.includes('twitter') ? '#ffffff' : '#1257a0'} size={20} />
                            <span>Twitter</span>
                        </div>
                    )}
                    {filtersOptions && filtersOptions['platform']?.includes('instagram') && (
                        <div
                            onClick={() => changePlatform('instagram')}
                            className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                filters && filters['platform']?.includes('instagram') ? 'text-white instagram' : 'text-black'
                            }`}>
                            {filters && filters['platform']?.includes('instagram') ? (
                                <Instagram color={'#fff'} size={20} />
                            ) : (
                                <InstagramIcon color={'#fff'} size={20} />
                            )}
                            <span>Instagram</span>
                        </div>
                    )}
                </div>
            </div>
            {meta?.total > 0 && (
                <span className='flex gap-3 justify-center items-center'>
                    {meta?.filterValueResp && Object.keys(meta?.filterValueResp).length > 0 && (
                        <span className='flex items-center justify-end text-sm gap-2 h-12'>
                            <span
                                className={`flex items-center gap-2 text-base font-semibold cursor-pointer ${isFilter ? 'text-black' : 'text-[#8b8b8b]'}`}
                                onClick={() => setOpenFilter(!isFilter)}>
                                <SlidersHorizontalIcon color={isFilter ? '#000' : '#8b8b8b'} size={20} />
                                Filter by
                            </span>
                        </span>
                    )}
                    {shouldShowSort && (
                        <>
                            <Dropdown
                                width={'w-40'}
                                position='down'
                                options={sortByOptions}
                                header={
                                    <div className='flex h-12 w-auto items-center justify-center gap-2 rounded-lg cursor-pointer text-sm text-[#9A9AB0] font-semibold'>
                                        <ArrowUpDownIcon color={'#8b8b8b'} size={20} />
                                        <span className='capitalize text-[#8b8b8b]'>Sort By:</span>
                                        <span
                                            className='flex items-center gap-2 w-auto min-w-120 bg-[#e6e6e6] text-[#8b8b8b] rounded-md py-1 px-3 h-9'
                                            onClick={() => document.getElementById('date-dropdown')?.classList.toggle('hidden')}>
                                            {sorted?.icon}
                                            <span>{sorted?.title}</span>
                                        </span>
                                        <span
                                            title={query.sortDirection === 'ASC' ? 'Sort Descending' : 'Sort Ascending'}
                                            className='flex items-center gap-2 w-auto min-w-120 bg-[#e6e6e6] text-[#000] rounded-md py-1 px-3 h-9'
                                            onClick={() =>
                                                setCampFilters({ sortBy: query.sortBy, sortDirection: query.sortDirection === 'ASC' ? 'DESC' : 'ASC' })
                                            }>
                                            {query.sortDirection === 'ASC' ? (
                                                <ArrowDownAZIcon color={'#8b8b8b'} size={20} />
                                            ) : (
                                                <ArrowDownZAIcon color={'#8b8b8b'} size={20} />
                                            )}
                                        </span>
                                    </div>
                                }
                            />
                        </>
                    )}
                </span>
            )}
        </div>
    );
}
