import { XIcon } from "lucide-react";

export default function ConfirmLastRefreshModal({ openCloseModal }: any) {
    return (
        <div id='confirm-last-refresh' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center m-auto'>
                <div className='flex flex-col bg-white rounded-lg p-6 w-[90%] md:w-[50%] sm:w-[60%] lg:w-[50%] xl:w-[40%]'>
                    <span className='text-xl font-semibold'>Last Report Generated</span>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm`}>
                            Your report is already updated, You cannot refresh untill 60 minutes completed from last report.
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-lg py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
