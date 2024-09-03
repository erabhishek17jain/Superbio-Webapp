'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setUser } from '@/context/user';
import UserNetworkService from '@/services/user.service';
import { error } from 'console';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useState } from 'react';

export default function Register() {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [isSending, setIsSending] = useState(false);

    const [errors, setErrors] = useState<any>({
        name: '',
        email: '',
        mobileNo: '',
        password: '',
    });

    const setKeyAndValue = (e: ChangeEvent<HTMLInputElement>) => {
        const copyUser = JSON.parse(JSON.stringify(user));
        copyUser[e.target.name] = e.target.value;
        errors[e.target.name] = '';
        setErrors({ ...errors });
        dispatch(setUser(copyUser));
    };

    const checkValidation = (user: any) => {
        let isError = false;
        const leng = user.password.length;
        console.log(leng);
        if (!user.name || user.name === '') {
            errors['name'] = 'This field is required';
            isError = true;
        }
        if (!user.email || user.email === '') {
            errors['email'] = 'This field is required';
            isError = true;
        } else if (!user.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            errors['email'] = 'Please provide valid email address';
            isError = true;
        }
        if (!user.mobileNo || user.mobileNo === '') {
            errors['mobileNo'] = 'This field is required';
            isError = true;
        } else if (user.mobileNo.length !== 10) {
            errors['mobileNo'] = 'Mobile number should be of 10 digits';
            isError = true;
        }
        if (!user.password || user.password === '') {
            errors['password'] = 'This field is required';
            isError = true;
        } else if (user.password.length < 8) {
            errors['password'] = 'Password requires atleast 8 characters';
            isError = true;
        }
        setErrors({ ...errors });
        return isError;
    };

    const register = async () => {
        if (!checkValidation(user)) {
            try {
                setIsSending(true);
                const payload: any = {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: 'user',
                    mobileNo: user.mobileNo,
                };
                UserNetworkService.instance
                    .register(payload)
                    .then((res) => {
                        setIsSending(false);
                        router.push('/verify-user');
                    })
                    .catch((err) => {
                        const error =
                            err.response.data === 'User already exists'
                                ? 'This email is already registered on LOQO Business. Please Sign in or sign up with a different email.'
                                : err.response.data;
                        enqueueSnackbar(error, { variant: 'error' });
                        setIsSending(false);
                    });
            } catch (error) {
                console.error('Registration error:', error);
                enqueueSnackbar('Registration failed', { variant: 'error' });
            }
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='name'>
                    <span className='text-base font-semibold capitalize'>Name *</span>
                </label>
                <input
                    type='text'
                    placeholder='Your name'
                    value={user.name}
                    name='name'
                    onChange={setKeyAndValue}
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.name !== '' && 'border border-[#d00a0a]'}`}
                />
                {errors.name !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.name}</p>}
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Email ID *</span>
                </label>
                <input
                    type='text'
                    placeholder='Work email'
                    value={user.email}
                    name='email'
                    onChange={setKeyAndValue}
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.email !== '' && 'border border-[#d00a0a]'}`}
                />
                {errors.email !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.email}</p>}
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor='mobileno'>
                    <span className='text-base font-semibold capitalize'>Mobile Number *</span>
                </label>
                <input
                    type='text'
                    placeholder='Mobile number'
                    value={user.mobileNo}
                    name='mobileNo'
                    minLength={10}
                    maxLength={10}
                    onChange={setKeyAndValue}
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.mobileNo !== '' && 'border border-[#d00a0a]'}`}
                />
                {errors.mobileNo !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.mobileNo}</p>}
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Password *</span>
                </label>
                <input
                    type='password'
                    placeholder='Password (atleast 8  chatacters)'
                    name='password'
                    value={user.password}
                    onChange={setKeyAndValue}
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.password !== '' && 'border border-[#d00a0a]'}`}
                />
                {errors.password !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.password}</p>}
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    onClick={register}
                    disabled={isSending}
                    className='flex gap-2 capitalize items-center justify-center text-white text-sm sm:text-base font-semibold p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Processing...'
                    ) : (
                        <>
                            Sign Up <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
