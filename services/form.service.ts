import axios from 'axios';
import BaseNetworkFramework from './base.service';
import { IPublicForm, ISubmitPublicForm } from '@/interfaces/public';
import { IColumn } from '@/interfaces/sheet';

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
        queueDto: any;
        campaignDto: any;
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
            const res = await axios.get<IPublicForm>(`${this.rustUrl}/public/form/${campaignId}`);
            return res.data;
        } catch (err: any) {
            console.log(err);
            return {} as IPublicForm;
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
