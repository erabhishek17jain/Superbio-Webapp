import { XIcon } from 'lucide-react';
import { instagramColumns, twitterColumns } from '../shared-components/profiles/DownloadCSV';
import { boolean } from 'zod';

export default function DetailsProfileModal({ type, profile, openCloseModal }: any) {
    return (
        <div id='delete' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-lg p-6 w-[90%] md:w-[70%] sm:w-[80%] lg:w-[70%] xl:w-[60%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold capitalize'>Profile Details</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col'>
                        <div className='flex w-full mb-1 pb-1 items-center justify-center border'>
                            <div className={`cursor-pointer flex flex-col gap-1 justify-center items-center p-2`}>
                                <span className='text-[#000] text-sm font-semibold'>Description</span>
                                <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg text-center'>
                                    {type === 'twitter' ? profile['rawDescription'] : profile['biography']}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col w-full mb-2'>
                            <div className='grid grid-cols-3 w-full border border-t-0'>
                                {(type === 'twitter' ? twitterColumns : instagramColumns)
                                    .filter(
                                        (el) =>
                                            !(
                                                el.key === 'id' ||
                                                el.key === 'biography' ||
                                                el.key === 'rawDescription' ||
                                                el.key === 'profileBannerUrl' ||
                                                el.key === 'profileImageUrl'
                                            )
                                    )
                                    .map((item) => (
                                        <div key={item.key} className={`cursor-pointer flex flex-col justify-center items-center p-2 border-t`}>
                                            <span className='text-[#000] text-sm font-semibold'>{item.label}</span>
                                            <span className='capitalize text-[#8b8b8b] text-sm drop-shadow-lg'>
                                                {typeof profile[item.key] === 'boolean'
                                                    ? profile[item.key]
                                                        ? 'Yes'
                                                        : 'No'
                                                    : profile[item.key]
                                                      ? Array.isArray(profile[item.key])
                                                          ? profile[item.key].join(', ')
                                                          : profile[item.key]
                                                      : 'NA'}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
