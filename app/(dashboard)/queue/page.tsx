'use client';
import DynamicLogo from '@/components/DynamicLogo';
import { logout } from '@/lib/utils';
import SheetNetworkService from '@/services/sheet.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

export default function Queue() {
    const router = useRouter();
    const [queues, setQueues] = React.useState<IQueue[]>([]);

    React.useEffect(() => {
        SheetNetworkService.instance
            .getQueueData()
            .then((res) => {
                setQueues(res);
            })
            .catch((err) => {
                logout();
                enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
            });
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            SheetNetworkService.instance
                .getQueueData()
                .then((res) => {
                    setQueues(res);
                })
                .catch((err) => {
                    logout();
                    enqueueSnackbar('You are not authorized to view this page', { variant: 'error' });
                });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex w-full items-center justify-start pl-8 pr-4 py-3 border-b h-[74px] shadow-[rgba(0,0,15,0.5)_2px_2px_4px_0px] shadow-[#CDCDCD]'>
                <div className='flex flex-col w-10 items-center'>
                    <Link href={'/home'} className='w-20 absolute left-6 top-[22px]'>
                        <DynamicLogo />
                    </Link>
                </div>
                <span className='text-2xl font-semibold ml-12 sm:0 lg:ml-0 xl:ml-0'>Live Reports</span>
            </div>
            <div className='flex w-full items-center px-4 py-4 sm:px-8 sm:py-6'>
                <div className='relative overflow-x-auto w-full border rounded-xl'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                            <tr>
                                <th scope='col' className='px-6 py-3 '>
                                    Campaign Name
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Sheets
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Status
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Created By
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {queues?.length > 0 ? (
                                queues.map((queue: any) => (
                                    <tr key={queue._id.$oid.toString()} className='odd:bg-white even:bg-gray-50 border-b cursor-pointer hover:bg-gray-100'>
                                        <th
                                            scope='row'
                                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                                            onClick={() => router.push(`/active-campaign/campaign-reporting/${queue.campaignId.$oid.toString()}`)}>
                                            {queue?.campaign?.title}
                                        </th>
                                        <td className='px-6 py-4 capitalize'>{queue?.sheets[0]?.name}</td>
                                        <td className='px-6 py-4 capitalize'>{queue?.status ? queue?.status : 'Pending'}</td>
                                        <td className='px-6 py-4'>{queue?.user?.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        <p className='my-4 text-center'>Currently, no reports are in progress.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
