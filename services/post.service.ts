import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IPostsReportingResponse, IPostsResponse, IProfilesReportingResponse, IProfilesResponse } from '@/interfaces/sheet';
import { enqueueSnackbar } from 'notistack';
import { ICampaign } from '@/interfaces/campaign';

interface IPostNetworkService {
    deleteCampaign: (campaignId: string) => Promise<ICampaign>;
    deletePost: (campaignId: string) => Promise<ICampaign>;
    getCampaignSummary: (campaignId: string, params: any) => Promise<IPostsResponse>;
    updatePostAnalytics: (postId: string, params: any) => Promise<any>;
    updateEstimatedReach: (campaignId: string, params: any) => Promise<ICampaign>;
    getPostsData: (campaignId: string, params: any) => Promise<IPostsResponse>;
    getPostReportingData: (campaignId: string, params: any) => Promise<IPostsReportingResponse>;
}

const baseAPI = '/api/rest/v1';
    
export default class PostNetworkService extends BaseNetworkFramework implements IPostNetworkService {
    public static instance: PostNetworkService = new this();

    private constructor() {
        super();
    }

    // campaign
    public deleteCampaign = async (campaignId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`${baseAPI}/campaign/${campaignId}`, this.get_auth_header_java());
            return res;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete campaign', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public getCampaignSummary = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`${baseAPI}/campaign/${campaignId}/analytics/${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public updateEstimatedReach = async (campaignId: any, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`${baseAPI}/campaign/${campaignId}/custom-analytics`, params, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update estimated reach', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public updateCustomAnalytics = async (campaignId: any, params: any): Promise<any> => {
        try {
            params['analysisStatDtos'] = params.analysisStatDtos.map((item: any) => {
                delete item.basedOnPosts;
                return { ...item };
            });
            const res = await axios.post<any>(`${baseAPI}/campaign/${campaignId}/custom-analytics`, params, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update estimated reach', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    // post
    public deletePost = async (postId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`${baseAPI}/posts/${postId}`, this.get_auth_header_java());
            return res;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete post', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public updatePostAnalytics = async (postId: string, params: { [key: string]: number | string }): Promise<any> => {
        try {
            const res = await axios.put<any>(`${baseAPI}/posts/${postId}`, params, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update post analytics', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public getPostsData = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`${baseAPI}/posts/${campaignId}/posts${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    // reporting
    public getPostReportingData = async (campaignId: string, params: string): Promise<IPostsReportingResponse> => {
        try {
            const res = await axios.get<IPostsReportingResponse>(`${this.javaUrl}/rest/v1/reporting/${campaignId}${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    // analytics
    public getAnalyticsData = async (campaignId: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`${this.javaUrl}/rest/v1/campaign-analytics/${campaignId}/report-data`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
