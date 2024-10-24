import { XIcon } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import ReportIcon from '../../icons/ReportIcon';
import ProfileNetworkService from '@/services/profile.service';

export default function UpdateMappingModal({ profileId, currentMapping, openCloseModal, index, columns, setColumns }: any) {
    const [error, setError] = useState(false);
    const [mapping, setMapping] = useState({ ...currentMapping });
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<any>([...currentMapping.tags]);

    const addTag = () => {
        setTag('');
        setTags([...tags, tag]);
        setMapping({ ...mapping, tags: [...tags, tag] });
    };

    const updateProfileMapping = () => {
        const params = { ...mapping };
        if (JSON.stringify(params) !== JSON.stringify(currentMapping)) {
            ProfileNetworkService.instance.updateProfileMapping(profileId, params).then((res) => {
                enqueueSnackbar('Profile mapping updated successfully', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                openCloseModal();
                const cols = [...columns];
                cols[index] = {
                    ...cols[index],
                    customTags: mapping.tags,
                    customCategory: mapping.category,
                    customAveragePostCost: mapping.averagePostCost,
                };
                setColumns([...cols]);
            });
        } else {
            setError(true);
        }
    };

    return (
        <div id='update-estimatedReach' className='fixed w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-lg p-6 w-[90%] md:w-[50%] sm:w-[60%] lg:w-[50%] xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <span className='text-2xl font-semibold'>Update Post mapping</span>
                        <button onClick={openCloseModal} className='cursor-pointer bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col gap-5'>
                        <div className={`grid grid-cols-2 gap-5 w-full overflow-y-scroll max-h-80 text-sm text-black`}>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Custom Average Post Cost
                                </label>
                                <input
                                    min='0'
                                    type='number'
                                    name='averagePostCost'
                                    value={mapping.averagePostCost}
                                    placeholder='Enter average post cost'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    onChange={(e) => setMapping({ ...mapping, averagePostCost: parseInt(e.target.value) })}
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct post cost count</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Custom Category
                                </label>
                                <input
                                    type='text'
                                    name='category'
                                    placeholder='Enter category'
                                    value={mapping.category}
                                    onChange={(e) => setMapping({ ...mapping, category: e.target.value })}
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                />
                                {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct category</p>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='' className='text-sm'>
                                Custom Tags
                            </label>
                            <p className='flex gap-2 w-full items-baseline'>
                                <input
                                    type='text'
                                    name='tags'
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    placeholder='Enter tag name'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                />
                                <button
                                    onClick={addTag}
                                    disabled={tag === ''}
                                    className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm mt-2 py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                    Add
                                </button>
                                <div className='flex items-center w-full'>
                                    {tags.length > 0 && (
                                        <div className='flex gap-2 flex-wrap'>
                                            {tags?.map((text: string, index: number) => (
                                                <div className='flex px-3 bg-[#DAE4FF] text-[#033DD0] py-1 rounded-full' key={'keyword' + index}>
                                                    <span className='text-xs'>{text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </p>
                            {error && <p className='mt-1 text-[12px] text-[#d00a0a] ml-2'>Please enter correct tag name</p>}
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={openCloseModal}
                            className='bg-white border-black border mr-5 flex items-center rounded-lg py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button onClick={updateProfileMapping} className='cursor-pointer bg-black flex items-center rounded-lg py-2 pl-4 pr-5 text-white'>
                            <ReportIcon color='#fff' size={24} />
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
