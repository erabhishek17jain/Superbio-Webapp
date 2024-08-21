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

    private covertAPICampaignToCampaign = (campaign: any): ICampaign => {
        return {
            id: campaign._id.$oid,
            title: campaign.title,
            description: campaign.description,
            brand: campaign.brand,
            keywords: campaign.keywords,
            priority: campaign.priority,
            startDate: new Date(campaign.startDate).toDateString(),
            endDate: campaign.endDate ? new Date(campaign.endDate).toDateString() : new Date().toDateString(),
            status: campaign.status,
            groups: campaign.groups,
            source: campaign.source,
            updatedAt: new Date(campaign.updatedAt.$date.$numberLong),
            createdAt: new Date(campaign.createdAt.$date.$numberLong),
            sharedUsers: campaign.sharedUsers,
            user: {
                id: campaign.user?._id.$oid,
                name: campaign.user?.name,
                email: campaign.user?.email,
            },
        };
    };

    public getPostsData = async (campaignId: string, params: { [key: string]: number | string }): Promise<IPostsResponse> => {
        try {
            const res = await axios.get<IPostsResponse>(`/api/post/${campaignId}/posts`, {
                headers: this.get_auth_header(),
                withCredentials: true,
                params,
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public deleteCampaign = async (campaignId: string): Promise<ICampaign> => {
        try {
            const res = await axios.delete<ICampaign>(`/api/campaign/${campaignId}`, {
                 headers: this.get_auth_header(),
                withCredentials: true,
            });
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to delete campaign', { variant: 'error' });
            throw err;
        }
    };

    public getReportingData = async (campaignId: string, params: { [key: string]: number | string }): Promise<IReportingResponse> => {
        try {
            const res = await axios.get<IReportingResponse>(`/api/reporting/${campaignId}`, {
                 headers: this.get_auth_header(),
                withCredentials: true,
                params,
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public updateEstimatedReach = async (campaignId: string, params: { [key: string]: number | string }): Promise<ICampaign> => {
        try {
            const res = await axios.put<ICampaign>(`/api/campaign/${campaignId}/custom-analytics`, params, {
                 headers: this.get_auth_header(),
                 withCredentials: true,
            });
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete campaign', { variant: 'error' });
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
            enqueueSnackbar('Failed to delete campaign', { variant: 'error' });
            throw err;
        }
    };
}
