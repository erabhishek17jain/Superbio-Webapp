import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useAppDispatch, useAppSelector } from '@/context';
import UserNetworkService from '@/services/user.service';
import CampaignNetworkService from '@/services/campaign.service';
import { setMembers } from '@/context/user';
import { useSnackbar } from 'notistack';
import { logout } from '@/lib/utils';

export default function CreatorsListPopUp({ campaign, openCloseModal }: any) {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { members } = useAppSelector((state) => state.user);
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

    React.useEffect(() => {
        if (searchText !== '') {
            setUsers(members.filter((item: any) => item?.name.includes(searchText)));
        } else {
            setUsers(members);
        }

    }, [searchText]);

    React.useLayoutEffect(() => {
        setUsers([])
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
                logout();
                enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
            });

    }, []);

    return (
        <div id='campaign-share' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center m-auto'>
                <div className='flex flex-col justify-between bg-white rounded-xl p-6 w-[90%] md:w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[50%]'>
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
                    <div className='flex justify-between my-3'>
                        <span className='text-base text-[#7D7D7D]'>Total Teammates {users.length}</span>
                    </div>
                    <div className='flex justify-between px-4 items-center bg-[#F7F7F7] rounded-lg'>
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
                            placeholder={'Search for teammates'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className='flex outline-none bg-[#F7F7F7] py-6 px-3 h-10 text-sm w-full'
                        />
                        <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                            <g id='SVGRepo_iconCarrier'>
                                <path d='M5 12H19M19 12L13 6M19 12L13 18' stroke='#7D7D7D' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'></path>{' '}
                            </g>
                        </svg>
                    </div>
                    <div className='flex mt-4 flex-col sm:flex-col md:flex-row lg:flex-row'>
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
                                                <span className='text-sm text-[#7D7D7D]'>{user?.email}</span>
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
                                <p className='my-4'>No Users Found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
