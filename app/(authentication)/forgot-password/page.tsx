'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setUser } from '@/context/user';
import UserNetworkService from '@/services/user.service';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useState } from 'react';

export default function ForgotPassword() {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<any>({
        email: '',
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
        setErrors({ ...errors });
        return isError;
    };

    const forgotPassword = () => {
        if (!checkValidation(user)) { setIsSending(true);
        UserNetworkService.instance
            .forgotPassword(user.email)
            .then((res) => {
                setIsSending(false);
                console.log('Mail sent successfully', res);
            })
            .catch((err) => {
                enqueueSnackbar('Error in sending mail', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            });}
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Registered Email ID</span>
                </label>
                <input
                    type='text'
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.email !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Registered email id'
                    name='email'
                    value={user.email}
                    onChange={setKeyAndValue}
                />
                {errors.email !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.email}</p>}
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    disabled={isSending}
                    onClick={forgotPassword}
                    className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-base p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Sending...'
                    ) : (
                        <>
                            Send recovery mail <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
