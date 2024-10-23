declare interface OtherData {
    columnName: string;
    value: string;
}

declare interface SheetFilter {
    id: string;
    name: string;
}

declare interface FilterKeys {
    value: string;
    platforms: string[];
    postType: string[];
    sheets?: SheetFilter[];
    others?: OtherData[];
}

export interface AvailableFilters {
    platform: string[];
    internalSheetId: SheetFilter[];
    postType: string[];
    postedAt: string[];
    phase: string[];
    category: string[];
    subCategory: string[];
    [key: string]: string[] | SheetFilter[];
    lastAppliedFilterField: string;
}
export interface AvailableProfilesFilters {
    tags: string[];
    niche: string[];
    categories: string[];
    engagementRate: string[];
    postFrequencyPerDay: string[];
    averagePostCostRange: string[];
    profileTypeByFollowers: string[];
    [key: string]: string[] | SheetFilter[];
    lastAppliedFilterField: string;
}
