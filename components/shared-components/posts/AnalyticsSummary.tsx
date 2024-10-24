'use client';
import { ISummary } from '@/interfaces/reporting';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EstimatedReachModal from '../../modals/EstimatedReachModal';
import { ICampaign } from '@/interfaces/campaign';
import { FilePenLineIcon, ListRestartIcon, RefreshCwIcon } from 'lucide-react';
import PostNetworkService from '@/services/post.service';
import { enqueueSnackbar } from 'notistack';

interface AnalyticsSummaryProps {
    filters: any;
    isPublic: boolean;
    summary: ISummary[];
    campaign: ICampaign;
    refreshCampData: any;
}

const AnalyticsBox = ({ item, filters, isInstagram, isPublic }: any) => {
    return (
        <div className='flex relative' key={item.statsType}>
            <div
                key={uuidv4()}
                className={`flex justify-start flex-col sm:justify-center shadow-inner ${item.color} w-full py-3 px-3 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}>
                <div className='flex gap-2 justify-between sm:w-auto'>
                    <div className={`flex items-center justify-center ${item.color} bg-opacity-60 w-7 h-7 mr-3 rounded-full`}>{item.icon}</div>
                    <div className='flex gap-2'>
                        {isPublic && (
                            <p className='text-2xl text-black-100'>
                                {item?.customEstimatedValue === '0.00' ? item?.calculatedValue : item?.customEstimatedValue}
                            </p>
                        )}
                        {!isPublic && <p className='text-2xl text-black-100'>{item?.calculatedValue}</p>}
                    </div>
                </div>
                <div className='flex flex-col h-9 justify-end w-full mt-1'>
                    <div className='flex capitalize text-sm'>{`${item.statsType}`}</div>
                    {!(item.statsType === 'Estimated Reach' || item.statsType === 'Total posts') && (
                        <p className='text-[0.7rem] text-black-500'>
                            {`${item.basedOnPostCount} ${item.statsType === 'views' && filters && filters['platform']?.includes('instagram') ? 'reel' : ''} posts have ${item.statsType === 'reposts' && isInstagram ? 'video shares' : item.statsType}`}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function AnalyticsSummary(props: AnalyticsSummaryProps) {
    const { filters, summary, campaign, refreshCampData, isPublic } = props;
    const [showEstimatedModal, setshowEstimatedModal] = useState(false);

    const openCloseEstimatedModal = () => {
        setshowEstimatedModal(!showEstimatedModal);
    };

    const updateEstimatedReach = (params: any) => {
        PostNetworkService.instance.updateEstimatedReach(campaign.id, params).then((res) => {
            enqueueSnackbar('Estimated reach upadated successfully', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            params.estimatedReach && openCloseEstimatedModal();
            refreshCampData();
        });
    };

    const isInstagram = filters && filters['platform']?.includes('instagram');
    let analytics: any = summary?.filter((el: any) => {
        if (isInstagram) {
            return !(
                el.statsType !== 'likes' &&
                el.statsType !== 'views' &&
                el.statsType !== 'comments' &&
                el.statsType !== 'reposts' &&
                el.statsType !== 'Estimated reach'
            );
        } else {
            return el;
        }
    });

    if (isPublic) {
        analytics = analytics?.filter((el: any) => el.hideInPublicView == true);
    }

    let cols = 'mt-3 sm:mt-1 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 w-full gap-4';
    if (analytics?.length === 6) cols = 'mt-3 sm:mt-1 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 w-full gap-4';
    if (analytics?.length === 7) cols = 'mt-3 sm:mt-1 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 w-full gap-4';

    return (
        <div className='flex'>
            <div className='flex w-full flex-col mx-2 sm:mx-0'>
                <div className={cols}>
                    {analytics?.map((item: any) => (
                        <AnalyticsBox key={item.statsType} item={item} filters={filters} isInstagram={isInstagram} isPublic={isPublic} />
                    ))}
                </div>
            </div>
            {showEstimatedModal && <EstimatedReachModal openCloseModal={openCloseEstimatedModal} updateEstimatedReach={updateEstimatedReach} />}
        </div>
    );
}
