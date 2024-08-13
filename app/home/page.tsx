import { CampaignTracker } from '@/components/website/CampaignTracker';
import { ContactUs } from '@/components/website/ContactUs';
import { EverythingLOQO } from '@/components/website/EverythingLOQO';
import { HeroSection } from '@/components/website/HeroSection';
import { LOQOAdvantages } from '@/components/website/LOQOAdvantages';
import { Navbar } from '@/components/website/Navbar';
import { WhySuperbioNew } from '@/components/website/WhySuperbioNew';
import bgImage from '@/public/background.svg';

export default function Home() {
    return (
        <main
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
            className='w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <Navbar />
            <div className='w-full overflow-hidden px-4 sm:px-6 sm:px-12 md:px-16 lg:px-24 mt-12 sm:mt-[6.5rem]'>
                <HeroSection />
            </div>
            <div className='w-full px-6 sm:px-12 md:px-16 lg:px-24'>
                <WhySuperbioNew />
                <CampaignTracker />
                <EverythingLOQO />
                <LOQOAdvantages />
            </div>
            <ContactUs />
        </main>
    );
}
