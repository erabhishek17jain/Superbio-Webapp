import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/context';
import UserNetworkService from '@/services/user.service';
import CampaignNetworkService from '@/services/campaign.service';
import { setMembers } from '@/context/user';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { logout } from '@/lib/utils';

export default function ShareCampaignModal({ campaign, openCloseModal }: any) {
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
            enqueueSnackbar('Campaign shared sucessfully.', { variant: 'success' });
            const res = await UserNetworkService.instance.getAllUsers({ page: 1, limit: 100 });
            setUsers([...res.data]);
            dispatch(setMembers(res.data));
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (searchText !== '') {
            setUsers(members.filter((item: any) => item?.name.includes(searchText)));
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
                enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
                logout();
            });

    }, []);

    return (
        <div id='campaign-share' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col justify-between bg-white rounded-xl p-6 w-[90%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Share Campaign</span>
                        <button onClick={openCloseModal} className='bg-white flex items-center text-black'>
                            <svg width='24' height='24' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                                    stroke='#333333'
                                    strokeWidth='2'
                                    strokeMiterlimit='10'
                                />
                                <path d='M15 9L9 15' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                <path d='M15 15L9 9' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </button>
                    </div>
                    <div className='flex gap-[6px] items-center py-3 text-sm mt-2'>
                        <svg width='16px' height='16px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M12 16.0001V12.0001M12 8.00008H12.01M3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7985 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586V7.94153C21 7.59889 21 7.42756 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7985 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42756 3 7.59889 3 7.94153Z'
                                stroke='#000'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                        <span className='text-xs'>You can share this campaign with your team. They would be able to view/edit this campaign.</span>
                    </div>
                    <div className='flex justify-between my-3'>
                        <span className='text-base text-[#8b8b8b]'>Total teammates {users.length}</span>
                    </div>
                    <div className='flex justify-between px-4 items-center bg-[#F7F7F7] rounded-lg'>
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
                            placeholder={'Search for teammates'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className='flex outline-none bg-[#F7F7F7] py-6 px-3 h-10 text-sm w-full'
                        />
                        <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                            <g id='SVGRepo_iconCarrier'>
                                <path d='M5 12H19M19 12L13 6M19 12L13 18' stroke='#8b8b8b' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'></path>{' '}
                            </g>
                        </svg>
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
                                                        <svg
                                                            height='16px'
                                                            width='16px'
                                                            version='1.1'
                                                            id='Capa_1'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            viewBox='0 0 310.277 310.277'
                                                            fill='#02b33e'>
                                                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                                            <g id='SVGRepo_iconCarrier'>
                                                                <g>
                                                                    <path d='M155.139,0C69.598,0,0,69.598,0,155.139c0,85.547,69.598,155.139,155.139,155.139 c85.547,0,155.139-69.592,155.139-155.139C310.277,69.598,240.686,0,155.139,0z M144.177,196.567L90.571,142.96l8.437-8.437 l45.169,45.169l81.34-81.34l8.437,8.437L144.177,196.567z'></path>{' '}
                                                                </g>
                                                            </g>
                                                        </svg>{' '}
                                                        Shared
                                                    </div>
                                                ) : (
                                                    <button onClick={() => shareCampaign(user?.email)} className='bg-white flex items-center text-black'>
                                                        Share
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='my-4'>No teammates found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
