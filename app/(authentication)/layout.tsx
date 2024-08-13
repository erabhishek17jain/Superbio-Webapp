'use client';
import DynamicLogo from '@/components/DynamicLogo';
import { useAppDispatch } from '@/context';
import { loginUsingGoogle } from '@/context/user/network';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import bgImage from '@/public/background.svg';
import { motion, useInView } from 'framer-motion';
import productShowcase from '@/public/product-homepage.png';
import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [buttonText, setButtonText] = React.useState('Sign up');
    const [buttonLink, setButtonLink] = React.useState('/register');
    const [buttonBeforeText, setButtonBeforeText] = React.useState('Not a member? ');
    const [text, setText] = React.useState('Welcome to LOQO Business');
    const dispatch = useAppDispatch();
    const isInView = useInView(ref, { once: true });

    React.useEffect(() => {
        if (pathname === '/login') {
            setButtonText('Sign up');
            setButtonLink('/register');
            setButtonBeforeText('Not a member? ');
            setText('Welcome to LOQO Business');
        } else if (pathname === '/register' || pathname === '/setup') {
            setButtonText('Sign in');
            setButtonLink('/login');
            setButtonBeforeText('Already a member? ');
            setText('Welcome to LOQO Business');
        } else {
            setButtonText('Sign in');
            setButtonLink('/login');
            setButtonBeforeText('Already a member? ');
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
                    className='flex w-full items-center justify-between bg-transparent px-6 py-8 text-black sm:px-12 md:px-8 lg:px-24 xl:px-24'
                    role='navigation'
                    id='navbar'>
                    <Link href={'/home'} className='text-sm flex items-center justify-center'>
                        <DynamicLogo />
                    </Link>
                    <div className='flex items-center gap-4 justify-center'>
                        <span className='text-sm hidden sm:flex'>{buttonBeforeText} </span>
                        <Link href={buttonLink} className='flex capitalize items-center text-xs p-2 px-5 border border-black rounded-lg'>
                            {buttonText} <BsArrowRight className='ml-2' size={20} />
                        </Link>
                    </div>
                </nav>
                <section ref={ref} className='flex items-center justify-center w-full h-full mt-4 sm:-mt-8 pb-10 sm:pl-4 text-center px-6 sm:px-10 md:pl-32 md:pr-10'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView ? { opacity: 1, x: 0, y: '15%' } : { opacity: 0, x: '100%', y: '-15%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        className='hidden h-[75vh] md:block w-5/12'>
                        <Image src={productShowcase} alt='right-hero-Image' className='main-card rotate-[-15deg] scale-150 object-cover lg:scale-125' />
                    </motion.div>
                    <div className='hidden md:block w-1/12'></div>
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        className='z-10 flex gap-4 text-left w-full md:w-1/2 -mt-12'>
                        <div className='flex w-full justify-center items-center'>
                            <div className='flex sm:w-[80%] w-[90%] flex-col'>
                                <div className='flex text-3xl sm:text-4xl font-bold mt-4'>{text}</div>
                                <div className='flex flex-col mt-6'>{children}</div>
                                {pathname !== '/verify-user' && (
                                    <div className=' w-full mt-5 rounded-lg'>
                                        <button
                                            className='w-full border p-2 rounded-lg border-black flex space-x-4 justify-center items-center'
                                            onClick={() => {
                                                googleLogin();
                                            }}>
                                            <span className='cursor-pointer'>
                                                <FcGoogle size={25} />
                                            </span>
                                            <span>{pathname === '/login' ? 'Login' : 'Signup'} With Google</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
