import { ContactUs } from '@/components/ContactUs';
import { Navbar } from '@/components/Navbar';
import bgImage from '@/public/background.svg';
import { LoaderIcon } from 'lucide-react';
import { Suspense } from 'react';
import { AllBlogs } from './__components/AllBlogs';

export default function Home() {
    return (
        <main
            id='top-of-page'
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
            className='w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <Navbar />
            <Suspense
                fallback={
                    <div className='flex h-full w-full justify-center'>
                        <LoaderIcon className='animate-spin' />
                    </div>
                }>
                <AllBlogs />
            </Suspense>
            <div className='flex my-6 h-auto sm:h-[100vh] w-full items-center overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24'>
                <ContactUs />
            </div>
        </main>
    );
}
