'use client';
import { CheckCheckIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';

const adavtages = [
    {
        title: 'Speed',
        withOutLoqo: 'Time-consuming data collection and analysis that are prone to human error and delays.',
        withLoqo: 'Super fast data crunching and report generation that enable quick insights for decision-making.',
    },
    // {
    //     title: 'Scalability',
    //     withOutLoqo: 'Has limited scalability and can become overwhelming with increased campaign volume.',
    //     withLoqo: 'Analyzes 1000s of campaign posts at once. Scales with your orgs needs.',
    // },
    {
        title: 'Analytics',
        withOutLoqo: 'Has limited insights and relies on basic data analysis.',
        withLoqo: 'Uncovers trends and patterns with advanced analytics and reporting features.',
    },
    {
        title: 'Visualization',
        withOutLoqo: 'Heavy to consume presentation that requires manual creation of reports and visuals.',
        withLoqo: 'Easy to understand data stories with interactive dashboards and visualization.',
    },
    {
        title: 'Team Focus',
        withOutLoqo: 'Team spends significant time on data collection and analysis.',
        withLoqo: 'Team focuses on strategic tasks and have more time for campaign planning and optimization.',
    },
];

export const LOQOAdvantages = () => {
    const ref = useRef(null);
    return (
        <section ref={ref} id='why-LOQO ai' className='pt-8 sm:pt-16 pb-5 flex flex-col justify-center'>
            <div className='flex flex-col gap-y-2 xl:w-1/2'>
                <h2 className='text-2xl font-normal'>The LOQO Advantage</h2>
                <p className='text-pretty text-base font-light text-gray-500'>Check out how LOQO has empowered agencies with unmatched efficiency</p>
            </div>
            <div className='flex flex-col gap-y-2 mt-2 sm:mt-8'>
                <table className='hidden md:flex min-w-full'>
                    <tbody>
                        <tr>
                            <th className='w-40 border border-t-0 border-l-0 border-gray-300 text-[22px] px-8 py-6 text-left'></th>
                            <th className='border border-t-0 border-gray-300 text-[22px] px-8 py-6'>
                                <div className='flex gap-4 justify-center'>
                                    <span>Without LOQO</span>
                                    <XIcon color='#8B0000' size={32} />
                                </div>
                            </th>
                            <th className='border border-r-0 border-t-0 border-gray-300 text-[22px] px-8 py-6'>
                                <div className='flex gap-4 justify-center'>
                                    <span>With LOQO</span>
                                    <CheckCheckIcon color='#06402B' size={32} />
                                </div>
                            </th>
                        </tr>
                        {adavtages.map((item) => (
                            <tr key={item.title}>
                                <th className='w-40 border border-l-0 border-gray-300 text-[22px] px-8 py-6 text-left'>{item.title}</th>
                                <td className='border border-gray-300 text-[18px] px-8 py-6 text-center font-light'>{item.withOutLoqo}</td>
                                <td className='border border-r-0 border-gray-300 text-[18px] px-8 py-6 text-center font-light'>{item.withLoqo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex sm:hidden flex-col'>
                    {adavtages.map((item) => (
                        <div className='flex flex-col shadow-lg' key={item.title}>
                            <div className='flex w-full font-semibold justify-center px-4 py-3 text-left mt-4 border border-gray-300'>{item.title}</div>
                            <div className='flex text-sm'>
                                <div className='flex flex-col border-r border-gray-300 w-1/2'>
                                    <div className='text-center font-normal pt-4'>Without LOQO</div>
                                    <div className='flex p-4 text-center font-light'>{item.withOutLoqo}</div>
                                </div>
                                <div className='flex flex-col font-normal w-1/2'>
                                    <div className='text-center pt-4'>With LOQO</div>
                                    <div className='flex p-4 text-center font-light'>{item.withLoqo}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
