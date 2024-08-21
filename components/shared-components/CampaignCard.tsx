import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import copy from 'copy-to-clipboard';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/context';
import Dropdown from '../global-components/Dropdown';
import ShareCampaignModal from '../modals/ShareCampaignModal';
import DeleteCampaignModal from '../modals/DeleteCampaignModal';
import { ICampaign } from '@/interfaces/campaign';
import { AreaChartIcon, CalendarCheck2Icon, ClipboardPenIcon, CopyCheckIcon, ListPlusIcon, MenuIcon, RefreshCcwIcon, Trash2Icon, WaypointsIcon } from 'lucide-react';

dayjs.extend(relativeTime);

export default function CampaignCard({ campaign, status, setMode, color }: { campaign: ICampaign; status: string; setMode: any; color: string }) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);
    const { enqueueSnackbar } = useSnackbar();
    const [diffInMin, setDiffInMin] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const copyFormLink = (url: string) => {
        let base_url = window.location.origin;
        copy(base_url + url);
        enqueueSnackbar('Creators Form link copied!', { variant: 'success' });
    };

    const navigateToReporting = () => {
        router.push(`/${status}/campaign/${campaign.id}`);
    };

    const openCloseShareModal = () => {
        setShowShareModal(!showShareModal);
    };

    const openCloseDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    useEffect(() => {
        if (campaign.updatedAt) {
            const currentAt = dayjs(new Date()) as any;
            const updatedAt = dayjs(campaign.updatedAt);
            const date = updatedAt.diff(dayjs(currentAt), 'minutes');
            setDiffInMin(date);
        }
    }, [campaign]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setDiffInMin(diffInMin - 1);
        }, 60000);
        return () => clearInterval(timeInterval);
    });
    const campActions = [
        {
            title: 'Share',
            action: openCloseShareModal,
            icon: <WaypointsIcon color={'#8b8b8b'} size={22} />,
        },
        {
            title: 'Delete',
            action: openCloseDeleteModal,
            icon: <Trash2Icon color={'#8b8b8b'} size={22} />,
        },
        {
            title: 'View Report',
            action: navigateToReporting,
            icon: <AreaChartIcon color={'#8b8b8b'} size={22} />,
        },
        {
            title: 'Add/Edit Sheet',
            action: () => router.push(`/${status}/create/${campaign?.id}`),
            icon: <ListPlusIcon color={'#8b8b8b'} size={22} />,
        },
    ];

    if (campaign.source === 'form') {
        campActions.push({
            title: 'Copy Form Link',
            action: () => copyFormLink(`/public/${campaign.id}/form`),
            icon: <CopyCheckIcon color={'#8b8b8b'} size={22} />,
        });
        campActions.push({
            title: diffInMin > -60 ? `Refresh in ${60 + diffInMin} mins` : 'Refresh',
            action: () => {},
            icon: <RefreshCcwIcon color={'#8b8b8b'} size={22} />,
        });
    }
    if (user.role === 'brand') {
        campActions.splice(2, 3);
    }

    return (
        <div className='flex w-full relative'>
            {user.role !== 'brand' && (
                <div className='absolute -right-[14px] -top-[8px] w-8 h-8 cursor-pointer' onClick={() => setMode(campaign)}>
                    <ClipboardPenIcon color={'#000'} size={26} />
                </div>
            )}
            <div className={`flex flex-col w-full h-full bg-[${color}] border-2 border-[#dae4ff] rounded-xl py-4 px-4`}>
                <div onClick={navigateToReporting} className='cursor-pointer flex w-full justify-between items-center text-ellipsis'>
                    <span className='text-base font-bold'>{campaign.title}</span>
                    <span className='bg-[#FFDADA] text-[#D00303] text-sm px-3 py-1 rounded-2xl'>
                        {campaign.priority === 0 && 'Low'}
                        {campaign.priority === 1 && 'Medium'}
                        {campaign.priority === 2 && 'High'}
                    </span>
                </div>
                <div onClick={navigateToReporting} className='cursor-pointer flex justify-between mt-1'>
                    <div>
                        <span className='text-[#8b8b8b] text-[13px]'>Brand: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>{campaign.brand}</span>
                    </div>
                    <div>
                        <span className='text-[#8b8b8b] text-[13px]'>Created At: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>{dayjs(campaign.startDate).format('DD MMM YYYY')}</span>
                    </div>
                </div>
                <div onClick={navigateToReporting} className='cursor-pointer text-xs text-[#b8b8b8] mt-2 h-16'>
                    {campaign.description.length > 150 ? campaign.description.slice(0, 150) + '...' : campaign.description}
                </div>
                <div
                    className='cursor-pointer flex w-full justify-between items-center text-ellipsis mb-2'
                    onClick={() => {
                        campaign?.sharedUsers?.length && campaign?.sharedUsers?.length > 0 ? '' : navigateToReporting();
                    }}>
                    <div
                        className='flex h-8'
                        onClick={() => {
                            campaign?.sharedUsers?.length && campaign?.sharedUsers?.length > 0 ? openCloseShareModal() : navigateToReporting();
                        }}>
                        {campaign?.sharedUsers?.map(
                            (item: any, index: any) =>
                                index < 3 && (
                                    <div
                                        key={'some' + index}
                                        style={{ left: -index * 14 }}
                                        className='relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full'>
                                        <span className='font-medium text-gray-600 md:text-md lg:text-lg'>
                                            {item?.profilePic ? (
                                                <Image src={item.profilePic} alt='' width={40} height={40} />
                                            ) : (
                                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-300'>
                                                    <span className='text-gray-500 text-xs font-medium'>
                                                        {item.name.split(' ')[0][0]}
                                                        {item.name.split(' ').length > 1 && item.name.split(' ')[1][0]}
                                                    </span>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                )
                        )}
                        {campaign?.sharedUsers && campaign?.sharedUsers?.length > 3 && (
                            <div
                                key={'some' + 3}
                                style={{ left: -3 * 14, backgroundColor: '#000' }}
                                className='relative inline-flex items-center justify-center w-8 h-8 text-white overflow-hidden rounded-full cursor-pointer'>
                                +{campaign?.sharedUsers?.length - 3}
                            </div>
                        )}
                    </div>
                    <span className='bg-[#FFDADA] text-[#D00303] text-sm px-3 py-1 rounded-2xl'>{campaign.groups} Posts</span>
                </div>
                <div onClick={navigateToReporting} className='cursor-pointer flex flex-wrap gap-1'>
                    {campaign.keywords.map((text, index) => (
                        <div className='flex px-3 bg-[#DAE4FF] text-[#033DD0] py-1 rounded-full' key={'keyword' + index}>
                            <span className='text-xs'>{text}</span>
                        </div>
                    ))}
                </div>
                <div onClick={navigateToReporting} className='cursor-pointer flex justify-between mt-2'>
                    <span>
                        <span className='text-[#8b8b8b] text-[13px]'>Source: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>
                            {campaign.source === 'sheet' && 'Google Sheet'}
                            {campaign.source === 'form' && 'Custom Form'}
                            {campaign.source === 'csv' && 'CSV File'}
                        </span>
                    </span>
                    <span>
                        <span className='text-[#8b8b8b] text-[13px]'>Created By: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>
                            {campaign?.user?.email === user?.email ? 'You' : campaign?.user?.name}
                        </span>
                    </span>
                </div>
                <div className='flex mt-1 fill-[#b8b8b8] items-center justify-between text-[#8b8b8b] text-sm h-7'>
                    <div onClick={navigateToReporting} className='cursor-pointer flex items-center gap-2'>
                        <CalendarCheck2Icon size={20} color='#b8b8b8' />
                        From {dayjs(campaign.startDate).format('DD MMM YYYY')} {campaign.endDate && `- ${dayjs(campaign.endDate).format('DD MMM YYYY')}`}
                    </div>
                    <Dropdown item={campaign} position='left' width={'w-44'} options={campActions} header={<MenuIcon color={'#8b8b8b'} size={24} />} />
                </div>
            </div>
            {showShareModal && <ShareCampaignModal campaign={campaign} openCloseModal={openCloseShareModal} />}
            {showDeleteModal && <DeleteCampaignModal campaign={campaign} openCloseModal={openCloseDeleteModal} />}
        </div>
    );
}
