'use client';
import productAnalyticsLeft from '@/public/contact/analytics-left.png';
import productAnalyticsRight from '@/public/contact/analytics-right.png';
import productHomepage from '@/public/contact/Lock.png';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { ContactUsForm } from './ContactUsForm';

export const ContactUs = () => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div id='contact-us' className='flex w-full items-center overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24'>
            <section ref={ref} className='flex w-full flex-col-reverse items-center justify-between overflow-hidden sm:flex-row mb-12'>
                <ContactUsForm parentRef={ref} />
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
                    transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                    className='relative hidden sm:block sm:w-1/3 md:w-1/2'>
                    <ProductShowcase />
                </motion.div>
            </section>
        </div>
    );
};

const ProductShowcase = () => {
    return (
        <div className='hidden flex-col gap-y-6 sm:flex items-end'>
            <div className='w-[20rem] my-8'>
                <Image src={productHomepage} alt='product-image' className='main-card h-auto w-auto rounded-md' />
            </div>
            {/* <div className='ml-auto flex w-full justify-end gap-x-4 sm:translate-x-24 md:translate-x-28 xl:translate-x-5'>
                <Image src={productAnalyticsLeft} alt='product-image' className='main-card h-auto w-56 rounded-md' />
                <Image src={productAnalyticsRight} alt='product-image' className='main-card h-auto w-56 rounded-md' />
            </div> */}
        </div>
    );
};
