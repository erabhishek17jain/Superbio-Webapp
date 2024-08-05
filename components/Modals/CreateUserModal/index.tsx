'use client';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import UserNetworkService from '@/services/user.service';
import { useAppDispatch, useAppSelector } from '@/context';
import { setMembers } from '@/context/user';
import { title } from 'process';

const ROLES = [
    {
        name: 'Admin',
        value: 'admin',
        title: 'Would be able to see/edit all campaign for an organisation',
    },
    {
        name: 'User',
        value: 'user',
        title: 'Would be able to see only campaigns created by himself/herself and campaigns that are shared by other users.',
    },
    {
        name: 'Brand',
        value: 'brand',
        title: 'Brand Role will be able to view only campaigns shared with brand by the user. The Brand can only view - no edit access.',
    },
];

interface Props {
    mode: string;
    closeModal: () => void;
    userDetails?: User | null;
}

export default function CreateUserModal({ mode, closeModal, userDetails }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User>({ name: '', email: '', mobileNo: '', role: '' });
    const { meta } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const setKeyAndValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let copyUser = JSON.parse(JSON.stringify(user));
        copyUser[e.target.name] = e.target.value;
        setUser(copyUser);
    };

    useEffect(() => {
        if (mode === 'edit') {
            if (userDetails) {
                setUser(userDetails);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitUser = async () => {
        if (user.name === '' || user.email === '' || user.mobileNo === '' || user.role === '') {
            setError(true);
            return;
        }
        setError(false);

        if (mode === 'edit') {
            try {
                // await CampaignNetworkService.instance.updateCampaign(userDetails?._id, user);
                enqueueSnackbar('User updated successfully', { variant: 'success' });
                closeModal();
            } catch (error) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
        } else {
            try {
                await UserNetworkService.instance.addMember(user);
                const data = await UserNetworkService.instance.getAllUsers({ page: meta.page, limit: meta.limit });
                dispatch(setMembers(data.data));
                enqueueSnackbar('User created successfully', { variant: 'success' });
                closeModal();
            } catch (error) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
        }
    };

    return (
        <div id='create-campaign-pop-up' className='fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40 z-20'>
            <div className='flex w-full h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[40%]'>
                    <span className='text-xl font-semibold'>Bring in your teammate</span>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row'>
                        <div className='flex flex-col flex-1 '>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Full Name
                                </label>
                                <input
                                    type='text'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Jhon Doe'
                                    name='name'
                                    value={user.name}
                                    onChange={setKeyAndValue}
                                />
                                {error && user?.name === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    E-mail
                                </label>
                                <input
                                    type='email'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='hello@loqo.ai'
                                    name='email'
                                    value={user.email}
                                    onChange={setKeyAndValue}
                                />
                                {error && user?.email === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Mobile Number
                                </label>
                                <input
                                    type='number'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='9999999999'
                                    name='mobileNo'
                                    value={user.mobileNo}
                                    onChange={setKeyAndValue}
                                />
                                {error && user?.mobileNo === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Role
                                </label>
                                <select
                                    name='role'
                                    id=''
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    value={user.role}
                                    onChange={setKeyAndValue}>
                                    <option value=''>Select Role</option>
                                    {ROLES.map((item) => (
                                        <option key={uuidv4()} value={item.value} title={item.title}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {error && user?.role === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center py-3 text-sm mt-2'>
                        <svg
                            fill='#707070'
                            version='1.1'
                            id='Capa_1'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24px'
                            height='24px'
                            viewBox='0 0 416.979 416.979'>
                            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                            <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                            <g id='SVGRepo_iconCarrier'>
                                <g>
                                    <path d='M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z'></path>{' '}
                                </g>
                            </g>
                        </svg>
                        <span className='text-xs'>
                            Please ask the user to sign up with the same email and enter Organisation ID while creating their account.
                        </span>
                    </div>
                    <div className='flex w-full mt-4 justify-end'>
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                            className='bg-white border-black border mr-5 flex items-center py-3 rounded-xl px-6 text-black'>
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
                            Cancel
                        </button>
                        <button onClick={submitUser} className='bg-black flex items-center py-3 rounded-xl px-6 text-white text-sm'>
                            <svg width='20' height='20' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M19.7158 3.36572L2.24081 8.28759C2.09205 8.32826 1.95945 8.4138 1.86106 8.53256C1.76267 8.65131 1.70329 8.79751 1.69099 8.95123C1.67869 9.10496 1.71408 9.25874 1.79233 9.39162C1.87059 9.52451 1.98791 9.63004 2.12831 9.69384L10.1533 13.4907C10.3105 13.5635 10.4368 13.6898 10.5096 13.847L14.3064 21.872C14.3702 22.0124 14.4758 22.1297 14.6087 22.2079C14.7415 22.2862 14.8953 22.3216 15.049 22.3093C15.2028 22.297 15.349 22.2376 15.4677 22.1392C15.5865 22.0408 15.672 21.9082 15.7127 21.7595L20.6346 4.28447C20.6719 4.15695 20.6742 4.02174 20.6412 3.89302C20.6083 3.7643 20.5414 3.64681 20.4474 3.55286C20.3535 3.45891 20.236 3.39197 20.1073 3.35904C19.9785 3.32611 19.8433 3.32842 19.7158 3.36572V3.36572Z'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path d='M10 13.2375L14.2375 9' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            {mode === 'edit' ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
