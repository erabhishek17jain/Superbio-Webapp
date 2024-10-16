'use client';
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { v4 as uuidv4 } from 'uuid';
import { ANALYTICS_FILTERS_FROM_SHEETS, ANALYTICS_PROFILES_FILTERS } from '@/constants';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ArrowUpDownIcon } from '@/icons/ArrowUpDownIcon';
import { AvailableProfilesFilters } from '@/interfaces/filter';

const FilterList = ({ any_filter, index, handleOpen, selectFilter, filters, filterValue }: any) => {
    const [username, setUsername] = useState<string>('');
    return (
        <>
            <AccordionHeader onClick={() => handleOpen(5 + index)} className='text-md py-2'>
                <div className='flex items-center'>
                    {any_filter.name}{' '}
                    {filters && filters[any_filter.key] && filters[any_filter.key].length > 0 && (
                        <span className='w-2 h-2 ml-2 rounded-full bg-green-500'></span>
                    )}
                </div>
            </AccordionHeader>
            <AccordionBody className='py-2'>
                {any_filter.key === 'username' ? (
                    <div className='flex gap-2 w-full'>
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
                            onClick={() => selectFilter(true, any_filter.key, username)}
                            className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                            Apply
                        </button>
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
                                    checked={filters && filters[any_filter.key] ? filters[any_filter.key].includes(item) : false}
                                    onChange={(e: any) => selectFilter(e?.currentTarget?.checked, any_filter.key, item)}
                                />
                                <label className='capitalize' htmlFor={item}>
                                    {item.includes('1970-01-01') ? 'Others' : item}
                                </label>
                            </li>
                        ))}
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
}

export default function FilterUi(props: FilterUiProps) {
    const { filters, setFilters, selectFilter, filtersOptions, isFilter, setIsFilter } = props;
    const [open, setOpen] = useState<number>(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const toggleFilter = () => {
        const panel = document.getElementById('filterPanel');
        if (panel) {
            setIsFilter(!isFilter)
            panel.classList.toggle('hidden');
        }
    };

    const resetFilters = () => {
        setFilters({
            niche: [],
            engagementRate: [],
            postFrequencyPerDay: [],
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
                                <Accordion open={open === 5 + index} key={uuidv4()} icon={<ArrowUpDownIcon id={5 + index} key={5 + index} open={open} />}>
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
                        {ANALYTICS_FILTERS_FROM_SHEETS.map((any_filter, index) => {
                            const lastKey = `all${any_filter.key.charAt(0).toUpperCase()}${any_filter.key.slice(1, any_filter.key.length)}`;
                            const filterValue =
                                filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === any_filter.key
                                    ? filtersOptions[lastKey]
                                    : filtersOptions[any_filter.key];
                            return (
                                filterValue?.length > 0 && (
                                    <Accordion
                                        open={open === 5 + index + 4}
                                        key={uuidv4()}
                                        icon={<ArrowUpDownIcon id={5 + index + 4} key={5 + index + 4} open={open} />}>
                                        <FilterList
                                            any_filter={any_filter}
                                            index={index + 4}
                                            handleOpen={handleOpen}
                                            selectFilter={selectFilter}
                                            filters={filters}
                                            filterValue={filterValue}
                                        />
                                    </Accordion>
                                )
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
