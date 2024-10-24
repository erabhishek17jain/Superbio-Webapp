'use client';
import { Params, SearchParams } from '@/interfaces/reporting';
import PostReporting from '@/components/shared-components/posts/PostReporting';
import AdvanceAnalytics from '@/components/shared-components/posts/AdvanceAnalytics';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { ChartAreaIcon, ProportionsIcon } from 'lucide-react';
import React from 'react';

export default function CampaignReporting({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const data = [
        {
            label: 'Advance Analytics',
            value: 'analytics',
            icon: ChartAreaIcon,
            desc: <AdvanceAnalytics searchParams={searchParams} params={params} />,
        },
        {
            label: 'Campaign Reporting',
            value: 'reporting',
            icon: ProportionsIcon,
            desc: <PostReporting searchParams={searchParams} params={params} />,
        },
    ];
    return (
        <div className='flex flex-col w-full' id='camp-top'>
            {!searchParams.isPublic && <div className='w-full h-[60px]'></div>}
            <Tabs value='reporting'>
                <div className='flex w-full justify-center'>
                    {/* <TabsHeader className='w-[30rem] bg-[#eceff199]'>
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} value={value}>
                                <div className='flex items-center gap-2'>
                                    {React.createElement(icon, { className: 'w-5 h-5' })}
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader> */}
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
    );
}
