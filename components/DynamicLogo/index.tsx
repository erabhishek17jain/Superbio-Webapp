"use client";

import { YoungunLogo } from "@/assets";
import LoqoaiLogo from '@/public/new-logo.svg';
import Image from "next/image";
import React from "react";

const DynamicLogo = () => {
  const [logo, setLogo] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      setLogo(
        hostname.includes("youngun")
          ? YoungunLogo
          : LoqoaiLogo
      );
    }
  }, []);
  if (!logo) {
    return (
        <div className='flex justify-center '>
            <div aria-hidden='true' className='w-8 h-8 ml-2 rounded-full bg-gray-200 animate-spin border-l-2 border-t-2 border-blue-500' />
        </div>
    );
  }
  return <Image src={logo} alt="Logo" className="h-8" />;
};

export default DynamicLogo;
