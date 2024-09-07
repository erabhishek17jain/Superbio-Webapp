import React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { SquareArrowOutUpRightIcon, Trash2Icon } from 'lucide-react';
import { calculateSummary } from '@/lib/utils';
import DeletePostModal from '../../modals/DeletePostModal';

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

export default function SocialCard({ item, index, campaignId }: { item: any; index: number; campaignId: string }) {
    const postedAt = item?.postedAt;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openCloseDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const posted = new Date(postedAt);
    return (
        <div className='w-full mt-4'>
            <div className='flex bg-[#FAFAFA] rounded-xl p-4 flex-col shadow-inner mx-2 sm:mx-0'>
                <div className='flex items-center justify-between mb-1 w-full'>
                    <div className='flex items-center justify-between gap-2 px-1 text-[#8b8b8b] w-full'>
                        <div className='flex justify-center items-center w-8 h-8 px-3 bg-[#DAE4FF] text-sm text-[#033DD0] py-1 rounded-full'>{index + 1}</div>
                        {postedAt ? parseInt(postedAt) > 0 && <span>Posted on {dayjs(posted).format('D MMM, YYYY')}</span> : <span>Profile Summary</span>}
                        <div className='flex gap-3'>
                            <button
                                onClick={openCloseDeleteModal}
                                className='flex justify-center items-center cursor-pointer w-8 h-8 bg-gray-300 rounded-lg truncate'>
                                <Trash2Icon color='#8b8b8b' size={18} />
                            </button>
                            <a
                                target='_blank'
                                href={'https://www.instagram.com/' + item.username}
                                className='flex justify-center items-center cursor-pointer w-8 h-8 bg-gray-300 rounded-lg truncate'>
                                <SquareArrowOutUpRightIcon color='#8b8b8b' size={18} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mb-1'>
                    <div className='grid grid-cols-4 rounded-2xl w-full divide-x'>
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
            </div>
            {showDeleteModal && <DeletePostModal campaignId={campaignId} postId={item.id} openCloseModal={openCloseDeleteModal} />}
        </div>
    );
}
