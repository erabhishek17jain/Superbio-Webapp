'use client';
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
    //     withLoqo: 'Analyzes 1000s of campaign posts at once. Scales with your agency needs.',
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
                                    <svg width='24px' height='24px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' fill='#8B0000'>
                                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs>
                                            <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                                <g id='Icon-Set-Filled' transform='translate(-469.000000, -1041.000000)' fill='#8B0000'>
                                                    <path
                                                        d='M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48'
                                                        id='cross'></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className='border border-r-0 border-t-0 border-gray-300 text-[22px] px-8 py-6'>
                                <div className='flex gap-4 justify-center'>
                                    <span>With LOQO</span>
                                    <svg
                                        fill='#06402B'
                                        width='40px'
                                        height='40px'
                                        viewBox='0 0 24 24'
                                        version='1.2'
                                        baseProfile='tiny'
                                        xmlns='http://www.w3.org/2000/svg'
                                        stroke='#06402B'>
                                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <path d='M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z'></path>
                                        </g>
                                    </svg>
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
