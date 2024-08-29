import JavaNetworkService from '@/services/java.service';
import { XIcon } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import ReportIcon from '../../icons/ReportIcon';

export default function EstimatedReachModal({ openCloseModal, updateEstimatedReach }: any) {
    const [error, setError] = useState(false);
    const [estimatedReach, setEstimatedReach] = useState('');

    const updateCustomEstimatedReach = () => {
        const params = { estimatedReach: parseInt(estimatedReach) };
        if (estimatedReach !== '' && !isNaN(params.estimatedReach)) {
            updateEstimatedReach(params);
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
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm text-[#8b8b8b]`}>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Estimated Reach
                                </label>
                                <input
                                    min='0'
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
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button onClick={updateCustomEstimatedReach} className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white'>
                            <ReportIcon color='#fff' size={24} />
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
