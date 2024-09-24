'use client';
import CampaignNetworkService from '@/services/campaign.service';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import ComingSoon from '../global-components/ComingSoon';
import { XIcon } from 'lucide-react';
import { useAppSelector } from '@/context';

export default function CreatorsFormModal() {
    const params:any = useParams();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [fields, setFields] = useState([] as any);
    const { campaignType } = useAppSelector((state) => state.user);
    
    const options = [
        { value: 'http', label: 'Http' },
        { value: 'text', label: 'Text' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'number', label: 'Number' },
    ];

    const handleFields = (e: any, id: string, type: string) => {
        const index = fields.findIndex((item: any) => item.id === id);
        if (type === 'select') {
            fields[index].fieldType = e.target.value;
        } else if (type === 'input') {
            fields[index].fieldValue = e.target.value;
        }
        setFields([...fields]);
    };

    const handleAddField = () => {
        fields.push({ id: `field${fields.length + 1}`, fieldType: 'text', fieldValue: '', fieldValueError: '' });
        setFields([...fields]);
    };

    const handleRemoveField = (id: string) => {
        const removedFields = fields.filter((item: any) => item.id !== id);
        setFields([...removedFields]);
    };

    const handleSubmit = () => {
        let isError = false;
        const fieldPayload = { campaignId: params.campaignId, fields: [] } as any;
        fields.forEach((item: any) => {
            if (item.fieldValueError !== '') {
                isError = true;
            } else {
                fieldPayload.fields.push({
                    required: true,
                    label: item.fieldValue,
                    fieldType: item.fieldType,
                    isLinkField: item.id === 'field1' ? true : false,
                });
            }
        });
        if (!isError) {
            CampaignNetworkService.instance.createCampaignForm(fieldPayload).then((res) => {
                enqueueSnackbar('Campaign form created successfully', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                document.getElementById('campaign-pop-up')?.classList.toggle('hidden');
                router.push(`/${campaignType}/${params?.campType}/report/${params.campaignId}`);
            });
        } else {
            return enqueueSnackbar('Please fill all the fields', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }
    };

    useEffect(() => {
        fields.push({ id: `field${fields.length + 1}`, fieldType: 'http', fieldValue: '', fieldValueError: '' });
        setFields([...fields]);

    }, []);
    return (
        <div id='campaign-pop-up' className='fixed hidden w-full h-screen top-0 right-0 bg-black z-10 bg-opacity-40'>
            <div className='flex h-full justify-center items-center m-auto'>
                <div className='flex flex-col bg-white rounded-xl p-6 w-[90%] md:w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[60%]'>
                    <span className='text-xl font-semibold'>Create a Form for Creators</span>
                    <div className='flex mt-6 flex-col sm:flex-col md:flex-row lg:flex-row lg:flex-row'>
                        <div className={`flex flex-col flex-1 pr-0 sm:pr-5 'overflow-y-scroll max-h-80`}>
                            <ComingSoon />
                            {/* {fields.map((item: any) => (
                                <div className='flex mt-3 gap-2 w-[460px]' key={item.id}>
                                    <select
                                        id={`select_${item.id}`}
                                        name={`select_${item.id}`}
                                        value={item.fieldType}
                                        onChange={(e) => {
                                            handleFields(e, item.id, 'select');
                                        }}
                                        className='flex bg-[#F7F7F7] outline-none mt-2 py-2 px-4 rounded-lg h-10 text-sm w-[120px]'>
                                        {item.id !== 'field1' ? (
                                            <>
                                                <option value=''>Field type</option>
                                                {options.map((item) => (
                                                    <option value={item.value} key={uuidv4()}>{item.label}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value='http'>Http</option>
                                        )}
                                    </select>
                                    <div>
                                        <input
                                            type='text'
                                            name={`input_${item.id}`}
                                            placeholder={'Enter field name'}
                                            value={item.fieldValue}
                                            onChange={(e) => {
                                                handleFields(e, item.id, 'input');
                                            }}
                                            className='flex bg-[#F7F7F7] outline-none mt-2 p-2 px-4 h-10 rounded-lg text-sm w-[250px]'
                                        />
                                        {item.fieldValueError !== '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>{item.fieldValueError}</p>}
                                    </div>

                                    <button onClick={handleAddField} className='flex py-2 rounded-xl text-white ml-2 mt-2 h-10'>
                                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' id='plus'>
                                            <path d='M12 24c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17C5.8 1.2 8.8 0 12 0s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5zm0-22C9.3 2 6.8 3 4.9 4.9 1 8.8 1 15.2 4.9 19.1 6.8 21 9.3 22 12 22s5.2-1 7.1-2.9C23 15.2 23 8.9 19.1 5c-1.9-2-4.4-3-7.1-3z'></path>
                                            <path d='M12 18c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z'></path>
                                            <path d='M17 13H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z'></path>
                                        </svg>
                                    </button>
                                    {item.id !== 'field1' && (
                                        <button onClick={() => handleRemoveField(item.id)} className='flex py-2 rounded-xl text-white ml-2 mt-2 h-10'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24' id='minus'>
                                                <path d='M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z'></path>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))} */}
                        </div>
                    </div>
                    <div className='flex w-full mt-4 sm:mt-8 justify-end h-10 sm:h-auto text-sm sm:text-base '>
                        <button
                            onClick={() => {
                                document.getElementById('campaign-pop-up')?.classList.toggle('hidden');
                            }}
                            className='bg-white border-black border mr-5 flex items-center py-3 rounded-xl px-6 text-black gap-1'>
                            <XIcon color='#000' size={24} />
                            Cancel
                        </button>
                        {/* <button onClick={handleSubmit} className='bg-black flex items-center py-3 rounded-xl px-6 text-white text-sm'>
                            <svg width='24' height='24' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M19.7158 3.36572L2.24081 8.28759C2.09205 8.32826 1.95945 8.4138 1.86106 8.53256C1.76267 8.65131 1.70329 8.79751 1.69099 8.95123C1.67869 9.10496 1.71408 9.25874 1.79233 9.39162C1.87059 9.52451 1.98791 9.63004 2.12831 9.69384L10.1533 13.4907C10.3105 13.5635 10.4368 13.6898 10.5096 13.847L14.3064 21.872C14.3702 22.0124 14.4758 22.1297 14.6087 22.2079C14.7415 22.2862 14.8953 22.3216 15.049 22.3093C15.2028 22.297 15.349 22.2376 15.4677 22.1392C15.5865 22.0408 15.672 21.9082 15.7127 21.7595L20.6346 4.28447C20.6719 4.15695 20.6742 4.02174 20.6412 3.89302C20.6083 3.7643 20.5414 3.64681 20.4474 3.55286C20.3535 3.45891 20.236 3.39197 20.1073 3.35904C19.9785 3.32611 19.8433 3.32842 19.7158 3.36572V3.36572Z'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path d='M10 13.2375L14.2375 9' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Create Form
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
