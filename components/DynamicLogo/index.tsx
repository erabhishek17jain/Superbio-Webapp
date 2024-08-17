'use client';
import React, { useEffect, useState } from 'react';
import YoungunLogo from '@/public/logo/youngun-logo.svg';
import SocheersLogo from '@/public/logo/socheers-logo.png';
import LoqoaiLogo from '@/public/logo/logo-black.svg';
import Image from 'next/image';

const LogoAI = ({ login = false }: any) => {
    return login ? (
        <Image src={LoqoaiLogo} alt='Logo' className='h-[40px] w-[160px] mix-blend-multiply' />
    ) : (
        <Image src={LoqoaiLogo} alt='Logo' className='h-[30px] mix-blend-multiply' />
    );
};

const Youngun = ({ login = false }: any) => {
    return login ? (
        <Image src={YoungunLogo} alt='Logo' className='h-[70px] mix-blend-multiply' />
    ) : (
        <Image src={YoungunLogo} alt='Logo' className='h-[30px] mix-blend-multiply' />
    );
};

const Socheers = ({ login = false }: any) => {
    return login ? (
        <div className='flex flex-col mt-[-16px] w-[190px]'>
            <Image src={SocheersLogo} alt='Logo' className='h-[80px] mix-blend-multiply' />
            <span className='flex items-center h-3 -mt-4 text-[12px] ml-2'>
                <span className='flex w-[90px] text-[#7a7a7a]'>Powered by </span>
                <Image src={LoqoaiLogo} alt='Logo' className='-ml-[2.25rem] h-[16px]' />
            </span>
        </div>
    ) : (
        <div className='flex flex-col mt-[-6px]'>
            <Image src={SocheersLogo} alt='Logo' className='h-[38px] mix-blend-multiply' />
            <span className='flex items-center h-2 text-[6px] ml-1'>
                <span className='flex w-[82px] text-[#7a7a7a]'>Powered by </span>
                <Image src={LoqoaiLogo} alt='Logo' className='h-[8px]' />
            </span>
        </div>
    );
};

const DynamicLogo = ({ login = false }: any) => {
    const [company, setCompany] = useState('loqo');

    React.useEffect(() => {
        const hostname = window.location.hostname;
        if (typeof window !== 'undefined') {
            if (hostname.includes('youngun')) setCompany('youngun');
            if (hostname.includes('socheers')) setCompany('socheers');
        }
    }, []);

    return (
        <div className='flex'>
            {company === 'loqo' && <LogoAI login={login} />}
            {company === 'youngun' && <Youngun login={login} />}
            {company === 'socheers' && <Socheers login={login} />}
        </div>
    );
};

export default DynamicLogo;
