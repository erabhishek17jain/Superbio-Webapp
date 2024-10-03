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
            columns = !isPublic
                ? [
                      {
                          key: 'id',
                          label: 'Sr.No',
                      },
                      {
                          key: 'username',
                          label: 'Username',
                      },
                      {
                          key: 'followerCount',
                          label: 'Followers',
                      },
                      {
                          key: 'avgViews',
                          label: 'Avg Views',
                      },
                      {
                          key: 'engRate',
                          label: 'Engagement Rate',
                      },
                      {
                          key: 'Frequency Per Day',
                          label: 'frequencyPerDay',
                      },
                  ]
                : [
                      {
                          key: 'id',
                          label: 'Sr.No',
                      },
                      {
                          key: 'username',
                          label: 'Username',
                      },
                      {
                          key: 'followerCount',
                          label: 'Followers',
                      },
                  ];
            if (res?.items.length > 0) {
                let colAdded = false;
                data = res?.items.map((item: any, index: number) => {
                    const dataObj = !isPublic
                        ? {
                              id: index + 1,
                              username: item.username,
                              followerCount: item.followerCount,
                              avgViews: item.avgViews,
                              frequencyPerDay: item.frequencyPerDay,
                              engRate: item.engRate,
                          }
                        : {
                              id: index + 1,
                              username: item.username,
                              followerCount: item.followerCount,
                          };

                    const extraCol: any = {};
                    if (item?.otherData?.length > 0 && !isPublic) {
                        for (let i = 0; i < item?.otherData?.length; i++) {
                            const dataProp = 'o' + item?.otherData[i]?.columnName?.toLowerCase().replace(/\s/g, '');
                            extraCol[dataProp] = item?.otherData[i]?.value;
                            if (!colAdded) {
                                columns.push({
                                    key: dataProp,
                                    label: item?.otherData[i]?.columnName,
                                });
                            }
                        }
                        if (!colAdded) {
                            colAdded = true;
                        }
                    }
                    return { ...dataObj, ...extraCol };
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
                filename={`${fileName?.toString().replaceAll(' ', '_')}.csv`}
            />
        </div>
    );
}
