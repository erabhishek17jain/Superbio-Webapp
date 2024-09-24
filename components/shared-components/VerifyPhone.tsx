'use client';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
import login2 from '@/public/login/login2.png';
import login3 from '@/public/login/login3.png';
import login4 from '@/public/login/login4.png';
import login5 from '@/public/login/login5.png';
import login6 from '@/public/login/login6.png';
import login7 from '@/public/login/login7.png';
import login8 from '@/public/login/login8.png';
import DynamicLogo from '../global-components/DynamicLogo';

export default function VerifyPhone({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <nav
                className='flex w-full items-center justify-between bg-transparent px-6 py-3 text-black sm:px-12 md:px-8 lg:px-12 xl:px-12 h-24'
                role='navigation'
                id='navbar'>
                <Link href={'/home'} className='text-sm flex items-center justify-center'>
                    <DynamicLogo login={true} />
                </Link>
                <div className='flex items-center gap-4 justify-center'></div>
            </nav>
            <section ref={ref} className='flex items-center justify-center w-full text-center px-6 pb-8 sm:px-10 h-[calc(100%_-_80px)]'>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className={`hidden sm:flex items-center justify-center gap-4 text-left w-full rounded-xl bg-[#F7F7F7] h-full`}>
                    <div className='w-1/2 max-w-[640px] flex flex-col items-center ustify-center pl-5'>
                        <Image src={login7} alt='ct11' className='max-w-[320px] -mb-8 -mt-6' />
                        <Image src={login8} alt='ct9' className='max-w-[30   0px]' />
                        <Image src={login3} alt='ct2' className='max-w-[320px] -mt-8 mb-4' />
                    </div>
                    <div className='w-1/2 flex flex-col items-end my-auto'>
                        <Image src={login6} alt='ct8' className='w-full max-w-[340px] mt-4 -mb-16' />
                        <Image src={login4} alt='ct8' className='max-w-[340px]' />
                        <div className='bg-[#dfd8f5] p-1 rounded-2xl mr-5 max-w-[330px] w-[calc_-_20px]'>
                            <Image src={login2} alt='ct10' className='max-w-[322px] rounded-2xl' />
                        </div>
                        <Image src={login5} alt='ct10' className='max-w-[340px] mt-3' />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className={`flex items-center justify-center gap-4 text-left w-full h-full`}>
                    <div className='flex w-full h-full justify-center items-center'>
                        <div className='flex sm:w-[80%] w-[90%] flex-col'>
                            <div className='flex justify-center mb-3'>
                                <DynamicLogo />
                            </div>
                            <div className='flex flex-col items-center text-2xl sm:text-3xl font-bold pb-6'>
                                Get Started With Loqo ai
                                <div className='flex justify-center text-sm sm:text-base font-light mt-2'>Let's quickly setup your account</div>
                            </div>
                            <div className='flex flex-col pt-6 w-[80%] mx-[10%] border-t border-[#cdcdcd]'>{children}</div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
