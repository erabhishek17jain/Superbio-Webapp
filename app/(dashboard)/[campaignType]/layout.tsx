'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/context';
import { setLoading, setMeta } from '@/context/campaign';
import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';
import { getCampaigns } from '@/context/campaign/network';
import logo from '@/public/logo/logo-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import { CampaignStatus } from '@/services/campaign.service';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import { ArrowRightIcon, ChevronRightIcon, CopyIcon, SearchCheckIcon, XIcon } from 'lucide-react';

export default function RootLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const paths = usePathname();
    const params: any = useParams();
    const urlComponents = paths.split('/');
    const { enqueueSnackbar } = useSnackbar();
    const { allCampaign, loading } = useAppSelector((state) => state.campaign);
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const ownerType = params?.campaignType === 'active' ? 'own' : 'shared';
    const searchParam: any = useSearchParams();
    const title = searchParam.get('title');
    const isPublic = searchParam.get('isPublic') === 'true';

    const copyShareLink = (url: string) => {
        let base_url = window.location.origin;
        copy(base_url + url);
        enqueueSnackbar('Campaign Report link copied!', { variant: 'success' });
    };

    const resetSearch = () => {
        setIsSearch(false);
        setSearchText('');
        dispatch(getCampaigns({ page: 1, limit: 12, status: CampaignStatus.active, ownerType: ownerType, q: '' }));
    };

    const searhFilter = () => {
        if (searchText !== '') {
            setIsSearch(true);
            dispatch(getCampaigns({ page: 1, limit: 12, status: CampaignStatus.active, ownerType: ownerType, q: searchText }));
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
        dispatch(getCampaigns({ page: allCampaign?.meta?.arg?.page || 0 + 1, limit: 12, status: CampaignStatus.active, ownerType: ownedType, q: '' }));
        dispatch(
            setMeta({
                page: allCampaign?.meta?.arg?.page || 0 + 1,
                limit: 12,
            })
        );
    };

    useEffect(() => {
        if (!isNotCampType) {
            fetchMore();
        } else {
            dispatch(setLoading(false));
        }
    }, []);

    const isNotCampType = paths.indexOf('create') > -1 || paths.indexOf('campaign') > -1;

    return (
        <main className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='flex flex-col w-full h-screen overflow-auto'>
                {!isPublic && (
                    <div className={`flex w-full items-center justify-between pl-4 sm:pl-8 pr-4 pt-3 pb-[14px] border-[#cdcdcd] border-b h-[75px] z-10`}>
                        <div className='flex flex-col w-8 items-center h-[48px]'>
                            <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                                <DynamicLogo />
                            </Link>
                        </div>
                        <div className='flex flex-col lg:ml-0 w-full justify-center h-12'>
                            <div className='flex justify-between items-center'>
                                <div className='hidden sm:flex gap-2'>
                                    <div className='flex'>
                                        <div
                                            onClick={() => {
                                                router.push('/');
                                                dispatch(setLoading(true));
                                            }}
                                            className='hidden sm:flex text-[#8b8b8b] cursor-pointer items-center space-x-3 mt-[2px]'>
                                            <span>Home</span>
                                            <ChevronRightIcon color='#8b8b8b' size={22} />
                                        </div>
                                        {urlComponents.slice(1, urlComponents.length - (isNotCampType ? 1 : 0)).map((component, index) => {
                                            const active = index !== urlComponents.slice(1).length - (isNotCampType ? 2 : 1);
                                            return (
                                                <div
                                                    key={component}
                                                    onClick={() => {
                                                        if (active) {
                                                            router.push('/' + component);
                                                            fetchMore();
                                                        }
                                                    }}
                                                    className={`hidden sm:flex ${active ? 'text-[#8b8b8b] cursor-pointer' : 'text-black'} items-center space-x-3 ml-3 mt-1`}>
                                                    <span className='capitalize'>{isNotCampType && active ? component.replaceAll('-', ' ') : title}</span>
                                                    {active && <ChevronRightIcon color='#8b8b8b' size={22} />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-center items-center ml-16 sm:ml-0'>
                                    {!isNotCampType && (
                                        <div className='flex justify-between pl-4 items-center bg-[#F7F7F7] rounded-lg'>
                                            <SearchCheckIcon color='#8b8b8b' size={24} />
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
                                                <ArrowRightIcon color='#8b8b8b' size={24} />
                                            </div>
                                        </div>
                                    )}
                                    {searchText !== '' && isSearch && (
                                        <div className='flex justify-between px-1 items-center bg-[#F7F7F7] rounded-lg' onClick={resetSearch}>
                                            <XIcon color='#8b8b8b' size={24} />
                                        </div>
                                    )}
                                    {paths.indexOf('campaign') > -1 && (
                                        <div className='flex'>
                                            <button
                                                onClick={() =>
                                                    copyShareLink(`/${params?.campaignType}/campaign/${params.campaignId}?isPublic=true&title=${title}`)
                                                }
                                                className='bg-black flex gap-2 items-center py-2 rounded-lg px-4 h-10 text-white text-[12px] md:text-sm lg:my-0 md:mt-0 md:mb-4 mt-1 mb-2'>
                                                <CopyIcon color='#ffffff' size={20} />
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
                    {isNotCampType && isPublic && (
                        <div className='bg-white border-b border-[#cdcdcd] flex w-full items-center justify-between px-6 py-4 text-black sm:px-6'>
                            <div className='flex gap-x-8 w-40'>
                                <DynamicLogo />
                            </div>
                            <div className='flex w-full justify-center -ml-20 font-bold text-lg'>LOQO Campaign Tracker</div>
                        </div>
                    )}
                    {!isNotCampType && searchText !== '' && isSearch && (
                        <div className='flex pt-4 px-8 flex-col md:flex-row justify-between gap-4 items-center'>
                            <div className='flex py-3 uppercase text-[#8b8b8b] text-sm'>Showing results for {searchText}</div>
                        </div>
                    )}
                    {allCampaign?.meta?.arg?.page === 1 && loading ? <LoadingBlack /> : children}
                </div>
            </div>
        </main>
    );
}
