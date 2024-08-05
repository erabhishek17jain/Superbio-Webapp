'use client';

import { WhySuperbioList, WhySuperbioListProps } from '@/constants';
import { cn } from '@/lib/utils';
import { useInView, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { RefObject, useRef, useState } from 'react';
import { Button } from './ui/button';

const LENGTH = WhySuperbioList.length;

const WhyCard = ({ title, icon, text, parentRef, index }: WhySuperbioListProps & { parentRef: RefObject<HTMLElement>; index: number }) => {
    const isInView = useInView(parentRef, { once: true });

    return (
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
            transition={{ delay: 0.075 * index, duration: 0.5, type: 'spring' }}
            className='why-box group group col-span-1 flex h-96 flex-col justify-between gap-y-5 border border-black px-6 py-12'>
            <div className='flex items-center gap-x-2 group-hover:invert'>
                <Image src={icon} alt='logo' className='h-12 w-12' />
            </div>
            <div className='flex flex-col gap-y-3'>
                <h3 className='text-xl font-semibold group-hover:text-white'>{title}</h3>
                <p className='text-pretty text-sm font-medium text-gray-500 group-hover:text-gray-200'>{text}</p>
            </div>
        </motion.div>
    );
};

export const WhySuperbioNew = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const ref = useRef(null);
    const prevSlide = () => {
        if (currentIndex > 1) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    const nextSlide = () => {
        if (currentIndex < LENGTH) {
            setCurrentIndex((prev) => prev + 1);
        }
    };
    return (
        <section ref={ref} id='our-products' className='pt-8 sm:pt-16 pb-5 flex flex-col justify-center'>
            <div className='flex flex-col gap-y-2 xl:w-1/2'>
                <h2 className='text-xl font-normal'>Skip the guesswork with LOQO’s Influencer Marketing Suite</h2>
                <p className='text-pretty text-base font-light text-gray-500'>Influencer Marketing tools that go the distance. And beyond.</p>
            </div>
            <div
                className='flex flex-col sm:flex-row relative mt-8 sm:mt-16 flex w-full gap-14'
                onTouchStart={(e) => {
                    touchStartX.current = e.changedTouches[0].screenX;
                }}
                onTouchMove={(e) => {
                    touchEndX.current = e.changedTouches[0].screenX;
                }}
                onTouchEnd={() => {
                    const xAxisMovement = touchStartX.current - touchEndX.current;
                    if (xAxisMovement > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }}>
                {WhySuperbioList.map((why: WhySuperbioListProps, index) => (
                    <div className={cn('inset-0 transition-transform duration-300 w-full sm:w-1/3')} key={index}>
                        <WhyCard {...why} index={index} parentRef={ref} />
                    </div>
                ))}
            </div>
        </section>
    );
};
