import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { enqueueSnackbar } from 'notistack';
import { ICampaign as ICampaignContext, ICampaignForm as ICampaignFormContext } from '../context/campaign';

export interface ICampaign {
    _id: { $oid: string };
    title: string;
    description: string;
    startDate: string;
    status: string;
    brand: string;
    keywords: string[];
    priority: number;
    endDate?: string;
    groups: number;
    source: string;
    sharedUsers?: any[];
    updatedAt: MongoDate;
    createdAt: MongoDate;
    user?: {
        _id: { $oid: string };
        name: string;
        email: string;
    };
}

export interface ICampaignForm {
    _id: { $oid: string };
    fields: any[];
}

export interface ICampaignAPIResponse {
    data: ICampaign[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export enum CampaignStatus {
    'active' = 'active',
    'shared' = 'shared',
    'archived' = 'archived',
    'active_p' = 'active_p',
}

export default class CampaignNetworkService extends BaseNetworkFramework {
    public static instance: CampaignNetworkService = new this();

    private constructor() {
        super();
    }

    private covertAPICampaignToCampaign = (campaign: ICampaign): ICampaignContext => {
        return {
            id: campaign._id.$oid,
            title: campaign.title,
            description: campaign.description,
            brand: campaign.brand,
            keywords: campaign.keywords,
            priority: campaign.priority,
            startDate: new Date(campaign.startDate),
            endDate: campaign.endDate ? new Date(campaign.endDate) : new Date(),
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

    public createCampaign = async (campaign: ICampaignContext): Promise<ICampaignContext> => {
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
            enqueueSnackbar('Failed to create campaign', { variant: 'error' });
            throw err;
        }
    };

    public updateCampaign = async (campaign: ICampaignContext): Promise<ICampaignContext> => {
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
            enqueueSnackbar('Failed to create campaign', { variant: 'error' });
            throw err;
        }
    };

    public deleteCampaign = async (campaignId: ICampaignContext): Promise<ICampaignContext> => {
        try {
            const res = await axios.delete<ICampaign>(`${this.javaUrl}/campaign/${campaignId}`, {
                headers: this.get_auth_header(),
            });
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to create campaign', { variant: 'error' });
            throw err;
        }
    };

    public getCampaigns = async (
        page: number,
        limit: number,
        status: CampaignStatus,
        ownerType: string,
        q: string
    ): Promise<{ data: ICampaignContext[]; status: string; ownerType: string; meta: any; q: string }> => {
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

    public fetcher = async (url: string): Promise<ICampaignContext[]> => {
        try {
            const res = await axios.get<ICampaignAPIResponse>(`${this.url}/campaign/get${url}`, {
                headers: this.get_auth_header(),
            });
            return res.data.data.map(this.covertAPICampaignToCampaign);
        } catch (err: any) {
            throw err;
        }
    };

    public fetcherWithMeta = async (url: string): Promise<{ data: ICampaignContext[]; meta: any }> => {
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

    public createCampaignForm = async (campaignForm: ICampaignFormContext): Promise<ICampaignContext> => {
        try {
            const res = await axios.post<ICampaign>(`${this.url}/campaign/create-form`, campaignForm, {
                headers: this.get_auth_header(),
            });
            return this.covertAPICampaignToCampaign(res.data);
        } catch (err: any) {
            enqueueSnackbar('Failed to create campaign form', { variant: 'error' });
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
