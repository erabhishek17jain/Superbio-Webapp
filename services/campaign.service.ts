import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { enqueueSnackbar } from 'notistack';
import { ICampaign, ICampaignForm, ICampaignAPIResponse } from '@/interfaces/campaign';
import { User } from '@/interfaces/user';

export enum CampaignStatus {
    'active' = 'active',
    'shared' = 'shared',
    'archived' = 'archived',
    'active_p' = 'active_p',
    'shared_p' = 'shared_p',
}
export default class CampaignNetworkService extends BaseNetworkFramework {
    public static instance: CampaignNetworkService = new this();

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

    public createCampaign = async (campaign: ICampaign): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(
                `${this.url}/campaign/create`,
                {
                    title: campaign.title,
                    description: campaign.description,
                    brand: campaign.brand,
                    keywords: campaign.keywords,
                    priority: campaign.priority,
                    startDate: campaign.startDate,
                    endDate: campaign.endDate,
                    status: campaign.status,
                },
                {
                    headers: this.get_auth_header(),
                }
            );
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to create campaign', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public updateCampaign = async (campaign: ICampaign): Promise<ICampaign> => {
        try {
            let id = campaign.id;
            let campaignPayload: any = {
                ...campaign,
                id: undefined,
            };
            const res = await axios.put<ICampaign>(`${this.url}/campaign/update/${id}`, campaignPayload, {
                headers: this.get_auth_header(),
            });
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to update campaign', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public getCampaigns = async (
        page: number,
        limit: number,
        status: CampaignStatus,
        ownerType: string,
        q: string
    ): Promise<{ data: ICampaign[]; status: string; ownerType: string; meta: any; q: string }> => {
        try {
            let params: { [key: string]: any } = {
                page,
                limit,
                status,
                ownerType,
            };
            if (q) {
                params.q = q;
            }
            const res = await axios.get<ICampaignAPIResponse>(`${this.url}/campaign/get`, {
                params,
                headers: this.get_auth_header(),
            });
            return {
                data: res.data.data.map(this.covertAPICampaignToCampaign),
                status,
                ownerType,
                meta: res.data.meta,
                q: q,
            };
        } catch (err: any) {
            throw err;
        }
    };

    public fetcher = async (url: string): Promise<ICampaign[]> => {
        try {
            const res = await axios.get<ICampaignAPIResponse>(`${this.url}/campaign/get${url}`, {
                headers: this.get_auth_header(),
            });
            return res.data.data.map(this.covertAPICampaignToCampaign);
        } catch (err: any) {
            throw err;
        }
    };

    public fetcherWithMeta = async (url: string): Promise<{ data: ICampaign[]; meta: any }> => {
        try {
            const res = await axios.get<ICampaignAPIResponse>(`${this.url}/campaign/get${url}`, {
                headers: this.get_auth_header(),
            });
            return {
                data: res.data.data.map(this.covertAPICampaignToCampaign),
                meta: res.data.meta,
            };
        } catch (err: any) {
            throw err;
        }
    };

    public createCampaignForm = async (campaignForm: ICampaignForm): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`${this.url}/campaign/create-form`, campaignForm, {
                headers: this.get_auth_header(),
            });
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to create campaign form', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public shareCampaign = async (props: User): Promise<User> => {
        try {
            const res = await axios.post<User>(`${this.url}/campaign/share`, props, { headers: this.get_auth_header() });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
