'use client';
import MultiSelectDropdown from '../MultiSelectDropdown';
import { AvailableProfilesFilters } from '@/interfaces/filter';
import { ANALYTICS_FILTERS, ANALYTICS_FILTERS_FROM_SHEETS } from '@/constants';
import { RefreshCcwIcon } from 'lucide-react';

const FilterList = ({ any_filter, selectFilter, filters, filterValue }: any) => {
    return (
        <div className='flex gap-1 flex-col w-full'>
            <div className='flex w-full items-center ml-1'>
                {any_filter.name}{' '}
                {filters && filters[any_filter.key] && filters[any_filter.key].length > 0 && <span className='w-2 h-2 ml-2 rounded-full bg-green-500'></span>}
            </div>
            <MultiSelectDropdown any_filter={any_filter} selectFilter={selectFilter} filters={filters} filterValue={filterValue} />
        </div>
    );
};

interface FilterBoxUiProps {
    filters: any;
    isFilter: any;
    setFilters: any;
    isPublic: boolean;
    selectFilter: any;
    filtersOptions: AvailableProfilesFilters;
}

export default function FilterBoxUi(props: FilterBoxUiProps) {
    const { filters, isFilter, setFilters, selectFilter, filtersOptions } = props;

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
        <div
            id='filterPanel'
            className={`${isFilter ? 'flex' : 'hidden'} relative mt-1 mb-3 bg-white sm:h-auto sm:relative flex w-full flex-col border border-gray-300 rounded-xl`}>
            {isFilter && (
                <>
                    <div className='grid grid-cols-5 gap-x-6 gap-y-4 w-full min-w-[210px] flex-col py-4 px-3'>
                        {filtersOptions && (
                            <>
                                {ANALYTICS_FILTERS.map((any_filter) => {
                                    const lastKey = `all${any_filter.key.charAt(0).toUpperCase()}${any_filter.key.slice(1, any_filter.key.length)}`;
                                    const filterValue =
                                        filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === any_filter.key
                                            ? filtersOptions[lastKey]
                                            : filtersOptions[any_filter.key];
                                    return (
                                        <FilterList
                                            key={any_filter.key}
                                            any_filter={any_filter}
                                            selectFilter={selectFilter}
                                            filters={filters}
                                            filterValue={filterValue}
                                        />
                                    );
                                })}
                                {ANALYTICS_FILTERS_FROM_SHEETS.map((any_filter) => {
                                    const lastKey = `all${any_filter.key.charAt(0).toUpperCase()}${any_filter.key.slice(1, any_filter.key.length)}`;
                                    const filterValue =
                                        filtersOptions.lastAppliedFilterField && filtersOptions.lastAppliedFilterField === any_filter.key
                                            ? filtersOptions[lastKey]
                                            : filtersOptions[any_filter.key];
                                    return (
                                        <FilterList
                                            key={any_filter.key}
                                            any_filter={any_filter}
                                            selectFilter={selectFilter}
                                            filters={filters}
                                            filterValue={filterValue}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </div>
                    <div className='flex w-full justify-end px-3 pb-2'>
                        <div onClick={resetFilters} className='flex items-center py-1 px-2 rounded-md cursor-pointer border border-gray-300'>
                            <RefreshCcwIcon color={'#000'} size={16} /> <span className='ml-1'>Reset all</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
