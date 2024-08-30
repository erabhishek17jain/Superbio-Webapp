'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setNewCampaign } from '@/context/campaign';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import CampaignNetworkService from '@/services/campaign.service';
import { XIcon } from 'lucide-react';
import ReportIcon from '../../icons/ReportIcon';

export default function CreateCampaignModal({ mode, openCloseModal, campaignDetails, type }: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { newCampaign } = useAppSelector((state) => state.campaign);
    const { enqueueSnackbar } = useSnackbar();
    const [isError, setIsError] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [campaignDetail, setCampaignDetail] = useState<any>({
        title: '',
        description: '',
        brand: '',
        status: 'active',
        keywords: [],
        priority: 1,
        startDate: new Date(),
        type: type,
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    });

    const setKeyAndValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let copyCampaign = JSON.parse(JSON.stringify(campaignDetail));
        copyCampaign[e.target.name] = e.target.value;
        setCampaignDetail({ ...copyCampaign });
    };

    const handleKeyWords = (e: any) => {
        setKeyword(e.target.value);
    };

    const setKeyWords = (e: any) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            let copyCampaign = JSON.parse(JSON.stringify(campaignDetail));
            if (!copyCampaign.hasOwnProperty('keywords')) {
                copyCampaign['keywords'] = [];
            }
            copyCampaign.keywords.push(keyword);
            setCampaignDetail(copyCampaign);
            setKeyword('');
        }
    };

    const setPriority = (value: number) => {
        let copyCampaign = JSON.parse(JSON.stringify(campaignDetail));
        copyCampaign.priority = value;
        setCampaignDetail(copyCampaign);
    };

    const setDate = (e: ChangeEvent<HTMLInputElement>) => {
        let copyCampaign = JSON.parse(JSON.stringify(campaignDetail));
        copyCampaign[e.target.name] = dayjs(new Date(e.target.value)).format('YYYY-MM-DD');
        setCampaignDetail(copyCampaign);
    };

    const submitCampaign = () => {
        let error = false;
        if (
            !campaignDetail?.title ||
            !campaignDetail?.brand ||
            !campaignDetail?.startDate ||
            !campaignDetail?.status ||
            campaignDetail?.keywords?.length === 0
        ) {
            error = true;
            setIsError(true);
        }
        if (!error) {
            if (mode === 'add') {
                CampaignNetworkService.instance.createCampaign(campaignDetail).then((res) => {
                    enqueueSnackbar('Campaign created successfully', { variant: 'success' });
                    router.push(`/${type}/${res.status}/create/${res.id}`);
                    openCloseModal();
                });
            } else {
                CampaignNetworkService.instance.updateCampaign(campaignDetail).then((res) => {
                    enqueueSnackbar('Campaign updated successfully', { variant: 'success' });
                    router.push(`/${type}/${res.status}/create/${res.id}`);
                    openCloseModal();
                });
            }
        }
    };

    useEffect(() => {
        if (mode === 'edit') {
            dispatch(setNewCampaign(campaignDetails));
            setCampaignDetail(campaignDetails);
        }
    }, []);

    return (
        <div id='create' className='fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40 z-20'>
            <div className='flex w-full h-screen justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-5 sm:p-6 overflow-y-auto mt-6 mb-20 sm:mb-6 h-[calc(100%_-_100px)] sm:h-auto w-[94%] md:w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[60%]'>
                    <div className='flex justify-between'>
                        <span className='text-xl font-semibold'>{mode === 'edit' ? 'Edit' : 'Create'} a Campaign</span>
                        <button onClick={openCloseModal} className='bg-white flex items-center text-black'>
                            <XIcon color='#000' size={24} />
                        </button>
                    </div>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row'>
                        <div className='flex flex-col flex-1 pr-0 sm:pr-5'>
                            <div className='flex flex-col'>
                                <label htmlFor='' className='text-sm'>
                                    Title of the Campaign
                                </label>
                                <input
                                    type='text'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter title'
                                    name='title'
                                    value={campaignDetail?.title}
                                    onChange={setKeyAndValue}
                                />
                                {isError && campaignDetail?.title === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Description of the Campaign
                                </label>
                                <input
                                    type='text'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter description'
                                    name='description'
                                    value={campaignDetail?.description}
                                    onChange={setKeyAndValue}
                                />
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Brand Name
                                </label>
                                <input
                                    type='text'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter brand'
                                    name='brand'
                                    value={campaignDetail?.brand}
                                    onChange={setKeyAndValue}
                                />
                                {isError && campaignDetail?.brand === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Status
                                </label>
                                <select
                                    name='status'
                                    id=''
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    value={campaignDetail.status}
                                    onChange={setKeyAndValue}>
                                    <option value=''>Select Status</option>
                                    <option value='active'>Active</option>
                                </select>
                                {isError && campaignDetail?.status === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                        </div>
                        <div className='flex flex-col flex-1 pr-0 sm:pr-5 mt-6 sm:mt-0'>
                            <div className='flex flex-col '>
                                <label htmlFor='' className='text-sm'>
                                    Add Keywords <span className='text-xs'>(Important tags to group campaigns)</span>
                                </label>
                                <input
                                    type='text'
                                    className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                    placeholder='Enter Keywords and press enter'
                                    name='keywords'
                                    onChange={handleKeyWords}
                                    onKeyDown={setKeyWords}
                                    value={keyword}
                                />
                                {isError && campaignDetail?.keywords?.length === 0 && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                                <div className='flex mt-2 gap-2'>
                                    {campaignDetail?.keywords?.map((text: string, index: number) => (
                                        <div className='flex px-3 bg-[#DAE4FF] text-[#033DD0] py-1 rounded-full' key={'keyword' + index}>
                                            <span className='text-xs'>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Select Priority
                                </label>
                                <div className='flex mt-3'>
                                    {['Low', 'Medium', 'High'].map((item, index) => (
                                        <div
                                            className={`flex cursor-pointer ${
                                                campaignDetail?.priority === index
                                                    ? 'bg-black text-white text-opacity-100'
                                                    : 'bg-[#F7F7F7] text-opacity-30 text-black'
                                            } px-4 rounded-xl mr-2 p-2 font-semibold`}
                                            key={item}
                                            onClick={() => setPriority(index)}>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                {isError && campaignDetail?.priority > 2 && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label htmlFor='' className='text-sm'>
                                    Set Timeline
                                </label>
                                <div className='flex w-full justify-start'>
                                    <input
                                        type='date'
                                        className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm mr-2'
                                        placeholder='Start from'
                                        value={dayjs(campaignDetail?.startDate).format('YYYY-MM-DD')}
                                        onChange={setDate}
                                        name='startDate'
                                        max={campaignDetail?.endDate ? new Date(campaignDetail?.endDate)?.toISOString().substring(0, 10) : 0}
                                    />
                                    <input
                                        type='date'
                                        className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 rounded-lg text-sm'
                                        placeholder='End'
                                        value={dayjs(campaignDetail?.endDate).format('YYYY-MM-DD')}
                                        onChange={setDate}
                                        name='endDate'
                                        min={campaignDetail?.startDate ? new Date(campaignDetail?.startDate).toISOString().substring(0, 10) : 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={() => {
                                openCloseModal();
                            }}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-3 sm:pr-5 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        <button
                            onClick={submitCampaign}
                            disabled={JSON.stringify(newCampaign) === JSON.stringify(campaignDetail)}
                            className='bg-black flex items-center rounded-xl py-2 pl-4 pr-5 text-white disabled:text-[#898989]'>
                            <ReportIcon size={20} color={'#fff'} />
                            {mode === 'edit' ? 'Proceed to Sheet' : 'Create Campaign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
