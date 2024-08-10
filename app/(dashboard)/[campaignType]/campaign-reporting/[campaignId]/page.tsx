'use client';
import React, { useEffect } from 'react';
import SheetNetworkService from '@/services/sheet.service';
import { Params, SearchParams } from './layout';
import { colors, icons } from './icons-colors';
import Link from 'next/link';
import DownloadHandler from './DownloadHandler';
import CampaignReportingFilter from './filter';
import FilterUi from './FilterUi';
import FilterPlatform from './FilterPlatform';
import { IColumnResponse } from '@/services/public.service';
import { useAppDispatch, useAppSelector } from '@/context';
import { setFitlersState } from '@/context/campaign';
import { useSearchParams } from 'next/navigation';
import profiles from '../../../../../lib/profileResp.json';
interface ISummary {
    totCount: number;
    count: number;
    icon: JSX.Element;
    color: string;
    title: string;
    basedOn: number | JSX.Element;
}

export default async function CampaignReporting({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const sParams = useSearchParams();
    const dispatch = useAppDispatch();
    const { campaignType } = useAppSelector((state) => state.user);
    const [campData, setCampData] = React.useState<IColumnResponse>({ data: [], meta: {} as any });
    const [summary, setSummary] = React.useState<any>(null);
    const [defFilters, setDefFilters] = React.useState<any>(null);
    const [filterOptn, setFilterOptn] = React.useState<any>(null);
    const [filters, setFilters] = React.useState<AvailableFilters | any>({});

    const sort = searchParams.sort ? searchParams.sort : 'analytics.likes';
    const order = searchParams.order ? parseInt(searchParams.order) : -1;
    const filter = searchParams.filter ? searchParams.filter : '';
    const value = searchParams.value ? searchParams.value : '';
    const campaignName = searchParams.campaignName ? searchParams.campaignName : '';

    let query: { [key: string]: string | number } = {
        page: 1,
        limit: 2000,
        sortBy: sort || 'analytics.likes',
        sortOrder: order || -1,
    };
    if (filter && value) {
        query = {
            ...query,
            filterKeys: filter,
            filterValues: value,
        };
    }

    const calculateSummary = (count: number) => {
        let calSum = 0 as any;
        if (count !== undefined && count !== null && !isNaN(count)) {
            calSum = (count / 1000000).toFixed(1) + 'M';
            if (count > 1000 && count < 1000000) {
                calSum = (count / 1000).toFixed(1) + 'K';
            } else if (count < 1000) {
                calSum = count;
            }
        }
        return calSum;
    };

    const calculateAnalytics = (campData: any) => {
        const isTwitter = filterOptn?.platform.includes('twitter');
        if (campData?.meta.analytics) {
            let keys: string[] =
                campaignType === 'influncer'
                    ? ['Estimated Reach', 'followers', 'medias', 'views', 'engagements', 'frequency', 'following']
                    : ['Estimated Reach', 'views', 'likes', 'comments'];
            if (searchParams.isPublic) {
                keys = ['Posts', 'Estimated Reach'];
            } else {
                if (isTwitter) {
                    keys =
                        campaignType === 'influncer'
                            ? ['Estimated Reach', 'followers', 'medias', 'views', 'engagements', 'frequency', 'following']
                            : ['Estimated Reach', 'views', 'likes', 'comments', 'reposts', 'quotes', 'bookmarks'];
                }
            }
            const estimateCount = campaignType === 'influncer' ? Number(campData?.meta.analytics.followers) : Number(campData?.meta.analytics.likes);
            const extimateReach = {
                totCount: estimateCount,
                count: calculateSummary(Number(campData?.meta.analytics.views) + estimateCount * 10),
                icon: icons['Estimated Reach'],
                color: colors['Estimated Reach'],
                title: 'Estimated Reach',
                basedOn: (
                    <>
                        <span>{campData?.meta.basedOnPosts.likes}</span>/<span className='text-sm'>{campData?.meta.total}</span>
                    </>
                ),
            };
            let result: (ISummary | null)[] = [];
            if (searchParams.isPublic) {
                result.push({
                    totCount: campData?.meta.total,
                    count: campData?.meta.total,
                    icon: icons['Posts'],
                    color: colors['Posts'],
                    title: 'Posts',
                    basedOn: (
                        <>
                            <span>{campData?.meta.total}</span>/<span className='text-sm'>{campData?.meta.total}</span>
                        </>
                    ),
                });
            } else {
                result = keys.map((key) => {
                    const { analytics, basedOnPosts } = campData?.meta;
                    if (!(analytics as any)[key] && (analytics as any)[key] !== 0) return null;
                    return {
                        totCount: (analytics as any)[key],
                        count: calculateSummary((analytics as any)[key]),
                        icon: icons[key],
                        color: colors[key],
                        title: key,
                        basedOn: (basedOnPosts as any)[key],
                    };
                });
            }

            return [extimateReach, ...(result.filter((item) => item !== null) as ISummary[])];
        }
    };

    const selectFilter = (checked: boolean, key: string, value: string) => {
        let filter = { ...filters };
        if (filter[key] === undefined) {
            filter[key] = [];
        }
        if (value !== 'all') {
            if (checked) {
                if (key === 'platform' || key === 'postType') {
                    filter[key] = [value];
                } else {
                    if (filter[key].indexOf(value) === -1) {
                        filter[key].push(value);
                    }
                }
            } else {
                if (key === 'platform' || key === 'postType') {
                    delete filter[key];
                } else {
                    filter[key] = filter[key].filter((item: any) => item !== value);
                    if (filter[key].length === 0) {
                        delete filter[key];
                    }
                }
            }
        } else {
            filter[key] = [];
        }

        setFilters({ ...filter });
        for (var key in filter) {
            if (filter[key].length === 0) delete filter[key];
        }
        const filterKeys = Object.keys(filter).join('|');
        const filterValues = Object.values(filter).join('|').replaceAll(',', '_');

        const url = new URL(window.location.href);
        if (filterKeys && filterValues) {
            url.searchParams.set('filter', filterKeys);
            url.searchParams.set('value', filterValues);
        } else {
            url.searchParams.delete('filter');
            url.searchParams.delete('value');
        }

        window.location.href = url.href;
    };

    useEffect(() => {
        if (defFilters?.length > 0) {
            dispatch(setFitlersState(defFilters));
        }
    }, [defFilters]);

    useEffect(() => {
        const filter = sParams.get('filter');
        const value = sParams.get('value');
        if (filter && value) {
            if (filter !== 'platform') {
                document.getElementById('filterPanel')?.classList.remove('hidden');
            }
            let filteNames = filter.split('|');
            let filteValues = value.split('|');
            let filterObj: any = {};
            for (let i = 0; i < filteNames.length; i++) {
                if (filteNames[i] === 'platform' || filteNames[i] === 'postType') {
                    filterObj[filteNames[i]] = [filteValues[i]];
                } else {
                    filterObj[filteNames[i]] = filteValues[i].split('_');
                }
            }
            setFilters(filterObj);
        }
    }, [filterOptn]);

    useEffect(() => {
        if (defFilters) {
            let filter = sParams.get('filter');
            let value = sParams.get('value');
            const filterHandler = new CampaignReportingFilter(defFilters);
            let filterOptions = filterHandler.getAvailableFilters();
            let filterKeys = Object.keys(filters);
            if (filterKeys.length > 0 && filter !== null && value !== null) {
                filterOptions = filterHandler.setSelectedFilters(filter?.split('|'), value?.split('|'));
                setFilterOptn(filterOptions);
                return;
            }
            setFilterOptn(filterOptions);
        }
    }, [defFilters]);

    useEffect(() => {
        if (campData?.data?.length > 0) {
            setSummary(calculateAnalytics(campData));
        }
    }, [campData]);

    let loaded = false;
    const initialLoadFilters = async () => {
        if (!loaded) {
            const defaultFilters = await SheetNetworkService.instance.getSheetFilters(params.campaignId);
            setDefFilters(defaultFilters);
        }
    };

    const initialLoadCampData = async () => {
        if (!loaded) {
            const resp = await SheetNetworkService.instance.getCampaignData(params.campaignId, query);
            const metaResp = await SheetNetworkService.instance.getCampaignMeta(params.campaignId, query);
            const data: any = campaignType === 'influncer' ? profiles : resp;
            const meta = { ...data.meta, ...metaResp };
            setCampData({ data: data.data, meta: meta });
            loaded = true;
        }
    };

    useEffect(() => {
        initialLoadCampData();
    }, [filterOptn]);

    useEffect(() => {
        initialLoadFilters();
    }, []);

    return (
        <div className='flex'>
            <div className={`flex flex-col sm:px-6 md:px-6 mt-3 mx-3 md:mx-0 sm:mx-0 w-full`} id='camp-top'>
                {campData?.data.length === 0 && campData?.meta?.total === 0 && (
                    <div className='flex flex-col gap-5 items-center justify-center w-96 h-[500px] m-auto'>
                        <div className='flex items-center justify-center rounded-lg bg-[#F5F8FF] w-20 h-20'>
                            <div className='flex p-1 rounded-lg bg-[#F5F8FF]'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24' id='link'>
                                    <path
                                        fill='#0151A0'
                                        d='M8,12a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,12Zm2,3H7A3,3,0,0,1,7,9h3a1,1,0,0,0,0-2H7A5,5,0,0,0,7,17h3a1,1,0,0,0,0-2Zm7-8H14a1,1,0,0,0,0,2h3a3,3,0,0,1,0,6H14a1,1,0,0,0,0,2h3A5,5,0,0,0,17,7Z'></path>
                                </svg>
                            </div>
                        </div>
                        <div className='text-3xl font-bold'>Add links for reporting</div>
                        <div className='text-sm text-[#959595]'>
                            Empower your reporting capabilities with a quick link addition for seamless campaign insights. Elevate your analytics game in just
                            one click!
                        </div>
                        <Link
                            href={`/${params?.campaignType}/create-reporting/${params.campaignId}`}
                            className='bg-black flex items-center py-2 rounded-xl pl-4 pr-5 text-white text-sm gap-2'>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='stroke-2 stroke-black'>
                                <path
                                    d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z'
                                    fill='white'
                                />
                            </svg>
                            <span className='flex'>Add Links</span>
                        </Link>
                    </div>
                )}

                {campData?.data && campData?.data.length > 0 && (
                    <DownloadHandler
                        meta={campData?.meta}
                        query={query}
                        isPublic={searchParams.isPublic ? true : false}
                        columns={campData?.data}
                        params={params}
                        campaignName={campaignName}
                        summary={summary}
                    />
                )}
                <FilterPlatform
                    campData={campData}
                    query={query}
                    params={params}
                    sParams={searchParams}
                    filters={filters}
                    summary={summary}
                    filtersOptions={filterOptn}
                    selectFilter={selectFilter}
                />
            </div>
            <FilterUi filters={filters} setFilters={setFilters} selectFilter={selectFilter} filtersOptions={filterOptn} />
        </div>
    );
}
