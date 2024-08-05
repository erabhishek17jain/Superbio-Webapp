import { BeforeAfterProduct } from "@/components/BeforeAfterProduct";
import { BlogsHydration } from "@/components/BlogsHydration";
import { ContactUs } from "@/components/ContactUs";
import { CustomerFeedback } from "@/components/CustomerFeedback";
import { FlagshipProductHero } from "@/components/FlagshipProductHero";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProductOverviewSlide } from "@/components/ProductOverviewSlide";
import { WhySuperbioNew } from "@/components/WhySuperbioNew";
import bgImage from "@/public/background.svg";

export default function Home() {
  return (
    <main 
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className="w-full overflow-hidden bg-contain bg-fixed bg-repeat"
    >
      <Navbar />
      <div className="w-full overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24">
        <HeroSection />
      </div>
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <WhySuperbioNew />
        <FlagshipProductHero />
      </div>
      <ProductOverviewSlide />
      <BeforeAfterProduct />
      <CustomerFeedback />
      <BlogsHydration />
     
        <ContactUs />
     
    </main>
  );
}
