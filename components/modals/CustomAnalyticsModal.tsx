import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReportIcon from '../../icons/ReportIcon';

export default function CustomAnalyticsModal({ analytics, openCloseModal, updateCustomAnalytics }: any) {
    const [error, setError] = useState(false);
    const [customAnalytics, setCustomAnalytics] = useState<any>([]);

    const updateCustomValues = (key: string, value: string) => {
        const index = customAnalytics.findIndex((item: any) => item.statsType === key);
        customAnalytics[index].customEstimatedValue = parseInt(value);
        setCustomAnalytics([...customAnalytics]);
    };

    const updatePublicView = (key: string, value: string) => {
        const index = customAnalytics.findIndex((item: any) => item.statsType === key);
        customAnalytics[index].hideInPublicView = value;
        setCustomAnalytics([...customAnalytics]);
    };

    useEffect(() => {
        const params = Object.keys(analytics).map((key: any) => {
            return (
                key !== 'customEstimatedReach' && {
                    statsType: key === 'estimatedReach' ? 'REACH' : key.toUpperCase(),
                    calculatedValue: analytics[key],
                    customEstimatedValue: analytics[key],
                    hideInPublicView: false,
                }
            );
        });
        setCustomAnalytics(params.filter((item: any) => item !== false));
    }, []);

    return (
        <div id='update-customAnalytics' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[70%] sm:w-[80%] lg:w-[65%] xl:w-[55%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Update Estimated Reach</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`grid grid-cols-2 gap-4 flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm text-[#8b8b8b]`}>
                            {customAnalytics.map((item: any) => (
                                <div className='flex'>
                                    <div className='flex flex-col'>
                                        <label htmlFor='' className='text-sm capitalize'>
                                            {item.statsType.toLowerCase()}
                                        </label>
                                        <div className='flex gap-2 items-center'>
                                            <input
                                                min='0'
                                                type='number'
                                                name={item.statsType}
                                                value={item.customEstimatedValue}
                                                placeholder={`Enter estimated ${item.statsType.toLowerCase()}`}
                                                onChange={(e: any) => updateCustomValues(e.target.name, e.target.value)}
                                                className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                            />
                                            <input
                                                type='checkbox'
                                                id={item.statsType}
                                                name={item.statsType}
                                                value={item.statsType}
                                                onChange={(e: any) => updatePublicView(e.target.name, e.currentTarget.checked)}
                                                className='flex mt-2 bg-[#F7F7F7] outline-none p-2 px-4 rounded-lg text-sm'
                                            />
                                            <label className='mt-2' htmlFor={item.statsType}>
                                                Public view
                                            </label>
                                        </div>
                                        {error && (
                                            <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct {item.statsType.toLowerCase()} count</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button
                            onClick={() => updateCustomAnalytics(customAnalytics)}
                            className='cursor-pointer bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white'>
                            <ReportIcon color='#fff' size={24} />
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
