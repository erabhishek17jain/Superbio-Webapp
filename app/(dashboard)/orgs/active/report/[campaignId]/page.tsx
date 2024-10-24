'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ISummary, Params, SearchParams } from '@/interfaces/reporting';
import { calculateSummary, clearFilters, structureProfilesData } from '@/lib/utils';
import { SUMMARY_ICONS } from '@/constants';
import OrgsNetworkService from '@/services/orgs.service';
import NewCampaign from '@/components/shared-components/NewCampaign';
import { setCampData } from '@/context/reporting';
import { useAppDispatch, useAppSelector } from '@/context';
import LoadingReporting from '@/components/global-components/LoadingReporting';
import GenerateReport from '../../../../../../components/shared-components/orgs/GenerateReport';
import FilterAndSorting from '../../../../../../components/shared-components/orgs/FilterAndSorting';
import Reporting from '../../../../../../components/shared-components/orgs/Reporting';
import AnalyticsSummary from '@/components/shared-components/orgs/AnalyticsSummary';
import FilterBoxUi from '@/components/shared-components/orgs/FiltersBoxUi';

const SUMMARY_COLORS: { [key: string]: string } = {
    views: 'bg-reach',
    profiles: 'bg-posts',
    followers: 'bg-likes',
    engagements: 'bg-quotes',
    total_budget: 'bg-reposts',
    frequency_per_day: 'bg-bookmarks',
};

export default function ProfileReporting({ searchParams, params }: { searchParams: SearchParams; params: Params }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sParams = useSearchParams();
    const [isFilter, setIsFilter] = useState(false);
    const [profileIds, setProfileIds] = useState([]);
    const [summary, setSummary] = useState<any>(null);
    const [showSelect, setShowSelect] = useState(false);
    const { campData } = useAppSelector((state) => state.reporting);
    const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [platforms, setPlatforms] = useState({ isInstagram: false, isTwitter: false });

    const [filters, setFilters] = useState<any>({
        tags: [],
        niche: [],
        categories: [],
        engagementRate: [],
        postFrequencyPerDay: [],
        averagePostCostRange: [],
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
        } else if (type === 'total_budget') {
            return `Total budget across ${count} profiles`;
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
            let keys: string[] = ['total_budget', 'views', 'followers', 'engagements', 'frequency_per_day'];
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

    const selectFilter = (checked: boolean, key: string, value: any) => {
        let filter = { ...filters };
        if (filter[key] === undefined) {
            filter[key] = [];
        }
        if (value !== 'all') {
            if (checked) {
                query['lastAppliedFilterField'] = key;
                if (key === 'platform') {
                    filter[key] = [value];
                } else if (key === 'username') {
                    filter[key] = value;
                } else {
                    if (filter[key].indexOf(value) === -1) {
                        filter[key].push(value);
                    }
                }
            } else {
                if (key === 'platform') {
                    delete filter[key];
                } else if (key === 'username') {
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
            !platforms.isInstagram && (await OrgsNetworkService.instance.getIgProfileReportingData(params.campaignId, clearFilters(queryInitial)));

        OrgsNetworkService.instance
            .getIgProfileReportingData(params.campaignId, clearFilters(query))
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
        OrgsNetworkService.instance.getTwProfileReportingData(params.campaignId, clearFilters(query)).then((resp) => {
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
    };

    return (
        <div className='flex flex-col w-full' id='camp-top'>
            {!searchParams.isPublic && <div className='w-full h-[60px]'></div>}
            <div className='flex'>
                {/* {campData?.meta.filterValueResp && (
                    <FilterUi
                        filters={filters}
                        isFilter={isFilter}
                        setFilters={setFilters}
                        setIsFilter={setIsFilter}
                        selectFilter={selectFilter}
                        filtersOptions={campData?.meta.filterValueResp}
                        isPublic={searchParams.isPublic ? true : false}
                    />
                )} */}
                {!isSheetLoading ? (
                    <div className='flex flex-col sm:px-6 md:px-6 mt-2 w-full'>
                        {campData?.data.length === 0 && campData?.meta?.total === 0 && (
                            <NewCampaign
                                buttonText={'Add links'}
                                title={'Add links for reporting'}
                                action={() => router.push(`/orgs/active/create/${params.campaignId}`)}
                                description={
                                    'Add links while adding a google sheet to track and analyze campaign performance. Gain insights to optimize strategies.'
                                }
                            />
                        )}
                        {campData?.data && campData?.data.length > 0 && (
                            <GenerateReport
                                query={query}
                                params={params}
                                platforms={platforms}
                                profileIds={profileIds}
                                showSelect={showSelect}
                                platform={selectedPlatform}
                                setShowSelect={setShowSelect}
                                setProfileIds={setProfileIds}
                                isPublic={searchParams.isPublic ? true : false}
                            />
                        )}
                        {campData?.data && campData?.data.length > 0 && (
                            <>
                                <FilterAndSorting
                                    filters={filters}
                                    platforms={platforms}
                                    meta={campData?.meta}
                                    shouldShowSort={true}
                                    isFilter={isFilter}
                                    setIsFilter={setIsFilter}
                                    changePlatform={changePlatform}
                                    query={{ ...query, ...filters }}
                                    selectedPlatform={selectedPlatform}
                                />
                                <FilterBoxUi
                                    filters={filters}
                                    isFilter={isFilter}
                                    setFilters={setFilters}
                                    selectFilter={selectFilter}
                                    filtersOptions={campData?.meta.filterValueResp}
                                    isPublic={searchParams.isPublic ? true : false}
                                />
                                <AnalyticsSummary summary={summary} filters={filters} />
                                <Reporting
                                    meta={campData?.meta}
                                    profileIds={profileIds}
                                    showSelect={showSelect}
                                    platform={selectedPlatform}
                                    setShowSelect={setShowSelect}
                                    setProfileIds={setProfileIds}
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
