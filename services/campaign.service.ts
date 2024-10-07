import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { enqueueSnackbar } from 'notistack';
import { ICampaign, ICampaignForm, ICampaignAPIResponse } from '@/interfaces/campaign';
import { User } from '@/interfaces/user';

export enum CampaignStatus {
    'all' = 'all',
    'active' = 'active',
    'shared' = 'shared',
    'archived' = 'archived',
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
            type: campaign.type,
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
                `${this.rustUrl}/campaign/create`,
                {
                    title: campaign.title,
                    description: campaign.description,
                    brand: campaign.brand,
                    keywords: campaign.keywords,
                    priority: campaign.priority,
                    startDate: campaign.startDate,
                    endDate: campaign.endDate,
                    status: campaign.status,
                    type: campaign.type,
                },
                {
                    headers: this.get_auth_header_rust(),
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
            const res = await axios.put<ICampaign>(`${this.rustUrl}/campaign/update/${id}`, campaignPayload, {
                headers: this.get_auth_header_rust(),
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
        status: string,
        ownerType: string,
        q: string,
        type: string
    ): Promise<{ data: ICampaign[]; status: string; ownerType: string; meta: any; q: string; type: string }> => {
        try {
            let params: { [key: string]: any } = {
                page,
                limit,
                status,
                ownerType,
                type,
            };
            if (q) {
                params.q = q;
            }
            if (ownerType === 'all') {
                delete params.ownerType;
            }
            const res = await axios.get<ICampaignAPIResponse>(`${this.rustUrl}/campaign/get`, {
                params,
                headers: this.get_auth_header_rust(),
            });
            return {
                data: res.data.data.map(this.covertAPICampaignToCampaign),
                status,
                ownerType,
                meta: res.data.meta,
                q: q,
                type,
            };
        } catch (err: any) {
            throw err;
        }
    };

    public createCampaignForm = async (campaignForm: ICampaignForm): Promise<ICampaign> => {
        try {
            const res = await axios.post<ICampaign>(`${this.rustUrl}/campaign/create-form`, campaignForm, {
                headers: this.get_auth_header_rust(),
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
            const res = await axios.post<User>(`${this.rustUrl}/campaign/share`, props, { headers: this.get_auth_header_rust() });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
