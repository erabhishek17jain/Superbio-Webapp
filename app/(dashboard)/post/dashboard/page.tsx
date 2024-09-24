'use client';
import { ChevronRightIcon, SearchCheckIcon, ArrowRightIcon, XIcon, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import CreateCampaignModal from '@/components/modals/CreateCampaignModal';
import CampaignCard from '@/components/shared-components/CampaignCard';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { useAppDispatch, useAppSelector } from '@/context';
import { getCampaigns } from '@/context/campaign/network';
import { setMembers, setCampaignType } from '@/context/user';
import { logout } from '@/lib/utils';
import { CampaignStatus } from '@/services/campaign.service';
import UserNetworkService from '@/services/user.service';

export default function PostHomePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAppSelector((state) => state.user);
    const { activeCampaign, sharedCampaign, loading } = useAppSelector((state) => state.campaign);
    const [mode, setMode] = useState('add');
    const [campaignDetails, setCampaignDetails] = useState({});
    const [openCampaingModal, setOpenCampaingModal] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');

    const editCampaign = (campaign: any) => {
        setMode('edit');
        setOpenCampaingModal(true);
        setCampaignDetails(campaign);
    };

    const resetSearch = () => {
        setSearchText('');
        fetchCampaigns('');
        setIsSearch(false);
        setCurrentSearchText('');
    };

    const fetchCampaigns = (searchText: string) => {
        dispatch(
            getCampaigns({
                page: 1,
                limit: 4,
                status: CampaignStatus.active,
                ownerType: 'own',
                q: searchText,
                type: 'post',
            })
        );
        dispatch(
            getCampaigns({
                page: 1,
                limit: 4,
                status: CampaignStatus.active,
                ownerType: 'shared',
                q: searchText,
                type: 'post',
            })
        );
    };

    useEffect(() => {
        if (searchText !== '') {
            fetchCampaigns(fetchCampaigns);
        }
    }, [searchText]);

    useEffect(() => {
        fetchCampaigns('');
        if (user) {
            UserNetworkService.instance
                .getAllUsers({ page: 1, limit: 100 })
                .then((res) => {
                    dispatch(setMembers(res.data));
                })
                .catch((err) => {
                    enqueueSnackbar('You are not authorized to view this page', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                    logout();
                    router.push('/login');
                });
        }
    }, []);

    const shouldShowNoCampaign = (activeCampaign && activeCampaign.data.length > 0) || (sharedCampaign && sharedCampaign.data.length > 0);

    return (
        <>
            <div className='flex w-full items-center justify-between pl-4 sm:pl-8 pr-4 py-3 border-[#cdcdcd] border-b h-16 z-10'>
                <div className='flex flex-col w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[17px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <div className='flex text-base w-full justify-between items-center h-12 ml-2 sm:ml-0'>
                    <span className='hidden sm:flex'>
                        <span
                            className='cursor-pointer text-[#8b8b8b] mr-3'
                            onClick={() => {
                                router.push('/');
                                dispatch(setCampaignType(''));
                            }}>
                            All Products
                        </span>
                        <ChevronRightIcon color='#8b8b8b' size={22} />
                        <span className='ml-3 capitalize font-[500] text-[21px]'>LOQO Campaign</span>
                    </span>
                    <div className='flex gap-3 ml-16 sm:ml-0'>
                        <div className='flex justify-between pl-0 sm:pl-4 items-center bg-[#F7F7F7] rounded-lg'>
                            <SearchCheckIcon color='#8b8b8b' size={28} className='hidden sm:flex' />
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
                                className='cursor-pointer pr-3 h-10 py-2'>
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
            </div>
            <div className='flex px-4 sm:px-8 py-4 w-full h-full flex-col overflow-y-auto mb-10 sm:mb-0'>
                {searchText !== '' && isSearch && <div className='flex py-3 uppercase text-[#8b8b8b] text-sm'>Showing results for {searchText}</div>}
                {loading ? (
                    <LoadingBlack />
                ) : shouldShowNoCampaign ? (
                    <>
                        {activeCampaign && activeCampaign.data?.length > 0 && (
                            <div className='flex flex-col w-full mb-4 sm:mb-10'>
                                <div className='flex w-full justify-between mb-3 sm:mb-5'>
                                    <span className='font-semibold text-xl text-opacity-80'>Active campaigns</span>
                                    <Link href={`/post/active`} className='text-[#8b8b8b] cursor-pointer text-base font-semibold'>
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
                            <div className='flex flex-col w-full mb-4 sm:mb-10'>
                                <div className='flex w-full justify-between mb-3 sm:mb-5'>
                                    <span className='capitalize font-semibold text-xl text-opacity-80'>
                                        {user.role !== 'admin' ? 'Shared Campaigns' : 'Created by other members'}
                                    </span>
                                    <Link href={`/post/shared`} className='text-[#8b8b8b] cursor-pointer text-base font-semibold'>
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
            {openCampaingModal && (
                <CreateCampaignModal
                    mode={mode}
                    campaignDetails={campaignDetails}
                    openCloseModal={() => {
                        setOpenCampaingModal(false);
                    }}
                />
            )}
        </>
    );
}
