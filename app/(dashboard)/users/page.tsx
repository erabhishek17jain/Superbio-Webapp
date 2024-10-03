'use client';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import CreateUserModal from '@/components/modals/CreateUserModal';
import { useAppSelector } from '@/context';
import { User } from '@/interfaces/user';
import { logout } from '@/lib/utils';
import UserNetworkService from '@/services/user.service';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

export default function Users() {
    const [openUserModal, setOpenUserModal] = useState<boolean>(false);
    const [mode, setMode] = useState<string>('add');
    const { user } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<User[]>([]);
    const [userDetails, setUserDetails] = useState<User | null>(null);

    useEffect(() => {
        setLoading(true);
        UserNetworkService.instance
            .getAllUsers({ page: 1, limit: 10 })
            .then((res) => {
                setUserData([user, ...res.data]);
                setLoading(false);
            })
            .catch((err) => {
                logout();
                enqueueSnackbar('You are not authorized to view this page', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            });
    }, []);

    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full px-4 sm:px-6 py-2 border-b h-16 border-[#cdcdcd]'>
                <div className='flex flex-col w-[128px] sm:w-8 items-center h-[50px]'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[17px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <div className='flex items-center justify-between w-full ml-16 sm:ml-0 pl-2 sm:pl-0'>
                    <span className='text-lg font-semibold ml-2'>All Users</span>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => {
                                setMode('add');
                                setOpenUserModal(true);
                            }}
                            className='bg-black flex items-center py-3 rounded-xl px-3 sm:px-6 text-white text-sm gap-2 h-10'>
                            <PlusCircleIcon color='#fff' size={22} />
                            <span className='hidden sm:flex'>Add User</span>
                        </button>
                    )}
                </div>
            </div>
            <div className='flex w-full items-center sm:p-8 px-8 py-6'>
                {!loading ? (
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
                                {userData?.length > 0 ? (
                                    userData.map((member) => (
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
                ) : (
                    <LoadingBlack />
                )}
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
