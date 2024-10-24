import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IProfilesReportingResponse, IProfilesResponse } from '@/interfaces/sheet';
import { enqueueSnackbar } from 'notistack';
import { ICampaign } from '@/interfaces/campaign';

interface IProfileNetworkService {
    syncInfluencers: (campaignId: string) => Promise<any>;
    deleteIgProfile: (campaignId: string, profileId: string) => Promise<any>;
    deleteTwProfile: (campaignId: string, profileId: string) => Promise<any>;
    getIgProfilesData: (campaignId: string, params: any) => Promise<IProfilesResponse>;
    getTwProfilesData: (campaignId: string, params: any) => Promise<IProfilesResponse>;
    getIgProfileReportingData: (campaignId: string, params: any) => Promise<IProfilesReportingResponse>;
    getTwProfileReportingData: (campaignId: string, params: any) => Promise<IProfilesReportingResponse>;
}

const baseAPI = '/api/rest/v1';
    
export default class ProfileNetworkService extends BaseNetworkFramework implements IProfileNetworkService {
    public static instance: ProfileNetworkService = new this();

    private constructor() {
        super();
    }

    public syncInfluencers = async (campaignId: string): Promise<void> => {
        try {
            await axios.post(`${baseAPI}/profile/campaign/trigger-report`, { campaignId }, this.get_auth_header_java());
        } catch (err: any) {
            throw err;
        }
    };

    public deleteIgProfile = async (campaignId: string, profileId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`${baseAPI}/ig/campaign/${campaignId}/profile/${profileId}`, this.get_auth_header_java());
            return res;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete instagram profile', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public deleteTwProfile = async (campaignId: string, profileId: string): Promise<any> => {
        try {
            const res = await axios.delete<ICampaign>(`${baseAPI}/tw/campaign/${campaignId}/profile/${profileId}`, this.get_auth_header_java());
            return res;
        } catch (err: any) {
            enqueueSnackbar('Failed to delete twitter profile', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public updateProfileMapping = async (postId: string, params: { [key: string]: number | string }): Promise<any> => {
        try {
            const res = await axios.post<any>(`${baseAPI}/profile/campaign/${postId}/update-profile-mapping`, params, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            enqueueSnackbar('Failed to update profile mapping', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            throw err;
        }
    };

    public getIgProfilesData = async (campaignId: string, params: string): Promise<IProfilesResponse> => {
        try {
            const res = await axios.get<IProfilesResponse>(`${baseAPI}/ig/campaign/${campaignId}/profiles${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getTwProfilesData = async (campaignId: string, params: string): Promise<IProfilesResponse> => {
        try {
            const res = await axios.get<IProfilesResponse>(`${baseAPI}/tw/campaign/${campaignId}/profiles${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getIgProfileReportingData = async (campaignId: string, params: string): Promise<IProfilesReportingResponse> => {
        try {
            const res: any = await axios.get<IProfilesReportingResponse>(
                `${baseAPI}/ig/campaign/${campaignId}/reporting${params}`,
                this.get_auth_header_java()
            );
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getTwProfileReportingData = async (campaignId: string, params: string): Promise<IProfilesReportingResponse> => {
        try {
            const res: any = await axios.get<IProfilesReportingResponse>(
                `${baseAPI}/tw/campaign/${campaignId}/reporting${params}`,
                this.get_auth_header_java()
            );
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
