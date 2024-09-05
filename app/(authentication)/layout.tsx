'use client';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import { useAppDispatch } from '@/context';
import { loginUsingGoogle } from '@/context/user/network';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import login2 from '@/public/login/login2.png';
import login3 from '@/public/login/login3.png';
import login4 from '@/public/login/login4.png';
import login5 from '@/public/login/login5.png';
import login6 from '@/public/login/login6.png';
import login7 from '@/public/login/login7.png';
import login8 from '@/public/login/login8.png';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import GoogleColorIcon from '@/icons/GoogleColorIcon';

export default function RootLayout({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [buttonText, setButtonText] = useState('Sign up');
    const [buttonLink, setButtonLink] = useState('/register');
    const [isGoogleLogin, setIsGoogleLogin] = useState(true);
    const [text, setText] = useState('Welcome to LOQO Business');
    const dispatch = useAppDispatch();
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (pathname === '/login') {
            setButtonText('Sign up');
            setButtonLink('/register');
            setIsGoogleLogin(true);
            setText('Welcome to LOQO Business');
        } else if (pathname === '/register') {
            setButtonText('Sign in');
            setButtonLink('/login');
            setIsGoogleLogin(pathname === '/register' ? true : false);
            setText('Register to LOQO Business');
        } else if (pathname === '/reset-password') {
            setButtonText('');
            setButtonLink('');
            setIsGoogleLogin(false);
            setText('Reset Password');
        } else if (pathname === '/forgot-password') {
            setButtonText('');
            setButtonLink('');
            setIsGoogleLogin(false);
            setText('Send recovery mail ');
        } else if (pathname === '/verify-user') {
            setButtonText('');
            setButtonLink('');
            setIsGoogleLogin(false);
            setText('OTP Verification');
        }
    }, [pathname]);

    useGoogleOneTapLogin({
        onSuccess: (creads) => {
            dispatch(
                loginUsingGoogle({
                    token: creads.credential as string,
                    tokenType: 'id_token',
                })
            );
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    const googleLogin = useGoogleLogin({
        onSuccess: (creads) => {
            dispatch(
                loginUsingGoogle({
                    token: creads.access_token,
                    tokenType: 'access_token',
                })
            );
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    return (
        <main className='flex w-full h-screen overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='flex flex-col w-full overflow-hidden'>
                <nav
                    className='flex w-full items-center justify-between bg-transparent px-6 py-3 text-black sm:px-12 md:px-8 lg:px-12 xl:px-12 h-24'
                    role='navigation'
                    id='navbar'>
                    <Link href={'/home'} className='text-sm flex items-center justify-center'>
                        <DynamicLogo login={true} />
                    </Link>
                    <div className='flex items-center gap-4 justify-center'>
                        {buttonText !== '' && (
                            <Link href={buttonLink} className='flex gap-2 capitalize items-center text-sm p-2 px-4 border border-black rounded-lg'>
                                {buttonText} <ArrowRightIcon color='#000' size={20} />
                            </Link>
                        )}
                    </div>
                </nav>
                <section ref={ref} className='flex items-center justify-center w-full text-center px-6 pb-8 sm:px-10 h-[calc(100%_-_80px)]'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        className={`hidden sm:flex flex-col items-center justify-center gap-4 text-left w-full rounded-xl bg-[#F7F7F7] h-full`}>
                        <div className='flex w-full flex-col overflow-y-auto'>
                            <div className='flex flex-col w-full items-center'>
                                <div className='flex w-full justify-center font-bold text-lg mt-4'>LOQO Campaign Tracker</div>
                                <div className='flex w-full justify-center font-light text-base'>Post Links Analysis and Shareable Dashboards</div>
                            </div>
                            <div className='flex w-full'>
                                <div className='w-1/2 max-w-[640px] flex flex-col items-center ustify-center pl-5'>
                                    <Image src={login7} alt='ct11' className='max-w-[320px] -mb-8 -mt-6 hover:rotate-[-2deg]' />
                                    <Image src={login8} alt='ct9' className='max-w-[300px] hover:rotate-[-2deg]' />
                                    <Image src={login3} alt='ct2' className='max-w-[320px] -mt-12 mb-4 z-5 hover:rotate-[-2deg]' />
                                </div>
                                <div className='w-1/2 flex flex-col items-end my-auto'>
                                    <Image src={login6} alt='ct8' className='w-full max-w-[340px] mt-4 -mb-16 hover:rotate-[-2deg]' />
                                    <Image src={login4} alt='ct8' className='max-w-[340px] hover:rotate-[-2deg] -mt-3' />
                                    <div className='bg-[#dfd8f5] p-1 rounded-2xl mr-5 max-w-[330px] w-[calc_-_20px] hover:rotate-[-2deg] -mt-5'>
                                        <Image src={login2} alt='ct10' className='max-w-[322px] rounded-2xl' />
                                    </div>
                                    <Image src={login5} alt='ct10' className='max-w-[340px] -mt-5 hover:rotate-[-2deg]' />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        className={`flex items-center justify-center gap-4 text-left w-full h-full`}>
                        <div className='flex w-full justify-center items-center h-full overflow-y-auto'>
                            <div className='flex sm:w-[80%] w-[90%] flex-col h-full'>
                                {buttonText !== 'Sign in' && (
                                    <div className='flex justify-center mb-3'>
                                        <div className='w-20'>
                                            <DynamicLogo />
                                        </div>
                                    </div>
                                )}
                                <div className='flex flex-col items-center text-xl sm:text-3xl font-bold pb-4 sm:pb-6 text-center'>
                                    {text}
                                    {buttonText !== 'Sign in' && (
                                        <div className='flex justify-center text-sm sm:text-base font-light mt-2'>Let's quickly setup your account</div>
                                    )}
                                </div>
                                {isGoogleLogin && (
                                    <div className='flex justify-center w-full pb-6 sm:pb-8'>
                                        <button
                                            className='cursor-pointer border p-2 rounded-lg border-[#cdcdcd] flex justify-center items-center gap-2 text-sm w-3/4'
                                            onClick={() => {
                                                googleLogin();
                                            }}>
                                            <span className='cursor-pointer'>
                                                <GoogleColorIcon color={'#fff'} size={25} />
                                            </span>
                                            <span>Continue With Google</span>
                                        </button>
                                    </div>
                                )}
                                <div className='flex flex-col pt-6 w-[80%] mx-[10%] border-t border-[#cdcdcd]'>{children}</div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
