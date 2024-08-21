import { useAppDispatch, useAppSelector } from '@/context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { setCampaignType } from '@/context/user';
import { logout } from '@/lib/utils';
import { LayoutPanelLeftIcon, LogOutIcon, LogsIcon, UserCogIcon, UsersIcon } from 'lucide-react';
import ContactIcon from '../../icons/ContactIcon';

export default function SideBar() {
    const router = useRouter();
    const path = usePathname();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    return (
        <div className='flex flex-col items-center w-16 border-r border-t px-2 py-6 w-16 border-[#cdcdcd] h-screen'>
            <div className='flex h-full'>
                <div className='flex flex-col space-y-6'>
                    <Link href='/' key='home' className='flex items-center space-x-3'>
                        <LayoutPanelLeftIcon color={path === '/' ? '#000000' : '#8b8b8b'} size={32} />
                    </Link>
                    <Link href='/queue' key='queue' className='flex items-center space-x-3'>
                        <LogsIcon size={32} color={path === '/queue' ? '#000000' : '#8b8b8b'} />
                    </Link>
                    {user.role === 'admin' && (
                        <Link href='/users' key='users' className='flex items-center space-x-3'>
                            <UsersIcon size={32} color={path === '/users' ? '#000000' : '#8b8b8b'} />
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex items-center flex-col space-y-6 mb-[80px]'>
                <Link href={'/profile'} key={'profile'} className='flex items-center space-x-3'>
                    <UserCogIcon size={32} color={path === '/profile' ? '#000000' : '#8b8b8b'} />
                </Link>
                <Link href={'/contacts'} key={'contacts'} className='flex items-center space-x-3'>
                    <ContactIcon size={32} color={path === '/contacts' ? '#000000' : '#8b8b8b'} />
                </Link>
                <span
                    onClick={() => {
                        dispatch(setCampaignType(''));
                        logout();
                        router.push('/login');
                    }}
                    className='text-[#8b8b8b] group-hover:text-black text-xs'>
                    <LogOutIcon size={32} color={path === '/contacts' ? '#000000' : '#8b8b8b'} />
                </span>
            </div>
        </div>
    );
}
