import Dropdown from './Dropdown';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'usehooks-ts';
import { AreaChartIcon, ArrowDownAZIcon, ArrowUpDownIcon, DownloadIcon, HeartIcon, Instagram, SlidersHorizontalIcon, TwitterIcon } from 'lucide-react';

export default function LoadingReporting({ isPublic, title }: any) {
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    return (
        <div className='flex flex-col sm:px-6 md:px-6 mt-2 w-full'>
            <div className='animate-pulse'>
                <div className={`flex py-2 flex-col md:flex-row justify-between gap-4 items-center h-[108px] sm:h-[60px]`}>
                    <div className='flex text-lg font-bold text-center md:text-left'>
                        <span className='flex text-lg font-bold text-center md:text-left sm:flex-none flex-wrap gap-y-3 sm:justify-between justify-center'>
                            <div className='flex flex-col text-sm w-80'>
                                <span className='text-[#8b8b8b] text-xl sm:text-2xl font-semibold capitalize'>
                                    {title === undefined ? 'Campaign Name' : title}
                                </span>
                            </div>
                        </span>
                    </div>
                    <div className='flex flex-col items-center gap-3 sm:flex-row'>
                        <div className='flex'>
                            <div className='flex items-center gap-2 border border-[#ccc] px-2 rounded-lg font-semibold text-[#8b8b8b] sm:text-center md:text-left text-sm mr-4 cursor-pointer'>
                                <AreaChartIcon color='#8b8b8b' size={20} />
                                Generate Report
                            </div>
                            <button className='flex items-center bg-[#ccc] py-2 px-4 rounded-lg space-x-2 cursor-pointer text-sm text-white h-11 disabled:opacity-50 disabled:cursor-not-allowed'>
                                <DownloadIcon color='#fff' size={20} />
                                <span className='text-opacity-80'>Download CSV</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8b8b8b] sm:text-center md:text-left text-sm sm:text-sm mt-2'>
                    <div className='flex gap-3'>
                        <div className='flex gap-5'>
                            <div className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 text-white bg-[#ccc]`}>All</div>
                            <div className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 text-white bg-[#ccc]`}>
                                <TwitterIcon color={'#fff'} size={20} />
                                <span>Twitter</span>
                            </div>
                            <div className={`flex gap-2 items-center p-3 cursor-pointer rounded-md h-9 text-white bg-[#ccc]`}>
                                <Instagram color={'#fff'} size={20} />
                                <span>Instagram</span>
                            </div>
                        </div>
                    </div>
                    <span className='flex gap-3 justify-center items-center'>
                        <span className='flex items-center justify-end text-sm gap-2 h-12'>
                            <span className={`flex items-center gap-2 text-base font-semibold cursor-pointer text-[#8b8b8b]`}>
                                <SlidersHorizontalIcon color={'#8b8b8b'} size={20} />
                                Filter by
                            </span>
                        </span>
                        <Dropdown
                            width={'w-40'}
                            position='down'
                            options={[]}
                            header={
                                <div className='flex h-12 w-auto items-center justify-center gap-2 rounded-lg cursor-pointer text-sm text-[#9A9AB0] font-semibold'>
                                    <ArrowUpDownIcon color={'#8b8b8b'} size={20} />
                                    <span className='capitalize text-[#8b8b8b]'>Sort By:</span>
                                    <span
                                        className='flex items-center gap-2 w-auto min-w-120 bg-[#e6e6e6] text-[#8b8b8b] rounded-md py-1 px-3 h-9'
                                        onClick={() => document.getElementById('date-dropdown')?.classList.toggle('hidden')}>
                                        <HeartIcon color={'#8b8b8b'} size={20} />
                                        <span>Likes</span>
                                    </span>
                                    <span
                                        title={'Sort Descending'}
                                        className='flex items-center gap-2 w-auto min-w-120 bg-[#e6e6e6] text-[#000] rounded-md py-1 px-3 h-9'>
                                        <ArrowDownAZIcon color={'#8b8b8b'} size={20} />
                                    </span>
                                </div>
                            }
                        />
                    </span>
                </div>
                <div className='flex'>
                    <div className='flex w-full flex-col mx-2 sm:mx-0'>
                        <div className='mt-3 sm:mt-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 w-full gap-4'>
                            {Array(isPublic ? 2 : isSmallDevice ? 4 : 6)
                                .fill('')
                                ?.map(() => (
                                    <div className='flex relative' key={uuidv4()}>
                                        <div
                                            className={`flex justify-start flex-col sm:justify-center shadow-inner bg-[#898989] w-full py-3 px-3 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}>
                                            <div className='flex gap-2 justify-between sm:w-auto'>
                                                <div className={`flex items-center justify-center bg-[#898989] bg-opacity-60 w-7 h-7 mr-3 rounded-full`}></div>
                                                <div className='flex gap-2'>
                                                    <p className='text-2xl text-black-100'></p>
                                                </div>
                                            </div>
                                            <div className='flex h-9 items-end justify-between w-full'>
                                                <p className='text-xs text-black-500'></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex w-full flex-col mx-2 sm:mx-0'>
                        <div className='mt-3 sm:mt-3 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full gap-4'>
                            {Array(isSmallDevice ? 1 : 3)
                                .fill('')
                                ?.map(() => (
                                    <div className='flex relative' key={uuidv4()}>
                                        <div
                                            className={`flex justify-start flex-col sm:justify-center shadow-inner bg-[#898989] w-full py-3 px-3 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}>
                                            <div className='flex gap-2 justify-between sm:w-auto'>
                                                <div className={`flex items-center justify-center bg-[#ccc] bg-opacity-60 w-7 h-7 rounded-full`}></div>
                                                <div className={`flex items-center justify-center bg-[#ccc] bg-opacity-60 w-7 h-7 rounded-md`}></div>
                                            </div>
                                            <div className='grid grid-cols-3 h-28'>
                                                <div className='border-b border-[#ccc]'></div>
                                                <div className='border-b border-l border-r border-[#ccc]'></div>
                                                <div className='border-b border-[#ccc]'></div>
                                                <div></div>
                                                <div className='border-l border-r border-[#ccc]'></div>
                                                <div></div>
                                            </div>
                                            <div className='flex items-end justify-between w-full'>
                                                <div className='w-full p-2 mx-auto'>
                                                    <div className='animate-pulse space-y-4'>
                                                        <div className='flex items-center space-x-4'>
                                                            <div className='rounded-full bg-[#ccc] h-10 w-10'></div>
                                                            <div className='flex-1 space-y-2'>
                                                                <div className='h-4 bg-[#ccc] rounded w-32'></div>
                                                                <div className='h-3 bg-[#ccc] rounded w-24'></div>
                                                            </div>
                                                        </div>
                                                        <div className='bg-[#ccc] h-40 w-full rounded'></div>
                                                        <div className='flex space-x-4'>
                                                            <div className='h-4 bg-[#ccc] rounded w-12'></div>
                                                            <div className='h-4 bg-[#ccc] rounded w-16'></div>
                                                        </div>
                                                        <div className='space-y-2'>
                                                            <div className='h-4 bg-[#ccc] rounded w-5/6'></div>
                                                            <div className='h-4 bg-[#ccc] rounded w-4/6'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
