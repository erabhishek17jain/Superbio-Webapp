import { Footer } from "@/components/Footer";
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
  title: "LOQO ai",
  description: "LOQO ai is a bioinformatics platform for the analysis of biological data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", poppins.variable)}>
        {children}
        <div className="w-full bg-black px-6 sm:px-12 md:px-16 lg:px-24">
          <Footer />
        </div>
      </body>
    </html>
  );
}
