'use client';
import React, { useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/context';
import { setLoading, setMeta } from '@/context/campaign';
import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';
import { getCampaigns } from '@/context/campaign/network';
import { CampaignStatus } from '@/services/campaign.service';
import Loading from '@/app/(public)/public/[campaignId]/form/loading';
import bgImage from '@/public/background.svg';
import DynamicLogo from '@/components/DynamicLogo';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = usePathname();
    const params: any = useParams();
    const urlComponents = searchParams.split('/');
    const { enqueueSnackbar } = useSnackbar();
    const { campaignType } = useAppSelector((state) => state.user);
    const { meta, loading } = useAppSelector((state) => state.campaign);
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const ownerType = params?.campaignType?.split('-')[0] === 'active' ? 'own' : 'shared';
    const searchParam = useSearchParams();
    const isPublic = searchParam.get('isPublic') === 'true';

    const copyShareLink = (url: string) => {
        let base_url = window.location.origin;
        copy(base_url + url);
        enqueueSnackbar('Campaign Report link copied!', { variant: 'success' });
    };

    const resetSearch = () => {
        setIsSearch(false);
        setSearchText('');
        const status = campaignType === 'influncer' ? CampaignStatus.active_p : CampaignStatus.active;
        dispatch(getCampaigns({ page: 1, limit: 3, status: status, ownerType: ownerType, q: '' }));
    };

    const searhFilter = () => {
        if (searchText !== '') {
            setIsSearch(true);
            const status = campaignType === 'influncer' ? CampaignStatus.active_p : CampaignStatus.active;
            dispatch(getCampaigns({ page: 1, limit: 3, status: status, ownerType: ownerType, q: searchText }));
        } else if (searchText === '') {
            resetSearch();
        }
    };

    const searchByFilter = (e: any) => {
        if (e.code === 'Enter') {
            searhFilter();
        }
    };

    const fetchMore = () => {
        const ownedType = params?.campaignType?.split('-')[0] === 'active' ? 'own' : 'shared';
        const status = campaignType === 'influncer' ? CampaignStatus.active_p : CampaignStatus.active;
        dispatch(getCampaigns({ page: meta?.page || 0 + 1, limit: 12, status: status, ownerType: ownedType, q: '' }));
        dispatch(
            setMeta({
                page: meta?.page || 0 + 1,
                limit: 12,
            })
        );
    };

    const count = (meta?.page || 0) * (meta?.limit || 12);
    const isCampReport = searchParams.indexOf('campaign-reporting') > -1 || searchParams.indexOf('create-reporting') > -1;

    React.useEffect(() => {
        if (!isCampReport) {
            fetchMore();
        } else {
            dispatch(setLoading(false));
        }
    }, []);

    return (
        <main
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
            className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='flex flex-col w-full h-screen overflow-y-auto'>
                {!isPublic && (
                    <div className={`flex w-full items-center justify-between px-4 sm:px-6 pt-3 pb-1 border-b h-[80px] shadow-md shadow-[#CDCDCD]`}>
                        <div className='flex flex-col w-10 items-center'>
                            <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                                <DynamicLogo />
                            </Link>
                        </div>
                        <div className='flex flex-col lg:ml-0 w-full'>
                            <div className='flex justify-between'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <div
                                                onClick={() => {
                                                    router.push('/');
                                                    dispatch(setLoading(true));
                                                }}
                                                className='hidden sm:flex text-[#BDBDBD] md:text-md lg:text-lg cursor-pointer items-center space-x-3 mt-[2px]'>
                                                <span>Home</span>
                                                <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M5.94 13.7787L10.2867 9.43208C10.8 8.91875 10.8 8.07875 10.2867 7.56542L5.94 3.21875'
                                                        stroke='#BDBDBD'
                                                        strokeWidth='1.5'
                                                        strokeMiterlimit='10'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            </div>
                                            {urlComponents.slice(1, urlComponents.length - (isCampReport ? 1 : 0)).map((component, index) => {
                                                const active = index !== urlComponents.slice(1).length - (isCampReport ? 2 : 1);
                                                return (
                                                    <div
                                                        key={component}
                                                        onClick={() => {
                                                            if (active) {
                                                                router.push('/' + component);
                                                                fetchMore();
                                                            }
                                                        }}
                                                        className={`hidden sm:flex ${active ? 'text-[#BDBDBD]' : 'text-black'} items-center cursor-pointer space-x-3 ml-3 mt-1`}>
                                                        <span className='capitalize'>{component.replaceAll('-', ' ')}</span>
                                                        {active && (
                                                            <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                                <path
                                                                    d='M5.94 13.7787L10.2867 9.43208C10.8 8.91875 10.8 8.07875 10.2867 7.56542L5.94 3.21875'
                                                                    stroke='#BDBDBD'
                                                                    strokeWidth='1.5'
                                                                    strokeMiterlimit='10'
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-center items-center ml-16 sm:ml-0'>
                                    {!isCampReport && (
                                        <div className='flex justify-between pl-4 items-center bg-[#F7F7F7] rounded-lg'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'>
                                                <path
                                                    d='M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
                                                    stroke='#7D7D7D'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            <input
                                                type='text'
                                                name={`input_name}`}
                                                placeholder={'Search for campaigns'}
                                                value={searchText}
                                                onChange={(e: any) => setSearchText(e.target.value)}
                                                onKeyUp={(e: any) => searchByFilter(e)}
                                                className='flex outline-none bg-[#F7F7F7] p-3 h-10 text-sm w-full'
                                            />
                                            <div className='cursor-pointer pr-4 h-10 py-2' onClick={searhFilter}>
                                                <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                                    <g id='SVGRepo_iconCarrier'>
                                                        <path
                                                            d='M5 12H19M19 12L13 6M19 12L13 18'
                                                            stroke='#7D7D7D'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    {searchText !== '' && isSearch && (
                                        <div className='flex justify-between px-1 items-center bg-[#F7F7F7] rounded-lg' onClick={resetSearch}>
                                            <svg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                                <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                                <g id='SVGRepo_iconCarrier'>
                                                    <path
                                                        d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z'
                                                        fill='#0F0F0F'></path>
                                                </g>
                                            </svg>
                                        </div>
                                    )}
                                    {searchParams.indexOf('campaign-reporting') > -1 && (
                                        <div className='flex'>
                                            <button
                                                onClick={() => copyShareLink(`/${params?.campaignType}/campaign-reporting/${params.campaignId}`)}
                                                className='bg-black flex gap-2 items-center py-2 rounded-lg px-4 h-10 text-white text-[12px] md:text-sm lg:my-0 md:mt-0 md:mb-4 mt-1 mb-2 disabled:opacity-40'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    data-name='Layer 1'
                                                    viewBox='0 0 24 24'
                                                    id='share'
                                                    width='20'
                                                    fill='#fff'>
                                                    <path d='m21.707 11.293-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62 11.456 11.456 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414ZM14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14.005 14.005 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z'></path>
                                                </svg>
                                                Copy Public Dashboard Link
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='flex flex-col w-full h-full lg:overflow-y-auto md:overflow-y-auto relative'>
                    {!isCampReport && searchText !== '' && isSearch && (
                        <div className='flex pt-4 px-8 flex-col md:flex-row justify-between gap-4 items-center'>
                            <div className='flex py-3 uppercase text-[#7D7D7D] text-sm'>Showing results for {searchText}</div>
                        </div>
                    )}
                    {!isCampReport && count < (meta?.total || 0) && (
                        <div className='w-full my-5'>
                            <button className='flex items-center bg-black p-2 px-4 rounded-lg space-x-2' onClick={() => fetchMore()}>
                                <span className='text-white '>Load More</span>
                            </button>
                        </div>
                    )}
                    {loading ? <Loading /> : children}
                </div>
            </div>
        </main>
    );
}
