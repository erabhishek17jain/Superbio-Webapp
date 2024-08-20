'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setCampaignType, setMembers } from '@/context/user';
import UserNetworkService from '@/services/user.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import { getCampaigns } from '@/context/campaign/network';
import { enqueueSnackbar } from 'notistack';
import { logout } from '@/lib/utils';
import HomePage from '@/components/shared-components/HomePage';
import CampaignCard from '@/components/shared-components/CampaignCard';
import CreateCampaignModal from '@/components/modals/CreateCampaignModal';
import { CampaignStatus } from '@/services/campaign.service';
import { useRouter } from 'next/navigation';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import NewCampaign from '@/components/shared-components/NewCampaign';

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, campaignType } = useAppSelector((state) => state.user);
    const { activeCampaign, sharedCampaign, loading } = useAppSelector((state) => state.campaign);
    const [mode, setMode] = useState('add');
    const [campaignDetails, setCampaignDetails] = useState({});
    const [openCampaingModal, setOpenCampaingModal] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [selectType, setSelectType] = useState('campaign');

    const editCampaign = (campaign: any) => {
        setMode('edit');
        setOpenCampaingModal(true);
        setCampaignDetails(campaign);
    };

    const resetSearch = () => {
        setIsSearch(false);
        setSearchText('');
        setCurrentSearchText('');
    };

    useEffect(() => {
        if (campaignType !== '') {
            const status = campaignType === 'influncer' ? CampaignStatus.active_p : CampaignStatus.active;
            dispatch(getCampaigns({ page: 1, limit: 4, status: status, ownerType: 'own', q: '' }));
            dispatch(getCampaigns({ page: 1, limit: 4, status: status, ownerType: 'shared', q: '' }));
            if (user && campaignType !== '') {
                UserNetworkService.instance
                    .getAllUsers({ page: 1, limit: 100 })
                    .then((res) => {
                        dispatch(setMembers(res.data));
                    })
                    .catch((err) => {
                        enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
                        logout();
                        router.push('/login');
                    });
            }
        }
    }, [user, campaignType]);

    const shouldShowNoCampaign = (activeCampaign && activeCampaign.data.length > 0) || (sharedCampaign && sharedCampaign.data.length > 0);

    return (
        <div className='flex flex-col w-full overflow-auto' style={{ height: '100vh' }}>
            <div className='flex w-full items-center justify-between pl-4 sm:pl-8 pr-4 py-3 border-[#cdcdcd] border-b h-[75px] z-10'>
                <div className='flex flex-col w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                {campaignType !== '' ? (
                    <div className='flex w-full justify-between items-center h-12'>
                        <span className='hidden sm:flex'>
                            <span className='cursor-pointer text-[#8b8b8b]' onClick={() => dispatch(setCampaignType(''))}>
                                All Products<span className='px-3'>/</span>
                            </span>
                            <span>LOQO Campaign Tracker</span>
                        </span>
                        <div className='flex gap-3 ml-16 sm:ml-0'>
                            <div className='flex justify-between pl-4 items-center bg-[#F7F7F7] rounded-lg'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'>
                                    <path
                                        d='M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
                                        stroke='#8b8b8b'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <input
                                    type='text'
                                    name={`input_name}`}
                                    placeholder={'Search for campaigns'}
                                    value={currentSearchText}
                                    onChange={(e: any) => setCurrentSearchText(e.target.value)}
                                    onKeyDown={(e: any) => {
                                        if (e.key === 'Enter') {
                                            setSearchText(currentSearchText);
                                            setIsSearch(true);
                                        }
                                    }}
                                    className='flex outline-none bg-[#F7F7F7] p-3 h-10 text-sm w-full'
                                />
                                <div
                                    onClick={() => {
                                        if (currentSearchText !== '') {
                                            setSearchText(currentSearchText);
                                            setIsSearch(true);
                                        }
                                    }}
                                    className='cursor-pointer pr-4 h-10 py-2'>
                                    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <path
                                                d='M5 12H19M19 12L13 6M19 12L13 18'
                                                stroke='#8b8b8b'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
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
                            {user.role !== 'brand' && (
                                <button
                                    onClick={() => {
                                        setMode('add');
                                        setOpenCampaingModal(true);
                                    }}
                                    className='bg-black flex items-center py-3 rounded-xl px-3 sm:px-6 text-white text-sm gap-2'>
                                    <svg
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='stroke-2 stroke-black'>
                                        <path
                                            d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                                            fill='white'
                                        />
                                    </svg>
                                    <span className='hidden sm:flex'>Create Campaigns</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex w-full justify-between items-center h-12'>
                        <span className='hidden sm:flex gap-2 lg:ml-0 xl:ml-0'>
                            <span className='cursor-pointer font-semibold' onClick={() => dispatch(setCampaignType(''))}>
                                All Products
                            </span>
                        </span>
                    </div>
                )}
            </div>
            {campaignType === '' && <HomePage selectType={selectType} setSelectType={setSelectType} />}
            {campaignType !== '' && (
                <div className='flex px-4 sm:px-8 py-4 w-full h-full flex-col overflow-y-auto mb-6 sm:mb-0'>
                    {searchText !== '' && isSearch && <div className='flex py-3 uppercase text-[#8b8b8b] text-sm'>Showing results for {searchText}</div>}
                    {loading ? (
                        <LoadingBlack />
                    ) : shouldShowNoCampaign ? (
                        <>
                            {activeCampaign && activeCampaign.data?.length > 0 && (
                                <div className='flex flex-col w-full mb-10'>
                                    <div className='flex w-full justify-between mb-5'>
                                        <span className='font-semibold text-xl text-opacity-80'>Active campaigns</span>
                                        <Link href={`/active`} className='text-[#8b8b8b] cursor-pointer text-base font-semibold'>
                                            See More
                                        </Link>
                                    </div>
                                    {activeCampaign.data?.length > 0 ? (
                                        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4'>
                                            {activeCampaign.data?.map((data: any, index: number) => (
                                                <CampaignCard key={index} campaign={data} setMode={editCampaign} status='active' color={'#F5F8FF'} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='flex flex-col w-full'>
                                            <div className='flex h-48 justify-center items-center w-full text-[#8b8b8b]'>No campaigns available.</div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {sharedCampaign && sharedCampaign.data?.length > 0 && (
                                <div className='flex flex-col w-full mb-10'>
                                    <div className='flex w-full justify-between mb-5'>
                                        <span className='capitalize font-semibold text-xl text-opacity-80'>
                                            {user.role !== 'admin' ? 'Shared Campaigns' : 'Created by other members'}
                                        </span>
                                        <Link href={'/shared'} className='text-[#8b8b8b] cursor-pointer text-base font-semibold'>
                                            See More
                                        </Link>
                                    </div>
                                    {sharedCampaign.data?.length > 0 ? (
                                        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4'>
                                            {sharedCampaign.data?.map((data: any, index: number) => (
                                                <CampaignCard key={index} campaign={data} setMode={editCampaign} status='active' color={'#F5F8FF'} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='flex flex-col w-full'>
                                            <div className='flex h-48 justify-center items-center w-full text-[#8b8b8b]'>No campaigns available.</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <NewCampaign
                            action={() => {
                                setMode('add');
                                setOpenCampaingModal(true);
                            }}
                            title={'New Campaign'}
                            buttonText={'Create a new Campaign'}
                            description={
                                'Create a campaign and automate your campaign performance tracking. Get detailed post metrics & dashboard for you and your brands.'
                            }
                        />
                    )}
                </div>
            )}
            {openCampaingModal && (
                <CreateCampaignModal
                    mode={mode}
                    campaignDetails={campaignDetails}
                    openCloseModal={() => {
                        setOpenCampaingModal(false);
                    }}
                />
            )}
        </div>
    );
}
