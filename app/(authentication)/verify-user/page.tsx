'use client';
import { useAppSelector } from '@/context';
import UserNetworkService from '@/services/user.service';
import { ArrowRightIcon } from 'lucide-react';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

export default function VerifyUser() {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAppSelector((state) => state.user);
    const [otp, setOtp] = useState<string>('');
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<any>({
        otp: '',
    });

    const checkValidation = () => {
        let isError = false;
        if (!otp || otp === '') {
            errors['otp'] = 'This field is required';
            isError = true;
        } else if (otp.length < 6) {
            errors['otp'] = 'OTP requires atleast 8 digits';
            isError = true;
        }
        setErrors({ ...errors });
        return isError;
    };

    const verifyUser = () => {
        if (!checkValidation()) {
            setIsSending(true);
            UserNetworkService.instance
                .verifyEmail(otp, user.email)
                .then((r) => {
                    setIsSending(false);
                    enqueueSnackbar('User verified successfully', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                })
                .catch((e) => {
                    enqueueSnackbar('Wrong OTP entered', {
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
                    <span className='text-base font-semibold capitalize'>OTP sent to your email</span>
                </label>
                <input
                    name='otp'
                    type='text'
                    value={otp}
                    className={`bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md ${errors.otp !== '' && 'border border-[#d00a0a]'}`}
                    placeholder='Enter 6 digit OTP'
                    onChange={(e) => {
                        setErrors({ ...errors, otp: '' });
                        setOtp(e.target.value);
                    }}
                />
                {errors.otp !== '' && <p className='text-[12px] text-[#d00a0a]'>{errors.otp}</p>}
            </div>

            <div className='flex flex-col mt-6'>
                <button
                    disabled={isSending}
                    onClick={verifyUser}
                    className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-base p-3 px-4 border bg-black rounded-lg cursor-pointer disabled:opacity-50'>
                    {isSending ? (
                        'Verifing...'
                    ) : (
                        <>
                            Verify <ArrowRightIcon color='#fff' size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
