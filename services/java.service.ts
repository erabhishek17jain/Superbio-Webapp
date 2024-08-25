import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IReportingResponse, IPostsResponse } from '@/interfaces/sheet';
import { enqueueSnackbar } from 'notistack';
import { ICampaign } from '@/interfaces/campaign';

interface IJavaNetworkService {
    getPostsData: (campaignId: string, params: any) => Promise<IPostsResponse>;
    deleteCampaign: (campaignId: string) => Promise<ICampaign>;
    getReportingData: (campaignId: string, params: any) => Promise<IReportingResponse>;
    updateEstimatedReach: (campaignId: string, params: any) => Promise<ICampaign>;
}

export default class JavaNetworkService extends BaseNetworkFramework implements IJavaNetworkService {
    public static instance: JavaNetworkService = new this();

    private constructor() {
        super();
    }

    public getReportingData = async (campaignId: string, params: string): Promise<IReportingResponse> => {
        try {
            const res = await axios.get<IReportingResponse>(`/api/reporting/${campaignId}${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getPostsData = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/post/${campaignId}/posts/${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getCampaignSummary = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/campaign/${campaignId}/analytics/${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public deleteCampaign = async (campaignId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`/api/campaign/${campaignId}`, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
            return res;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete campaign', { variant: 'error' });
            throw err;
        }
    };

    public updateEstimatedReach = async (campaignId: any, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`/api/campaign/${campaignId}/custom-analytics`, params, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update estimated reach', { variant: 'error' });
            throw err;
        }
    };

    public updatePostAnalytics = async (postId: string, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.put<ICampaign>(`/api/post/${postId}`, params, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update post analytics', { variant: 'error' });
            throw err;
        }
    };
}
