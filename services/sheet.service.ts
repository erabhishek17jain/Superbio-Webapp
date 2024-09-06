import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { getCookie } from 'cookies-next';
import { ISheetDetails, IColumnDetails, ISheetPayload, ISheet, IColumnDataResponse, IPostsReportingResponse } from '@/interfaces/sheet';

interface ISheetNetworkService {
    getSheet: (url: string) => Promise<ISheetDetails[]>;
    getSheetValues: (sheetId: string, sheetName: string, range: string) => Promise<IColumnDetails[]>;
    addSheetToCampaign: (payload: ISheetPayload) => Promise<ISheet>;
    getSheetByCampaignId: (campaignId: string) => Promise<ISheet>;
}

export default class SheetNetworkService extends BaseNetworkFramework implements ISheetNetworkService {
    public static instance: SheetNetworkService = new this();

    private constructor() {
        super();
    }

    public getSheet = async (url: string): Promise<ISheetDetails[]> => {
        try {
            const res = await axios.get<ISheetDetails[]>(`${this.url}/sheet/list`, {
                params: {
                    url,
                },
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getSheetValues = async (sheetId: string, sheetName: string, range: string): Promise<IColumnDetails[]> => {
        try {
            const res = await axios.get<IColumnDetails[]>(`${this.url}/sheet/values`, {
                params: {
                    sheetId,
                    sheetName,
                    range,
                },
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public addSheetToCampaign = async (payload: ISheetPayload): Promise<ISheet> => {
        try {
            const res = await axios.post<ISheet>(`${this.url}/sheet/add-to-campaign`, payload, {
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getSheetByCampaignId = async (campaignId: string): Promise<ISheet> => {
        try {
            const res = await axios.get<ISheet>(`${this.url}/sheet/get-by-campaign-id/${campaignId}`, {
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getCampaignData = async (campaignId: string, params: { [key: string]: number | string }): Promise<IColumnDataResponse> => {
        try {
            let header: { [key: string]: string } = this.get_auth_header();
            if (getCookie('token')) {
                header['Authorization'] = `Bearer ${getCookie('token')}`;
            }
            if (!header.Authorization.includes('undefined')) {
                const res = await axios.get<IColumnDataResponse>(`${this.url}/sheet/get-by-campaign-id/${campaignId}`, {
                    headers: header,
                    params,
                });
                return res.data;
            } else {
                const res = await axios.get<IColumnDataResponse>(`${this.url}/public/public-reporting/${campaignId}`, {
                    params,
                });
                return res.data;
            }
        } catch (err: any) {
            throw err;
        }
    };

    public checkSheetExists = async (campaignId: string): Promise<ISheet[]> => {
        try {
            const res = await axios.get<ISheet[]>(`${this.url}/sheet/is-campaign-sheet-exists/${campaignId}`, {
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public syncSheet = async (campaignId: string) => {
        try {
            const res = await axios.post<boolean>(
                `${this.url}/sheet/sync/${campaignId}`,
                {},
                {
                    headers: this.get_auth_header(),
                }
            );
            return res.data;
        } catch (err: any) {}
    };

    public getSheetFilters = async (campaignId: string) => {
        try {
            let header: { [key: string]: string } = this.get_auth_header();
            if (getCookie('token')) {
                header['Authorization'] = `Bearer ${getCookie('token')}`;
            }
            const res = await axios.get(`${this.url}/sheet/filters/${campaignId}`, {
                headers: header,
            });
            return res.data;
        } catch (err: any) {}
    };

    public getQueueData = async (): Promise<IQueue[]> => {
        try {
            const res = await axios.get<IQueue[]>(`${this.url}/sheet/queues`, {
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public addScreenShotToReport = async (payload: any): Promise<ISheet> => {
        try {
            const res = await axios.post<ISheet>(`${this.url}/sheet/upload-post`, payload, {
                headers: this.get_auth_header(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
