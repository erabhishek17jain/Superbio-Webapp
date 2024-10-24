import React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ArrowRightIcon, CalendarDays, MapPin, SquareArrowOutUpRightIcon, Trash2Icon } from 'lucide-react';
import { calculateSummary } from '@/lib/utils';
import DetailsProfileModal from '@/components/modals/DetailsProfileModal';
import DeleteProfileModal from '@/components/modals/DeleteProfileModal';
import UpdateMappingModal from '@/components/modals/UpdateMappingModal';

export function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

const TwitterProfile = ({ item }: any) => {
    return (
        <div className='bg-white text-black font-sans rounded-lg w-full'>
            <div className='relative'>
                <div className='h-48'>{item.profileBannerUrl && <img src={item.profileBannerUrl} alt='Banner' className='w-full h-48 object-cover' />}</div>
                <div className='absolute -bottom-16 left-4 rounded-full overflow-hidden border-4 border-black'>
                    <img src={item.profileImageUrl} alt='Profile Picture' className='w-32 h-32 rounded-full' />
                </div>
            </div>

            <div className='px-4 mt-16'>
                <div className='flex justify-between items-start'>
                    <div>
                        <h1 className='flex items-center text-2xl font-bold'>
                            <span>{item.fullName}</span>
                            {item.blue && (
                                <span className='ml-2 mt-1 text-blue-500'>
                                    <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 48 48'>
                                        <polygon
                                            fill='#42a5f5'
                                            points='29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884'></polygon>
                                        <polygon
                                            fill='#fff'
                                            points='21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926'></polygon>
                                    </svg>
                                </span>
                            )}
                        </h1>
                        <p className='text-gray-500 text-sm'>@{item.username}</p>
                        {item.rawDescription && <p className='text-black text-sm mt-2'>{item.rawDescription}</p>}
                    </div>
                </div>

                {item.location && (
                    <div className='mt-2 text-sm flex items-center space-x-2 text-gray-500'>
                        <MapPin size={20} />
                        <span className='ml-1'>{item.location}</span>
                    </div>
                )}
                {item.created && (
                    <div className='mt-2 text-sm flex items-center space-x-2 text-gray-500'>
                        <CalendarDays size={20} />
                        <span className='text-gray-500'>Joined {new Date(item.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                )}
                <div className='my-4 text-sm flex space-x-6 text-gray-500'>
                    <span className='font-bold text-black pr-1'>{calculateSummary(item.friendCount)}</span> Following
                    <span className='font-bold text-black pr-1'>{calculateSummary(item.followerCount)}</span> Followers
                </div>
            </div>
        </div>
    );
};

interface TweetProps {
    tweetID: string;
}

export function Tweet({ tweetID }: TweetProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if ((window as any).twttr) {
            (window as any).twttr.widgets
                .createTweet(tweetID, document.getElementById(tweetID), {
                    align: 'center',
                    conversation: 'none',
                    dnt: true,
                })
                .then(() => setIsLoading(false));
        }
    }, [tweetID]);

    return (
        <div className='w-full animate-fadeIn' id={tweetID}>
            {isLoading && <p className='text-sm'>Loading</p>}
        </div>
    );
}

export default function SocialCard({
    item,
    platform,
    index,
    columns,
    setColumns,
    campaignId,
}: {
    item: any;
    platform: string;
    index: number;
    columns: any;
    setColumns: any;
    campaignId: string;
}) {
    const lastRefreshedAt = item?.lastRefreshedAt;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAnalyticsModal, setshowAnalyticsModal] = useState(false);

    const openCloseDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const openCloseDetailsModal = () => {
        setShowDetailsModal(!showDetailsModal);
    };

    const openCloseAnalyticsModal = () => {
        setshowAnalyticsModal(!showAnalyticsModal);
    };

    const posted = new Date(lastRefreshedAt);
    return (
        <div className='w-full mt-4'>
            <div className='flex bg-[#FAFAFA] rounded-lg p-4 flex-col shadow-inner mx-2 sm:mx-0'>
                <div className='flex items-center justify-between mb-1 w-full'>
                    <div className='flex items-center justify-between gap-2 px-1 text-[#8b8b8b] w-full'>
                        <div className='flex justify-center items-center w-8 h-8 px-3 bg-[#DAE4FF] text-sm text-[#033DD0] py-1 rounded-full'>{index + 1}</div>
                        {lastRefreshedAt ? (
                            parseInt(lastRefreshedAt) > 0 && <span>Refreshed on {dayjs(posted).format('D MMM, YYYY')}</span>
                        ) : (
                            <span>Profile Summary</span>
                        )}
                        <div className='flex gap-3'>
                            <button
                                onClick={openCloseDeleteModal}
                                className='flex justify-center items-center cursor-pointer w-8 h-8 bg-gray-300 rounded-lg truncate'>
                                <Trash2Icon color='#8b8b8b' size={18} />
                            </button>
                            <a
                                target='_blank'
                                href={`https://www.${platform}.com/${item.username}`}
                                className='flex justify-center items-center cursor-pointer w-8 h-8 bg-gray-300 rounded-lg truncate'>
                                <SquareArrowOutUpRightIcon color='#8b8b8b' size={18} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full mb-1'>
                    <div className='grid grid-cols-2 w-full divide-x border-b'>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{item.customCategory ? item.customCategory : item.totalLikes}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>{item.customCategory ? 'Custom Category' : 'Total Likes'}</span>
                        </div>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{item.customTags?.length > 0 ? item.customTags : item.totalComments}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>
                                {item.customTags?.length > 0 ? 'Custom Tags' : 'Total Comments'}
                            </span>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 w-full divide-x'>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{calculateSummary(item.followerCount)}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>Followers</span>
                        </div>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{calculateSummary(item.frequencyPerDay)}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>Frequency</span>
                        </div>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{calculateSummary(item.avgViews)}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>Views</span>
                        </div>
                        <div className={`cursor-pointer flex flex-col justify-center items-center p-2`}>
                            <span className='text-[#000] text-sm font-semibold'>{calculateSummary(item.engRate)}</span>
                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>Engagement</span>
                        </div>
                    </div>
                </div>
                <div className='flex w-full' id='social-links'>
                    {platform === 'instagram' && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <iframe
                                width='100%'
                                frameBorder={0}
                                id='instagram-embed-2'
                                allowFullScreen={true}
                                allowTransparency={true}
                                data-instgrm-payload-id='instagram-media-payload-2'
                                src={`https://www.instagram.com/${item.username}/embed/`}
                                className='instagram-media instagram-media-rendered border border-gray rounded-lg'></iframe>
                            <script async src='//www.instagram.com/embed.js'></script>
                        </div>
                    )}
                    {platform === 'twitter' && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <TwitterProfile item={item} />
                        </div>
                    )}
                </div>
                <div className='flex gap-3 items-center justify-between mb-1 w-full'>
                    <button
                        onClick={openCloseDetailsModal}
                        className='w-full mt-2 cursor-pointer flex gap-2 capitalize items-center justify-center text-white text-[15px] py-1 px-4 border bg-[#0095f6] rounded-lg disabled:opacity-50'>
                        View Analysis <ArrowRightIcon color='#fff' size={20} />
                    </button>
                    <button
                        onClick={openCloseAnalyticsModal}
                        className='w-full mt-2 cursor-pointer flex gap-2 capitalize items-center justify-center text-[#0095f6] text-[15px] py-1 px-4 border border-[#0095f6] bg-[white rounded-lg disabled:opacity-50'>
                        Update Mapping <ArrowRightIcon color='#0095f6' size={20} />
                    </button>
                </div>
            </div>
            {showDeleteModal && <DeleteProfileModal type={platform} campaignId={campaignId} postId={item.id} openCloseModal={openCloseDeleteModal} />}
            {showDetailsModal && <DetailsProfileModal type={platform} profile={item} openCloseModal={openCloseDetailsModal} />}
            {showAnalyticsModal && (
                <UpdateMappingModal
                    index={index}
                    columns={columns}
                    profileId={item.id}
                    setColumns={setColumns}
                    openCloseModal={openCloseAnalyticsModal}
                    currentMapping={{
                        profileId: item.id,
                        tags: item.customTags,
                        category: item.customCategory,
                        platform: platform.toUpperCase(),
                        averagePostCost: item.customAveragePostCost,
                    }}
                />
            )}
        </div>
    );
}
