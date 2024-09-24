'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setCampaignType } from '@/context/user';
import Link from 'next/link';
import React, { useState } from 'react';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import HomePage from '@/components/shared-components/HomePage';
import ProfileHomePage from '@/components/shared-components/profiles/ProfileHomePage';
import PostHomePage from '@/components/shared-components/posts/PostHomePage';

export default function Home() {
    
    return (
        <div className='flex flex-col w-full overflow-auto' style={{ height: '100vh' }}>
            <HomePage />
        </div>
    );
}
