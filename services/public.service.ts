import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IColumn } from './sheet.service';

export interface IPublicForm {
    campaignName: string;
    form: {
        _id: { $oid: string };
        campaignId: { $oid: string };
        fields: [
            {
                fieldType: string;
                label: string;
                required: boolean;
                isLinkField: boolean;
            },
        ];
    };
}

export interface ISubmitPublicForm {
    formId: string;
    campaignId: string;
    fields: {
        fieldType: string;
        label: string;
        value: string;
        isLinkField: boolean;
    }[];
}

interface IPublicNetworkService {
    getPublicForm: (campaignId: string) => Promise<IPublicForm>;
    submitPublicForm: (data: ISubmitPublicForm) => Promise<string>;
}

export interface IColumnResponse {
    data: IColumn[];
    meta: {
        total: number;
        page: number;
        limit: number;
        analytics: {
            likes: string;
            quotes: string;
            reposts: string;
            views: string;
            bookmarks: string;
        };
        basedOnPosts: {
            likes: string;
            quotes: string;
            reposts: string;
            views: string;
            bookmarks: string;
        };
        postSummaryResp: any;
        filterValueResp: any;
    };
}

export default class PublicNetworkService extends BaseNetworkFramework implements IPublicNetworkService {
    public static instance: PublicNetworkService = new this();

    private constructor() {
        super();
    }

    public getPublicForm = async (campaignId: string): Promise<IPublicForm> => {
        try {
            const res = await axios.get<IPublicForm>(`${this.url}/public/form/${campaignId}`);
            return res.data;
        } catch (err: any) {
            console.log(err);
            return {} as IPublicForm;
        }
    };

    public getCampaignReportData = async (campaignId: string, params: { [key: string]: number | string }): Promise<IColumnResponse> => {
        try {
            const res = await axios.get<IColumnResponse>(`${this.url}/public/public-reporting/${campaignId}`, {
                params,
            });
            return res.data;
        } catch (err: any) {
            throw err;
        }
    };

    public submitPublicForm = async (data: ISubmitPublicForm): Promise<string> => {
        try {
            const res = await axios.post<{ message: string }>(`${this.nodeUrl}/form/submit`, data);
            return res.data.message;
        } catch (err: any) {
            console.log(err);
            return '';
        }
    };
}
