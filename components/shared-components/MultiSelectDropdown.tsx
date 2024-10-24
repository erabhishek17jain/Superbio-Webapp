import { CheckIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ any_filter, selectFilter, filters, filterValue }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef: any = useRef(null);
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const openCustomBox = (key: string, val: boolean) => {
        if (val) {
            setIsCustom(val);
        } else {
            selectFilter(false, any_filter.key, `${min}-${max}`);
        }
    };

    useEffect(() => {
        if (any_filter.isCustom && filters[any_filter.key]) {
            const difference = filters[any_filter.key]?.filter((item: string) => !filterValue?.includes(item));
            if (difference.length > 0) {
                const values = difference[0]?.split('-');
                if (values) {
                    setIsCustom(true);
                    setMin(parseInt(values[0]));
                    setMax(parseInt(values[1]));
                }
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='relative inline-block text-left' ref={dropdownRef}>
            <div>
                <button
                    type='button'
                    onClick={toggleDropdown}
                    className='inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    {filters[any_filter.key]?.length > 0 ? `${filters[any_filter.key]?.length} Selected` : `Select ${any_filter.name}`}
                    <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                        <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
                    <div className='py-1 max-h-60 overflow-y-auto' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                        <label key={'all'} className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'>
                            <input
                                id={'all'}
                                value={'all'}
                                type='checkbox'
                                disabled={filterValue?.length === 0}
                                checked={filterValue?.length === 0 || (filters && filters[any_filter.key]) ? filters[any_filter.key]?.length === 0 : true}
                                onChange={(e: any) => selectFilter(e?.currentTarget?.checked, any_filter.key, 'all')}
                                className='form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                            />
                            <label className='ml-2' htmlFor={'all'}>
                                All
                            </label>
                        </label>
                        {filterValue?.map((item: any) => (
                            <label
                                key={item}
                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'>
                                <input
                                    id={item}
                                    value={item}
                                    type='checkbox'
                                    disabled={isCustom}
                                    className='form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                    checked={filters && filters[any_filter.key] ? filters[any_filter.key]?.includes(item) : false}
                                    onChange={(e: any) => selectFilter(e?.currentTarget?.checked, any_filter.key, item)}
                                />
                                <label className='capitalize ml-2' htmlFor={item}>
                                    {item.includes('1970-01-01') ? 'Others' : item}
                                </label>
                            </label>
                        ))}
                        {any_filter.isCustom && (
                            <label
                                key={'all'}
                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'>
                                <input
                                    id={'custom'}
                                    type='checkbox'
                                    value={'custom'}
                                    className='h-[18px] w-[18px]'
                                    checked={isCustom}
                                    onChange={(e: any) => openCustomBox(any_filter.key, e?.currentTarget?.checked)}
                                />
                                <label className='capitalize ml-2' htmlFor={'custom'}>
                                    Custom
                                </label>
                            </label>
                        )}
                        {isCustom && (
                            <>
                                <div className='flex gap-2 px-4 py-2 border-t'>
                                    <input
                                        name='min'
                                        type='number'
                                        value={min}
                                        placeholder='Min'
                                        onChange={(e) => setMin(parseInt(e.target.value))}
                                        className={`w-1/2 bg-[#F7F7F7] outline-none text-sm py-1 px-2 rounded-md`}
                                    />
                                    <input
                                        name='max'
                                        type='number'
                                        value={max}
                                        placeholder='Max'
                                        onChange={(e) => setMax(parseInt(e.target.value))}
                                        className={`w-1/2 bg-[#F7F7F7] outline-none text-sm py-1 px-2 rounded-md`}
                                    />
                                    <button
                                        disabled={min > max}
                                        onClick={() => selectFilter(true, any_filter.key, `${min}-${max}`)}
                                        className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                        <CheckIcon />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
