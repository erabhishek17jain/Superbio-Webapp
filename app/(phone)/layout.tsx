import { ReactNode } from 'react';
import type { Metadata } from 'next';
import VerifyPhone from '@/components/shared-components/posts/VerifyPhone';

export const metadata: Metadata = {
    title: 'LOQO Business',
    description: 'Track & Share influencer campaigns with unmatched precision and ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return <VerifyPhone children={children} />;
}
