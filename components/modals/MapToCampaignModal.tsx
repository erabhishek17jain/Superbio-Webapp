import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { logout } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, PlusIcon, SearchCheckIcon, XIcon } from 'lucide-react';
import OrgsNetworkService from '@/services/orgs.service';
import LoadingBlack from '../global-components/LoadingBlack';
import CampaignNetworkService from '@/services/campaign.service';

export default function MapToCampaignModal({ setShowSelect, platform, profileIds, openCloseModal, setProfileIds }: any) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selCamp, setSelCamp] = useState<string>('');
    const [campaigns, setCampaigns] = useState<any>([]);
    const [allCampaigns, setAllCampaigns] = useState<any>([]);

    const mapToCampaign = async () => {
        const params: any = {
            platform: platform,
            profileIds: profileIds,
        };
        try {
            await OrgsNetworkService.instance.mapProfilesToCampaigns(selCamp, params);
            enqueueSnackbar('Profile mapped to campaign sucessfully.', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            openCloseModal();
            setProfileIds([]);
            setShowSelect(false);
        } catch (error) {
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }
    };

    useEffect(() => {
        if (searchText !== '') {
            setCampaigns(allCampaigns.filter((item: any) => item?.title.toLowerCase().includes(searchText)));
        } else {
            setCampaigns(allCampaigns);
        }
    }, [searchText]);

    useLayoutEffect(() => {
        setIsLoading(true);
        CampaignNetworkService.instance
            .getCampaigns(1, 100, 'active', 'all', '', 'influencer')
            .then((res) => {
                setIsLoading(false);
                setCampaigns(res.data);
                setAllCampaigns(res.data);
            })
            .catch((err) => {
                setIsLoading(false);
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
    }, []);

    return (
        <div id='campaign-share' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col justify-between bg-white rounded-xl p-6 w-[90%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Select Campaign to Map</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex justify-between my-3'>
                        <span className='text-base text-[#8b8b8b]'>Total campaigns {campaigns.length}</span>
                    </div>
                    <div className='flex justify-between px-4 items-center bg-[#F7F7F7] rounded-lg'>
                        <SearchCheckIcon color='#8b8b8b' size={24} />
                        <input
                            type='text'
                            name={`input_name}`}
                            placeholder={'Search for campaigns'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                            className='flex outline-none bg-[#F7F7F7] py-6 px-3 h-10 text-sm w-full'
                        />
                        <ArrowRightIcon color='#8b8b8b' size={24} />
                    </div>
                    <div className='flex mt-4 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        {isLoading ? (
                            <LoadingBlack />
                        ) : (
                            <div className={`flex flex-col flex-1 px-1 ${campaigns && campaigns.length > 4 ? 'overflow-y-scroll max-h-[21.25rem]' : ''}`}>
                                {campaigns.length > 0 ? (
                                    campaigns.map((camp: any, index: number) => (
                                        <div key={uuidv4()} className='flex justify-between items-center border-b py-3'>
                                            <div className='flex items-center gap-2' key={index}>
                                                <div className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                                    <input
                                                        type='radio'
                                                        id={camp.id}
                                                        value={camp.id}
                                                        className='h-[18px] w-[18px]'
                                                        checked={camp.id === selCamp}
                                                        onChange={() => setSelCamp(camp.id)}
                                                    />
                                                    <label className='capitalize' htmlFor={camp.id}>
                                                        <div className='flex flex-col px-2'>
                                                            <span className='text-base'>{camp?.title}</span>
                                                            <span className='text-sm text-[#8b8b8b]'>{camp?.description}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='my-4'>No campaigns available.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='flex w-full mt-4 justify-center'>
                        <button
                            onClick={mapToCampaign}
                            disabled={selCamp === ''}
                            className='flex items-center bg-black py-2 px-4 rounded-lg gap-1 cursor-pointer text-sm text-white h-11 disabled:opacity-50 disabled:cursor-not-allowed'>
                            <PlusIcon color='#fff' size={20} />
                            <span className='text-opacity-80'>Add to campaign</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
