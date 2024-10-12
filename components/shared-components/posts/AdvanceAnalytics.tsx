'use client';
import { useEffect, useState } from 'react';
import { Params, SearchParams } from '@/interfaces/reporting';
import PostNetworkService from '@/services/post.service';

export default function AdvanceAnalytics({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const [isLoading, setIsLoading] = useState(false)
    const [analyticsdata, setAnalyticsData] = useState<any>({})

    const initialLoadAnalyticsData = () => {
        PostNetworkService.instance.getAnalyticsData(params.campaignId ).then((resp) => {
            setAnalyticsData(resp)
            setIsLoading(true);
        });
    };

    useEffect(() => {
        setIsLoading(true)
        initialLoadAnalyticsData()
    }, []);

    return (
        <div className='flex flex-col w-full' id='adv-anlytics'>
            <div className='flex'>Advance Analytics</div>
        </div>
    );
}
