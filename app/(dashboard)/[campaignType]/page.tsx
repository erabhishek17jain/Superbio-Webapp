'use client';
import CampaignCard from '@/components/CampaignCard';
import CreateCampaignModal from '@/components/Modals/CreateCampaignModal';
import CampaignNetworkService from '@/services/campaign.service';
import { useParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ICampaign } from '@/context/campaign';

export default function AllCampaignPage() {
    const params: any = useParams();
    const [mode, setMode] = useState('add');
    const [campaignDetails, setCampaignDetails] = useState({});
    const [openCampaingModal, setOpenCampaingModal] = useState(false);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<{
        page: number;
        limit: number;
        total: number;
    }>({
        page: 1,
        limit: 12,
        total: 0,
    });
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

    const status = params?.campaignType?.split('-')[0].includes('shared') ? 'active' : params?.campaignType?.split('-')[0];
    const ownerType = params?.campaignType?.split('-')[0].includes('shared') ? 'shared' : 'own';
    const { data: respsonse, isLoading: loading } = useSWR(
        `?page=${page}&limit=${12}&status=${status}&ownerType=${ownerType}`,
        CampaignNetworkService.instance.fetcherWithMeta
    );

    const editCampaign = (campaign: any) => {
        setMode('edit');
        setOpenCampaingModal(true);
        setCampaignDetails(campaign);
    };

    useEffect(() => {
        if (respsonse && respsonse?.data?.length > 0) {
            setCampaigns([...campaigns, ...respsonse.data]);
            setMeta(respsonse.meta);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respsonse]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (campaigns.length < meta.total) {
                        setPage(page + 1);
                    }
                }
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById('load-more');
        if (target) {
            observer.observe(target);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaigns, meta]);

    return (
        <div className='flex px-8 py-4 flex-col'>
            {openCampaingModal && (
                <CreateCampaignModal
                    mode={mode}
                    campaignDetails={campaignDetails}
                    closeModal={() => {
                        setOpenCampaingModal(false);
                    }}
                />
            )}
            {campaigns && campaigns?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-4'>
                    {campaigns.map((item) => (
                        <CampaignCard key={item.id} campaign={item} status={params?.campaignType} setMode={editCampaign} color={'#F5F8FF'} />
                    ))}
                </div>
            )}

            <div id='load-more'></div>

            {respsonse?.meta?.total === 0 && (
                <div className='flex flex-col gap-5 items-center justify-center w-96 h-screen m-auto'>
                    <div className='flex items-center justify-center rounded-lg bg-[#F5F8FF] w-20 h-20'>
                        <svg width='60' height='60' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='stroke-2 stroke-black'>
                            <path
                                d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                                fill='white'
                            />
                        </svg>
                    </div>
                    <div className='text-3xl font-bold'>New Campaign</div>
                    <div className='text-sm text-[#959595]'>
                        Seize the moment! Hit that CTA button to launch your campaign and dive into the world of campaign reporting.
                    </div>
                    <button
                        onClick={() => {
                            setMode('add');
                            setOpenCampaingModal(true);
                        }}
                        className='bg-black flex items-center py-3 rounded-xl px-6 text-white text-sm gap-2'>
                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='stroke-2 stroke-black'>
                            <path
                                d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                                fill='white'
                            />
                        </svg>
                        <span className='flex'>Create a new Campaigns</span>
                    </button>
                </div>
            )}
        </div>
    );
}
