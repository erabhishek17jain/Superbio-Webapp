'use client';
import { useAppSelector } from '@/context';
import UserNetworkService from '@/services/user.service';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

export default function ResetPassword() {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { user } = useAppSelector((state) => state.user);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const query = useSearchParams();
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<any>({
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (!query.get('token')) {
            router.push('/login');
        }
    }, [query]);

    const checkValidation = () => {
        let isError = false;
        if (!password || password === '') {
            errors['password'] = 'This field is required';
            isError = true;
        } else if (password.length < 8) {
            errors['password'] = 'Password requires atleast 8 characters';
            isError = true;
        }
        if (!confirmPassword || confirmPassword === '') {
            errors['confirmPassword'] = 'This field is required';
            isError = true;
        } else if (confirmPassword.length < 8) {
            errors['confirmPassword'] = 'Password requires atleast 8 characters';
            isError = true;
        }
        setErrors({ ...errors });
        return isError;
    };

    const handleResetPassword = () => {
        const token = query.get('token');
        if (!token) {
            return;
        }
        if (!checkValidation()) {
            if (password !== confirmPassword) {
                enqueueSnackbar('Passwords do not match', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                return;
            }
            setIsSending(true);
            UserNetworkService.instance
                .resetPassword(token, password)
                .then((res) => {
                    setIsSending(false);
                    router.push('/login');
                    enqueueSnackbar('Password reset sucessfully', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                })
                .catch((err) => {
                    enqueueSnackbar('Password reset failed', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                });
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>New Password</span>
                </label>
                <input
                    type='password'
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.password !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Password (atleast 8  chatacters)'
                    onChange={(e) => {
                        setErrors({ ...errors, password: '' });
                        setPassword(e.target.value);
                    }}
                />
                {errors.password !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.password}</p>}
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor='email'>
                    <span className='text-base font-semibold capitalize'>Confirm new password</span>
                </label>
                <input
                    type='password'
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.confirmPassword !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Password (atleast 8  chatacters)'
                    onChange={(e) => {
                        setErrors({ ...errors, confirmPassword: '' });
                        setConfirmPassword(e.target.value);
                    }}
                />
                {errors.confirmPassword !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.confirmPassword}</p>}
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    disabled={isSending}
                    onClick={handleResetPassword}
                    className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-base p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Reseting...'
                    ) : (
                        <>
                            Reset Password <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
