import Link from 'next/link';
import { sidebarItems } from './SideBar';
import { useAppDispatch, useAppSelector } from '@/context';
import { usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { setCampaignType } from '@/context/user';

export default function BottomBar() {
    const path = usePathname();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    return (
        <ul className='fixed bottom-0 left-0 flex h-fit min-h-[8%] w-full items-center sm:items-end justify-around border-t border-sky-600/15 bg-white sm:hidden z-50'>
            {sidebarItems.map((item) =>
                item?.name === 'Users' ? (
                    user.role === 'admin' && (
                        <Link href={item.link} key={item.name} className='flex items-center space-x-3'>
                            <item.icon isActive={path === item.link} />
                        </Link>
                    )
                ) : (
                    <Link href={item.link} key={item.name} className='flex items-center space-x-3'>
                        <item.icon isActive={path === item.link} />
                    </Link>
                )
            )}
            <Link href={'/profile'} key={'profile'} className='flex items-center space-x-3'>
                <svg fill={path === '/profile' ? '#000000' : '#8b8b8b'} width='32px' height='32px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                        <circle cx='12' cy='6' r='4' fill={path === '/profile' ? '#000000' : '#8b8b8b'}></circle>{' '}
                        <ellipse cx='12' cy='17' rx='7' ry='4' fill={path === '/profile' ? '#000000' : '#8b8b8b'}></ellipse>
                    </g>
                </svg>
            </Link>
            <Link href={'/contacts'} key={'contacts'} className='flex items-center space-x-3'>
                <svg
                    id='svg'
                    fill={path === '/contacts' ? '#000000' : '#8b8b8b'}
                    width='32px'
                    height='32px'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM7.67 5.5C7.67 5.09 8.01 4.75 8.42 4.75C8.83 4.75 9.17 5.09 9.17 5.5V9.4C9.17 9.81 8.83 10.15 8.42 10.15C8.01 10.15 7.67 9.81 7.67 9.4V5.5ZM9.52282 16.4313C9.31938 16.5216 9.17 16.7132 9.17 16.9358V18.5C9.17 18.91 8.83 19.25 8.42 19.25C8.01 19.25 7.67 18.91 7.67 18.5V16.9358C7.67 16.7132 7.5206 16.5216 7.31723 16.4311C6.36275 16.0064 5.7 15.058 5.7 13.95C5.7 12.45 6.92 11.22 8.42 11.22C9.92 11.22 11.15 12.44 11.15 13.95C11.15 15.0582 10.4791 16.0066 9.52282 16.4313ZM16.33 18.5C16.33 18.91 15.99 19.25 15.58 19.25C15.17 19.25 14.83 18.91 14.83 18.5V14.6C14.83 14.19 15.17 13.85 15.58 13.85C15.99 13.85 16.33 14.19 16.33 14.6V18.5ZM15.58 12.77C14.08 12.77 12.85 11.55 12.85 10.04C12.85 8.93185 13.5209 7.98342 14.4772 7.55873C14.6806 7.46839 14.83 7.27681 14.83 7.05421V5.5C14.83 5.09 15.17 4.75 15.58 4.75C15.99 4.75 16.33 5.09 16.33 5.5V7.06421C16.33 7.28681 16.4794 7.47835 16.6828 7.56885C17.6372 7.9936 18.3 8.94195 18.3 10.05C18.3 11.55 17.08 12.77 15.58 12.77Z'
                        fill={path === '/contacts' ? '#000000' : '#8b8b8b'}></path>
                </svg>
            </Link>
            <span
                onClick={() => {
                    deleteCookie('token');
                    deleteCookie('user');
                    window.location.reload();
                    dispatch(setCampaignType(''));
                }}
                className='text-[#8b8b8b] group-hover:text-black text-xs'>
                <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='mr-2' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        className='fill-[#8b8b8b] group-hover:fill-black'
                        d='M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z'
                    />
                    <path
                        d='M4.55994 11.2538L6.62994 9.18375C6.77994 9.03375 6.84994 8.84375 6.84994 8.65375C6.84994 8.46375 6.77994 8.26375 6.62994 8.12375C6.33994 7.83375 5.85994 7.83375 5.56994 8.12375L2.21994 11.4738C1.92994 11.7638 1.92994 12.2438 2.21994 12.5338L5.56994 15.8838C5.85994 16.1738 6.33994 16.1738 6.62994 15.8838C6.91994 15.5938 6.91994 15.1137 6.62994 14.8238L4.55994 12.7538H8.99994V11.2538H4.55994Z'
                        className='fill-[#8b8b8b] group-hover:fill-black'
                    />
                </svg>
            </span>
        </ul>
    );
}
