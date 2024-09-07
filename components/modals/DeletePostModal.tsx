import { useAppSelector } from '@/context';
import JavaNetworkService from '@/services/java.service';
import { Trash2Icon, XIcon } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export default function DeletePostModal({ campaignId, postId, openCloseModal }: any) {
    const [isSending, setIsSending] = useState(false);
    const { campaignType } = useAppSelector((state) => state.user);

    const deletePostProfiles = () => {
        setIsSending(true);
        const api = campaignType === 'profile' ? JavaNetworkService.instance.deleteProfile(campaignId, postId) : JavaNetworkService.instance.deletePost(postId);
        api.then(() => {
            const msg = `${campaignType === 'profile' ? 'Profile' : 'Post'} deleted successfully`;
            enqueueSnackbar(msg, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            const url = new URL(window.location.href);
            window.location.href = url.href;
        });
    };
    return (
        <div id='delete' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[50%] sm:w-[60%] lg:w-[50%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold capitalize'>Delete {campaignType}</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80 text-sm text-[#8b8b8b]`}>
                            Are you sure want to delete this {campaignType}? This action cannot be undone.
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
                            disabled={isSending}
                            onClick={deletePostProfiles}
                            className={`bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white cursor-pointer disabled:opacity-50`}>
                            <Trash2Icon color='#fff' size={24} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
