'use client';
import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavbarItemList } from '@/constants';
import { cn, scrollToElementById } from '@/lib/utils';
import logo from '@/public/new-logo.svg';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BsArrowRight } from 'react-icons/bs';

export const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (id: string) => {
        if (pathname === '/blogs') {
            if (id === 'blogs') return;
            router.push('../#' + id);
        } else if (pathname.includes('blogs') && pathname.length > 6) {
            if (id === 'blogs') router.push('../blogs');
            else router.push('../../#' + id);
        } else {
            if (id === 'blogs') {
                router.push('/home/blogs');
            } else {
                scrollToElementById(id);
            }
        }
    };
    return (
        <nav
            className='flex w-full items-center justify-between bg-transparent px-6 py-8 text-black sm:px-12 md:px-8 lg:px-24 xl:px-24'
            role='navigation'
            id='navbar'>
            <div className='flex gap-x-8 w-24'>
                <Link href='/home' className='mr-auto w-20'>
                    <Image src={logo} alt='logo' className='w-20' />
                </Link>
            </div>
            <div className='hidden items-center justify-between lg:flex lg:gap-x-8 w-[calc(100%_-_96px)]'>
                <div className='flex gap-x-8'>
                    {NavbarItemList.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(item.id)}
                            className='flex items-center gap-x-2 whitespace-nowrap text-sm font-semibold text-black hover:text-gray-500'>
                            <ArrowRightIcon size={16} />
                            {item.name}
                        </button>
                    ))}
                </div>
                <div className='flex gap-x-8'>
                    <Link href='/login' className='flex capitalize items-center text-sm font-semibold text-black hover:text-gray-500 p-2 px-4'>
                        Log In <BsArrowRight className='ml-2' size={20} />
                    </Link>
                    <Link
                        href='mailto:loqoai@gmail.com'
                        className='flex w-fit items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border drop-shadow-sm transition-colors lg:border-black lg:bg-white lg:text-black lg:hover:bg-black lg:hover:text-white'>
                        Book a demo
                    </Link>
                    <Link
                        href='/register'
                        className='flex w-fit items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border drop-shadow-sm transition-colors lg:border-black lg:bg-black lg:text-white lg:hover:bg-white lg:hover:text-black'>
                        TRY IT FREE
                        <ArrowRightIcon size={16} />
                    </Link>
                </div>
            </div>
            <div className='mb-auto flex lg:hidden'>
                <MobileView />
            </div>
        </nav>
    );
};

const MobileView = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (id: string) => {
        if (pathname === '/home/blogs') {
            if (id === 'blogs') return;
            router.push('../#' + id);
        } else if (pathname.includes('blogs') && pathname.length > 11) {
            if (id === 'blogs') router.push('../home/blogs');
            else router.push('../../#' + id);
        } else {
            if (id === 'blogs') {
                router.push('/home/blogs');
                return;
            } else {
                setTimeout(() => {
                    scrollToElementById(id);
                }, 300);
            }
        }
    };

    const handleChange = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <DropdownMenu open={isMenuOpen} onOpenChange={handleChange}>
            <DropdownMenuTrigger>
                <MenuIcon size={24} className={cn('absolute right-6 opacity-100 transition-opacity duration-300 sm:right-8', isMenuOpen && 'opacity-0')} />
                <XIcon size={24} className={cn('absolute right-6 opacity-0 transition-opacity duration-300 sm:right-8', isMenuOpen && 'opacity-100')} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40 main-card-v2 absolute right-2 top-10 block overflow-hidden rounded-sm p-0 backdrop-blur lg:hidden'>
                {NavbarItemList.map((item) => (
                    <DropdownMenuItem
                        key={item.id}
                        className='bg-white text-[#121212] transition-all duration-100 hover:invert'
                        onClick={() => handleClick(item.id)}>
                        <button className='flex w-full items-center gap-x-2 whitespace-nowrap rounded-none p-2 py-[0.75] text-sm font-medium'>
                            <ArrowRightIcon size={16} />
                            {item.name}
                        </button>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem className='bg-white text-[#121212] transition-all duration-100 hover:invert' onClick={() => router.push('/login')}>
                    <button className='flex w-full items-center gap-x-2 whitespace-nowrap rounded-none p-2 py-[0.75] text-sm font-medium'>
                        <ArrowRightIcon size={16} />
                        Log In
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className='bg-white text-[#121212] transition-all duration-100 hover:invert' onClick={() => router.push('/login')}>
                    <button className='flex w-full items-center gap-x-2 whitespace-nowrap rounded-none p-2 py-[0.75] text-sm font-medium'>
                        <ArrowRightIcon size={16} />
                        TRY IT FREE
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem id='calendly-root' className='m-0 bg-white p-0 text-[#121212] transition-all duration-100 hover:invert'>
                    <Link
                        className='flex w-40 items-center gap-x-2 border px-6 py-3 text-sm font-semibold uppercase shadow-xl shadow-border drop-shadow-sm transition-colors lg:border-black lg:bg-black lg:text-white lg:hover:bg-white lg:hover:text-black'
                        href='mailto:loqoai@gmail.com'>
                        BOOK A DEMO
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
