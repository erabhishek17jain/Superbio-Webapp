'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import UserNetworkService from '@/services/user.service';
import { useAppDispatch, useAppSelector } from '@/context';
import { setMembers } from '@/context/user';
import { User } from '@/interfaces/user';
import { USER_ROLES } from '@/constants';
import { AlertOctagonIcon, XIcon } from 'lucide-react';
import ReportIcon from '../../icons/ReportIcon';

interface CreateUserModalProps {
    mode: string;
    openCloseModal: () => void;
    userDetails?: User | null;
}

export default function CreateUserModal({ mode, openCloseModal, userDetails }: CreateUserModalProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User>({ name: '', email: '', mobileNo: '', role: '' });
    const { meta } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const setKeyAndValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    }, []);

    const submitUser = async () => {
        if (user.name === '' || user.email === '' || user.mobileNo === '' || user.role === '') {
            setError(true);
            return;
        }
        setError(false);

        if (mode === 'edit') {
            try {
                enqueueSnackbar('User updated successfully', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                openCloseModal();
            } catch (error) {
                enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        } else {
            try {
                await UserNetworkService.instance.addMember(user);
                const data = await UserNetworkService.instance.getAllUsers({ page: meta.page, limit: meta.limit });
                dispatch(setMembers(data.data));
                enqueueSnackbar('User created successfully', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                openCloseModal();
            } catch (error: any) {
                if (error?.response?.data === 'Error creating user') enqueueSnackbar('User already exists.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                else enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        }
    };

    return (
        <div id='create-user' className='fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40 z-20'>
            <div className='flex w-full h-screen justify-center items-center'>
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
                                    min='0'
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
                                    {USER_ROLES.map((item) => (
                                        <option key={uuidv4()} value={item.value} title={item.title}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {error && user?.role === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[6px] items-center py-3 text-sm mt-2'>
                        <AlertOctagonIcon color='#0B1571' size={14} />
                        <span className='text-xs'>
                            Please ask the user to sign up with the same email and enter Organisation ID while creating their account.
                        </span>
                    </div>
                    <div className='flex w-full mt-4 justify-end'>
                        <button
                            onClick={() => {
                                openCloseModal();
                            }}
                            className='bg-white border-black border mr-5 flex items-center py-3 rounded-xl px-6 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button onClick={submitUser} className='bg-black flex items-center py-3 rounded-xl px-6 text-white text-sm'>
                            <ReportIcon color='#fff' size={14} />
                            {mode === 'edit' ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
