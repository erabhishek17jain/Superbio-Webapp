import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/context';
import UserNetworkService from '@/services/user.service';
import CampaignNetworkService from '@/services/campaign.service';
import { setMembers } from '@/context/user';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { logout } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AlertOctagonIcon, ArrowRightIcon, CheckCircleIcon, SearchCheckIcon, XIcon } from 'lucide-react';

export default function ShareCampaignModal({ campaign, openCloseModal, fetchCampaigns }: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { members, loading } = useAppSelector((state) => state.user);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState<any>([]);

    const shareCampaign = async (email: string) => {
        const payload: any = {
            email: email,
            campaign_id: campaign?.id,
        };
        try {
            await CampaignNetworkService.instance.shareCampaign(payload);
            enqueueSnackbar('Campaign shared sucessfully.', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            const res = await UserNetworkService.instance.getAllUsers({ page: 1, limit: 100 });
            setUsers([...res.data]);
            dispatch(setMembers(res.data));
            fetchCampaigns()
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
            setUsers(members.filter((item: any) => item?.name.toLowerCase().includes(searchText)));
        } else {
            setUsers(members);
        }
    }, [searchText]);

    useLayoutEffect(() => {
        setUsers([]);
        UserNetworkService.instance
            .getAllUsers({ page: 1, limit: 100 })
            .then((res) => {
                const data = res.data.map((item: any) => {
                    const user = campaign?.sharedUsers.filter((el: any) => el?.email === item?.email);
                    return { ...item, isShared: user?.length === 1 ? true : false };
                });
                setUsers([...data]);
                dispatch(setMembers(data));
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
    }, []);

    return (
        <div id='campaign-share' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col justify-between bg-white rounded-xl p-6 w-[90%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Share Campaign</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex gap-[6px] items-center py-3 text-sm mt-2'>
                        <AlertOctagonIcon color='#000' size={18} />
                        <span className='text-sm'>You can share this campaign with your team. They would be able to view/edit this campaign.</span>
                    </div>
                    <div className='flex justify-between my-3'>
                        <span className='text-base text-[#8b8b8b]'>Total teammates {users.length}</span>
                    </div>
                    <div className='flex justify-between px-4 items-center bg-[#F7F7F7] rounded-lg'>
                        <SearchCheckIcon color='#8b8b8b' size={24} />
                        <input
                            type='text'
                            name={`input_name}`}
                            placeholder={'Search for teammates'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                            className='flex outline-none bg-[#F7F7F7] py-6 px-3 h-10 text-sm w-full'
                        />
                        <ArrowRightIcon color='#8b8b8b' size={24} />
                    </div>
                    <div className='flex mt-4 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        {loading ? (
                            <div className='flex items-center justify-center w-full h-[500px] my-6 mx-auto'>
                                <div className='flex items-center justify-center w-10 h-10'>
                                    <div className='border-t-transparent border-solid animate-spin rounded-full border-black border-8 w-full h-full'></div>
                                </div>
                            </div>
                        ) : (
                            <div className={`flex flex-col flex-1 px-3 ${users && users.length > 4 ? 'overflow-y-scroll max-h-80' : ''}`}>
                                {users.length > 0 ? (
                                    users.map((user: any, index: number) => (
                                        <div key={uuidv4()} className='flex justify-between items-center border-b py-3'>
                                            <div className='flex items-center gap-2' key={index}>
                                                <div
                                                    className='w-16 h-16 bg-[#e2e8f0] rounded-full border border-gray-300 bg-cover bg-center'
                                                    style={{ backgroundImage: `url("${user?.profilePic}")` }}></div>
                                                <div className='flex flex-col px-2'>
                                                    <span className='text-base'>{user?.name}</span>
                                                    <span className='text-sm text-[#8b8b8b]'>{user?.email}</span>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                {user?.isShared ? (
                                                    <div className='flex items-center text-[#02b33e] gap-1'>
                                                        <CheckCircleIcon color='#02b33e' size={24} />
                                                        Shared
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => shareCampaign(user?.email)}
                                                        className='cursor-pointer bg-white flex items-center text-black'>
                                                        Share
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='my-4'>No teammates available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
