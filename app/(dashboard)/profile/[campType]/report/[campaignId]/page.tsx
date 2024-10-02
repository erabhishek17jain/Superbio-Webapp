'use client';
import { useEffect, useState } from 'react';
import GenerateReport from '../../../../../../components/shared-components/profiles/GenerateReport';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterAndSorting from '../../../../../../components/shared-components/profiles/FilterAndSorting';
import Reporting from '../../../../../../components/shared-components/profiles/Reporting';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, setProfilesAnalytics, structureProfilesData } from '@/lib/utils';
import AnalyticsSummary from '@/components/shared-components/profiles/AnalyticsSummary';
import { SUMMARY_ICONS } from '@/constants';
import JavaNetworkService from '@/services/java.service';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { setCampData } from '@/context/reporting';
import { useAppDispatch, useAppSelector } from '@/context';
import LoadingReporting from '@/components/global-components/LoadingReporting';
import FilterUi from '../../../../../../components/shared-components/profiles/FilterUi';

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
    const [platforms, setPlatforms] = useState({ isInstagram: false, isTwitter: false });
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [filters, setFilters] = useState<any>({
        niche: [],
        engagementRate: [],
        postFrequencyPerDay: [],
        profileTypeByFollowers: [],
    });

    const sortBy = searchParams.sortBy ? searchParams.sortBy : 'followerCount';
    const sortDirection = searchParams.sortDirection ? searchParams.sortDirection : 'DESC';
    let filter = searchParams.filter ? searchParams.filter : '';
    let value = searchParams.value ? searchParams.value : '';

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
            let result: (ISummary | null)[] = [];
            const totalProfiles = {
                totCount: campData?.meta?.total,
                count: campData?.meta?.total,
                icon: SUMMARY_ICONS['profiles'],
                color: SUMMARY_COLORS['profiles'],
                title: 'Total profiles',
                basedOn: getBasedOn('profile', 0),
            };
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

    useEffect(() => {
        if (campData?.data?.length > 0) {
            setSummary(calculateAnalytics(campData));
        }
    }, [campData]);

    const initialLoadInstagramCampData = async (query: any, platforms: any) => {
        const queryInitial: { [key: string]: string | number } = {
            page: 1,
            size: 6,
            sortBy: sortBy || 'followerCount',
            sortDirection: sortDirection || 'DESC',
        };
        const twitterResp: any =
            !platforms.isInstagram && (await JavaNetworkService.instance.getTwitterProfileReportingData(params.campaignId, clearFilters(queryInitial)));

        JavaNetworkService.instance
            .getInstaProfileReportingData(params.campaignId, clearFilters(query))
            .then((resp) => {
                const data = structureProfilesData(resp, 'instagram');
                if (data.meta.total > 0) {
                    setSelectedPlatform(data.meta.total > 0 ? 'instagram' : 'twitter');
                    if (selectedPlatform == '') {
                        setPlatforms({
                            ...platforms,
                            isInstagram: data.meta.total > 0 ? true : false,
                            isTwitter: twitterResp.profilePaginatedResponse.totalItems > 0 ? true : false,
                        });
                    }
                    dispatch(setCampData(data));
                } else {
                    const data = structureProfilesData(twitterResp, 'twitter');
                    if (data.meta.total > 0) {
                        setSelectedPlatform(data.meta.total > 0 ? 'twitter' : 'instagram');
                        setPlatforms({ ...platforms, isTwitter: data.meta.total > 0 ? true : false });
                        dispatch(setCampData(data));
                    } else {
                        dispatch(setCampData({ data: [], meta: { total: 0 } as any }));
                    }
                }
                setIsSheetLoading(false);
            })
            .catch(() => {
                const data = structureProfilesData(twitterResp, 'twitter');
                if (data.meta.total > 0) {
                    setSelectedPlatform(data.meta.total > 0 ? 'twitter' : 'instagram');
                    setPlatforms({ ...platforms, isTwitter: data.meta.total > 0 ? true : false });
                    dispatch(setCampData(data));
                }
                setIsSheetLoading(false);
            });
    };

    const initialLoadTwitterCampData = (query: any, platforms: any) => {
        JavaNetworkService.instance.getTwitterProfileReportingData(params.campaignId, clearFilters(query)).then((resp) => {
            const data = structureProfilesData(resp, 'twitter');
            if (data.meta.total > 0) {
                setSelectedPlatform(data.meta.total > 0 ? 'twitter' : 'instagram');
                setPlatforms({ ...platforms, isTwitter: data.meta.total > 0 ? true : true });
                dispatch(setCampData(data));
            } else {
                dispatch(setCampData({ data: [], meta: { total: 0 } as any }));
            }
            setIsSheetLoading(false);
        });
    };

    useEffect(() => {
        setIsSheetLoading(true);
        const filter = sParams.get('filter');
        const value = sParams.get('value');
        if (filter && value) {
            let filteNames = filter.split('|');
            let filteValues = value.split('|');
            let filterObj: any = { ...filters };
            for (let i = 0; i < filteNames.length; i++) {
                filterObj[filteNames[i]] = filteValues[i].split('_');
            }
            query['lastAppliedFilterField'] = filteNames[filteNames.length - 1];
            setFilters(filterObj);
            initialLoadInstagramCampData({ ...query, ...filterObj }, platforms);
        } else {
            initialLoadInstagramCampData(query, platforms);
        }
    }, []);

    useEffect(() => {
        if (selectedPlatform === 'twitter') {
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
                initialLoadTwitterCampData({ ...query, ...filterObj }, platforms);
            } else {
                initialLoadTwitterCampData(query, platforms);
            }
        }
    }, []);

    const changePlatform = (platform: string) => {
        setFilters({
            niche: [],
            engagementRate: [],
            postFrequencyPerDay: [],
            profileTypeByFollowers: [],
        });
        const url = new URL(window.location.href);
        url.searchParams.delete('filter');
        url.searchParams.delete('value');
        delete query.filterKeys;
        delete query.filterValues;
        delete query.lastAppliedFilterField;
        if (platform === 'twitter') {
            setIsSheetLoading(true);
            initialLoadTwitterCampData(query, platforms);
        } else if (platform === 'instagram') {
            setIsSheetLoading(true);
            initialLoadInstagramCampData(query, platforms);
        }
        document.getElementById('filterPanel')?.classList.toggle('hidden');
    };

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
                                action={() => router.push(`/profile/${params?.campType}/create/${params.campaignId}`)}
                                description={
                                    'Add links while adding a google sheet to track and analyze campaign performance. Gain insights to optimize strategies.'
                                }
                            />
                        )}
                        {campData?.data && campData?.data.length > 0 && (
                            <GenerateReport query={query} params={params} platform={selectedPlatform} isPublic={searchParams.isPublic ? true : false} />
                        )}
                        {campData?.data && campData?.data.length > 0 && (
                            <>
                                <FilterAndSorting
                                    filters={filters}
                                    platforms={platforms}
                                    meta={campData?.meta}
                                    shouldShowSort={true}
                                    changePlatform={changePlatform}
                                    query={{ ...query, ...filters }}
                                    selectedPlatform={selectedPlatform}
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
                                    meta={campData?.meta}
                                    platform={selectedPlatform}
                                    campaignId={params.campaignId}
                                    initialColumns={campData?.data}
                                    query={{ ...query, ...filters }}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    <LoadingReporting isPublic={false} title={campData.meta?.campaignDto?.title} />
                )}
            </div>
        </div>
    );
}
