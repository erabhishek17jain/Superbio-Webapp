'use client';
import UserNetworkService from '@/services/user.service';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export default function AccountSetup() {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const query = useSearchParams();
    const router = useRouter();
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

    const submit = async () => {
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
            await UserNetworkService.instance
                .resetPassword(token, password)
                .then(() => {
                    enqueueSnackbar('Password set successfully', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                    router.push('/login');
                })
                .catch(() => {
                    enqueueSnackbar('Error setting password', {
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
            <div className='flex flex-col mt-6'>
                <label htmlFor='email'>
                    <span className='text-xs font-semibold capitalize'>New Password</span>
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
            </div>

            <div className='flex flex-col mt-6'>
                <label htmlFor='email'>
                    <span className='text-xs font-semibold capitalize'>Confirm new password</span>
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
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    disabled={isSending}
                    onClick={submit}
                    className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-base p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Setuping...'
                    ) : (
                        <>
                            Finish Account Setup <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
