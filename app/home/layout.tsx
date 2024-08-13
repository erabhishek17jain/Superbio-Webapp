import { Footer } from "@/components/website/Footer";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '../globals.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "auto",
  variable: "--font-sans",
});

export const metadata: Metadata = {
    title: 'LOQO Business',
    description: 'Track & Share influencer campaigns with unmatched precision and ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>    {children}
        <div className="w-full bg-black px-6 sm:px-12 md:px-16 lg:px-24">
          <Footer />
        </div>
      </>
  );
}
