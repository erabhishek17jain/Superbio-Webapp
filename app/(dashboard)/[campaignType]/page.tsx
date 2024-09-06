'use client';
import CreateCampaignModal from '@/components/modals/CreateCampaignModal';
import CampaignCard from '@/components/shared-components/CampaignCard';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { useAppDispatch, useAppSelector } from '@/context';
import { setMeta } from '@/context/campaign';
import { getCampaigns } from '@/context/campaign/network';
import { CampaignStatus } from '@/services/campaign.service';
import { LoaderIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

export default function AllCampaignPage() {
    const params: any = useParams();
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState('add');
    const { campaignType } = useAppSelector((state) => state.user);
    const { allCampaign } = useAppSelector((state) => state.campaign);
    const [campaignDetails, setCampaignDetails] = useState({});
    const [openCampaingModal, setOpenCampaingModal] = useState(false);
    const [loader, setloader] = useState(false);
    const [, setScreenWidth] = useState(0);

    const fetchMore = () => {
        const ownedType = params?.campaignType?.split('-')[0] === 'active' ? 'own' : 'shared';
        dispatch(
            getCampaigns({
                page: allCampaign?.meta?.arg?.page || 0 + 1,
                limit: 12,
                status: CampaignStatus.active,
                ownerType: ownedType,
                q: '',
                type: campaignType === 'profile' ? 'influncer' : 'post',
            })
        );
        dispatch(
            setMeta({
                page: allCampaign?.meta?.arg?.page || 0 + 1,
                limit: 12,
            })
        );
    };

    const editCampaign = (campaign: any) => {
        setMode('edit');
        setOpenCampaingModal(true);
        setCampaignDetails(campaign);
    };

    const loadMore = async () => {
        if (allCampaign?.meta.page && allCampaign?.meta.page * 12 < allCampaign?.meta.total) {
            setloader(true);
            const ownerType = params?.campaignType === 'active' ? 'own' : 'shared';
            dispatch(
                getCampaigns({ page: allCampaign?.meta.page + 1, limit: 12, status: allCampaign?.meta.status, ownerType: ownerType, q: '', type: campaignType })
            );
            setloader(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex px-4 sm:px-8 py-4 flex-col sm:mb-6 mb-12'>
            <div className='w-full h-16'></div>
            {openCampaingModal && (
                <CreateCampaignModal
                    mode={mode}
                    campaignDetails={campaignDetails}
                    openCloseModal={() => {
                        setOpenCampaingModal(false);
                    }}
                />
            )}
            {allCampaign?.data && allCampaign?.data?.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 sm:mb-6 mb-16'>
                    {allCampaign?.data.map((item) => (
                        <CampaignCard
                            key={item.title}
                            campaign={item}
                            status={params?.campaignType}
                            setMode={editCampaign}
                            color={'#F5F8FF'}
                            fetchCampaigns={fetchMore}
                        />
                    ))}
                </div>
            ) : (
                allCampaign?.meta?.total > 0 && <div className='flex h-48 justify-center items-center w-full text-[#8b8b8b]'>No Campaigns available.</div>
            )}

            {!loader ? (
                <InView as='div' onChange={(inView, entry) => inView && loadMore()} className='flex items-center justify-center h-8'></InView>
            ) : (
                <div className='flex items-center justify-center h-8'>
                    <LoaderIcon />
                </div>
            )}

            {allCampaign?.meta?.total === 0 && (
                <NewCampaign
                    action={() => {
                        setMode('add');
                        setOpenCampaingModal(true);
                    }}
                    title={'New Campaign'}
                    buttonText={'Create a new Campaign'}
                    description={
                        'Create a campaign and automate your campaign performance tracking. Get detailed post metrics & dashboard for you and your brands.'
                    }
                />
            )}
        </div>
    );
}
