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
    profileTypeByFollowers: string[];
    postFrequencyPerDay: string[];
    niche: string[];
    engagementRate: string[];
    [key: string]: string[] | SheetFilter[];
    lastAppliedFilterField: string;
}
