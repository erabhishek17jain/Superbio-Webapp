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

export const setProfilesAnalytics = (profileAnalyticsResp: any) => {
    const analytics = {
        views: profileAnalyticsResp.avgViews,
        followers: profileAnalyticsResp.totalFollowers,
        engagements: profileAnalyticsResp.avgEngagementRate,
        frequency_per_day: profileAnalyticsResp.avgPostFrequencyPerDay,
    };
    const basedOnPosts = {
        views: profileAnalyticsResp.basedOnProfileCount.avgViews,
        followers: profileAnalyticsResp.basedOnProfileCount.totalFollowers,
        engagements: profileAnalyticsResp.basedOnProfileCount.avgEngagementRate,
        frequency_per_day: profileAnalyticsResp.basedOnProfileCount.avgPostFrequencyPerDay,
    };
    return { analytics: analytics, basedOnPosts: basedOnPosts };
};


export const structureProfilesData = (data: IProfilesReportingResponse) => {
    let sheets =
        data.instagramFilterValueResp.lastAppliedFilterField === 'internalSheetId'
            ? data.instagramFilterValueResp.allSheets
            : data.instagramFilterValueResp.sheets;
    sheets = sheets.map((item: any) => {
        return { id: item.id, name: item.name };
    });
    return {
        data: data.profilePaginatedResponse.items,
        meta: {
            ...setPostsAnalytics(data.profileAnalyticsResp),
            limit: 6,
            page: data.profilePaginatedResponse.currentPage,
            total: data.profilePaginatedResponse.totalItems,
            campaignDto: data.campaignDto,
            postSummaryResp: data.postSummaryResp,
            filterValueResp: {
                postedAt:
                    data.profilePaginatedResponse.lastAppliedFilterField === 'postedAt'
                        ? data.instagramFilterValueResp.allPostedAtDates
                        : data.instagramFilterValueResp.postedAtDates,
                internalSheetId: sheets,
                platform:
                    data.instagramFilterValueResp.lastAppliedFilterField === 'platform'
                        ? data.instagramFilterValueResp.allPlatforms
                        : data.instagramFilterValueResp.platforms,
                postType:
                    data.instagramFilterValueResp.lastAppliedFilterField === 'postType'
                        ? data.instagramFilterValueResp.allPostTypes
                        : data.instagramFilterValueResp.postTypes,
                phase:
                    data.instagramFilterValueResp.lastAppliedFilterField === 'phase'
                        ? data.instagramFilterValueResp.allCampaignPhases
                        : data.instagramFilterValueResp.campaignPhases,
                category:
                    data.instagramFilterValueResp.lastAppliedFilterField === 'category'
                        ? data.instagramFilterValueResp.allCategories
                        : data.instagramFilterValueResp.categories,
                subCategory:
                    data.instagramFilterValueResp.lastAppliedFilterField === 'subCategory'
                        ? data.instagramFilterValueResp.allSubCategories
                        : data.instagramFilterValueResp.subCategories,
            },
        },
    };
};

export const calculateSummary = (count: number) => {
    let calSum = 0 as any;
    if (count !== undefined && count !== null && !isNaN(count)) {
        calSum = (count / 1000000).toFixed(1) + 'M';
        if (count > 999 && count < 1000000) {
            calSum = (count / 1000).toFixed(1) + 'K';
        } else if (count < 1000) {
            calSum = count;
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
