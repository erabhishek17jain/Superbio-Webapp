import { CallIcon } from "@/icons/CallIcon";
import { LocationIcon } from "@/icons/LocationIcon";
import { MailIcon } from "@/icons/MailIcon";
import Link from "next/link";

export const ContactInfo = () => {
  return (
      <div className='flex flex-col gap-7'>
          <Link
              href='mailto:loqoai@gmail.com'
              className='flex h-[50px] w-full items-center gap-2 rounded-xl bg-black px-6 py-3 shadow-md shadow-[#CDCDCD] sm:w-[420px] lg:w-[500px]'>
              <span className='fill-primary text-base xs:text-lg'>
                  <MailIcon color='#fff' size='28' />
              </span>
              <span className='text-sm text-white xs:text-base'>Contact us via mail id: hello@loqo.ai</span>
          </Link>
          <a
              href='tel:+917795983243'
              className='flex h-[50px] w-full items-center gap-2 rounded-xl border-2 border-solid border-black px-6 py-2 shadow-md shadow-[#CDCDCD] sm:w-[420px] lg:w-[500px]'>
              <span className='fill-primary text-base xs:text-lg'>
                  <CallIcon color='#000' size='28' />
              </span>
              <span className='text-sm text-primary xs:text-base'>Contact us via call : +91 7795 983 243</span>
          </a>
          <button className='flex h-[50px] w-full items-center gap-2 rounded-xl border-2 border-solid border-black px-6 py-2 shadow-md shadow-[#CDCDCD] sm:w-[420px] lg:w-[500px]'>
              <span className='fill-primary text-base xs:text-lg'>
                  <LocationIcon color='#000' size='28' />
              </span>
              <span className='text-sm text-primary xs:text-base'>Our location : Noida, UP - 201301</span>
          </button>
      </div>
  );
};
