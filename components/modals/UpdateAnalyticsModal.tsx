import JavaNetworkService from '@/services/java.service';
import { XIcon } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import ReportIcon from '../../icons/ReportIcon';

export default function UpdateAnalyticsModal({ postId, platform, currentAnalytics, openCloseModal, index, columns, setColumns }: any) {
    const [error, setError] = useState(false);
    const [analytics, setAnalytics] = useState({ ...currentAnalytics });

    const updateEstimatedReach = () => {
        const params = { ...analytics };
        if (JSON.stringify(params) !== JSON.stringify(currentAnalytics)) {
            JavaNetworkService.instance.updatePostAnalytics(postId, params).then((res) => {
                enqueueSnackbar('Estimated Reach upadated successfully', { variant: 'success' });
                openCloseModal();
                columns[index] = res;
                setColumns([...columns]);
            });
        } else {
            setError(true);
        }
    };
    return (
        <div id='update-estimatedReach' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[50%] sm:w-[60%] lg:w-[50%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Update Post Analytics</span>
                        <button onClick={openCloseModal} className='bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`grid grid-cols-3 gap-5 w-full overflow-y-scroll max-h-80 text-sm text-[#8b8b8b]`}>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Views
                                </label>
                                <input
                                    type='number'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter Views count'
                                    name='views'
                                    value={analytics.views}
                                    onChange={(e) => setAnalytics({ ...analytics, views: e.target.value })}
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct views count</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Likes
                                </label>
                                <input
                                    type='number'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter likes count'
                                    name='likes'
                                    value={analytics.likes}
                                    onChange={(e) => setAnalytics({ ...analytics, likes: e.target.value })}
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct likes count</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Comments
                                </label>
                                <input
                                    type='number'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter comments count'
                                    name='comment'
                                    value={analytics.comments}
                                    onChange={(e) => setAnalytics({ ...analytics, comments: e.target.value })}
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct comments count</p>}
                            </div>
                            {platform === 'twitter' && (
                                <div className='flex flex-col'>
                                    <label htmlFor='' className='text-sm'>
                                        Reposts
                                    </label>
                                    <input
                                        type='number'
                                        className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                        placeholder='Enter reposts count'
                                        name='reposts'
                                        value={analytics.reposts}
                                        onChange={(e) => setAnalytics({ ...analytics, reposts: e.target.value })}
                                    />
                                    {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct reposts count</p>}
                                </div>
                            )}
                            {platform === 'twitter' && (
                                <div className='flex flex-col'>
                                    <label htmlFor='' className='text-sm'>
                                        Quotes
                                    </label>
                                    <input
                                        type='number'
                                        className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                        placeholder='Enter quotes count'
                                        name='quotes'
                                        value={analytics.quotes}
                                        onChange={(e) => setAnalytics({ ...analytics, quotes: e.target.value })}
                                    />
                                    {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct quotes count</p>}
                                </div>
                            )}
                            {platform === 'twitter' && (
                                <div className='flex flex-col'>
                                    <label htmlFor='' className='text-sm'>
                                        Bookmarks
                                    </label>
                                    <input
                                        type='number'
                                        className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                        placeholder='Enter bookmarks count'
                                        name='bookmarks'
                                        value={analytics.bookmarks}
                                        onChange={(e) => setAnalytics({ ...analytics, bookmarks: e.target.value })}
                                    />
                                    {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct estimated reach count</p>}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button onClick={updateEstimatedReach} className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white'>
                            <ReportIcon color='#fff' size={24} />
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}