export function SheetDetails({ selSheetData, isError, sheetInfo, mode, setUrl, setTitle, sheetLoading, handleColumn, fetchSheets, handleSheet }: any) {
    return (
        <>
            <div className='w-full'>
                <div className='flex mt-2 mb-3 gap-3'>
                    <input
                        type='text'
                        disabled={sheetInfo?.index <= selSheetData.length ? true : false}
                        onChange={(e) => setUrl(sheetInfo?.index, e.target.value)}
                        className='flex w-full h-11 bg-[#F7F7F7] outline-none py-2 px-4 rounded-lg text-sm disabled:opacity-40'
                        placeholder='Past link'
                        value={sheetInfo?.url}
                    />
                    {!(sheetInfo?.index <= selSheetData.length) && (
                        <button
                            onClick={() => fetchSheets(sheetInfo)}
                            className={`w-48 bg-black items-center py-1 rounded-xl px-2 text-white ${sheetLoading && 'opacity-40'}`}>
                            {mode === 'add' ? (sheetLoading && sheetInfo?.sheets?.length === 0 ? 'Processing...' : 'Get Sheets Info') : ''}
                        </button>
                    )}
                </div>
                {isError && sheetInfo?.url === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
                <label htmlFor='' className='text-sm mt-6'>
                    Name your sheet for quicker identification
                </label>
                <div className='flex mt-2 mb-2 gap-3'>
                    <input
                        type='text'
                        disabled={sheetInfo?.index <= selSheetData.length ? true : false}
                        onChange={(e) => setTitle(sheetInfo?.index, e.target.value)}
                        className='flex w-full h-11 bg-[#F7F7F7] outline-none py-2 px-4 rounded-lg text-sm disabled:opacity-40'
                        placeholder='Sheet title'
                        value={sheetInfo?.title}
                    />
                </div>
                {isError && sheetInfo?.title === '' && <p className='mt-1 text-[12px] text-[#d00a0a]'>This field is required</p>}
            </div>
            {!sheetLoading || sheetInfo?.sheets?.length > 0 ? (
                <div className='flex gap-4'>
                    {sheetInfo?.sheets?.length > 0 && (
                        <div className='flex flex-col w-[33%]'>
                            <div className='flex flex-col w-full mt-2'>
                                <span className='font-medium text-sm mb-3 h-9 sm:h-auto'>Select sheet</span>
                                <div className='flex gap-2 flex-wrap'>
                                    {sheetInfo?.sheets?.map((item: any) => (
                                        <div
                                            className={`bg-[#F7F7F7] py-2 px-3 rounded-lg cursor-pointer text-sm border-2 ${
                                                item?.sheetName === sheetInfo?.sheetName ? 'border-black text-black' : 'border-[#F7F7F7] text-[#6f6d6d]'
                                            }`}
                                            key={item.sheetId}
                                            onClick={() => {
                                                !(sheetInfo?.index <= selSheetData.length) && handleSheet(item, sheetInfo);
                                            }}>
                                            <h1>{item.sheetName}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {sheetInfo?.selectedSheet?.columns?.length > 0 && (
                        <div className='flex flex-col w-[67%]' key={'column' + sheetInfo?.selectedSheet.sheetId}>
                            <div className='flex flex-col w-full mt-2'>
                                <span className='font-medium text-sm mb-3'>Select column which contains social medias links</span>
                                <div className='flex gap-2 flex-wrap'>
                                    {sheetInfo?.selectedSheet?.columns?.map((item: any, index: number) => (
                                        <div
                                            className={`bg-[#F7F7F7] py-2 px-3 rounded-lg cursor-pointer text-sm border-2 ${
                                                item.replaceAll('"', '') === sheetInfo?.columnName
                                                    ? 'border-black text-black'
                                                    : 'border-[#F7F7F7] text-[#6f6d6d]'
                                            }`}
                                            onClick={() => {
                                                !(sheetInfo?.index <= selSheetData.length) && handleColumn(item.replaceAll('"', ''), sheetInfo);
                                            }}
                                            key={item + 'Column'}>
                                            <h1>{item.replaceAll('"', '')}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex justify-center w-16 h-16 mt-12 mb-8 mx-auto'>
                    <div className='border-t-transparent border-solid animate-spin rounded-full border-black border-4 w-full h-full'></div>
                </div>
            )}
        </>
    );
}
