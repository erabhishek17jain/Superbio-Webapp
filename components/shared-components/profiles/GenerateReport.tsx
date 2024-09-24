'use client';

import SheetNetworkService from '@/services/sheet.service';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppDispatch, useAppSelector } from '@/context';
import { Params } from '@/interfaces/reporting';
import ConfirmLastRefreshModal from '../../modals/ConfirmLastRefreshModal';
import { AreaChartIcon, PlusCircleIcon, RefreshCcwIcon } from 'lucide-react';
import JavaNetworkService from '@/services/java.service';
import { calculateStatus, clearFilters, structurePostsData, structureProfilesData } from '@/lib/utils';
import DownloadCSV from '../profiles/DownloadCSV';
import { setCampData } from '@/context/reporting';

dayjs.extend(relativeTime);
const gradients = ['bg-gradient-to-b', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-r'];

interface GenerateReportProps {
    params: Params;
    isPublic: boolean | undefined;
    query: { [key: string]: any };
}

export default function GenerateReport(props: GenerateReportProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isPublic, params, query } = props;
    const { user } = useAppSelector((state) => state.user);
    const { campData } = useAppSelector((state) => state.reporting);
    const [valuesLoading] = useState(false);
    const [diffInMin, setDiffInMin] = useState(0);
    const [reportText, setReportText] = useState('Generate Report');
    const [generateStatus, setGenerateStatus] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [gradInx, setGradInx] = useState(0);
    const [isSheetExist] = useState('yes');

    const openCloseConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const setLastRefresh = () => {
        if (campData.meta) {
            const currentAt = dayjs(new Date()) as any;
            const minutes = currentAt.diff(dayjs(dayjs(campData.meta?.campaignDto?.lastSyncedAt).valueOf()), 'minutes');
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
        if (!isPublic && campData.meta?.queueDto) {
            if (reportText === 'Generate Report') {
                getQueueData(campData.meta?.queueDto);
            }
        } else {
            setLastRefresh();
        }
    }, [campData.data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGradInx(gradInx === 3 ? 0 : gradInx + 1);
        }, 100);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (reportText === 'Generating...') {
            const interval = setInterval(async () => {
                const campData = await JavaNetworkService.instance.getProfileReportingData(params.campaignId, clearFilters(query));
                dispatch(setCampData(structureProfilesData(campData)));
                if (campData?.queueDto) {
                    setGenerateStatus(calculateStatus(campData?.queueDto?.status, campData?.queueDto?.processed, campData?.queueDto?.totalPost));
                }
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [reportText]);

    let lastUpdate = dayjs(Number(campData.meta?.campaignDto.lastSyncedAt)).fromNow();
    if (diffInMin > 0) {
        lastUpdate = dayjs(new Date()).subtract(diffInMin, 'minutes').fromNow();
    }

    return (
        <div className={`flex py-2 flex-col md:flex-row justify-between gap-3 items-center h-[138px] h-[108px] sm:h-[60px]`}>
            <div className='flex text-lg font-bold text-center md:text-left'>
                <span className='flex text-lg font-bold text-center md:text-left sm:flex-none flex-wrap gap-y-3 sm:justify-between justify-center'>
                    <div className='flex flex-col sm:flex-row text-xl sm:text-2xl gap-2'>
                        <div className='font-semibold'>
                            Brand: <span className='font-light mr-5'>{campData.meta?.campaignDto?.brand}</span>
                        </div>
                        <div className='font-semibold'>
                            Campaign: <span className='font-light'>{campData.meta?.campaignDto?.title}</span>
                        </div>
                    </div>
                </span>
            </div>
            {!valuesLoading && isSheetExist === 'yes' && campData.meta && campData.meta?.total > 0 && (
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
                                <button className='cursor-pointer flex items-center px-3 gap-3 h-full rounded-lg bg-white text-[#000] text-sm cursor-not-allowed'>
                                    <AreaChartIcon color='#000' size={20} />
                                    Generating... ({generateStatus !== '' ? generateStatus : 'This may take a few minutes'})
                                </button>
                            </div>
                        )}
                        {reportText === 'Generated' && (
                            <div className='flex items-center gap-3 text-[#8b8b8b] font-semibold sm:text-center md:text-left text-[12px] sm:text-sm mr-3'>
                                <span>Refreshed {lastUpdate}</span>
                                {!isPublic && user.role !== 'brand' && (
                                    <div
                                        onClick={() => refreshStats()}
                                        className='flex items-center justify-center p-2 bg-[#e6e6e6] rounded-xl h-11 w-11 cursor-pointer'>
                                        <RefreshCcwIcon color='#8b8b8b' size={24} />
                                    </div>
                                )}
                            </div>
                        )}
                        <DownloadCSV
                            total={campData.meta?.total}
                            isPublic={isPublic}
                            campaignId={params.campaignId}
                            fileName={campData.meta?.campaignDto?.title}
                        />
                    </div>
                </div>
            )}
            {!valuesLoading && isSheetExist === 'yes' && campData.meta && campData.meta?.total === 0 && !isPublic && (
                <div className='flex items-center border border-[#df4040] bg-[#ffe3e2] rounded-lg'>
                    <span className='flex gap-3 w-full text-sm text-[#df4040] px-3'>
                        <AreaChartIcon color='#df4040' size={24} />
                        There are currently no links. To generate report you have to add links.
                    </span>
                    <button
                        className='flex items-center gap-1 w-32 h-10 justify-end font-semibold text-sm text-[#ffe3e2] bg-[#df4040] rounded m-[2px]'
                        onClick={() => router.push(`/profile/${params?.campType}/create/${params.campaignId}`)}>
                        Add Links
                        <PlusCircleIcon color='#ffe3e2' size={24} />
                    </button>
                </div>
            )}
            {showConfirmModal && <ConfirmLastRefreshModal openCloseModal={openCloseConfirmModal} />}
        </div>
    );
}
