import { ICampaign } from '@/context/campaign';
import React, { useEffect, useState } from 'react';
import { BsCalendar3 } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import copy from 'copy-to-clipboard';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/context';
import ADropdown from '../ADropdown/ADropdown';
import ShareCampaignModal from '../Modals/ShareCampaignModal';
import DeleteCampaignModal from '../Modals/DeleteCampaignModal';

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
        router.push(`/${status}/campaign-reporting/${campaign.id}`);
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
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' id='share'>
                    <path fill='none' d='M0 0h24v24H0Z' data-name='Path 3646'></path>
                    <path
                        fill='#959595'
                        d='M17.85 14.033a3.75 3.75 0 0 0-2.878 1.339l-5.156-2.5a3.643 3.643 0 0 0-.019-1.635l5.227-2.665a3.74 3.74 0 1 0-.822-1.592L8.975 9.645a3.726 3.726 0 1 0 .052 4.836l5.156 2.5a3.752 3.752 0 1 0 3.666-2.948Zm0-9.843a1.939 1.939 0 1 1-1.95 1.939 1.947 1.947 0 0 1 1.95-1.935Zm-11.7 9.843a1.939 1.939 0 1 1 1.95-1.939 1.947 1.947 0 0 1-1.95 1.939Zm11.7 5.667a1.939 1.939 0 1 1 1.95-1.939 1.947 1.947 0 0 1-1.95 1.939Z'
                        data-name='Share'></path>
                </svg>
            ),
        },
        {
            title: 'View Report',
            action: navigateToReporting,
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 32 32' id='statistic' width='24' height='24' fill='#959595'>
                    <path d='M25,5H7A3,3,0,0,0,4,8V20a3,3,0,0,0,3,3H25a3,3,0,0,0,3-3V8A3,3,0,0,0,25,5ZM12,18a1,1,0,0,1-2,0V13a1,1,0,0,1,2,0Zm5,0a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0Zm5,0a1,1,0,0,1-2,0V13a1,1,0,0,1,2,0Z'></path>
                    <path d='M10 27a1 1 0 01-.8-1.6l3-4a1 1 0 011.6 1.2l-3 4A1 1 0 0110 27zM22 27a1 1 0 01-.8-.4l-3-4a1 1 0 011.6-1.2l3 4A1 1 0 0122 27z'></path>
                </svg>
            ),
        },
        {
            title: 'Delete',
            action: openCloseDeleteModal,
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 24 24' fill='none'>
                    <path
                        d='M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17'
                        stroke='#959595'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            ),
        },
        {
            title: 'Add/Edit Sheet',
            action: () => router.push(`/${status}/create-reporting/${campaign?.id}`),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' version='1.2' id='plus' fill='#959595'>
                    <path d='M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4z'></path>
                </svg>
            ),
        },
    ];

    if (campaign.source === 'form') {
        campActions.push({
            title: 'Copy Form Link',
            action: () => copyFormLink(`/public/${campaign.id}/form`),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 24 24' fill='none'>
                    <path
                        d='M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17'
                        stroke='#959595'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            ),
        });
        campActions.push({
            title: diffInMin > -60 ? `Refresh in ${60 + diffInMin} mins` : 'Refresh',
            action: () => {},
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 24 24' fill='none'>
                    <path
                        d='M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17'
                        stroke='#959595'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            ),
        });
    }
    if (user.role === 'brand') {
        campActions.splice(2, 3);
    }

    return (
        <div className='flex w-full relative'>
            {user.role !== 'brand' && (
                <div className='absolute -right-[16px] -top-[10px] w-8 h-8 cursor-pointer' onClick={() => setMode(campaign)}>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' id='edit' width={24} height={24}>
                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            <path
                                d='M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z'
                                stroke='#000'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'></path>
                            <path
                                d='M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13'
                                stroke='#000'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'></path>
                        </g>
                    </svg>
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
                        <span className='text-[#959595] text-[13px]'>Brand: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>{campaign.brand}</span>
                    </div>
                    <div>
                        <span className='text-[#959595] text-[13px]'>Created At: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>{dayjs(campaign.startDate).format('DD MMM YYYY')}</span>
                    </div>
                </div>
                <div onClick={navigateToReporting} className='cursor-pointer text-xs text-[#B3B3B3] mt-2 h-16'>
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
                        <span className='text-[#959595] text-[13px]'>Source: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>
                            {campaign.source === 'sheet' && 'Google Sheet'}
                            {campaign.source === 'form' && 'Custom Form'}
                            {campaign.source === 'csv' && 'CSV File'}
                        </span>
                    </span>
                    <span>
                        <span className='text-[#959595] text-[13px]'>Created By: </span>
                        <span className='text-black text-[13px] font-semibold ml-1'>
                            {campaign?.user?.email === user?.email ? 'You' : campaign?.user?.name}
                        </span>
                    </span>
                </div>
                <div className='flex mt-1 fill-[#B3B3B3] items-center justify-between text-[#959595] text-sm h-7'>
                    <div onClick={navigateToReporting} className='cursor-pointer flex items-center'>
                        <BsCalendar3 size={16} color='#B3B3B3' className='mr-2' />
                        From {dayjs(campaign.startDate).format('DD MMM YYYY')} {campaign.endDate && `- ${dayjs(campaign.endDate).format('DD MMM YYYY')}`}
                    </div>
                    <ADropdown
                        item={campaign}
                        position='left'
                        width={'w-44'}
                        options={campActions}
                        header={
                            <svg
                                width='16px'
                                height='16px'
                                fill='#959595'
                                transform='rotate(90)'
                                viewBox='0 0 32.055 32.055'
                                xmlns='http://www.w3.org/2000/svg'>
                                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                <g id='SVGRepo_iconCarrier'>
                                    <g>
                                        <path d='M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z'></path>{' '}
                                    </g>
                                </g>
                            </svg>
                        }
                    />
                </div>
            </div>
            {showShareModal && <ShareCampaignModal campaign={campaign} openCloseModal={openCloseShareModal} />}
            {showDeleteModal && <DeleteCampaignModal campaign={campaign} openCloseModal={openCloseDeleteModal} />}
        </div>
    );
}
