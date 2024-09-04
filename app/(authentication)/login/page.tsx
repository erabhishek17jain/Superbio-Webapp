'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setUser } from '@/context/user';
import { login as userLogin } from '@/context/user/network';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ArrowRightIcon } from 'lucide-react';

export default function Login() {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<any>({
        email: '',
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
        if (!user.email || user.email === '') {
            errors['email'] = 'This field is required';
            isError = true;
        } else if (!user.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            errors['email'] = 'Please provide valid email address';
            isError = true;
        }
        if (!user.password || user.password === '') {
            errors['password'] = 'This field is required';
            isError = true;
        }
        setErrors({ ...errors });
        return isError;
    };

    const login = async () => {
        if (!checkValidation(user)) {
            try {
                setIsSending(true);
                const payload: any = {
                    email: user.email,
                    password: user.password,
                };
                dispatch(userLogin(payload));
                setIsSending(false);
            } catch (error) {
                console.error('Login error:', error);
                enqueueSnackbar('Login failed', {
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
        <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Email ID</span>
                </label>
                <input
                    type='text'
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.email !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Work email'
                    value={user.email}
                    onChange={setKeyAndValue}
                    name='email'
                />
                {errors.email !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.email}</p>}
            </div>
            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Password</span>
                </label>
                <input
                    type='password'
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.password !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Password (atleast 8  chatacters)'
                    value={user.password}
                    onChange={setKeyAndValue}
                    name='password'
                />
                {errors.password !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.password}</p>}
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    onClick={login}
                    disabled={isSending}
                    className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-base p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Processing...'
                    ) : (
                        <>
                            Sign In <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>

            <div className='flex flex-col mt-4'>
                <div className='text-sm flex items-center justify-center underline'>
                    <Link href={'/forgot-password'}>Forgot password?</Link>
                </div>
            </div>
        </div>
    );
}
