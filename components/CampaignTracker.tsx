'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ct1 from '@/public/camp-tracker/ct1.svg';
import ct2 from '@/public/camp-tracker/ct2.svg';
import ct3 from '@/public/camp-tracker/ct3.svg';
import ct4 from '@/public/camp-tracker/ct4.svg';
import ct5 from '@/public/camp-tracker/ct5.svg';
import ct6 from '@/public/camp-tracker/ct6.svg';
import ct7 from '@/public/camp-tracker/ct7.svg';
import ct8 from '@/public/camp-tracker/ct8.svg';
import ct9 from '@/public/camp-tracker/ct9.svg';
import ct10 from '@/public/camp-tracker/ct10.svg';
import ct11 from '@/public/camp-tracker/ct11.svg';
import ct12 from '@/public/camp-tracker/ct12.svg';
import ct13 from '@/public/camp-tracker/ct13.svg';
import ct14 from '@/public/camp-tracker/ct14.svg';
import ct15 from '@/public/camp-tracker/ct15.svg';
import ct16 from '@/public/camp-tracker/ct16.svg';
import ct17 from '@/public/camp-tracker/ct17.svg';
import ct18 from '@/public/camp-tracker/ct18.svg';
import ct19 from '@/public/camp-tracker/ct19.svg';
import ct20 from '@/public/camp-tracker/ct20.svg';
import ct21 from '@/public/camp-tracker/ct21.svg';
import ct22 from '@/public/camp-tracker/ct22.svg';
import ct23 from '@/public/camp-tracker/ct23.svg';
import ct24 from '@/public/camp-tracker/ct24.svg';
import ct25 from '@/public/camp-tracker/ct25.svg';
import ct26 from '@/public/camp-tracker/ct26.svg';
import ct27 from '@/public/camp-tracker/ct27.svg';
import ct28 from '@/public/camp-tracker/ct28.svg';
import ct29 from '@/public/camp-tracker/ct29.svg';
import ct30 from '@/public/camp-tracker/ct30.svg';
import ct31 from '@/public/camp-tracker/ct31.svg';
import ct32 from '@/public/camp-tracker/ct32.svg';
import ct33 from '@/public/camp-tracker/ct33.svg';
import ct34 from '@/public/camp-tracker/ct34.svg';
import ct35 from '@/public/camp-tracker/ct35.svg';

export const CampaignTracker = () => {
    const ref1 = useRef<HTMLElement>(null);
    const ref2 = useRef<HTMLElement>(null);
    const ref3 = useRef<HTMLElement>(null);
    const isInView1 = useInView(ref1, { once: true });
    const isInView2 = useInView(ref2, { once: true });
    const isInView3 = useInView(ref3, { once: true });
    return (
        <div className='flex flex-col w-full bg-gradient-to-t from-[#e3e4ff] pt-10 pb-[72px]'>
            <div className='flex flex-col gap-y-2 pt-6 pb-8 items-center'>
                <h2 className='text-2xl font-normal'>LOQO Campaign Tracker</h2>
                <p className='text-pretty text-base font-light text-gray-500'>Designed for maximum efficiency across the board.</p>
            </div>
            <section ref={ref1} className='flex flex-col sm:flex-row w-[350px] sm:w-[1250px]'>
                <div className='flex flex-col w-3/4 gap-6'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row justify-around gap-10'>
                            <div className='relative'>
                                <Image src={ct1} alt='ct1' className='max-w-[330px] sm:max-w-[400px]' />
                                <Image src={ct2} alt='ct2' className='absolute bottom-[-67px] sm:bottom-[-75px] right-[-55px] max-w-[320px] sm:max-w-[360px]' />
                            </div>
                            <div className='relative'>
                                <Image src={ct3} alt='ct3' className='relative max-w-[330px] sm:max-w-[345px]' />
                                <Image src={ct4} alt='ct4' className='absolute top-[25px] left-[-70px] sm:left-[-82px] max-w-[185px]' />
                                <Image src={ct5} alt='ct5' className='absolute top-[25px] left-[70px] sm:left-[90px] max-w-[185px]' />
                                <Image src={ct7} alt='ct7' className='absolute bottom-[-44px] left-[-70px] sm:left-[-82px] max-w-[185px]' />
                                <Image src={ct8} alt='ct8' className='absolute bottom-[-44px] left-[70px] sm:left-[90px] max-w-[185px]' />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView1? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='flex flex-col sm:flex-row justify-around gap-10 mt-4'>
                            <div className='relative'>
                                <Image src={ct14} alt='ct14' className='max-w-[320px] sm:max-w-[460px]' />
                                <Image src={ct15} alt='ct15' className='absolute top-[-4px] left-[-39px] sm:left-[-54px] max-w-[400px] sm:max-w-[570px]' />
                                <Image src={ct20} alt='ct20' className='max-w-[320px] mt-8' />
                                <Image
                                    src={ct19}
                                    alt='ct19'
                                    className='absolute bottom-[-45px] sm:bottom-[-30px] right-[-140px] sm:right-[-35px] max-w-[360px] sm:max-w-[440px]'
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row relative'>
                                <Image src={ct12} alt='ct12' className='max-w-[295px]' />
                                <Image
                                    src={ct13}
                                    alt='ct13'
                                    className='absolute bottom-[35px] sm:bottom-[-23px] right-[-135px] sm:right-[-56px] max-w-[380px] sm:max-w-[470px]'
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView1 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                    <div className='relative flex flex-col items-center sm:items-start sm:flex-row w-full sm:w-1/4 ml-0 sm:ml-6 py-4 sm:p-0'>
                        <Image src={ct9} alt='ct9' className='relative max-w-[280px]' />
                        <Image
                            src={ct10}
                            alt='ct10'
                            className='absolute top-[158px] sm:top-[142px] sm:top-[123px] left-[-49px] sm:left-[-75px] max-w-[400px]'
                        />
                        <Image src={ct11} alt='ct11' className='absolute top-[290px] sm:top-[273px] left-[-49px] sm:left-[-75px] max-w-[400px]' />
                    </div>
                </motion.div>
            </section>
            <section ref={ref2} className='flex gap-1'>
                <div className='flex flex-col sm:flex-row justify-between gap-1 w-full'>
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='relative'>
                            <Image src={ct21} alt='ct21' className='max-w-[320px] sm:max-w-[400px] h-[100px] mt-10 sm:mt-0' />
                            <Image src={ct22} alt='ct22' className='absolute top-[-45px] sm:top-[-55px] right-[-70px] max-w-[320px] sm:max-w-[370px]' />
                            <Image src={ct16} alt='ct16' className='hidden sm:flex absolute top-[150px] sm:top-[70px] max-w-[240px]' />
                            <Image src={ct33} alt='ct33' className='hidden sm:flex absolute bottom-[-115px] sm:bottom-[-185px] max-w-[350px]' />
                        </div>
                    </motion.div>
                    <div className='flex justify-center relative'>
                        <Image src={ct17} alt='ct17' className='max-w-[380px] h-[235px] ml-16' />
                        <Image src={ct18} alt='ct18' className='absolute top-[2px] left-[-30px] max-w-[410px]' />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: '100%', y: '50%' }}
                        animate={isInView2 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                        <div className='relative'>
                            <Image src={ct23} alt='ct23' className='max-w-[320px] ml-[10px] sm:ml-5' />
                            <Image src={ct24} alt='ct24' className='absolute top-[-60px] left-[54px] max-w-[265px]' />
                            <Image src={ct25} alt='ct25' className='max-w-[300px] mt-6 mb-4 ml-0 sm:ml-8' />
                        </div>
                    </motion.div>
                </div>
            </section>
            <section ref={ref3}className='flex flex-col-reverse gap-5 sm:flex-row justify-between w-full'>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                    <div className='flex justify-center relative'>
                        <Image src={ct30} alt='ct30' className='max-w-[300px] sm:max-w-[200px] mt-0 sm:mt-5 ml-0 sm:ml-12' />
                        <Image
                            src={ct31}
                            alt='ct31'
                            className='absolute top-[35px] sm:top-[90px] left-[-70px] sm:left-[-12px] max-w-[440px] sm:max-w-[310px]'
                        />
                        <Image
                            src={ct32}
                            alt='ct32'
                            className='absolute top-[220px] sm:top-[220px] left-[-70px] sm:left-[-12px] max-w-[440px] sm:max-w-[310px]'
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='flex flex-col-reverse gap-5 sm:flex-row w-full'>
                    <div className='flex justify-center relative mx-6 mt-4 sm:mt-0'>
                        <Image src={ct29} alt='ct29' className='max-w-[250px] ml-0 sm:ml-6' />
                        <Image src={ct28} alt='ct28' className='absolute top-[150px] left-[-9px] sm:left-[4px] max-w-[292px]' />
                    </div>
                    <div className='relative mx-0 sm:mx-6 flex flex-col gap-4 justify-center items-center mt-[90px] sm:mt-6'>
                        <Image src={ct34} alt='ct34' className='max-w-[320px] sm:max-w-[250px]' />
                        <Image src={ct35} alt='ct36' className='max-w-[320px] sm:max-w-[270px]' />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '100%', y: '50%' }}
                    animate={isInView3 ? { opacity: 1, x: 0, y: '10%' } : { opacity: 0, x: '100%', y: '-100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}>
                    <div className='flex justify-end relative ml-6 mt-4 sm:mt-0'>
                        <Image src={ct26} alt='ct26' className='max-w-[200px] ml-6' />
                        <Image src={ct27} alt='ct27' className='absolute top-[110px] left-auto sm:left-[4px] max-w-[220px]' />
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
