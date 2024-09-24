import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deleteCookie } from 'cookies-next';
import { IPostsReportingResponse, IProfilesReportingResponse } from '@/interfaces/sheet';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getGridCols(width: number) {
    if (width > 1280) return 3;
    if (width > 640) return 2;
    return 1;
}

export const scrollToElementById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const logout = () => {
    deleteCookie('token');
    deleteCookie('user');
};

export const calculateStatus = (status: string, processed: number, totalPost: number) => {
    if (processed) {
        const per = (processed * 100) / totalPost;
        return `${per.toFixed(0)}%`;
    } else {
        return status;
    }
};

export const setPostsAnalytics = (campaignAnalyticsResp: any) => {
    const analytics = {
        likes: campaignAnalyticsResp.likes,
        comments: campaignAnalyticsResp.comments,
        views: campaignAnalyticsResp.views,
        reposts: campaignAnalyticsResp.reposts,
        quotes: campaignAnalyticsResp.quotes,
        bookmarks: campaignAnalyticsResp.bookmarks,
        estimatedReach: campaignAnalyticsResp.estimatedReach,
        customEstimatedReach: campaignAnalyticsResp.customEstimatedReach,
    };
    const basedOnPosts = {
        likes: campaignAnalyticsResp.basedOnPostCountDto.likePosts,
        comments: campaignAnalyticsResp.basedOnPostCountDto.commentPosts,
        views: campaignAnalyticsResp.basedOnPostCountDto.viewPosts,
        reposts: campaignAnalyticsResp.basedOnPostCountDto.repostPosts,
        quotes: campaignAnalyticsResp.basedOnPostCountDto.quotePosts,
        bookmarks: campaignAnalyticsResp.basedOnPostCountDto.bookmarkPosts,
        estimatedReach: campaignAnalyticsResp.basedOnPostCountDto.estimatedReachPosts,
        customEstimatedReach: campaignAnalyticsResp.basedOnPostCountDto.customEstimatedReachPosts,
    };
    return { analytics: analytics, basedOnPosts: basedOnPosts };
};

export const structurePostsData = (data: IPostsReportingResponse) => {
    let sheets = data.filterValueResp.lastAppliedFilterField === 'internalSheetId' ? data.filterValueResp.allSheets : data.filterValueResp.sheets;
    sheets = sheets.map((item: any) => {
        return { id: item.id, name: item.name };
    });
    return {
        data: data.postDtoPaginatedResponse.items,
        meta: {
            ...setPostsAnalytics(data.campaignAnalyticsResp),
            limit: 6,
            page: data.postDtoPaginatedResponse.currentPage,
            total: data.postDtoPaginatedResponse.totalItems,
            queueDto: data.queueDto,
            campaignDto: data.campaignDto,
            postSummaryResp: data.postSummaryResp,
            filterValueResp: {
                postedAt:
                    data.filterValueResp.lastAppliedFilterField === 'postedAt' ? data.filterValueResp.allPostedAtDates : data.filterValueResp.postedAtDates,
                internalSheetId: sheets,
                platform: data.filterValueResp.lastAppliedFilterField === 'platform' ? data.filterValueResp.allPlatforms : data.filterValueResp.platforms,
                postType: data.filterValueResp.lastAppliedFilterField === 'postType' ? data.filterValueResp.allPostTypes : data.filterValueResp.postTypes,
                phase: data.filterValueResp.lastAppliedFilterField === 'phase' ? data.filterValueResp.allCampaignPhases : data.filterValueResp.campaignPhases,
                category: data.filterValueResp.lastAppliedFilterField === 'category' ? data.filterValueResp.allCategories : data.filterValueResp.categories,
                subCategory:
                    data.filterValueResp.lastAppliedFilterField === 'subCategory' ? data.filterValueResp.allSubCategories : data.filterValueResp.subCategories,
            },
        },
    };
};

export const setProfilesAnalytics = (profileAnalytics: any) => {
    const analytics = {
        views: profileAnalytics.avgViews,
        followers: profileAnalytics.totalFollowers,
        engagements: profileAnalytics.avgEngagementRate,
        frequency_per_day: profileAnalytics.avgPostFrequencyPerDay,
    };
    const basedOnPosts = {
        views: profileAnalytics.basedOnProfileCount?.avgViewsPosts,
        followers: profileAnalytics.basedOnProfileCount?.totalFollowersPosts,
        engagements: profileAnalytics.basedOnProfileCount?.avgEngagementRatePosts,
        frequency_per_day: profileAnalytics.basedOnProfileCount?.avgPostFrequencyPerDayPosts,
    };
    return { analytics: analytics, basedOnPosts: basedOnPosts };
};

export const setProfilesFilters = (filters: any) => {
    const filterValueResp = {
        profileTypeByFollowers:
            filters.lastAppliedFilterField === 'profileTypeByFollowers' ? filters.allProfileTypeByFollowers : filters.profileTypeByFollowers,
        postFrequencyPerDay: filters.lastAppliedFilterField === 'postFrequencyPerDay' ? filters.allPostFrequencyPerDay : filters.postFrequencyPerDay,
        niche: filters.lastAppliedFilterField === 'niche' ? filters.allNiche : filters.niche,
        engagementRate: filters.lastAppliedFilterField === 'engagementRate' ? filters.allEngagementRate : filters.engagementRate,
    };
    return { filterValueResp: filterValueResp };
};

export const structureProfilesData = (data: IProfilesReportingResponse, platform: string) => {
    return {
        data: data.profilePaginatedResponse.items,
        meta: {
            ...setProfilesAnalytics(platform === 'twitter' ? data.profileAnalyticsResp : data.igProfileAnalyticsResp),
            limit: 6,
            page: data.profilePaginatedResponse.currentPage,
            total: data.profilePaginatedResponse.totalItems,
            campaignDto: data.campaignDto,
            postSummaryResp: data.postSummaryResp,
            ...setProfilesAnalytics(platform === 'twitter' ? data.twitterFilterValueResp : data.instagramFilterValueResp),
        },
    };
};

export const calculateSummary = (count: number) => {
    let calSum = 0 as any;
    if (count !== undefined && count !== null && !isNaN(count)) {
        calSum = (count / 1000000).toFixed(1) + 'M';
        if (count > 999 && count < 1000000) {
            calSum = (count / 1000).toFixed(1) + 'K';
        } else if (count < 1000 && count > 9) {
            calSum = count.toFixed(0);
        } else if (count < 10) {
            calSum = count.toFixed(2);
        }
    }
    return calSum;
};

export const clearFilters = (params: any) => {
    let query = '';
    delete params.filterKeys;
    delete params.filterValues;
    for (const key in params) {
        if (Array.isArray(params[key])) {
            if (params[key].length > 0) {
                for (let i = 0; i < params[key].length; i++) {
                    query = query + `&${key}=${params[key][i]}`;
                }
            }
        } else {
            query = query + `&${key}=${params[key]}`;
        }
    }
    return query.replace('&', '?');
};
