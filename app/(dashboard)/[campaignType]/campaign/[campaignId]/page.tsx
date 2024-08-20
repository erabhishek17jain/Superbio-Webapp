'use client';
import { useEffect, useState } from 'react';
import GenerateReport from '../../../../../components/shared-components/GenerateReport';
import FilterUi from '../../../../../components/shared-components/FilterUi';
import { useSearchParams } from 'next/navigation';
import FilterAndSorting from '../../../../../components/shared-components/FilterAndSorting';
import Reporting from '../../../../../components/shared-components/Reporting';
import { useAppSelector } from '@/context';
import { IColumnResponse } from '@/services/public.service';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, structureData } from '@/lib/utils';
import AnalyticsSummary from '@/components/shared-components/AnalyticsSummary';
import { SUMMARY_ICONS } from '@/constants';
import JavaNetworkService from '@/services/java.service';
import LoadingBlack from '@/components/global-components/LoadingBlack';
import NewCampaign from '@/components/shared-components/NewCampaign';

const SUMMARY_COLORS: { [key: string]: string } = {
    views: 'bg-posts',
    comments: 'bg-views',
    likes: 'bg-likes',
    reposts: 'bg-reposts',
    quotes: 'bg-quotes',
    bookmarks: 'bg-bookmarks',
    shares: 'bg-quotes',
    saves: 'bg-bookmarks',
    estimatedReach: 'bg-views',
    Posts: 'bg-posts',
    followers: 'bg-posts',
    medias: 'bg-views',
    engagements: 'bg-reposts',
    frequency: 'bg-quotes',
    following: 'bg-bookmarks',
};

export default function CampaignReporting({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const sParams = useSearchParams();
    const { campaignType } = useAppSelector((state) => state.user);
    const [campData, setCampData] = useState<IColumnResponse>({ data: [], meta: {} as any });
    const [summary, setSummary] = useState<any>(null);
    const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<any>({
        postedAt: [],
        internalSheetId: [],
        platform: [],
        postType: [],
        phase: [],
        category: [],
        subCategory: [],
    });

    const sortBy = searchParams.sortBy ? searchParams.sortBy : 'likes';
    const sortDirection = searchParams.sortDirection ? searchParams.sortDirection : 'DESC';
    const filter = searchParams.filter ? searchParams.filter : '';
    const value = searchParams.value ? searchParams.value : '';

    let query: { [key: string]: string | number } = {
        page: 1,
        size: 6,
        sortBy: sortBy || 'likes',
        sortDirection: sortDirection || 'DESC',
    };
    if (filter && value) {
        query = {
            ...query,
            filterKeys: filter,
            filterValues: value,
            lastAppliedFilterField: '',
        };
    }

    const calculateAnalytics = (campData: any) => {
        const isTwitter = campData?.meta.filterValueResp?.platform.includes('twitter');
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
            const estimateFollowers = Number(campData?.meta.analytics.views) + Number(campData?.meta.analytics.estimatedReach) * 10;
            const extimateReach = {
                totCount: campaignType === 'influncer' ? estimateFollowers : campData?.meta.analytics.estimatedReach,
                count: calculateSummary(campaignType === 'influncer' ? estimateFollowers : campData?.meta.analytics.estimatedReach),
                icon: SUMMARY_ICONS['estimatedReach'],
                color: SUMMARY_COLORS['estimatedReach'],
                title: 'Estimated Reach',
                basedOn: <></>,
            };
            let result: (ISummary | null)[] = [];
            if (searchParams.isPublic) {
                result.push({
                    totCount: campData?.meta?.total,
                    count: campData?.meta?.total,
                    icon: SUMMARY_ICONS['Posts'],
                    color: SUMMARY_COLORS['Posts'],
                    title: 'Total Posts',
                    basedOn: (
                        <>
                            <span>{campData?.meta?.total}</span>/<span className='text-sm'>{campData?.meta.total}</span>
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
                        icon: SUMMARY_ICONS[key],
                        color: SUMMARY_COLORS[key],
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
                query['lastAppliedFilterField'] = key;
                if (key === 'platform') {
                    filter[key] = [value];
                } else {
                    if (filter[key].indexOf(value) === -1) {
                        filter[key].push(value);
                    }
                }
            } else {
                if (key === 'platform') {
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

    const initialLoadCampData = (query: any) => {
        JavaNetworkService.instance.getReportingData(params.campaignId, clearFilters(query)).then((resp) => {
            if (campaignType === 'influncer') {
                const data: any = { data: [], meta: {} };
                setCampData({ data: data.data, meta: data.meta });
            } else {
                const data = structureData(resp);
                setCampData(data);
            }
            setIsSheetLoading(false);
        });
    };

    useEffect(() => {
        if (campData?.data?.length > 0) {
            setSummary(calculateAnalytics(campData));
        }
    }, [campData]);

    useEffect(() => {
        setIsSheetLoading(true);
        const filter = sParams.get('filter');
        const value = sParams.get('value');
        if (filter && value) {
            let filteNames = filter.split('|');
            let filteValues = value.split('|');
            let filterObj: any = { ...filters };
            for (let i = 0; i < filteNames.length; i++) {
                if (filteNames[i] === 'platform' || filteNames[i] === 'postType') {
                    filterObj[filteNames[i]] = [filteValues[i]];
                } else {
                    filterObj[filteNames[i]] = filteValues[i].split('_');
                }
            }
            query['lastAppliedFilterField'] = filteNames[filteNames.length - 1];
            setFilters(filterObj);
            initialLoadCampData({ ...query, ...filterObj });
        } else {
            initialLoadCampData(query);
        }
    }, []);

    return (
        <div className='flex'>
            {campData?.meta.filterValueResp && (
                <FilterUi filters={filters} setFilters={setFilters} selectFilter={selectFilter} filtersOptions={campData?.meta.filterValueResp} />
            )}
            {!isSheetLoading ? (
                <div className='flex flex-col sm:px-6 md:px-6 mt-2 mx-3 md:mx-0 sm:mx-0 w-full'>
                    {campData?.data.length === 0 && campData?.meta?.total === 0 && <NewCampaign params={params} />}
                    {campData?.data && campData?.data.length > 0 && (
                        <GenerateReport
                            meta={campData?.meta}
                            query={query}
                            isPublic={searchParams.isPublic ? true : false}
                            columns={campData?.data}
                            params={params}
                        />
                    )}
                    {campData?.data && campData?.data.length > 0 && (
                        <>
                            <FilterAndSorting
                                meta={campData?.meta}
                                shouldShowSort={true}
                                query={query}
                                filters={filters}
                                selectFilter={selectFilter}
                                filtersOptions={campData?.meta.filterValueResp}
                            />
                            <AnalyticsSummary summary={summary} filters={filters} campaign={campData?.meta.campaignDto} />
                            <Reporting
                                query={query}
                                meta={campData?.meta}
                                campaignId={params.campaignId}
                                initialColumns={campData?.data}
                                isPublic={searchParams.isPublic ? searchParams.isPublic : false}
                            />
                        </>
                    )}
                </div>
            ) : (
                <LoadingBlack />
            )}
        </div>
    );
}
