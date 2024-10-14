'use client';
import { useEffect, useState } from 'react';
import GenerateReport from '../../../../../../components/shared-components/posts/GenerateReport';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterAndSorting from '../../../../../../components/shared-components/posts/FilterAndSorting';
import Reporting from '../../../../../../components/shared-components/posts/Reporting';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, setPostsAnalytics, structurePostsData } from '@/lib/utils';
import AnalyticsSummary from '@/components/shared-components/posts/AnalyticsSummary';
import { SUMMARY_ICONS } from '@/constants';
import PostNetworkService from '@/services/post.service';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { setCampData } from '@/context/reporting';
import { useAppDispatch, useAppSelector } from '@/context';
import LoadingReporting from '@/components/global-components/LoadingReporting';
import FilterUi from '../../../../../../components/shared-components/posts/FilterUi';

const SUMMARY_COLORS: { [key: string]: string } = {
    posts: 'bg-posts',
    reach: 'bg-reach',
    views: 'bg-views',
    likes: 'bg-likes',
    comments: 'bg-comments',
    reposts: 'bg-reposts',
    quotes: 'bg-quotes',
    bookmarks: 'bg-bookmarks',
    shares: 'bg-quotes',
    saves: 'bg-bookmarks',
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
    const [isFilter, setIsFilter] = useState(false);
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
            const total: (any)[] = [];
            if (searchParams.isPublic) {
                total.push({
                    basedOnPostCount: campData?.meta?.total,
                    calculatedValue: campData?.meta?.total,
                    color: SUMMARY_COLORS['posts'],
                    customEstimatedValue: campData?.meta?.total,
                    hideInPublicView: true,
                    icon: SUMMARY_ICONS['posts'],
                    statsType: 'Total posts',
                });
            }
            const result: (ISummary | null)[] = campData?.meta.analytics.map((item: any) => {
                return {
                    ...item,
                    icon: SUMMARY_ICONS[item.statsType],
                    color: SUMMARY_COLORS[item.statsType],
                    calculatedValue: calculateSummary(item.calculatedValue),
                    customEstimatedValue: calculateSummary(item.customEstimatedValue),
                    statsType: item.statsType === 'reach' ? 'Estimated Reach' : item.statsType,
                };
            });
            return [...total, ...result];
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
        PostNetworkService.instance.getCampaignSummary(params.campaignId, clearFilters(query)).then((resp) => {
            const tempMeta = { ...campData.meta };
            const meta = setPostsAnalytics(resp);
            tempMeta['analytics'] = meta.analytics;
            dispatch(setCampData({ ...campData, meta: tempMeta }));
            setIsSheetLoading(false);
        });
    };

    const initialLoadCampData = (query: any) => {
        PostNetworkService.instance.getPostReportingData(params.campaignId, clearFilters(query)).then((resp) => {
            const data = structurePostsData(resp);
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
            {!searchParams.isPublic && <div className='w-full h-[60px]'></div>}
            <div className='flex'>
                {campData?.meta.filterValueResp && (
                    <FilterUi
                        filters={filters}
                        setFilters={setFilters}
                        selectFilter={selectFilter}
                        filtersOptions={campData?.meta.filterValueResp}
                        isFilter={isFilter}
                        setIsFilter={setIsFilter}
                    />
                )}
                {!isSheetLoading ? (
                    <div className='flex flex-col sm:px-6 md:px-6 mt-2 w-full'>
                        {campData?.data.length === 0 && campData?.meta?.total === 0 && (
                            <NewCampaign
                                buttonText={'Add links'}
                                title={'Add links for reporting'}
                                action={() => router.push(`/posts/${params?.campType}/create/${params.campaignId}`)}
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
                                    isFilter={isFilter}
                                    setIsFilter={setIsFilter}
                                    selectFilter={selectFilter}
                                    refreshCampData={() => refreshCampaign(query)}
                                    filtersOptions={campData?.meta.filterValueResp}
                                    isPublic={searchParams.isPublic ? searchParams.isPublic : false}
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
        </div>
    );
}
