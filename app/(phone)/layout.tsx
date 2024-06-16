import DynamicLogo from "@/components/DynamicLogo";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className='flex w-full h-screen '>
          <div className='flex flex-1 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url("/images/login.png")` }}></div>
          <div className='flex flex-1'>
              <div className='flex w-full h-full justify-center items-center'>
                  <div className='flex sm:w-[80%] w-[90%] flex-col'>
                      <div className='flex items-center space-x-3'>
                          <DynamicLogo />
                          <Link href={'/'}>
                              <span className=' uppercase text-xl font-bold'> Business</span>
                          </Link>
                      </div>
                      <div className='flex text-4xl font-bold mt-4'>Get Started With Loqo ai</div>

                      <div className='flex flex-col mt-6'>{children}</div>
                  </div>
              </div>
          </div>
      </div>
  );
}
