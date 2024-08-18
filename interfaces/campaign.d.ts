export interface ICampaignShortDetail {
    id: { $oid: string };
    title: string;
}
export interface ICampaign {
    id?: string;
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
        id: string;
        name: string;
        email: string;
    };
}

export interface ICampaignForm {
    id: { $oid: string };
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