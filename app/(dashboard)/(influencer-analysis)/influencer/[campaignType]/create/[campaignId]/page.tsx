'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import SheetNetworkService from '@/services/sheet.service';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/context';
import { setSheet, setSheetLoading } from '@/context/campaign';
import { enqueueSnackbar } from 'notistack';
import { SheetDetails } from '@/components/shared-components/SheetDetails';
import GuidelinesUi from '@/components/shared-components/GuidelinesUi';
import ConfirmSheetUpdateModal from '@/components/modals/ConfirmSheetUpdateModal';
import { ISheet } from '@/interfaces/sheet';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import { AlertOctagonIcon, AreaChartIcon, LayoutPanelLeftIcon, PlusCircleIcon, RefreshCcwIcon, Trash2Icon, TrashIcon } from 'lucide-react';

const getSheetInfo = () => {
    return { index: 1, open: false, title: '', url: '', sheetName: '', columnName: '', sheets: [], selectedSheet: {} };
};

export default function CreateReporting() {
    const params: any = useParams();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state?.campaign);
    const router = useRouter();
    const [mode, setMode] = useState('view');
    const [selSheetData, setSelSheetData] = useState<ISheet[]>([]);
    const [sheetData, setSheetData] = useState<any>([]);
    const [initialSheetData, setInitialSheetData] = useState<any>([]);
    const [viewGuidelines, setViewGuidelines] = useState<boolean>(false);
    const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);

    const openCloseConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const handleSheet = (item: any, sheetInfo: any) => {
        if (item.columns.length === 0) {
            enqueueSnackbar('No columns available', { variant: 'error' });
            return;
        }
        if (mode !== 'add') {
            setMode(sheetInfo?.sheetName !== item?.sheetName ? 'edit' : 'view');
        }
        sheetData[sheetInfo?.index - 1].sheetName = item?.sheetName;
        sheetData[sheetInfo?.index - 1].selectedSheet = item;
        setSheetData([...sheetData]);
    };

    const handleColumn = (column: string, sheetInfo: any) => {
        if (mode !== 'add') {
            setMode(sheetInfo.columnName !== column ? 'edit' : 'view');
        }
        sheetData[sheetInfo?.index - 1].columnName = column;
        setSheetData([...sheetData]);
    };

    const addUpdateSheet = () => {
        if (mode === 'add') {
            handleSheetSelect();
        } else if (mode === 'edit') {
            openCloseConfirmModal();
        } else if (mode === 'view') {
            router.push(`/${params?.campaignType}/campaign/${params.campaignId}`);
        }
    };

    const refreshSheet = (item: any) => {
        SheetNetworkService.instance
            .addSheetToCampaign({
                title: item?.title,
                sheetId: item?.selectedSheet!.sheetId!,
                name: item?.sheetName!,
                linkColumn: item?.columnName,
                campaignId: params?.campaignId,
                range: 'A1:Z',
                id: item?.id ? item?.id : null,
            })
            .then((res) => {
                enqueueSnackbar('Sheet refeshed successfully', { variant: 'success' });
            });
    };

    const handleSheetSelect = () => {
        let error = false;
        const emptyUrl = sheetData.filter((item: any) => item.url === '');
        const emptyTitle = sheetData.filter((item: any) => item.title === '');
        if (emptyUrl.length > 0 || emptyTitle.length > 0) {
            error = true;
            setIsError(true);
        }
        if (!error) {
            const promises: any = [];
            dispatch(setSheetLoading(true));
            sheetData.forEach((item: any) => {
                const ind = initialSheetData.findIndex((sh: any) => item.index === sh?.index);
                if (ind === -1) {
                    promises.push(
                        SheetNetworkService.instance.addSheetToCampaign({
                            title: item?.title,
                            sheetId: item?.selectedSheet!.sheetId!,
                            name: item?.selectedSheet!.sheetName!,
                            linkColumn: item?.columnName,
                            campaignId: params.campaignId,
                            range: 'A1:Z',
                            id: item?.id ? item?.id : null,
                        })
                    );
                }
            });
            Promise.all(promises)
                .then((res) => {
                    dispatch(setSheet(res));
                    enqueueSnackbar('Sheet added successfully', { variant: 'success' });
                })
                .finally(() => {
                    dispatch(setSheetLoading(false));
                    router.push(`/${params?.campaignType}/campaign/${params.campaignId}`);
                });
        }
    };

    const addSheet = () => {
        setMode('add');
        const sheets = sheetData.map((item: any) => {
            return { ...item, open: false };
        });
        sheets.push({ ...getSheetInfo(), open: true, index: sheetData.length + 1 });
        setSheetData([...sheets]);
    };

    const setTitle = (id: number, value: string) => {
        const index = sheetData.findIndex((item: any) => item.index === id);
        sheetData[index].title = value;
        setSheetData([...sheetData]);
    };

    const setUrl = (id: number, value: string) => {
        const index = sheetData.findIndex((item: any) => item.index === id);
        sheetData[index].url = value;
        setSheetData([...sheetData]);
    };

    const fetchSheets = async (data: any) => {
        if (data?.url !== '') {
            dispatch(setSheetLoading(true));
            SheetNetworkService.instance
                .getSheet(data?.url)
                .then((res: any) => {
                    const sheet = res.find((item: any) => item.sheetName === data?.sheetName);
                    data['sheets'] = res;
                    data['selectedSheet'] = sheet;
                    const ind = sheetData.findIndex((item: any) => item.index === data?.index);
                    if (ind === -1) {
                        sheetData.push(data);
                    } else {
                        sheetData[ind] = data;
                    }
                    setSheetData([...sheetData]);
                })
                .finally(() => {
                    dispatch(setSheetLoading(false));
                });
        } else {
            enqueueSnackbar('Please enter google sheet link', { variant: 'error' });
        }
    };

    const deleteSheet = (index: string) => {
        const data = sheetData.filter((item: any) => item?.index !== index);
        setSheetData([...data]);
        setMode('edit');
    };

    const setOpenGuidelines = () => {
        setViewGuidelines(!viewGuidelines);
    };

    useEffect(() => {
        if (selSheetData.length > 0) {
            setIsSheetLoading(true);
            const data: any = [];
            selSheetData.forEach((item, index) => {
                const url = `https://docs.google.com/spreadsheets/d/${item?.sheetId}`;
                const sheetDetails = {
                    columns: [item?.linkColumn],
                    sheetName: item?.name,
                    sheetId: item?.sheetId,
                };
                data.push({
                    ...getSheetInfo(),
                    index: index + 1,
                    open: false,
                    url: url,
                    title: item?.title,
                    sheetName: item?.name,
                    columnName: item?.linkColumn,
                    id: item?.id,
                    sheets: [sheetDetails],
                    selectedSheet: { ...sheetDetails },
                });
            });
            setSheetData([...data]);
            setIsSheetLoading(false);
            setInitialSheetData([...data]);
            dispatch(setSheetLoading(false));
            setMode('view');
        }
    }, [selSheetData]);

    useLayoutEffect(() => {
        setSheetData([]);
        setIsSheetLoading(true);
        SheetNetworkService.instance
            .checkSheetExists(params.campaignId)
            .then((res) => {
                if (res.length > 0) {
                    setSelSheetData(res);
                } else {
                    setMode('add');
                    setSheetData([{ ...getSheetInfo(), open: true }]);
                }
            })
            .catch((err) => {
                setMode('add');
            })
            .finally(() => {
                setIsSheetLoading(false);
                dispatch(setSheetLoading(false));
            });
    }, []);

    return (
        <div className='flex w-full h-full flex-col px-4 sm:px-8 py-4 lg:items-start'>
            <div className='flex w-full flex-col'>
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        <div className='flex p-2 sm:p-3 rounded-lg bg-[#F5F8FF]'>
                            <LayoutPanelLeftIcon size={24} color='#0151A0' className='flex sm:hidden' />
                            <LayoutPanelLeftIcon size={36} color='#0151A0' className='sm:flex hidden' />
                        </div>
                    </div>
                    <div className='flex items-center pl-3 gap-3 w-full sm:w-auto justify-between sm:justify-start'>
                        <span className='text-xl sm:text-2xl font-semibold'>Campaign Reporting</span>
                        <div onClick={() => setOpenGuidelines()} className='flex items-center gap-1 bg-[#F5F8FF] py-1 px-2 rounded-md cursor-pointer'>
                            <AlertOctagonIcon color='#0B1571' size={18} />
                            <span className='hidden sm:flex text-[13px] text-[#0B1571]'>View guidelines</span>
                        </div>
                        {viewGuidelines && (
                            <button onClick={addSheet} className='flex w-[186px] h-12 py-3 rounded-xl px-4 text-black font-semibold gap-2 border border-black'>
                                <PlusCircleIcon color='#000' size={24} />
                                <span className='flex'>Add New Sheet</span>
                            </button>
                        )}
                    </div>
                </div>
                {!isSheetLoading ? (
                    <div className='flex justify-between mb-6 sm:flex-row flex-col-reverse mt-4 w-full items-center sm:items-start gap-2 sm:gap-4'>
                        <div className='w-full flex flex-col gap-4 mt-2'>
                            {sheetData.map((item: any, index: number) => (
                                <div key={index} className='flex flex-col justify-between items-center w-full sm:w-8/12 border-[1.5px] px-4 py-3 rounded-md'>
                                    <div className='flex items-center justify-between w-full h-7 text-sm font-normal'>
                                        <span
                                            className='w-[calc(100%_-_62px)] sm:w-[calc(100%_-_172px)]'
                                            onClick={() => {
                                                document.getElementById(item?.title.replaceAll(' ', '_') + index)?.classList.toggle('hidden');
                                                document.getElementById(item?.title.replaceAll(' ', '_') + index + 1)?.classList.toggle('rotate-180');
                                            }}>
                                            {item?.title ? item?.title : 'Paste your Google Sheets link here'}
                                        </span>
                                        <span className='flex items-center justify-end w-[62px] sm:w-[172px] gap-2'>
                                            {item?.index <= selSheetData.length && (
                                                <div
                                                    onClick={() => {
                                                        refreshSheet(item);
                                                    }}
                                                    className='flex items-center gap-1 bg-[#F5F8FF] py-1 px-2 rounded-md cursor-pointer text-sm'>
                                                    <RefreshCcwIcon color='#0B1571' size={14} />
                                                    <span className='hidden sm:flex text-[14px] text-[#0B1571]'>Refresh sheet</span>
                                                </div>
                                            )}
                                            {sheetData.length > 1 && (
                                                <div
                                                    className='flex items-center justify-center w-6 h-10 rounded-t-lg'
                                                    onClick={() => deleteSheet(item?.index)}>
                                                    <Trash2Icon color='#0B1571' size={20} />
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div id={item?.title.replaceAll(' ', '_') + index} className='w-full'>
                                        <SheetDetails
                                            mode={mode}
                                            state={state}
                                            sheetInfo={item}
                                            isError={isError}
                                            setUrl={setUrl}
                                            setTitle={setTitle}
                                            handleSheet={handleSheet}
                                            fetchSheets={fetchSheets}
                                            handleColumn={handleColumn}
                                            selSheetData={selSheetData}
                                            sheetLoading={state?.sheetLoading}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className='flex flex-col mt-0 sm:mt-2 mb-12 sm:mb-2 items-center w-full sm:w-8/12'>
                                <button
                                    onClick={() => addUpdateSheet()}
                                    className='bg-black flex gap-2 justify-center items-center py-3 rounded-xl px-6 text-white text-sm'>
                                    <AreaChartIcon color='#fff' size={20} />
                                    {mode === 'view' && 'View Report'}
                                    {mode === 'edit' && 'Update Report'}
                                    {mode === 'add' && 'Create Campaign using google sheet'}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={addSheet}
                            className='flex w-[186px] sm:w-[222px] h-12 py-3 rounded-xl px-4 text-black font-semibold gap-2 border border-black'>
                            <PlusCircleIcon color='#000' size={24} />
                            <span className='flex'>Add New Sheet</span>
                        </button>
                    </div>
                ) : (
                    <LoadingBlack />
                )}
            </div>
            {viewGuidelines && <GuidelinesUi openCloseModal={setOpenGuidelines} />}
            {showConfirmModal && <ConfirmSheetUpdateModal handleConfirm={handleSheetSelect} openCloseModal={openCloseConfirmModal} />}
        </div>
    );
}
