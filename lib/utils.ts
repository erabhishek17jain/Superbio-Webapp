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
                postedAt: data.filterValueResp.postedAtDates?.filter((item: string) => item !== ''),
                internalSheetId: data.filterValueResp.sheetNames?.filter((item: string) => item !== ''),
                platform: ['instagram', 'twitter']?.filter((item: string) => item !== ''),
                postType: data.filterValueResp.postTypes?.filter((item: string) => item !== ''),
                phase: data.filterValueResp.campaignPhases?.filter((item: string) => item !== ''),
                category: data.filterValueResp.categories?.filter((item: string) => item !== ''),
                subCategory: data.filterValueResp.subCategories?.filter((item: string) => item !== ''),
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
