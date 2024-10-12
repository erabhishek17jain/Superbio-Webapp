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
            const res = await axios.delete<ICampaign>(`/api/campaign/${campaignId}`, this.get_auth_header_java());
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

    // post
    public deletePost = async (postId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`/api/post/${postId}`, this.get_auth_header_java());
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

    public getCampaignSummary = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/campaign/${campaignId}/analytics/${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public updatePostAnalytics = async (postId: string, params: { [key: string]: number | string }): Promise<any> => {
        try {
            const res = await axios.put<any>(`/api/post/${postId}`, params, this.get_auth_header_java());
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

    public updateEstimatedReach = async (campaignId: any, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`/api/campaign/${campaignId}/custom-analytics`, params, this.get_auth_header_java());
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

    public getPostsData = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/post/${campaignId}/posts${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getPostReportingData = async (campaignId: string, params: string): Promise<IPostsReportingResponse> => {
        try {
            const res = await axios.get<IPostsReportingResponse>(`${this.javaUrl}/reporting/${campaignId}${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
