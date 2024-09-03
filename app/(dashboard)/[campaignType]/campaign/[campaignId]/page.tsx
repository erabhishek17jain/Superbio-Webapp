'use client';
import { useEffect, useState } from 'react';
import GenerateReport from '../../../../../components/shared-components/GenerateReport';
import FilterUi from '../../../../../components/shared-components/FilterUi';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterAndSorting from '../../../../../components/shared-components/FilterAndSorting';
import Reporting from '../../../../../components/shared-components/Reporting';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, setAnalytics, structureData } from '@/lib/utils';
import AnalyticsSummary from '@/components/shared-components/AnalyticsSummary';
import { SUMMARY_ICONS } from '@/constants';
import JavaNetworkService from '@/services/java.service';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { setCampData } from '@/context/reporting';
import { useAppDispatch, useAppSelector } from '@/context';
import LoadingReporting from '@/components/global-components/LoadingReporting';

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sParams = useSearchParams();
    const [summary, setSummary] = useState<any>(null);
    const { campData } = useAppSelector((state) => state.reporting);
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
        if (campData?.meta.analytics) {
            let keys: string[] = ['Estimated Reach', 'views', 'likes', 'comments', 'reposts', 'quotes', 'bookmarks'];
            if (searchParams.isPublic) {
                keys = ['Posts', 'Estimated Reach'];
            }
            const estimatedReach = campData?.meta.analytics.customEstimatedReach
                ? campData?.meta.analytics.customEstimatedReach
                : campData?.meta.analytics.estimatedReach;
            const estimatedReachText = campData?.meta.analytics.customEstimatedReach && !searchParams.isPublic ? 'Estimated Reach (Custom)' : 'Estimated Reach';
            const extimateReach = {
                totCount: estimatedReach,
                count: calculateSummary(estimatedReach),
                icon: SUMMARY_ICONS['estimatedReach'],
                color: SUMMARY_COLORS['estimatedReach'],
                title: estimatedReachText,
                basedOn: campData?.meta.analytics.customEstimatedReach,
            };
            let result: (ISummary | null)[] = [];
            if (searchParams.isPublic) {
                result.push({
                    totCount: campData?.meta?.total,
                    count: campData?.meta?.total,
                    icon: SUMMARY_ICONS['Posts'],
                    color: SUMMARY_COLORS['Posts'],
                    title: 'Total Posts',
                    basedOn: <></>,
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

    const refreshCampaign = (query: any) => {
        JavaNetworkService.instance.getCampaignSummary(params.campaignId, clearFilters(query)).then((resp) => {
            const tempMeta = { ...campData.meta };
            const meta = setAnalytics(resp);
            tempMeta['analytics'] = meta.analytics;
            tempMeta['basedOnPosts'] = meta.basedOnPosts;
            dispatch(setCampData({ ...campData, meta: tempMeta }));
            setIsSheetLoading(false);
        });
    };

    const initialLoadCampData = (query: any) => {
        JavaNetworkService.instance.getReportingData(params.campaignId, clearFilters(query)).then((resp) => {
            const data = structureData(resp);
            dispatch(setCampData(data));
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
        <div className='flex flex-col w-full' id='camp-top'>
            <div className='w-full h-[60px]'></div>
            {campData?.meta.filterValueResp && (
                <FilterUi filters={filters} setFilters={setFilters} selectFilter={selectFilter} filtersOptions={campData?.meta.filterValueResp} />
            )}
            {!isSheetLoading ? (
                <div className='flex flex-col sm:px-6 md:px-6 mt-2 w-full'>
                    {campData?.data.length === 0 && campData?.meta?.total === 0 && (
                        <NewCampaign
                            buttonText={'Add links'}
                            title={'Add links for reporting'}
                            action={() => router.push(`/${params?.campaignType}/create/${params.campaignId}`)}
                            description={
                                'Add links while adding a google sheet to track and analyze campaign performance. Gain insights to optimize strategies.'
                            }
                        />
                    )}
                    {campData?.data && campData?.data.length > 0 && (
                        <GenerateReport query={query} params={params} isPublic={searchParams.isPublic ? true : false} />
                    )}
                    {campData?.data && campData?.data.length > 0 && (
                        <>
                            <FilterAndSorting
                                meta={campData?.meta}
                                shouldShowSort={true}
                                query={{ ...query, ...filters }}
                                filters={filters}
                                selectFilter={selectFilter}
                                filtersOptions={campData?.meta.filterValueResp}
                            />
                            <AnalyticsSummary
                                summary={summary}
                                filters={filters}
                                isPublic={searchParams.isPublic ? searchParams.isPublic : false}
                                campaign={campData?.meta.campaignDto}
                                refreshCampData={() => refreshCampaign(query)}
                            />
                            <Reporting
                                query={{ ...query, ...filters }}
                                meta={campData?.meta}
                                campaignId={params.campaignId}
                                initialColumns={campData?.data}
                                isPublic={searchParams.isPublic ? searchParams.isPublic : false}
                            />
                        </>
                    )}
                </div>
            ) : (
                <LoadingReporting isPublic={searchParams.isPublic ? searchParams.isPublic : false} title={campData.meta?.campaignDto?.title} />
            )}
        </div>
    );
}
