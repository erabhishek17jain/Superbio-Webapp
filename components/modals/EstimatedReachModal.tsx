import JavaNetworkService from '@/services/java.service';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export default function EstimatedReachModal({ campaign, openCloseModal }: any) {
    const [error, setError] = useState(false);
    const [estimatedReach, setEstimatedReach] = useState('');

    const updateEstimatedReach = () => {
        const params = { estimatedReach: parseInt(estimatedReach) };
        if (estimatedReach !== '' && !isNaN(params.estimatedReach)) {
            JavaNetworkService.instance.updateEstimatedReach(campaign.id, params).then((res) => {
                enqueueSnackbar('Estimated Reach upadated successfully', { variant: 'success' });
                openCloseModal();
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
                        <span className='text-2xl font-semibold'>Update Estimated Reach</span>
                        <button onClick={openCloseModal} className='bg-white flex items-center text-black'>
                            <svg width='24' height='24' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                                    stroke='#333333'
                                    strokeWidth='2'
                                    strokeMiterlimit='10'
                                />
                                <path d='M15 9L9 15' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                <path d='M15 15L9 9' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm text-[#959595]`}>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Estimated Reach
                                </label>
                                <input
                                    type='number'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter estimated reach count'
                                    name='name'
                                    value={estimatedReach}
                                    onChange={(e) => setEstimatedReach(e.target.value)}
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct estimated reach count</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black'>
                            <svg width='24' height='24' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                                    stroke='#333333'
                                    strokeWidth='2'
                                    strokeMiterlimit='10'
                                />
                                <path d='M15 9L9 15' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                <path d='M15 15L9 9' stroke='#333333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Cancel
                        </button>
                        <button onClick={updateEstimatedReach} className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17'
                                    stroke='#fff'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
