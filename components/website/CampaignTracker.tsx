'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ct2 from '@/public/campaign-tracker/ct2.png';
import ct3 from '@/public/campaign-tracker/ct3.png';
import ct5 from '@/public/campaign-tracker/ct5.png';
import ct6 from '@/public/campaign-tracker/ct6.png';
import ct8 from '@/public/campaign-tracker/ct8.png';
import ct9 from '@/public/campaign-tracker/ct9.png';
import ct10 from '@/public/campaign-tracker/ct10.png';
import ct11 from '@/public/campaign-tracker/ct11.png';
import ct12 from '@/public/campaign-tracker/ct12.png';
import ct16 from '@/public/campaign-tracker/ct16.png';
import ct17 from '@/public/campaign-tracker/ct17.png';
import ct18 from '@/public/campaign-tracker/ct17.png';

export const CampaignTracker = () => {
    const ref1 = useRef<HTMLElement>(null);
    const ref2 = useRef<HTMLElement>(null);
    const isInView1 = useInView(ref1, { once: true });
    const isInView2 = useInView(ref2, { once: true });
    return (
        <div className='flex flex-col w-full pt-4 sm:pt-8 pb-[40px] sm:pb-[72px]'>
            <div className='flex flex-col gap-y-2 pt-6 pb-8 items-center'>
                <h2 className='text-2xl font-normal'>Our Flagship Product</h2>
                <p className='text-pretty text-base font-light text-gray-500'>LOQO Campaign Tracker - Fast. Focused. Flawless. </p>
            </div>
            <section ref={ref1} className='flex flex-col sm:flex-row w-full'>
                <div className='flex flex-col w-full sm:w-[70%]'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row justify-around  w-full'>
                            <div className='w-[110%] sm:w-[60%] -mr-20'>
                                <Image src={ct3} alt='ct1' className='w-full hover:rotate-[-2deg]' />
                            </div>
                            <div className='flex flex-col sm:flex-row w-[135%] hover:rotate-[-2deg] sm:w-[60%] -ml-16 sm:ml-0 -mr-16'>
                                <Image src={ct6} alt='ct12' className='w-full' />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between'>
                            <div className='w-full sm:w-[65%] -mt-2 sm:-mt-3'>
                                <Image src={ct2} alt='ct2' className='w-full hover:rotate-[-2deg]' />
                            </div>
                            <div className='flex justify-center relative w-[130%] sm:w-[46%] -mx-[4%] -mb-5'>
                                <Image src={ct9} alt='ct9' className='w-full hover:rotate-[-2deg] -ml-20 sm:ml-0' />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView1 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[120%] sm:w-[30%] -mt-16 sm:mt-0'>
                    <div className='flex flex-col items-center sm:items-start mr-0 sm:-mr-[12%]'>
                        <Image src={ct5} alt='ct5' className='w-[150%] hover:rotate-[-2deg] -ml-20 sm:-ml-8' />
                        <Image src={ct11} alt='ct11' className='w-[95%] hover:rotate-[-2deg] -mt-6 sm:ml-4' />
                    </div>
                </motion.div>
            </section>
            <section ref={ref2} className='flex flex-col-reverse sm:flex-row gap-6 w-full mt-6'>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[112%] sm:w-[34%]'>
                    <Image src={ct8} alt='ct8' className='w-full hover:rotate-[-2deg] -mt-[40px]' />
                    <div className='flex w-[125%] -mx-[20%] sm:-mx-[16%] -mt-[24px]'>
                        <Image src={ct12} alt='ct12' className='w-full hover:rotate-[-2deg]' />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-full sm:w-[33%] mt-6 sm:mt-[17px] sm:-ml-2'>
                    <div className='p-[6px] bg-[#dfd8f5] rounded-2xl hover:rotate-[-2deg]'>
                        <Image src={ct16} alt='ct16' className='w-full rounded-2xl' />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView2 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-full sm:w-[33%] -mt-[60rem] sm:-mt-20 mb-8 sm:mb-0'>
                    <div className='flex w-[120%]'>
                        <Image src={ct10} alt='ct10' className='w-full hover:rotate-[-2deg] -ml-[82px] -mb-[25px]' />
                    </div>
                    <div className='p-[6px] bg-[#dfd8f5] rounded-2xl hover:rotate-[-2deg]'>
                        <Image src={ct17} alt='ct17' className='w-full rounded-2xl' />
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
