'use client';
import { useEffect, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { v4 as uuidv4 } from 'uuid';
import { ANALYTICS_PROFILES_FILTERS, ANALYTICS_PRIVATE_PROFILES_FILTERS } from '@/constants';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ArrowUpDownIcon } from '@/icons/ArrowUpDownIcon';
import { AvailableProfilesFilters } from '@/interfaces/filter';

const FilterList = ({ any_filter, index, handleOpen, selectFilter, filters, filterValue }: any) => {
    const [username, setUsername] = useState<string>('');
    const [usernames, setUsernames] = useState<any>([]);
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);

    const addUsername = () => {
        setUsernames([...usernames, username]);
        setUsername('');
    };

    const openCustomBox = (key: string, val: boolean) => {
        if (val) {
            setIsCustom(val);
        } else {
            selectFilter(false, any_filter.key, `${min}-${max}`);
        }
    };

    useEffect(() => {
        if (any_filter.key === 'username' && filters[any_filter.key]) {
            setUsernames(filters[any_filter.key]);
        }
        if (any_filter.isCustom && filters[any_filter.key]) {
            const index = filterValue?.findIndex((item: string) => filters[any_filter.key][0] === item);
            if (index === -1) {
                const values = filters[any_filter.key][0]?.split('-');
                if (values) {
                    setIsCustom(true);
                    setMin(parseInt(values[0]));
                    setMax(parseInt(values[1]));
                }
            }
        }
    }, []);

    return (
        <>
            <AccordionHeader onClick={() => handleOpen(index)} className='text-md py-2'>
                <div className='flex items-center'>
                    {any_filter.name}{' '}
                    {filters && filters[any_filter.key] && filters[any_filter.key].length > 0 && (
                        <span className='w-2 h-2 ml-2 rounded-full bg-green-500'></span>
                    )}
                </div>
            </AccordionHeader>
            <AccordionBody className='py-2'>
                {any_filter.key === 'username' ? (
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex'>
                            <input
                                type='text'
                                name='username'
                                value={username}
                                placeholder='Username'
                                onChange={(e) => setUsername(e.target.value)}
                                className={`bg-[#F7F7F7] outline-none text-sm py-1 px-2 rounded-md w-[132px]`}
                            />
                            <button
                                disabled={username === ''}
                                onClick={addUsername}
                                className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                Add
                            </button>
                        </div>
                        {usernames.length > 0 && (
                            <div className='flex mt-2 gap-2 flex-wrap'>
                                {usernames?.map((text: string, index: number) => (
                                    <div className='flex px-3 bg-[#DAE4FF] text-[#033DD0] py-1 rounded-full' key={'keyword' + index}>
                                        <span className='text-xs'>{text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='flex gap-2 w-full justify-center'>
                            <button
                                disabled={usernames?.length === 0}
                                onClick={() => selectFilter(true, any_filter.key, usernames)}
                                className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                Apply
                            </button>
                            {usernames?.length > 0 && (
                                <button
                                    disabled={usernames?.length === 0}
                                    onClick={() => selectFilter(false, any_filter.key, [])}
                                    className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <ul className='flex flex-col h-auto max-h-52 overflow-y-scroll'>
                        <li key={'all-phase'} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                            <input
                                type='checkbox'
                                id={'all-phase'}
                                value={'all'}
                                className='h-[18px] w-[18px]'
                                disabled={filterValue?.length === 0}
                                checked={filterValue?.length === 0 || (filters && filters[any_filter.key]) ? filters[any_filter.key].length === 0 : true}
                                onChange={(e: any) => selectFilter(e?.currentTarget?.checked, any_filter.key, 'all')}
                            />
                            <label className='capitalize' htmlFor={'all-phase'}>
                                All
                            </label>
                        </li>
                        {filterValue?.map((item: any) => (
                            <li key={item} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                <input
                                    id={item}
                                    value={item}
                                    type='checkbox'
                                    className='h-[18px] w-[18px]'
                                    disabled={isCustom}
                                    checked={filters && filters[any_filter.key] ? filters[any_filter.key].includes(item) : false}
                                    onChange={(e: any) => selectFilter(e?.currentTarget?.checked, any_filter.key, item)}
                                />
                                <label className='capitalize' htmlFor={item}>
                                    {item.includes('1970-01-01') ? 'Others' : item}
                                </label>
                            </li>
                        ))}
                        {any_filter.isCustom && (
                            <li key={'custom'} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='flex gap-3'>
                                        <input
                                            id={'custom'}
                                            type='checkbox'
                                            value={'custom'}
                                            className='h-[18px] w-[18px]'
                                            checked={isCustom}
                                            onChange={(e: any) => openCustomBox(any_filter.key, e?.currentTarget?.checked)}
                                        />
                                        <label className='capitalize' htmlFor={'all-phase'}>
                                            Custom
                                        </label>
                                    </div>
                                    {isCustom && (
                                        <>
                                            <div className='flex gap-2'>
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
                                            </div>
                                            <div className='flex gap-2 w-full justify-center'>
                                                <button
                                                    disabled={min > max}
                                                    onClick={() => selectFilter(true, any_filter.key, `${min}-${max}`)}
                                                    className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                                                    Apply
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </AccordionBody>
        </>
    );
};
interface FilterUiProps {
    filters: any;
    setFilters: any;
    selectFilter: any;
    filtersOptions: AvailableProfilesFilters;
    isFilter: any;
    setIsFilter: any;
    isPublic: boolean;
}

export default function FilterUi(props: FilterUiProps) {
    const { filters, setFilters, selectFilter, filtersOptions, isFilter, setIsFilter, isPublic } = props;
    const [open, setOpen] = useState<number>(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const toggleFilter = () => {
        const panel = document.getElementById('filterPanel');
        if (panel) {
            setIsFilter(!isFilter);
            panel.classList.toggle('hidden');
        }
    };

    const resetFilters = () => {
        setFilters({
            tags: [],
            niche: [],
            categories: [],
            engagementRate: [],
            postFrequencyPerDay: [],
            averagePostCostRange: [],
            profileTypeByFollowers: [],
        });
        const url = new URL(window.location.href);
        url.searchParams.delete('filter');
        url.searchParams.delete('value');
        window.location.href = url.href;
    };

    return (
        <div
            id='filterPanel'
            className='mt-1 hidden fixed bg-white h-[calc(100%_-_124px)] z-10 sm:h-auto sm:relative flex w-[222px] flex-col border-r border-[#cdcdcd]'>
            <div className='flex w-full min-w-[210px] flex-col py-4 px-3'>
                <p className='flex justify-between text-lg font-bold'>
                    <span className='flex gap-2 items-center mb-2'>
                        <SlidersHorizontalIcon color={'#000'} size={20} />
                        Filters
                    </span>
                    <span className='-mr-1' onClick={() => toggleFilter()}>
                        <XIcon color={'#000'} size={20} />
                    </span>
                </p>
                {filters && Object.keys(filters)?.filter((item) => filters[item]?.length > 0).length > 0 && (
                    <button className='cursor-pointer flex w-full justify-end text-black font-semibold' onClick={resetFilters}>
                        Reset all
                    </button>
                )}
                {filtersOptions && (
                    <>
                        {ANALYTICS_PROFILES_FILTERS.map((any_filter, index) => {
                            const lastKey = `all${any_filter.key.charAt(0).toUpperCase()}${any_filter.key.slice(1, any_filter.key.length)}`;
                            const filterValue =
                                filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === any_filter.key
                                    ? filtersOptions[lastKey]
                                    : filtersOptions[any_filter.key];
                            return (
                                <Accordion open={open === index} key={uuidv4()} icon={<ArrowUpDownIcon id={5 + index} key={5 + index} open={open} />}>
                                    <FilterList
                                        any_filter={any_filter}
                                        index={index}
                                        handleOpen={handleOpen}
                                        selectFilter={selectFilter}
                                        filters={filters}
                                        filterValue={filterValue}
                                    />
                                </Accordion>
                            );
                        })}
                        {!isPublic &&
                            ANALYTICS_PRIVATE_PROFILES_FILTERS.map((any_filter, index) => {
                                const lastKey = `all${any_filter.key.charAt(0).toUpperCase()}${any_filter.key.slice(1, any_filter.key.length)}`;
                                const filterValue =
                                    filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === any_filter.key
                                        ? filtersOptions[lastKey]
                                        : filtersOptions[any_filter.key];
                                return (
                                    <Accordion open={open === 5 + index} key={uuidv4()} icon={<ArrowUpDownIcon id={5 + index} key={5 + index} open={open} />}>
                                        <FilterList
                                            any_filter={any_filter}
                                            index={5 + index}
                                            handleOpen={handleOpen}
                                            selectFilter={selectFilter}
                                            filters={filters}
                                            filterValue={filterValue}
                                        />
                                    </Accordion>
                                );
                            })}
                    </>
                )}
            </div>
        </div>
    );
}
