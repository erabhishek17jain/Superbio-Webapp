'use client';

import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { CSVLink } from 'react-csv';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DownloadIcon } from 'lucide-react';
import PorofileNetworkService from '@/services/profile.service';

dayjs.extend(relativeTime);

interface GenerateReportProps {
    total: number;
    platform: string;
    fileName: string;
    campaignId: string;
    isPublic: boolean | undefined;
}

export const twitterColumns = [
    {
        key: 'id',
        label: 'Sr.No',
    },
    {
        key: 'username',
        label: 'Username',
    },
    {
        key: 'fullName',
        label: 'Full Name',
    },
    {
        key: 'customCategory',
        label: 'Custom Category',
    },
    {
        key: 'customTags',
        label: 'Custom Tags',
    },
    {
        key: 'customAveragePostCost',
        label: 'Average Post Cost',
    },
    {
        key: 'avgViews',
        label: 'Average Views',
    },
    {
        key: 'followerCount',
        label: 'Total Followers',
    },
    {
        key: 'engRate',
        label: 'Engagement Rate',
    },
    {
        key: 'frequencyPerDay',
        label: 'Frequency Per Day',
    },
    {
        key: 'favouriteCount',
        label: 'Total Favourites',
    },
    {
        key: 'friendCount',
        label: 'Total Friends',
    },
    {
        key: 'listedCount',
        label: 'Total Listed',
    },
    {
        key: 'statusCount',
        label: 'Total Status',
    },
    {
        key: 'mediaCount',
        label: 'Total Media',
    },
    {
        key: 'totalViews',
        label: 'Total Views',
    },
    {
        key: 'totalLikes',
        label: 'Total Likes',
    },
    {
        key: 'totalComments',
        label: 'Total Comments',
    },
    {
        key: 'totalBookmarks',
        label: 'Total Bookmarks',
    },
    {
        key: 'totalQuotes',
        label: 'Total Quotes',
    },
    {
        key: 'totalReposts',
        label: 'Total Reposts',
    },
    {
        key: 'verified',
        label: 'Is Verified',
    },
    {
        key: 'blue',
        label: 'Is Blue Tick',
    },
    {
        key: 'rawDescription',
        label: 'Description',
    },
    {
        key: 'profileBannerUrl',
        label: 'Banner Url',
    },
    {
        key: 'profileImageUrl',
        label: 'Profile Url',
    },
    {
        key: 'created',
        label: 'Profile Created Date',
    },
];

export const instagramColumns = [
    {
        key: 'id',
        label: 'Sr.No',
    },
    {
        key: 'username',
        label: 'Username',
    },
    {
        key: 'fullName',
        label: 'Full Name',
    },
    {
        key: 'publicPhoneNumber',
        label: 'Phone Number',
    },
    {
        key: 'publicEmail',
        label: 'Email ID',
    },
    {
        key: 'category',
        label: 'Profile Category',
    },
    {
        key: 'customCategory',
        label: 'Custom Category',
    },
    {
        key: 'customTags',
        label: 'Custom Tags',
    },
    {
        key: 'customAveragePostCost',
        label: 'Average Post Cost',
    },
    {
        key: 'avgViews',
        label: 'Average Views',
    },
    {
        key: 'followerCount',
        label: 'Total Followers',
    },
    {
        key: 'engRate',
        label: 'Engagement Rate',
    },
    {
        key: 'frequencyPerDay',
        label: 'Frequency Per Day',
    },
    {
        key: 'mediaCount',
        label: 'Total Media',
    },
    {
        key: 'videoCount',
        label: 'Total Vidoes',
    },
    {
        key: 'totalViews',
        label: 'Total Views',
    },
    {
        key: 'totalLikes',
        label: 'Total Likes',
    },
    {
        key: 'totalComments',
        label: 'Total Comments',
    },
    {
        key: 'verified',
        label: 'Is Verified',
    },
    {
        key: 'biography',
        label: 'Biography',
    },
];

export default function DownloadCSV(props: GenerateReportProps) {
    const { campaignId, isPublic, total, fileName, platform } = props;
    const [isDownloading, setIsDownloading] = useState(false);
    const [csvData, setCsvData] = useState({ columns: [], data: [] });
    const csvLink = useRef<any>(null);

    const downloadCsv = () => {
        setIsDownloading(true);
        enqueueSnackbar('Please wait, we are preparing your csv file.', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
        let data: any = [];
        let columns: any = [];
        const params = `?page=1&size=${total}&sortBy=sNo&sortDirection=ASC`;
        (platform === 'twitter'
            ? PorofileNetworkService.instance.getTwProfilesData(campaignId, params)
            : PorofileNetworkService.instance.getIgProfilesData(campaignId, params)
        ).then((res: any) => {
            data = [];
            columns = platform === 'twitter' ? twitterColumns : instagramColumns;
            if (res?.items.length > 0) {
                data = res?.items.map((item: any, index: number) => {
                    return {
                        ...item,
                        id: index + 1,
                        addressStreet: `${item.addressStreet} ${item.cityName} ${item.zip}`,
                        publicPhoneNumber: item?.publicPhoneNumber ? item?.publicPhoneNumber : item?.contactPhoneNumber,
                    };
                });
            }
            setCsvData({ columns: columns, data: data });
        });
    };

    useEffect(() => {
        if (csvData?.data?.length > 0) {
            csvLink.current.link.click();
            setIsDownloading(false);
            setCsvData({ columns: [], data: [] });
        }
    }, [csvData]);

    return (
        <div className='flex gap-3'>
            <button
                onClick={downloadCsv}
                disabled={isDownloading}
                className='flex items-center bg-black py-2 px-4 rounded-lg space-x-2 cursor-pointer text-sm text-white h-11 disabled:opacity-50 disabled:cursor-not-allowed'>
                <DownloadIcon color='#fff' size={20} />
                <span className='text-opacity-80'>{isDownloading ? 'Downloading...' : 'Download CSV'}</span>
            </button>
            <CSVLink
                ref={csvLink}
                target='_blank'
                className='hidden'
                data={csvData.data}
                headers={csvData.columns}
                filename={`${fileName.toString().replaceAll(' ', '_')}_${platform}.csv`}
            />
        </div>
    );
}
