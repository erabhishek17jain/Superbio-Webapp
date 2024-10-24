'use client';
import { useEffect, useState } from 'react';
import { Params, SearchParams } from '@/interfaces/reporting';
import PostNetworkService from '@/services/post.service';
import LoadingReporting from '@/components/global-components/LoadingReporting';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import Deliverables from '../analytics/Deliverables';
import EstimatedReach from '../analytics/EstimatedReach';
import EngagementsDetails from '../analytics/EngagementsDetails';
import TopPosts from '../analytics/TopPosts';
import Demographic from '../analytics/Demographic';

const data = [
    {
        label: 'Deliverables',
        value: 'deliverables',
        desc: <Deliverables />,
    },
    {
        label: 'Estimated reach',
        value: 'estimatedReach',
        desc: <EstimatedReach />,
    },
    {
        label: 'Engagements details',
        value: 'engagementDetails',
        desc: <EngagementsDetails />,
    },
    {
        label: 'Top Posts',
        value: 'topPosts',
        desc: <TopPosts />,
    },
    {
        label: 'Demographic',
        value: 'demographic',
        desc: <Demographic />,
    },
];

export default function AdvanceAnalytics({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const [isLoading, setIsLoading] = useState(false);
    const [analyticsdata, setAnalyticsData] = useState<any>({});

    const initialLoadAnalyticsData = () => {
        PostNetworkService.instance.getAnalyticsData(params.campaignId).then((resp) => {
            setAnalyticsData(resp);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        initialLoadAnalyticsData();
    }, []);

    return (
        <div className='flex flex-col w-full' id='camp-top'>
            <div className='flex'>
                {!isLoading ? (
                    <div className='flex flex-col sm:px-6 md:px-6 mt-2 w-full'>
                        <Tabs value='deliverables'>
                            <div className='flex w-full justify-center mt-3'>
                                <TabsHeader className='w-full bg-[#eceff199]'>
                                    {data.map(({ label, value }) => (
                                        <Tab key={value} value={value} className='w-[15rem]'>
                                            <div className='flex items-center gap-2'>{label}</div>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </div>
                            <TabsBody>
                                {data.map(({ value, desc }) => (
                                    <TabPanel key={value} value={value} className='p-0'>
                                        {desc}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                ) : (
                    <LoadingReporting isPublic={searchParams.isPublic ? searchParams.isPublic : false} title={''} />
                )}
            </div>
        </div>
    );
}
