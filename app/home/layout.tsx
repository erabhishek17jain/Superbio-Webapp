import { Footer } from '@/components/website/Footer';
import type { Metadata } from 'next';
import '../globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'LOQO Business',
    description: 'Track & Share influencer campaigns with unmatched precision and ease.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            {children}
            <div className='w-full bg-black px-6 sm:px-12 md:px-16 lg:px-24'>
                <Footer />
            </div>
        </>
    );
}
