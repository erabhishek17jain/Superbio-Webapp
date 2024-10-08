import whatsappIcon from '@/public/footer/whatsapp.svg';
import googleIcon from '@/public/footer/google.svg';
import { ArrowRightIcon, LinkedinIcon, InstagramIcon, MailIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RightFooter } from './RightFooter';

export const Footer = () => {
    return (
        <footer className='flex flex-col items-center gap-y-12 px-1 py-6 sm:py-16'>
            <div className='flex flex-col w-full flex-wrap justify-center text-neutral-300 gap-3'>
                <div className='flex text-2xl leading-6 sm:leading-[3rem] sm:text-[3rem] w-full'>
                    <span className='flex flex-col justify-center w-full gap-2'>
                        <p className='flex w-full gap-1 justify-center'>Ready to elevate your next</p>
                        <p className='flex w-full gap-1 justify-center'>
                            <span className='font-semibold'>campaign reporting</span>
                        </p>
                    </span>
                </div>
                <div className='flex justify-center text-base font-light w-full my-2'>
                    Our team of campaign experts are ready to guide you every step of the way.
                </div>
                <div className='hidden mt-3 items-center justify-center lg:flex lg:gap-x-8 xl:gap-x-16'>
                    <Link
                        href='https://calendly.com/deepak-jain-loqo'
                        className='flex w-fit items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border drop-shadow-sm transition-colors lg:border-black lg:bg-white lg:text-black lg:hover:border-white lg:hover:bg-black lg:hover:text-white'>
                        Book a demo
                    </Link>
                    <Link
                        href='/register'
                        className='flex w-fit items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border border drop-shadow-sm transition-colors lg:border-white lg:bg-black lg:text-white lg:hover:border-black lg:hover:bg-white lg:hover:text-black'>
                        TRY IT FOR FREE
                        <ArrowRightIcon size={16} />
                    </Link>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full justify-between text-white gap-6 sm:gap-16'>
                <LeftFooter />
                <RightFooter />
            </div>
            <CopyrightComponent />
        </footer>
    );
};

const CopyrightComponent = () => (
    <div className='flex w-full justify-between bg-neutral-700 px-2 py-4 text-center text-xs font-medium tracking-wide text-neutral-300  sm:px-4 md:px-6 lg:px-10'>
        <div className='flex items-center gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20'>
            <Link href='#'>Terms of service</Link>
            <Link href='#'>Privacy Policy</Link>
        </div>
        <div className='flex flex-wrap justify-center gap-x-4 tracking-wide sm:justify-end'>
            <p>Copyrights @2024 LOQO ai.</p>
            <p>All rights reserved</p>
        </div>
    </div>
);

const LeftFooter = () => (
    <div className='flex flex-col items-start gap-y-4 lg:w-1/2'>
        <div className='flex items-center gap-x-2'>
            <h3 className='whitespace-nowrap text-2xl font-semibold text-white'>LOQO ai</h3>
        </div>
        <p className='text-sm font-light leading-7 tracking-wide text-white'>
            Unlock success with LOQO Business where efficient data organization meets advanced AI assistance, empowering creators to thrive.
        </p>
        <div className='my-6 flex gap-x-6'>
            <Link href='mailto:business@loqo.ai' className='rounded border border-white p-3'>
                <MailIcon className='size-5' />
            </Link>
            <Link href='https://business.loqo.ai/' className='rounded border border-white p-3'>
                <Image src={googleIcon} alt='logo' className='size-5' />
            </Link>
            <Link href='https://www.linkedin.com/company/loqo-ai/' className='rounded border border-white p-3'>
                <LinkedinIcon className='size-5' />
            </Link>
            <Link href='https://www.instagram.com/loqo.ai' className='rounded border border-white p-3'>
                <InstagramIcon className='size-5' />
            </Link>
            <Link href='http://api.whatsapp.com/send?phone=917795983243&text=Hello%20LOQO%20ai%20team.' className='rounded border border-white p-3'>
                <Image src={whatsappIcon} alt='logo' className='size-5' />
            </Link>
        </div>
    </div>
);
