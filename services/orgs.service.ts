import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IProfilesReportingResponse, IProfilesResponse } from '@/interfaces/sheet';
import { enqueueSnackbar } from 'notistack';
import { ICampaign } from '@/interfaces/campaign';

interface IOrgsNetworkService {
    syncInfluencers: (orgId: string) => Promise<any>;
    deleteIgProfile: (orgId: string, profileId: string) => Promise<any>;
    deleteTwProfile: (orgId: string, profileId: string) => Promise<any>;
    getIgProfilesData: (orgId: string, params: any) => Promise<IProfilesResponse>;
    getTwProfilesData: (orgId: string, params: any) => Promise<IProfilesResponse>;
    getIgProfileReportingData: (orgId: string, params: any) => Promise<IProfilesReportingResponse>;
    getTwProfileReportingData: (orgId: string, params: any) => Promise<IProfilesReportingResponse>;
}

const baseAPI = '/api/rest/v1';

export default class OrgsNetworkService extends BaseNetworkFramework implements IOrgsNetworkService {
    public static instance: OrgsNetworkService = new this();

    private constructor() {
        super();
    }

    public addSheet = async (params: any): Promise<any> => {
        try {
            const res = await axios.post(`${baseAPI}/org/import/sheet`, { ...params }, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public previewSheet = async (internalSheetId: string): Promise<any> => {
        try {
            const res = await axios.get(`${baseAPI}/org/import/sheet/preview/${internalSheetId}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
    
    public getSheets = async (orgId: string): Promise<any> => {
        try {
            const res = await axios.get(`${baseAPI}/org/import/sheet/${orgId}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public mappingColumns = async (params: any): Promise<any> => {
        try {
            const res = await axios.post(`${baseAPI}/org/import/sheet/map`, { ...params }, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public syncInfluencers = async (orgId: string): Promise<void> => {
        try {
            await axios.post(`${baseAPI}/profile/campaign/trigger-report`, { orgId }, this.get_auth_header_java());
        } catch (err: any) {
            throw err;
        }
    };

    public deleteIgProfile = async (orgId: string, profileId: string): Promise<any> => {
        try {
            const res = await axios.delete<any>(`${baseAPI}/ig/org/${orgId}/profile/${profileId}`, this.get_auth_header_java());
            return res.data;
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

    public deleteTwProfile = async (orgId: string, profileId: string): Promise<any> => {
        try {
            const res = await axios.delete<any>(`${baseAPI}/tw/org/${orgId}/profile/${profileId}`, this.get_auth_header_java());
            return res.data;
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

    public getIgProfilesData = async (orgId: string, params: string): Promise<IProfilesResponse> => {
        try {
            const res = await axios.get<IProfilesResponse>(`${baseAPI}/ig/org/${orgId}/profiles${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getTwProfilesData = async (orgId: string, params: string): Promise<IProfilesResponse> => {
        try {
            const res = await axios.get<IProfilesResponse>(`${baseAPI}/tw/org/${orgId}/profiles${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getIgProfileReportingData = async (orgId: string, params: string): Promise<IProfilesReportingResponse> => {
        try {
            const res: any = await axios.get<IProfilesReportingResponse>(`${baseAPI}/ig/org/${orgId}/reporting${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getTwProfileReportingData = async (orgId: string, params: string): Promise<IProfilesReportingResponse> => {
        try {
            const res: any = await axios.get<IProfilesReportingResponse>(`${baseAPI}/tw/org/${orgId}/reporting${params}`, this.get_auth_header_java());
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
