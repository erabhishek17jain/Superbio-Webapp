'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/context';
import { Params } from '@/interfaces/reporting';
import ConfirmLastRefreshModal from '../../modals/ConfirmLastRefreshModal';
import { AreaChartIcon, PlusCircleIcon, RefreshCcwIcon } from 'lucide-react';
import PorofileNetworkService from '@/services/profile.service';
import DownloadCSV from '../profiles/DownloadCSV';

interface GenerateReportProps {
    params: Params;
    platform: string;
    query: { [key: string]: any };
    isPublic: boolean | undefined;
}

export default function GenerateReport(props: GenerateReportProps) {
    const router = useRouter();
    const { isPublic, params, platform } = props;
    const { user } = useAppSelector((state) => state.user);
    const { campData } = useAppSelector((state) => state.reporting);
    const [valuesLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [gradInx, setGradInx] = useState(0);
    const [isSheetExist] = useState('yes');

    const openCloseConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const refreshStats = () => {
        PorofileNetworkService.instance.syncInfluencers(params.campaignId);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setGradInx(gradInx === 3 ? 0 : gradInx + 1);
        }, 100);
        return () => clearInterval(interval);
    });

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
                        <div className='flex items-center gap-3 text-[#8b8b8b] font-semibold sm:text-center md:text-left text-[12px] sm:text-sm mr-3'>
                            {!isPublic && user.role !== 'brand' && (
                                <div
                                    onClick={() => refreshStats()}
                                    className='flex items-center justify-center p-2 border border-gray-300 rounded-lg h-10 w-10 cursor-pointer'>
                                    <RefreshCcwIcon color='#8b8b8b' size={24} />
                                </div>
                            )}
                        </div>
                        <DownloadCSV
                            platform={platform}
                            isPublic={isPublic}
                            total={campData.meta?.total}
                            campaignId={params.campaignId}
                            fileName={campData.meta?.campaignDto ? campData.meta?.campaignDto?.title : 'Profiles'}
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
