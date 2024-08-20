'use client';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import CreateUserModal from '@/components/modals/CreateUserModal';
import { useAppDispatch, useAppSelector } from '@/context';
import { setMembers, setUserMeta } from '@/context/user';
import { User } from '@/interfaces/user';
import { logout } from '@/lib/utils';
import UserNetworkService from '@/services/user.service';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

export default function Users() {
    const [openUserModal, setOpenUserModal] = useState<boolean>(false);
    const [mode, setMode] = useState<string>('add');
    const { members, user } = useAppSelector((state) => state.user);
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        UserNetworkService.instance
            .getAllUsers({ page: 1, limit: 10 })
            .then((res) => {
                dispatch(setMembers(res.data));
                dispatch(setUserMeta(res.meta));
            })
            .catch((err) => {
                logout();
                enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
            });
    }, []);

    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full px-6 py-2 border-b h-[75px] border-[#cdcdcd]'>
                <div className='flex flex-col w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <div className='flex items-center justify-between w-full ml-16 sm:ml-0'>
                    <span className='text-2xl font-semibold lg:ml-0 xl:ml-0'>All Users</span>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => {
                                setMode('add');
                                setOpenUserModal(true);
                            }}
                            className='bg-black flex items-center py-3 rounded-xl px-6 text-white text-sm gap-2 h-10'>
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='stroke-2 stroke-black'>
                                <path
                                    d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                                    fill='white'
                                />
                            </svg>
                            <span className='hidden sm:flex'>Add User</span>
                        </button>
                    )}
                </div>
            </div>
            <div className='flex w-full items-center sm:p-8 px-8 py-6'>
                <div className='relative overflow-x-auto w-full border rounded-xl'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                            <tr>
                                <th scope='col' className='px-6 py-3 w-full'>
                                    User
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Role
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members?.length > 0 ? (
                                members.map((member) => (
                                    <tr
                                        key={member.email}
                                        onClick={() => {
                                            setMode('edit');
                                            setUserDetails(member);
                                            setOpenUserModal(true);
                                        }}
                                        className='odd:bg-white even:bg-gray-50 border-b cursor-pointer hover:bg-gray-100'>
                                        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                            <div className='flex'>
                                                <div className='flex rounded-full overflow-clip'>
                                                    {member.profilePic ? (
                                                        <Image src={member.profilePic} alt='' width={40} height={40} />
                                                    ) : (
                                                        <div className='flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full'>
                                                            <span className='text-gray-500 text-xs font-medium'>
                                                                {member.name.split(' ')[0][0]}
                                                                {member.name.split(' ').length > 1 && member.name.split(' ')[1][0]}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='flex'>
                                                    <div className='flex flex-col ml-4'>
                                                        <span className='text-sm font-medium text-gray-900'>
                                                            {member.name} {!member.isVerified && '(Not Verified)'}
                                                        </span>
                                                        <span className='text-sm text-gray-500'>{member.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <td className='px-6 py-4 capitalize'>{member.role}</td>
                                        <td className='px-6 py-4'>
                                            <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        <p className='my-4 text-center'>No users available.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {openUserModal && (
                <CreateUserModal
                    mode={mode}
                    openCloseModal={() => {
                        setOpenUserModal(false);
                        setUserDetails(null);
                    }}
                    userDetails={userDetails}
                />
            )}
        </div>
    );
}
