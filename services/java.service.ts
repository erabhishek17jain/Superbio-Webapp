import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IPostsReportingResponse, IPostsResponse, IProfilesReportingResponse, IProfilesResponse } from '@/interfaces/sheet';
import { enqueueSnackbar } from 'notistack';
import { ICampaign } from '@/interfaces/campaign';

interface IJavaNetworkService {
    getPostsData: (campaignId: string, params: any) => Promise<IPostsResponse>;
    deleteCampaign: (campaignId: string) => Promise<ICampaign>;
    getPostReportingData: (campaignId: string, params: any) => Promise<IPostsReportingResponse>;
    updateEstimatedReach: (campaignId: string, params: any) => Promise<ICampaign>;
}

export default class JavaNetworkService extends BaseNetworkFramework implements IJavaNetworkService {
    public static instance: JavaNetworkService = new this();

    private constructor() {
        super();
    }

    public getPostReportingData = async (campaignId: string, params: string): Promise<IPostsReportingResponse> => {
        try {
            const res = await axios.get<IPostsReportingResponse>(`${this.javaUrl}/reporting/${campaignId}${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getProfileReportingData = async (campaignId: string, params: string): Promise<IProfilesReportingResponse> => {
        try {
            const res: any = await axios.get<IProfilesReportingResponse>(`${this.javaUrl}/profile/${campaignId}/reporting${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getPostsData = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`${this.javaUrl}/post/${campaignId}/posts${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getProfilesData = async (campaignId: string, params: string): Promise<IProfilesResponse> => {
        try {
            const res = await axios.get<IProfilesResponse>(`${this.javaUrl}/profile/${campaignId}/profiles${params}`);
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getCampaignSummary = async (campaignId: string, params: string): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/campaign/${campaignId}/analytics/${params}`, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
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

    public deletePost = async (postId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`/api/post/${postId}`, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
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

    public deleteProfile = async (campaignId: string, profileId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`/api/profile/campaign/${campaignId}/profile/${profileId}`, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
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

    public updateEstimatedReach = async (campaignId: any, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`/api/campaign/${campaignId}/custom-analytics`, params, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
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

    public updatePostAnalytics = async (postId: string, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.put<ICampaign>(`/api/post/${postId}`, params, {
                headers: this.get_auth_header(),
                withCredentials: true,
            });
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
}
