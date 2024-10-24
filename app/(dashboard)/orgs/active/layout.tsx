'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/context';
import { setLoading, setMeta } from '@/context/campaign';
import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';
import { getCampaigns } from '@/context/campaign/network';
import Link from 'next/link';
import DynamicLogo from '@/components/global-components/DynamicLogo';
import { CampaignStatus } from '@/services/campaign.service';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, SearchCheckIcon, XIcon } from 'lucide-react';

export default function RootLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const paths = usePathname();
    const [pathUrls] = useState(paths.split('/').filter((item: string) => !(item === '' || item === 'orgs' || item === 'active')));
    const { enqueueSnackbar } = useSnackbar();
    const { allCampaign, loading } = useAppSelector((state) => state.campaign);
    const searchParam: any = useSearchParams();
    const isPublic = searchParam.get('isPublic') === 'true';

    const copyShareLink = () => {
        const url2 = new URL(window.location.href).href;
        copy(url2);
        enqueueSnackbar('Campaign Report link copied!', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
    };

    const isCreateReport = paths.indexOf('create') > -1 || paths.indexOf('report') > -1;

    useEffect(() => {
        if (isCreateReport) {
            dispatch(setLoading(false));
        }
    }, []);

    return (
        <main className='flex w-full overflow-hidden bg-contain bg-fixed bg-repeat'>
            <div className='flex flex-col w-full h-screen overflow-auto'>
                {!isPublic && (
                    <div
                        className={`fixed z-10 bg-white flex w-full sm:w-[calc(100%_-_72px)] items-center justify-between pl-4 sm:pl-8 pr-4 pt-3 pb-3 sm:pb-[14px] border-[#cdcdcd] border-b h-16 z-10`}>
                        <div className='flex flex-col w-8 items-center h-[48px]'>
                            <Link href={'/home'} className='w-20 absolute left-6 sm:-left-10 top-[17px]'>
                                <DynamicLogo />
                            </Link>
                        </div>
                        <div className='flex flex-col lg:ml-0 w-full justify-center h-12'>
                            <div className='flex justify-end sm:justify-between items-center'>
                                <div className='hidden sm:flex gap-2'>
                                    <div className='flex'>
                                        <div
                                            onClick={() => {
                                                router.push('/orgs/dashboard');
                                            }}
                                            className='hidden sm:flex text-[#8b8b8b] cursor-pointer items-center space-x-3 mt-[2px]'>
                                            <span>Home</span>
                                            <ChevronRightIcon color='#8b8b8b' size={22} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                dispatch(setLoading(true));
                                                router.push('/orgs/dashboard');
                                            }}
                                            className='hidden sm:flex text-[#8b8b8b] cursor-pointer items-center space-x-3 mt-[2px]'>
                                            <span className='ml-3 capitalize'>Agency Managed Influencer</span>
                                            <ChevronRightIcon color='#8b8b8b' size={22} />
                                        </div>
                                        {isCreateReport &&
                                            pathUrls.slice(0, -2).map((component, index) => {
                                                const active = index !== pathUrls.length - 1;
                                                return (
                                                    <div
                                                        key={component}
                                                        onClick={() => {
                                                            if (active) {
                                                                router.push('/orgs/' + component);
                                                            }
                                                        }}
                                                        className={`hidden sm:flex ${active ? 'text-[#8b8b8b] cursor-pointer' : 'text-black font-[500] text-[21px]'} items-center space-x-3 ml-3 mt-[2px]`}>
                                                        <span className={`capitalize`}>{component}</span>
                                                        {active && <ChevronRightIcon color='#8b8b8b' size={22} />}
                                                    </div>
                                                );
                                            })}
                                        {isCreateReport && (
                                            <div className={`hidden sm:flex text-black items-center space-x-3 ml-3 mt-[2px]`}>
                                                <span className='capitalize font-[500] text-[21px]'>Your Profile</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-center items-center ml-16 sm:ml-0'>
                                    {paths.indexOf('report') > -1 && (
                                        <div className='flex gap-4'>
                                            <button onClick={() => router.back()} className='flex sm:hidden items-center h-10 text-black text-sm'>
                                                <ChevronLeftIcon color='#000' size={16} />
                                                Back
                                            </button>
                                            <button
                                                onClick={() => copyShareLink()}
                                                className='bg-black flex gap-2 items-center py-2 rounded-lg px-4 h-10 text-white text-sm'>
                                                <CopyIcon color='#ffffff' size={16} />
                                                <span className='hidden sm:flex'>Copy Public Dashboard Link</span>
                                                <span className='sm:hidden flex'>Copy Public Link</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='flex flex-col w-full h-full lg:overflow-y-auto md:overflow-y-auto relative'>
                    {isCreateReport && isPublic && (
                        <div className='bg-white border-b border-[#cdcdcd] flex w-full items-center justify-between px-6 py-2 text-black sm:px-6'>
                            <div className='flex gap-x-8 w-20'>
                                <DynamicLogo />
                            </div>
                            <Link target='_blank' href='/home'>
                                <div className='flex w-full justify-end font-semibold text-base text-[#002554]'>LOQO Campaign Tracker</div>
                            </Link>
                        </div>
                    )}
                    {loading ? <LoadingBlack /> : children}
                </div>
            </div>
        </main>
    );
}
