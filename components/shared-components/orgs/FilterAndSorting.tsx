'use client';
import Dropdown from '@/components/global-components/Dropdown';
import {
    ArrowDownAZIcon,
    ArrowDownZAIcon,
    ArrowUpDownIcon,
    BookHeartIcon,
    Clock4Icon,
    Instagram,
    SlidersHorizontalIcon,
    UserRoundPlusIcon,
} from 'lucide-react';
import TwitterIcon from '../../../icons/TwitterIcon';
import InstagramIcon from '../../../icons/InstagramIcon';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { AvailableFilters } from '@/interfaces/filter';
import MapToCampaignModal from '@/components/modals/MapToCampaignModal';

interface FilterAndSortingProps {
    meta: any;
    query: any;
    filters: any;
    platforms: any;
    profileIds: any;
    showSelect: any;
    setShowSelect: any;
    setProfileIds: any;
    changePlatform: any;
    shouldShowSort: boolean;
    selectedPlatform: string;
    filtersOptions: AvailableFilters;
    isFilter: any;
    setIsFilter: any;
}

export default function FilterAndSorting(props: FilterAndSortingProps) {
    const {
        meta,
        shouldShowSort,
        query,
        filters,
        platforms,
        selectedPlatform,
        changePlatform,
        profileIds,
        setProfileIds,
        showSelect,
        setShowSelect,
        isFilter,
        setIsFilter,
    } = props;
    const [showMapModal, setShowMapModal] = useState(false);
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    const sortBy = query.sortBy;

    const openCloseMapModal = () => {
        setShowMapModal(!showMapModal);
    };

    const setOpenFilter = (open: boolean) => {
        setIsFilter(open);
    };

    const setCampFilters = (filters: { sortBy: string; sortDirection: string }) => {
        const url = new URL(window.location.href);
        url.searchParams.set('sortBy', filters.sortBy);
        url.searchParams.set('sortDirection', filters.sortDirection);
        window.location.href = url.href;
    };

    useEffect(() => {
        if (filters) {
            const index = Object.keys(filters)?.filter((item: any) => filters[item].length > 0);
            if (index.length > 0 && !isSmallDevice) {
                setIsFilter(true);
            }
        }
    }, []);

    const sortByOptions = [
        {
            id: 'followerCount',
            title: 'Followers',
            action: () => setCampFilters({ sortBy: 'followerCount', sortDirection: query.sortDirection }),
            icon: <UserRoundPlusIcon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'engRate',
            title: 'Engagement Rate',
            action: () => setCampFilters({ sortBy: 'engRate', sortDirection: query.sortDirection }),
            icon: <BookHeartIcon color={'#8b8b8b'} size={20} />,
        },
        {
            id: 'frequencyPerDay',
            title: 'Frequency Per Day',
            action: () => setCampFilters({ sortBy: 'frequencyPerDay', sortDirection: query.sortDirection }),
            icon: <Clock4Icon color={'#8b8b8b'} size={20} />,
        },
    ];

    const sorted = sortByOptions.find((item) => item.id === sortBy);

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8b8b8b] sm:text-center md:text-left text-sm sm:text-sm mb-1'>
            <div className='flex gap-3'>
                <div className='flex gap-3'>
                    {platforms.isInstagram && (
                        <div
                            onClick={() => changePlatform('instagram')}
                            className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                selectedPlatform === 'instagram' ? 'text-white instagram' : 'text-black'
                            }`}>
                            {selectedPlatform === 'instagram' ? <Instagram color={'#fff'} size={20} /> : <InstagramIcon color={'#fff'} size={20} />}
                            <span>Instagram</span>
                        </div>
                    )}
                    {platforms.isTwitter && (
                        <div
                            onClick={() => changePlatform('twitter')}
                            className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                selectedPlatform === 'twitter' ? 'text-white bg-[#1257a0]' : 'text-black'
                            }`}>
                            <TwitterIcon color={selectedPlatform === 'twitter' ? '#ffffff' : '#1257a0'} size={20} />
                            <span>Twitter</span>
                        </div>
                    )}
                </div>
            </div>
            {meta?.total > 0 && (
                <span className='flex gap-3 justify-center items-center'>
                    {profileIds.length > 0 ? (
                        <button
                            onClick={openCloseMapModal}
                            disabled={profileIds.length === 0}
                            title={profileIds.length === 0 ? 'Please select profiles then add to campaign' : ''}
                            className='flex justify-center disabled:cursor-not-allowed items-center cursor-pointer px-4 h-[38px] border border-gray-300 text-[#8b8b8b] rounded-md truncate'>
                            App to campaign
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowSelect(!showSelect)}
                            title={'Please select profiles and add to campaign'}
                            className='flex justify-center disabled:cursor-not-allowed items-center cursor-pointer px-4 h-[38px] border border-gray-300 text-[#8b8b8b] rounded-md truncate'>
                            {showSelect ? 'Unselect profiles' : 'Select profiles'}
                        </button>
                    )}
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
                                width={'w-48'}
                                position='down'
                                options={sortByOptions}
                                header={
                                    <div className='flex h-12 w-auto items-center justify-center gap-2 rounded-lg cursor-pointer text-sm text-[#9A9AB0] font-semibold'>
                                        <ArrowUpDownIcon color={'#8b8b8b'} size={20} />
                                        <span className='capitalize text-[#8b8b8b]'>Sort By:</span>
                                        <span
                                            className='flex items-center gap-2 w-auto min-w-120 border border-gray-300 text-[#8b8b8b] rounded-md py-1 px-3 h-9'
                                            onClick={() => document.getElementById('date-dropdown')?.classList.toggle('hidden')}>
                                            {sorted?.icon}
                                            <span>{sorted?.title}</span>
                                            <svg
                                                className='-mr-1 h-5 w-5'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 20 20'
                                                fill='currentColor'
                                                aria-hidden='true'>
                                                <path
                                                    fillRule='evenodd'
                                                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                        </span>
                                        <span
                                            title={query.sortDirection === 'ASC' ? 'Sort Descending' : 'Sort Ascending'}
                                            className='flex items-center gap-2 w-auto min-w-120 border border-gray-300 text-[#000] rounded-md py-1 px-3 h-9'
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
            {showMapModal && (
                <MapToCampaignModal
                    profileIds={profileIds}
                    setProfileIds={setProfileIds}
                    setShowSelect={setShowSelect}
                    openCloseModal={openCloseMapModal}
                    platform={platforms.isInstagram ? 'INSTAGRAM' : 'TWITTER'}
                />
            )}
        </div>
    );
}
