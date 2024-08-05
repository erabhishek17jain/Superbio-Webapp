import { ContactUs } from '@/components/ContactUs';
import { EverythingLOQO } from '@/components/EverythingLOQO';
import { HeroSection } from '@/components/HeroSection';
import { LOQOAdvantages } from '@/components/LOQOAdvantages';
import { Navbar } from '@/components/Navbar';
import { WhySuperbioNew } from '@/components/WhySuperbioNew';
import bgImage from '@/public/background.svg';

export default function Home() {
    return (
        <main
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
            className='w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <Navbar />
            <div className='w-full overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24'>
                <HeroSection />
            </div>
            <div className='w-full px-6 sm:px-12 md:px-16 lg:px-24'>
                <WhySuperbioNew />
                <EverythingLOQO />
                <LOQOAdvantages />
            </div>
            {/* <ProductOverviewSlide /> */}
            {/* <BeforeAfterProduct /> */}
            {/* <CustomerFeedback /> */}
            {/* <BlogsHydration /> */}
            <ContactUs />
        </main>
    );
}
