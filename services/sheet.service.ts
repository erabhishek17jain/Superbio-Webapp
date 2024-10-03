import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { getCookie } from 'cookies-next';
import { ISheetDetails, IColumnDetails, ISheetPayload, ISheet, IColumnDataResponse, IPostsReportingResponse } from '@/interfaces/sheet';

interface ISheetNetworkService {
    getSheet: (url: string) => Promise<ISheetDetails[]>;
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
            const res = await axios.get<ISheetDetails[]>(`${this.rustUrl}/sheet/list`, {
                params: {
                    url,
                },
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public addSheetToCampaign = async (payload: ISheetPayload): Promise<ISheet> => {
        try {
            const res = await axios.post<ISheet>(`${this.rustUrl}/sheet/add-to-campaign`, payload, {
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public getSheetByCampaignId = async (campaignId: string): Promise<ISheet> => {
        try {
            const res = await axios.get<ISheet>(`${this.rustUrl}/sheet/get-by-campaign-id/${campaignId}`, {
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public checkSheetExists = async (campaignId: string): Promise<ISheet[]> => {
        try {
            const res = await axios.get<ISheet[]>(`${this.rustUrl}/sheet/is-campaign-sheet-exists/${campaignId}`, {
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public syncSheetNode = async (campaignId: string) => {
        try {
            const res = await axios.post<boolean>(
                `${this.rustUrl}/sheet/sync/${campaignId}`,
                {},
                {
                    headers: this.get_auth_header_rust(),
                }
            );
            return res.data;
        } catch (err: any) {}
    };

    public getQueueData = async (): Promise<IQueue[]> => {
        try {
            const res = await axios.get<IQueue[]>(`${this.rustUrl}/sheet/queues`, {
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public addScreenShotToReport = async (payload: any): Promise<ISheet> => {
        try {
            const res = await axios.post<ISheet>(`${this.rustUrl}/sheet/upload-post`, payload, {
                headers: this.get_auth_header_rust(),
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };
}
