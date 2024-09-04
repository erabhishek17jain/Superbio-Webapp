'use client';
import { store } from '@/context';
import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider as ApplicationProvider } from '@/context/applicationContext';
import { LoaderIcon } from 'lucide-react';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <script async src='https://platform.twitter.com/widgets.js' charSet='utf-8'></script>
            <Provider store={store}>
                <ApplicationProvider>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                        <body suppressHydrationWarning className={inter.className}>
                            <Suspense
                                fallback={
                                    <div className='flex h-full w-full justify-center'>
                                        <LoaderIcon className='animate-spin' />
                                    </div>
                                }>
                                <SnackbarProvider
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}>
                                    {children}
                                </SnackbarProvider>
                            </Suspense>
                        </body>
                    </GoogleOAuthProvider>
                </ApplicationProvider>
            </Provider>
        </html>
    );
}
