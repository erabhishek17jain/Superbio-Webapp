'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ct1 from '@/public/camp-tracker1/ct1.png';
import ct2 from '@/public/camp-tracker1/ct2.png';
import ct3 from '@/public/camp-tracker1/ct3.png';
import ct4 from '@/public/camp-tracker1/ct4.png';
import ct5 from '@/public/camp-tracker1/ct5.png';
import ct6 from '@/public/camp-tracker1/ct6.png';
import ct7 from '@/public/camp-tracker1/ct7.png';
import ct8 from '@/public/camp-tracker1/ct8.png';
import ct9 from '@/public/camp-tracker1/ct9.png';
import ct10 from '@/public/camp-tracker1/ct10.png';
import ct11 from '@/public/camp-tracker1/ct11.png';
import ct12 from '@/public/camp-tracker1/ct12.png';
import ct13 from '@/public/camp-tracker1/ct13.png';
import ct14 from '@/public/camp-tracker1/ct14.png';
import ct15 from '@/public/camp-tracker1/ct15.png';
import ct16 from '@/public/camp-tracker/ct34.svg';

export const CampaignTracker = () => {
    const ref1 = useRef<HTMLElement>(null);
    const ref2 = useRef<HTMLElement>(null);
    const ref3 = useRef<HTMLElement>(null);
    const isInView1 = useInView(ref1, { once: true });
    const isInView2 = useInView(ref2, { once: true });
    const isInView3 = useInView(ref3, { once: true });
    return (
        <div className='flex flex-col w-full pt-10 pb-[72px]'>
            <div className='flex flex-col gap-y-2 pt-6 pb-8 items-center'>
                <h2 className='text-2xl font-normal'>LOQO Campaign Tracker</h2>
                <p className='text-pretty text-base font-light text-gray-500'>Designed for maximum efficiency across the board.</p>
            </div>
            <section ref={ref1} className='flex flex-col sm:flex-row w-full'>
                <div className='flex flex-col w-full sm:w-[70%]'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row justify-around  w-full'>
                            <div className='w-[110%] sm:w-[60%] -mr-20'>
                                <Image src={ct3} alt='ct1' className='w-full' />
                            </div>
                            <div className='w-[115%] sm:w-[60%] -ml-[15%] sm:ml-0 -mt-6 sm:mt-0'>
                                <Image src={ct4} alt='ct4' className='w-full' />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 justify-around'>
                            <div className='w-[115%] sm:w-[80%] -ml-6 -mr-4 -mt-6 sm:mt-0'>
                                <Image src={ct7} alt='ct14' className='w-full' />
                            </div>
                            <div className='flex flex-col sm:flex-row w-[135%] sm:w-[50%] -ml-16 sm:-ml-24 -mr-10'>
                                <Image src={ct6} alt='ct12' className='w-full' />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView1 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[120%] sm:w-[30%] -mt-16 sm:mt-0'>
                    <div className='flex flex-col items-center sm:items-start'>
                        <Image src={ct5} alt='ct5' className='w-[150%] -ml-20 sm:-ml-8' />
                        <Image src={ct11} alt='ct11' className='w-[95%] -mt-6 -ml-2 sm:ml-4' />
                    </div>
                </motion.div>
            </section>
            <section ref={ref2} className='flex flex-col sm:flex-row w-full'>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[114%] sm:w-[30%] -mt-2 sm:-mt-10'>
                    <Image src={ct8} alt='ct8' className='w-full' />
                    <Image src={ct15} alt='ct15' className='w-[90%]' />
                </motion.div>
                <div className='flex justify-center relative w-[130%] sm:w-[36%] -mx-[3%]'>
                    <Image src={ct9} alt='ct9' className='w-full -ml-20 sm:ml-0' />
                </div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView2 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[115%] -ml-12 sm:ml-0 -mt-8 sm:mt-0 sm:w-[40%]'>
                    <div className='relative'>
                        <Image src={ct10} alt='ct10' className='w-full' />
                    </div>
                </motion.div>
            </section>
            <section ref={ref3} className='flex flex-col sm:flex-row w-full'>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-[135%] sm:w-[32%] -ml-16'>
                    <Image src={ct12} alt='ct12' className='w-full' />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-full sm:w-[25%] mt-6 sm:mt-0'>
                    <Image src={ct13} alt='ct10' className='w-full' />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView2 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-full sm:w-[38%] -mt-4 sm:-mt-12 mx-4 flex flex-col gap-2 items-center'>
                    <div className='flex'>
                        <Image src={ct1} alt='ct1' className='w-[60%] -my-5 -mx-10' />
                        <Image src={ct16} alt='ct2' className='w-[40%] -mt-2 sm:-mt-40 ml-12' />
                    </div>
                    <Image src={ct2} alt='ct2' className='w-full -ml-8 sm:ml-0' />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView2 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='w-full sm:w-[15%] -mt-6 sm:-mt-20 mb-8 sm:mb-0'>
                    <Image src={ct14} alt='ct10' className='w-full' />
                </motion.div>
            </section>
        </div>
    );
};
