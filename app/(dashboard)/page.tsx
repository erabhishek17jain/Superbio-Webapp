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
import { ArrowRightIcon, CrossIcon, PlusCircleIcon, PlusIcon, SearchCheckIcon, ShieldCloseIcon, XIcon } from 'lucide-react';

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

    const fetchCampaigns = () => {
        dispatch(getCampaigns({ page: 1, limit: 4, status: CampaignStatus.active, ownerType: 'own', q: searchText }));
        dispatch(getCampaigns({ page: 1, limit: 4, status: CampaignStatus.active, ownerType: 'shared', q: searchText }));
    };

    useEffect(() => {
        if (campaignType !== '') {
            fetchCampaigns();
        }
    }, [searchText]);

    useEffect(() => {
        if (campaignType !== '') {
            fetchCampaigns();
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
                    <div className='flex text-base w-full justify-between items-center h-12'>
                        <span className='hidden sm:flex'>
                            <span className='cursor-pointer text-[#8b8b8b]' onClick={() => dispatch(setCampaignType(''))}>
                                All Products<span className='px-3'>/</span>
                            </span>
                            <span>LOQO Campaign Tracker</span>
                        </span>
                        <div className='flex gap-3 ml-16 sm:ml-0'>
                            <div className='flex justify-between pl-4 items-center bg-[#F7F7F7] rounded-lg'>
                                <SearchCheckIcon color='#8b8b8b' size={28} />
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
                                    <ArrowRightIcon color='#8b8b8b' size={24} />
                                </div>
                            </div>
                            {searchText !== '' && isSearch && (
                                <div className='flex justify-between px-3 items-center bg-[#F7F7F7] rounded-lg' onClick={resetSearch}>
                                    <XIcon color='#8b8b8b' size={24} />
                                </div>
                            )}
                            {user.role !== 'brand' && (
                                <button
                                    onClick={() => {
                                        setMode('add');
                                        setOpenCampaingModal(true);
                                    }}
                                    className='bg-black text-base flex items-center py-3 rounded-xl px-3 sm:px-6 text-white gap-2'>
                                    <PlusCircleIcon color='#fff' size={22} />
                                    <span className='hidden sm:flex'>Create Campaigns</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex w-full justify-between items-center h-12'>
                        <span className='hidden sm:flex gap-2 lg:ml-0 xl:ml-0'>
                            <span className='text-lg cursor-pointer font-semibold' onClick={() => dispatch(setCampaignType(''))}>
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
                                                <CampaignCard
                                                    key={index}
                                                    campaign={data}
                                                    setMode={editCampaign}
                                                    status='active'
                                                    color={'#F5F8FF'}
                                                    fetchCampaigns={fetchCampaigns}
                                                />
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
                                                <CampaignCard
                                                    key={index}
                                                    campaign={data}
                                                    setMode={editCampaign}
                                                    status='active'
                                                    color={'#F5F8FF'}
                                                    fetchCampaigns={fetchCampaigns}
                                                />
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
