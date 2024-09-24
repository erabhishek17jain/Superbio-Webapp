export interface SearchParams {
    page: string;
    size: string;
    sortBy: string;
    sortDirection: string;
    filter: string;
    value: string;
    isPublic?: boolean;
}

export interface Params {
    title: string;
    campType: string;
    campaignId: string;
}

export interface ISummary {
    totCount: number;
    count: number;
    icon: JSX.Element;
    color: string;
    title: string;
    basedOn: number | any;
}
