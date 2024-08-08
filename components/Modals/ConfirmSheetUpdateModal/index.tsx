import React from 'react';

export default function ConfirmSheetUpdateModal({ handleConfirm, openCloseModal }: any) {
    const handleUpdate=()=>{
        handleConfirm()
        openCloseModal()
    }
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
                        <button onClick={handleUpdate} className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white  disabled:opacity-40'>
                            <svg width='20' height='20' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M19.7158 3.36572L2.24081 8.28759C2.09205 8.32826 1.95945 8.4138 1.86106 8.53256C1.76267 8.65131 1.70329 8.79751 1.69099 8.95123C1.67869 9.10496 1.71408 9.25874 1.79233 9.39162C1.87059 9.52451 1.98791 9.63004 2.12831 9.69384L10.1533 13.4907C10.3105 13.5635 10.4368 13.6898 10.5096 13.847L14.3064 21.872C14.3702 22.0124 14.4758 22.1297 14.6087 22.2079C14.7415 22.2862 14.8953 22.3216 15.049 22.3093C15.2028 22.297 15.349 22.2376 15.4677 22.1392C15.5865 22.0408 15.672 21.9082 15.7127 21.7595L20.6346 4.28447C20.6719 4.15695 20.6742 4.02174 20.6412 3.89302C20.6083 3.7643 20.5414 3.64681 20.4474 3.55286C20.3535 3.45891 20.236 3.39197 20.1073 3.35904C19.9785 3.32611 19.8433 3.32842 19.7158 3.36572V3.36572Z'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path d='M10 13.2375L14.2375 9' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Update Sheet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
