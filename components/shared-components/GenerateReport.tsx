'use client';

import Dropdown from '@/components/global-components/Dropdown';
import SheetNetworkService from '@/services/sheet.service';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import PublicNetworkService from '@/services/public.service';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/navigation';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppSelector } from '@/context';
import { Params } from '@/interfaces/reporting';
import { IColumn } from '@/interfaces/sheet';
import ConfirmLastRefreshModal from '../modals/ConfirmLastRefreshModal';
import { AreaChartIcon, DownloadIcon, PlusCircleIcon, RefreshCcwIcon } from 'lucide-react';
import JavaNetworkService from '@/services/java.service';
import { calculateStatus, clearFilters, setAnalytics, structureData } from '@/lib/utils';

dayjs.extend(relativeTime);
const gradients = ['bg-gradient-to-b', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-r'];

interface GenerateReportProps {
    meta: any;
    isPublic: boolean | undefined;
    columns: IColumn[];
    params: Params;
    query: { [key: string]: any };
    title: string;
    setCampData: any;
}

export default function GenerateReport(props: GenerateReportProps) {
    const { meta, isPublic, columns, params, query, title, setCampData } = props;
    const { user } = useAppSelector((state) => state.user);
    const [valuesLoading] = useState(false);
    const [diffInMin, setDiffInMin] = useState(0);
    const [reportText, setReportText] = useState('Generate Report');
    const [generateStatus, setGenerateStatus] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [gradInx, setGradInx] = useState(0);
    const [isSheetExist] = useState('yes');
    const [csvData, setCsvData] = useState({ columns: [], data: [] });
    const csvLink = useRef<any>(null);
    const router = useRouter();

    const setLastRefresh = () => {
        if (meta) {
            const currentAt = dayjs(new Date()) as any;
            const minutes = currentAt.diff(dayjs(dayjs(meta?.campaignDto?.lastSyncedAt).valueOf()), 'minutes');
            setDiffInMin(isNaN(minutes) ? 0 : minutes);
            setReportText(minutes > 0 ? 'Generated' : 'Generate Report');
        }
        setGenerateStatus('');
    };

    const getQueueData = (queueDto: IQueue) => {
        const currentAt = dayjs(new Date()) as any;
        const minutes = currentAt.diff(dayjs(parseInt(queueDto.updatedAt?.$date?.$numberLong.toString())), 'minutes');
        setDiffInMin(minutes);
        setReportText('Generating...');
        setGenerateStatus(calculateStatus(queueDto?.status, queueDto?.processed, queueDto?.totalPost));
    };

    useEffect(() => {
        if (!isPublic && meta?.queueDto) {
            if (reportText === 'Generate Report') {
                getQueueData(meta?.queueDto);
            }
        } else {
            setLastRefresh();
        }
    }, [columns]);

    const refreshStats = () => {
        if (reportText === 'Generate Report' || diffInMin > 0) {
            setDiffInMin(0);
            setReportText('Generating...');
            SheetNetworkService.instance.syncSheet(params.campaignId);
        } else {
            openCloseConfirmModal();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setGradInx(gradInx === 3 ? 0 : gradInx + 1);
        }, 100);
        return () => clearInterval(interval);
    });

    const openCloseConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    let lastUpdate = dayjs(Number(meta?.updatedAt)).fromNow();
    if (diffInMin > 0) {
        lastUpdate = dayjs(new Date()).subtract(diffInMin, 'minutes').fromNow();
    }

    const downloadCsv = () => {
        enqueueSnackbar('Please wait, we are preparing your csv file.', {
            variant: 'success',
        });
        let data: any = [];
        let columns: any = [];
        let promise: any;
        if (isPublic) {
            promise = PublicNetworkService.instance.getCampaignReportData(params.campaignId, { ...query, page: 1, limit: 2000 });
        } else {
            promise = SheetNetworkService.instance.getCampaignData(params.campaignId, { ...query, page: 1, limit: 2000 });
        }
        promise.then((res: any) => {
            data = [];
            columns = !isPublic
                ? [
                      {
                          key: 'id',
                          label: 'Sr.No',
                      },
                      {
                          key: 'socialLink',
                          label: 'Social Link',
                      },
                      {
                          key: 'postedAt',
                          label: 'Posted Date',
                      },
                      {
                          key: 'views',
                          label: 'Views',
                      },
                      {
                          key: 'likes',
                          label: 'Likes',
                      },
                      {
                          key: 'reposts',
                          label: 'Reposts',
                      },
                      {
                          key: 'quotes',
                          label: 'Quotes',
                      },
                      {
                          key: 'bookmarks',
                          label: 'Bookmarks',
                      },
                      {
                          key: 'comments',
                          label: 'Comments',
                      },
                  ]
                : [
                      {
                          key: 'id',
                          label: 'Sr.No',
                      },
                      {
                          key: 'socialLink',
                          label: 'Social Link',
                      },
                      {
                          key: 'postedAt',
                          label: 'Posted Date',
                      },
                      {
                          key: 'reach',
                          label: 'Estimated Impression',
                      },
                  ];

            if (res?.data.length > 0) {
                let colAdded = false;
                data = res?.data.map((item: any, index: number) => {
                    const dataObj = !isPublic
                        ? {
                              id: index + 1,
                              socialLink: item.socialLink,
                              postedAt: item?.postedAt?.$date?.$numberLong
                                  ? dayjs(new Date(parseInt(item?.postedAt?.$date?.$numberLong))).format('D MMM, YYYY')
                                  : '',
                              views: item.analytics.views,
                              likes: item.analytics.likes,
                              reposts: item.analytics.reposts,
                              quotes: item.analytics.quotes,
                              bookmarks: item.analytics.bookmarks,
                              comments: item.analytics.comments,
                          }
                        : {
                              id: index + 1,
                              socialLink: item.socialLink,
                              postedAt: item?.postedAt?.$date?.$numberLong
                                  ? dayjs(new Date(parseInt(item?.postedAt?.$date?.$numberLong))).format('D MMM, YYYY')
                                  : '',
                              reach: item.analytics.views ? item.analytics.views : item.analytics.likes * 10,
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
            setCsvData({ columns: [], data: [] });
        }
    }, [csvData]);

    useEffect(() => {
        if (reportText === 'Generating...') {
            const interval = setInterval(async () => {
                const campData = await JavaNetworkService.instance.getReportingData(params.campaignId, clearFilters(query));
                setCampData(structureData(campData));
                if (campData?.queueDto) {
                    setGenerateStatus(calculateStatus(campData?.queueDto?.status, campData?.queueDto?.processed, campData?.queueDto?.totalPost));
                }
                
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [reportText]);

    if (reportText === 'Generate Report') {
        delete meta?.postSummaryResp.otherPosts;
    }

    return (
        <div className='flex py-2 flex-col md:flex-row justify-between gap-4 items-center h-[150px] xs:h-[108px] sm:h-[60px]'>
            <div className='flex text-lg font-bold text-center md:text-left'>
                <span className='flex text-lg font-bold text-center md:text-left sm:flex-none flex-wrap gap-y-3 sm:justify-between justify-center'>
                    {!isPublic
                        ? Object.keys(meta?.postSummaryResp)
                              .filter(
                                  (item) =>
                                      !(meta?.postSummaryResp[item] === null || meta?.postSummaryResp[item] === 0 || meta?.postSummaryResp[item] === false)
                              )
                              .map((key) => {
                                  return (
                                      <div className='flex flex-col text-sm w-20' key={key}>
                                          <span className='text-black font-semibold capitalize'>
                                              {key === 'isLinkDeletedPosts' ? 'Deleted' : key.slice(0, -5)}
                                          </span>
                                          <span className='text-[#8b8b8b]'>{meta?.postSummaryResp[key]} posts</span>
                                      </div>
                                  );
                              })
                        : title}
                </span>
            </div>
            {!valuesLoading && isSheetExist === 'yes' && meta && meta?.total > 0 && (
                <div className='flex flex-col items-center gap-3 sm:flex-row'>
                    <div className='flex'>
                        {reportText === 'Generate Report' && isPublic && (
                            <div className='flex items-center gap-2 border border-black px-2 rounded-lg font-semibold text-black sm:text-center md:text-left text-[12px] sm:text-[14px] mr-4'>
                                <AreaChartIcon color='#000' size={20} />
                                Report not generated yet
                            </div>
                        )}
                        {reportText === 'Generate Report' && !isPublic && (
                            <div
                                onClick={() => refreshStats()}
                                className='flex items-center gap-2 border border-black px-2 rounded-lg font-semibold text-black sm:text-center md:text-left text-sm mr-4 cursor-pointer'>
                                <AreaChartIcon color='#000' size={20} />
                                Generate Report
                            </div>
                        )}
                        {reportText === 'Generating...' && (
                            <div
                                className={`flex gap-3 ${gradients[gradInx]} from-[#000] to-white items-center rounded-lg p-[2px] text-[#8b8b8b] text-sm mr-3 cursor-not-allowed`}>
                                <button className='flex items-center px-3 gap-3 h-full rounded-lg bg-white text-[#000] text-sm cursor-not-allowed'>
                                    <AreaChartIcon color='#000' size={20} />
                                    Generating Report ({generateStatus !== '' ? generateStatus : 'This may take a few minutes'})
                                </button>
                            </div>
                        )}
                        {reportText === 'Generated' && (
                            <div className='flex items-center gap-3 text-[#8b8b8b] font-semibold sm:text-center md:text-left text-[12px] sm:text-sm mr-3'>
                                <span>Last Refresh {lastUpdate}</span>
                                {!isPublic && user.role !== 'brand' && (
                                    <div
                                        onClick={() => refreshStats()}
                                        className='flex items-center justify-center p-2 bg-[#e6e6e6] rounded-xl h-11 w-11 cursor-pointer'>
                                        <RefreshCcwIcon color='#8b8b8b' size={24} />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className='flex gap-3'>
                            <Dropdown
                                width={'w-32'}
                                position='down'
                                options={[
                                    {
                                        title: 'CSV',
                                        action: downloadCsv,
                                    },
                                ]}
                                header={
                                    <div className='flex items-center bg-black py-2 px-4 rounded-lg space-x-2 cursor-pointer text-sm text-white h-11'>
                                        <DownloadIcon color='#fff' size={20} />
                                        <span className='text-opacity-80'>Download all</span>
                                    </div>
                                }
                            />
                            <CSVLink
                                ref={csvLink}
                                target='_blank'
                                className='hidden'
                                data={csvData.data}
                                headers={csvData.columns}
                                filename={`${!isPublic ? 'campaignName'.toString().replaceAll('_', ' ').slice(0, -1) : 'CampaignData'}.csv`}
                            />
                        </div>
                    </div>
                </div>
            )}
            {!valuesLoading && isSheetExist === 'yes' && meta && meta?.total === 0 && !isPublic && (
                <div className='flex items-center border border-[#df4040] bg-[#ffe3e2] rounded-lg'>
                    <span className='flex gap-3 w-full text-sm text-[#df4040] px-3'>
                        <AreaChartIcon color='#df4040' size={24} />
                        There are currently no links. To generate report you have to add links.
                    </span>
                    <button
                        className='flex items-center gap-1 w-32 h-10 justify-end font-semibold text-sm text-[#ffe3e2] bg-[#df4040] rounded m-[2px]'
                        onClick={() => router.push(`/${params?.campaignType}/create/${params.campaignId}?title=${title}`)}>
                        Add Links
                        <PlusCircleIcon color='#ffe3e2' size={24} />
                    </button>
                </div>
            )}
            {showConfirmModal && <ConfirmLastRefreshModal openCloseModal={openCloseConfirmModal} />}
        </div>
    );
}
