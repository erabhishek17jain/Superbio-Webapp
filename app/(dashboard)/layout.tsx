import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import Dashboard from '@/components/shared-components/Dashboard';

export const metadata: Metadata = {
    title: 'LOQO Business',
    description: 'Track & Share influencer campaigns with unmatched precision and ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return <Dashboard subComponent={children} />;
}
