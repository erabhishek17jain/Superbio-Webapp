'use client';
import React, { useEffect, useState } from 'react';
import YoungunLogo from '@/public/youngun-logo.svg';
import SocheersLogo from '@/public/socheers-logo.png';
import LoqoaiLogo from '@/public/new-logo.svg';
import Image from 'next/image';

const LogoAI = () => {
    return <Image src={LoqoaiLogo} alt='Logo' className='h-[30px] mix-blend-multiply' />;
};

const Youngun = () => {
    return <Image src={YoungunLogo} alt='Logo' className='h-[30px] mix-blend-multiply' />;
};

const Socheers = () => {
    return (
        <div className='flex flex-col mt-[-6px]'>
            <Image src={SocheersLogo} alt='Logo' className='mix-blend-multiply' />
            <span className='flex items-center h-2 text-[6px] ml-1'>
                <span className='flex w-[82px] text-[#7a7a7a]'>Powered by </span>
                <Image src={LoqoaiLogo} alt='Logo' className='h-[8px]' />
            </span>
        </div>
    );
};

const DynamicLogo = () => {
    const [company, setCompany] = useState('loqo');

    useEffect(() => {
        const hostname = window.location.hostname;
        if (typeof window !== 'undefined') {
            if (hostname.includes('youngun')) setCompany('youngun');
            if (hostname.includes('socheers')) setCompany('socheers');
        }
    }, []);

    return (
        <div className='flex w-20'>
            {company === 'loqo' && <LogoAI />}
            {company === 'youngun' && <Youngun />}
            {company === 'socheers' && <Socheers />}
        </div>
    );
};

export default DynamicLogo;
