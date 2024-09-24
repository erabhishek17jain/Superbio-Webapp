'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/context';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, setProfilesAnalytics, structureProfilesData } from '@/lib/utils';
import { SUMMARY_ICONS } from '@/constants';
import { setCampData } from '@/context/reporting';
import JavaNetworkService from '@/services/java.service';
import NewCampaign from '@/components/shared-components/NewCampaign';
import LoadingReporting from '@/components/global-components/LoadingReporting';
import GenerateReport from '../../../../../components/shared-components/profiles/GenerateReport';
import FilterUi from '../../../../../components/shared-components/profiles/FilterUi';
import FilterAndSorting from '../../../../../components/shared-components/profiles/FilterAndSorting';
import Reporting from '../../../../../components/shared-components/profiles/Reporting';
import AnalyticsSummary from '@/components/shared-components/profiles/AnalyticsSummary';

const SUMMARY_COLORS: { [key: string]: string } = {
    profiles: 'bg-posts',
    views: 'bg-views',
    followers: 'bg-likes',
    engagements: 'bg-reposts',
    frequency_per_day: 'bg-quotes',
};

export default function ProfileReporting({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sParams = useSearchParams();
    const [summary, setSummary] = useState<any>(null);
    const { campData } = useAppSelector((state) => state.reporting);
    const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<any>({
        niche: [],
        engagementRate: [],
        postFrequencyPerDay: [],
        profileTypeByFollowers: [],
    });

    const sortBy = searchParams.sortBy ? searchParams.sortBy : 'followerCount';
    const sortDirection = searchParams.sortDirection ? searchParams.sortDirection : 'DESC';
    const filter = searchParams.filter ? searchParams.filter : '';
    const value = searchParams.value ? searchParams.value : '';

    let query: { [key: string]: string | number } = {
        page: 1,
        size: 6,
        sortBy: sortBy || 'followerCount',
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

    const getBasedOn = (type: string, count: number) => {
        if (type === 'views') {
            return `Avg view of ${count} profiles`;
        } else if (type === 'followers') {
            return `Total follower base across ${count} profiles`;
        } else if (type === 'engagements') {
            return `Avg engagements of ${count} profiles`;
        } else if (type === 'frequency_per_day') {
            return `Avg post frequency per day of ${count} profile`;
        } else {
            return 'Total profiles';
        }
    };

    const calculateAnalytics = (campData: any) => {
        if (campData?.meta.analytics) {
            let keys: string[] = ['views', 'followers', 'engagements', 'frequency_per_day'];
            if (searchParams.isPublic) {
                keys = ['Profiles', 'followers'];
            }
            let result: (ISummary | null)[] = [];
            const totalProfiles = {
                totCount: campData?.meta?.total,
                count: campData?.meta?.total,
                icon: SUMMARY_ICONS['profiles'],
                color: SUMMARY_COLORS['profiles'],
                title: 'Total profiles',
                basedOn: getBasedOn('profile', 0),
            };
            if (!searchParams.isPublic) {
                result = keys.map((key) => {
                    const { analytics, basedOnPosts } = campData?.meta;
                    if (!(analytics as any)[key] && (analytics as any)[key] !== 0) return null;
                    return {
                        totCount: (analytics as any)[key],
                        count: calculateSummary((analytics as any)[key]),
                        icon: SUMMARY_ICONS[key],
                        color: SUMMARY_COLORS[key],
                        title: key,
                        basedOn: getBasedOn(key, (basedOnPosts as any)[key]),
                    };
                });
            }

            return [totalProfiles, ...(result.filter((item) => item !== null) as ISummary[])];
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
            const tempMeta: any = { ...campData.meta };
            const meta = setProfilesAnalytics(resp);
            tempMeta['analytics'] = meta.analytics;
            tempMeta['basedOnPosts'] = meta.basedOnPosts;
            dispatch(setCampData({ ...campData, meta: tempMeta }));
            setIsSheetLoading(false);
        });
    };

    const initialLoadCampData = (query: any) => {
        JavaNetworkService.instance.getProfileReportingData(params.campaignId, clearFilters(query)).then((resp) => {
            const data = structureProfilesData(resp);
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
        </div>
    );
}
