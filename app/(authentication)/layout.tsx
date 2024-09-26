import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import Authentication from '@/components/shared-components/Authentication';

export const metadata: Metadata = {
    title: 'LOQO Business',
    description: 'Track & Share influencer campaigns with unmatched precision and ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main className='flex w-full h-screen overflow-hidden bg-contain bg-fixed bg-repeat'>
            <Authentication subComponent={children} />
        </main>
    );
}
