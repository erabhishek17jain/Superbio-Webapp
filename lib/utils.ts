import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deleteCookie } from 'cookies-next';
import { IReportingResponse } from '@/services/sheet.service';

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
    window.location.reload();
};

export const structureData = (data: IReportingResponse) => {
    let sheets = data.filterValueResp.lastAppliedFilterField === 'internalSheetId' ? data.filterValueResp.allSheets : data.filterValueResp.sheets;
    sheets = sheets.map((item: any) => {
        return { id: item.id, name: item.name };
    });
    return {
        data: data.postDtoPaginatedResponse.items,
        meta: {
            page: data.postDtoPaginatedResponse.currentPage,
            limit: 6,
            total: data.postSummaryResp.totalPosts,
            analytics: {
                likes: data.campaignAnalyticsResp.likes,
                comments: data.campaignAnalyticsResp.comments,
                views: data.campaignAnalyticsResp.views,
                reposts: data.campaignAnalyticsResp.reposts,
                quotes: data.campaignAnalyticsResp.quotes,
                bookmarks: data.campaignAnalyticsResp.bookmarks,
            },
            basedOnPosts: {
                likes: data.campaignAnalyticsResp.basedOnPostCountDto.likePosts,
                comments: data.campaignAnalyticsResp.basedOnPostCountDto.commentPosts,
                views: data.campaignAnalyticsResp.basedOnPostCountDto.viewPosts,
                reposts: data.campaignAnalyticsResp.basedOnPostCountDto.repostPosts,
                quotes: data.campaignAnalyticsResp.basedOnPostCountDto.quotePosts,
                bookmarks: data.campaignAnalyticsResp.basedOnPostCountDto.bookmarkPosts,
            },
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

export const calculateSummary = (count: number) => {
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

export const clearFilters = (params: any) => {
    delete params.filterKeys;
    delete params.filterValues;
    for (const key in params) {
        if (Array.isArray(params[key])) {
            if (params[key].length > 0) {
                params[key] = params[key][0];
            } else {
                delete params[key];
            }
        }
    }
    return params;
};
