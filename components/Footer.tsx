import logo from "@/public/logo.svg";
import whatsappIcon from "@/public/whatsapp.svg";
import { AtSignIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RightFooter } from "./RightFooter";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-y-24 px-1 py-20">
      <div className="flex w-full flex-wrap justify-between text-neutral-300">
        <LeftFooter />
        <RightFooter />
      </div>
      <CopyrightComponent />
    </footer>
  );
};

/*************Footer Components**************/
const CopyrightComponent = () => (
  <div className="flex w-full justify-between bg-neutral-700 px-2 py-4 text-center text-xs font-medium tracking-wide text-neutral-300  sm:px-4 md:px-6 lg:px-10">
    <div className="flex items-center gap-x-2 sm:gap-x-5 md:gap-x-10 lg:gap-x-20">
      <Link href="#">Terms of service</Link>
      <Link href="#">Privacy Policy</Link>
    </div>
    <div className="flex flex-wrap justify-center gap-x-4 tracking-wide sm:justify-end">
      <p>Copyrights @2024 LOQO ai.</p>
      <p>All rights reserved</p>
    </div>
  </div>
);

const LeftFooter = () => (
  <div className="flex flex-col items-start gap-y-4 pb-10 lg:w-1/2">
    <div className="flex items-center gap-x-2">
      <Image src={logo} alt="logo" className="h-8 w-8 invert" />
      <h3 className="whitespace-nowrap text-xl font-semibold text-neutral-200">LOQO ai</h3>
    </div>
    <p className="text-sm font-medium leading-7 tracking-wide text-neutral-400">
      Unlock success with Superbio: where efficient data organization meets advanced AI assistance,
      empowering creators to thrive.
    </p>
    <div className="my-6 flex gap-x-6">
      <Link href="#" className="rounded border border-neutral-300 bg-white p-3">
        <Image src={logo} alt="logo" className="size-5 scale-125" />
      </Link>
      <button className="rounded border border-neutral-300 p-3">
        <AtSignIcon className="size-5" />
      </button>
      <Link
        href={"http://api.whatsapp.com/send?phone=917795983243&text=Hello%20LOQO%20ai%20team."}
        className="rounded border border-neutral-300 p-3"
      >
        <Image src={whatsappIcon} alt="logo" className="size-5" />
      </Link>
    </div>
  </div>
);

/*****************END******************/
