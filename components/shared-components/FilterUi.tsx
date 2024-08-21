'use client';
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { v4 as uuidv4 } from 'uuid';
import { ANALYTICS_FILTERS } from '@/constants';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ArrowUpDownIcon } from '@/icons/ArrowUpDownIcon';

interface FilterUiProps {
    filters: any;
    setFilters: any;
    selectFilter: any;
    filtersOptions: AvailableFilters;
}

export default function FilterUi(props: FilterUiProps) {
    const { filters, setFilters, selectFilter, filtersOptions } = props;
    const [open, setOpen] = useState<number>(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const toggleFilter = () => {
        const panel = document.getElementById('filterPanel');
        if (panel) {
            panel.classList.toggle('hidden');
        }
    };

    const resetFilters = () => {
        setFilters({
            postedAt: [],
            internalSheetId: [],
            platform: [],
            postType: [],
            phase: [],
            category: [],
            subCategory: [],
        });
        const url = new URL(window.location.href);
        url.searchParams.delete('filter');
        url.searchParams.delete('value');
        window.location.href = url.href;
    };

    return (
        <div id='filterPanel' className='hidden flex w-[222px] flex-col border-r border-[#cdcdcd]'>
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
                    <button className='flex w-full justify-end text-black font-semibold' onClick={resetFilters}>
                        Reset all
                    </button>
                )}
                {filtersOptions && (
                    <>
                        {ANALYTICS_FILTERS.map((item, index) => {
                            const key = item;
                            const lastKey = `all${key.key.charAt(0).toUpperCase()}''${key.key.slice(1, key.key.length)}`;
                            const filterValue =
                                filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === key.key
                                    ? filtersOptions[lastKey]
                                    : filtersOptions[key.key];
                            const radioEligible = ['platform'].includes(key.key);
                            return (
                                <Accordion open={open === 5 + index} key={uuidv4()} icon={<ArrowUpDownIcon id={5 + index} key={5 + index} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(5 + index)} className='text-md py-2'>
                                        <div className='flex items-center'>
                                            {item.name}{' '}
                                            {filters && filters[key.key] && filters[key.key].length > 0 && (
                                                <span className='w-2 h-2 ml-2 rounded-full bg-green-500'></span>
                                            )}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody className='py-2'>
                                        <ul className='flex flex-col h-auto max-h-52 overflow-y-scroll'>
                                            <li key={'all-phase'} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                                <input
                                                    type={radioEligible ? 'radio' : 'checkbox'}
                                                    id={'all-phase'}
                                                    value={'all'}
                                                    className='h-[18px] w-[18px]'
                                                    disabled={filterValue?.length === 0}
                                                    checked={filterValue?.length === 0 || (filters && filters[key.key]) ? filters[key.key].length === 0 : true}
                                                    onChange={(e: any) => selectFilter(e?.currentTarget?.checked, key.key, 'all')}
                                                />
                                                <label className='capitalize' htmlFor={'all-phase'}>
                                                    All
                                                </label>
                                            </li>
                                            {filterValue?.map((item) =>
                                                typeof item === 'string' ? (
                                                    <li key={item} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                                        <input
                                                            type={radioEligible ? 'radio' : 'checkbox'}
                                                            id={item}
                                                            value={item}
                                                            className='h-[18px] w-[18px]'
                                                            checked={filters && filters[key.key] ? filters[key.key].includes(item) : false}
                                                            onChange={(e: any) => selectFilter(e?.currentTarget?.checked, key.key, item)}
                                                        />
                                                        <label className='capitalize' htmlFor={item}>
                                                            {item.includes('1970-01-01') ? 'Others' : item}
                                                        </label>
                                                    </li>
                                                ) : (
                                                    item &&
                                                    item.id && (
                                                        <li key={item.id} className={`flex items-center gap-3 pl-2 py-2 border-stroke`}>
                                                            <input
                                                                type='checkbox'
                                                                id={item.id}
                                                                value={item.id}
                                                                className='h-[18px] w-[18px]'
                                                                checked={filters && filters[key.key] ? filters[key.key].includes(item.id) : false}
                                                                onChange={(e: any) => selectFilter(e?.currentTarget?.checked, key.key, item.id)}
                                                            />
                                                            <label className='capitalize' htmlFor={item.name}>
                                                                {item.name.includes('1970-01-01') ? 'Others' : item.name}
                                                            </label>
                                                        </li>
                                                    )
                                                )
                                            )}
                                        </ul>
                                    </AccordionBody>
                                </Accordion>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
