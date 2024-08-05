'use client';
import { useAppDispatch, useAppSelector } from '@/context';
import { setNewCampaign } from '@/context/campaign';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import CampaignNetworkService from '@/services/campaign.service';

export default function CreateCampaignModal({ mode, closeModal, campaignDetails }: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { campaignType } = useAppSelector((state) => state.user);
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
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    });

    const setKeyAndValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            if (campaignType === 'influncer') {
                campaignDetail.status = campaignDetail.status + '_p';
            }
            if (mode === 'add') {
                CampaignNetworkService.instance.createCampaign(campaignDetail).then((res) => {
                    enqueueSnackbar('Campaign created successfully', { variant: 'success' });
                    router.push(`/${res.status}-campaign/create-reporting/${res.id}`);
                    closeModal();
                });
            } else {
                CampaignNetworkService.instance.updateCampaign(campaignDetail).then((res) => {
                    enqueueSnackbar('Campaign updated successfully', { variant: 'success' });
                    router.push(`/${res.status}-campaign/create-reporting/${res.id}`);
                    closeModal();
                });
            }
        }
    };

    useEffect(() => {
        if (mode === 'edit') {
            dispatch(setNewCampaign(campaignDetails));
            setCampaignDetail(campaignDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id='create-campaign-pop-up' className='fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40 z-20'>
            <div className='flex w-full h-full justify-center items-center'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[60%]'>
                    <span className='text-xl font-semibold'>{mode === 'edit' ? 'Edit' : 'Create'} a Campaign</span>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row'>
                        <div className='flex flex-col flex-1 pr-5'>
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
                        <div className='flex flex-col flex-1 pr-5 mt-6 sm:mt-0'>
                            <div className='flex flex-col '>
                                <label htmlFor='' className='text-sm'>
                                    Add Keywords (Important points to mention)
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
                                            } px-5 rounded-xl mr-2 p-2 font-semibold`}
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

                    <div className='flex w-full mt-8 justify-end'>
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                            className='bg-white border-black border mr-5 flex items-center rounded-xl py-2 pl-4 pr-5 text-black'>
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
                        <button
                            onClick={submitCampaign}
                            disabled={JSON.stringify(newCampaign) === JSON.stringify(campaignDetail)}
                            className='bg-black flex gap-2 items-center rounded-xl py-2 pl-4 pr-5 text-white disabled:opacity-40'>
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
                            {mode === 'edit' ? 'Proceed to Sheet' : 'Create Campaign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
