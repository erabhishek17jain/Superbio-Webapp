'use client';
import React from 'react';
import FilterHandler from './FilterHandler';
import { ISummary } from './PDFHandler';
import { v4 as uuidv4 } from 'uuid';
import Reporting from './Reporting';

interface FilterPlatformProps {
    campData: any;
    query: any;
    params: any;
    sParams: any;
    filters: any;
    selectFilter: any;
    summary: ISummary[];
    filtersOptions: AvailableFilters;
}

export default function FilterPlatform(props: FilterPlatformProps) {
    const { campData, query, params, sParams, summary, filters, selectFilter, filtersOptions } = props;

    const changePlatform = (platform: string) => {
        selectFilter(true, 'platform', platform);
    };

    const analytics: ISummary[] = summary?.filter((el) => {
        if (filters && filters['platform']?.includes('instagram')) {
            return !(el.title !== 'likes' && el.title !== 'views' && el.title !== 'comments' && el.title !== 'Estimated Reach');
        } else {
            return el;
        }
    });

    let cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 w-full gap-4';
    if (analytics?.length === 6) cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 w-full gap-4';
    if (analytics?.length === 7) cols = 'mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 w-full gap-4';
    
    return (
        <>
            {campData?.data && campData?.data.length > 0 && (
                <div className='flex flex-col sm:flex-row items-center justify-between gap-3 text-[#959595] sm:text-center md:text-left text-sm sm:text-sm mt-2'>
                    <div className='flex gap-3'>
                        <div className='flex gap-5'>
                            <div
                                onClick={() => changePlatform('all')}
                                className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                    filters && filters['platform']?.length === 0 ? 'text-white bg-black' : 'text-black'
                                }`}>
                                All
                            </div>
                            {filtersOptions && filtersOptions['platform']?.includes('twitter') && (
                                <div
                                    onClick={() => changePlatform('twitter')}
                                    className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                        filters && filters['platform']?.includes('twitter') ? 'text-white bg-[#1257a0]' : 'text-black'
                                    }`}>
                                    <svg
                                        fill={filters && filters['platform']?.includes('twitter') ? '#ffffff' : '#1257a0'}
                                        height='20px'
                                        width='20px'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 310 310'>
                                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <g id='XMLID_826_'>
                                                <path
                                                    id='XMLID_827_'
                                                    d='M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73 c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783 c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598 C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467 c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977 c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889 c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597 c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961 c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895 c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367 c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998 C307.394,57.037,305.009,56.486,302.973,57.388z'></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Twitter</span>
                                </div>
                            )}
                            {filtersOptions && filtersOptions['platform']?.includes('instagram') && (
                                <div
                                    onClick={() => changePlatform('instagram')}
                                    className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 ${
                                        filters && filters['platform']?.includes('instagram') ? 'text-white instagram' : 'text-black'
                                    }`}>
                                    {filters && filters['platform']?.includes('instagram') ? (
                                        <svg
                                            fill='#fff'
                                            width='20px'
                                            height='20px'
                                            viewBox='0 0 32 32'
                                            id='Camada_1'
                                            version='1.1'
                                            xmlns='http://www.w3.org/2000/svg'
                                            stroke='#fff'>
                                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                            <g id='SVGRepo_iconCarrier'>
                                                <g>
                                                    <path d='M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z'></path>{' '}
                                                    <path d='M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8 c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z'></path>{' '}
                                                    <path d='M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8 c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z'></path>{' '}
                                                </g>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg width='20px' height='20px' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                            <g id='SVGRepo_iconCarrier'>
                                                <rect x='2' y='2' width='28' height='28' rx='6' fill='url(#paint0_radial_87_7153)'></rect>
                                                <rect x='2' y='2' width='28' height='28' rx='6' fill='url(#paint1_radial_87_7153)'></rect>
                                                <rect x='2' y='2' width='28' height='28' rx='6' fill='url(#paint2_radial_87_7153)'></rect>
                                                <path
                                                    d='M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z'
                                                    fill='white'></path>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z'
                                                    fill='white'></path>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z'
                                                    fill='white'></path>
                                                <defs>
                                                    <radialGradient
                                                        id='paint0_radial_87_7153'
                                                        cx='0'
                                                        cy='0'
                                                        r='1'
                                                        gradientUnits='userSpaceOnUse'
                                                        gradientTransform='translate(12 23) rotate(-55.3758) scale(25.5196)'>
                                                        <stop stopColor='#B13589'></stop> <stop offset='0.79309' stopColor='#C62F94'></stop>
                                                        <stop offset='1' stopColor='#8A3AC8'></stop>
                                                    </radialGradient>
                                                    <radialGradient
                                                        id='paint1_radial_87_7153'
                                                        cx='0'
                                                        cy='0'
                                                        r='1'
                                                        gradientUnits='userSpaceOnUse'
                                                        gradientTransform='translate(11 31) rotate(-65.1363) scale(22.5942)'>
                                                        <stop stopColor='#E0E8B7'></stop> <stop offset='0.444662' stopColor='#FB8A2E'></stop>
                                                        <stop offset='0.71474' stopColor='#E2425C'></stop>
                                                        <stop offset='1' stopColor='#E2425C' stopOpacity='0'></stop>
                                                    </radialGradient>
                                                    <radialGradient
                                                        id='paint2_radial_87_7153'
                                                        cx='0'
                                                        cy='0'
                                                        r='1'
                                                        gradientUnits='userSpaceOnUse'
                                                        gradientTransform='translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)'>
                                                        <stop offset='0.156701' stopColor='#406ADC'></stop>
                                                        <stop offset='0.467799' stopColor='#6A45BE'></stop>
                                                        <stop offset='1' stopColor='#6A45BE' stopOpacity='0'></stop>
                                                    </radialGradient>
                                                </defs>
                                            </g>
                                        </svg>
                                    )}
                                    <span>Instagram</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <FilterHandler meta={campData?.meta} shouldShowSort={true} query={query} />
                </div>
            )}

            {campData?.meta && campData?.data.length > 0 && (
                <div className='flex'>
                    <div className='flex w-full flex-col mx-2 sm:mx-0'>
                        <div className={cols}>
                            {analytics?.map((item) => (
                                <div
                                    key={uuidv4()}
                                    className={`flex justify-start flex-col sm:justify-center shadow-inner ${item.color} w-full p-4 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}>
                                    <div className='flex gap-2 justify-between sm:w-auto'>
                                        <div className={`flex items-center justify-center ${item.color} bg-opacity-60 w-10 h-10 mr-3 rounded-full`}>
                                            {item.icon}
                                        </div>
                                        <div className='flex gap-2'>
                                            <p className='text-2xl text-black-100'>{item?.count}</p>
                                        </div>
                                    </div>
                                    <div className='flex h-9 items-end justify-between w-full'>
                                        <p className='text-xs text-black-500'>
                                            {item.title === 'Estimated Reach' || item.title === 'Posts'
                                                ? item.title
                                                : `Only ${item.basedOn} ${item.title === 'views' && filters && filters['platform']?.includes('instagram') ? 'reel' : ''} posts have ${item.title}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {campData?.data && campData?.data.length > 0 && (
                <Reporting
                    query={query}
                    meta={campData?.meta}
                    campaignId={params.campaignId}
                    initialColumns={campData?.data}
                    isPublic={sParams.isPublic ? sParams.isPublic : false}
                />
            )}
        </>
    );
}
