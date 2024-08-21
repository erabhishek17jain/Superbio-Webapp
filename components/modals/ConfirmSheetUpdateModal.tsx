import { XIcon } from "lucide-react";
import ReportIcon from "../../icons/ReportIcon";

export default function ConfirmSheetUpdateModal({ handleConfirm, openCloseModal }: any) {
    const handleUpdate = () => {
        handleConfirm();
        openCloseModal();
    };
    return (
        <div id='confirm-sheet-update' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center m-auto'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[50%] sm:w-[60%] lg:w-[50%] xl:w-[40%]'>
                    <span className='text-xl font-semibold'>Update Campaign</span>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm`}>
                            Do you really want to update. If you update this sheet then you previous data will be deleted.
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button onClick={handleUpdate} className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white'>
                            <ReportIcon size={20} color={'#fff'} />
                            Update Sheet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
