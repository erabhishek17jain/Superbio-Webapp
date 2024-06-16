declare interface OtherData {
    columnName: string;
    value: string;
}

declare interface SheetFilter {
    _id: { $oid: string };
    name: string;
}

declare interface FilterKeys {
    value: string;
    platforms: string[];
    postType: string[];
    sheets?: SheetFilter[];
    others?: OtherData[];
}

declare interface AvailableFilters {
    platform: string[];
    internalSheetId: SheetFilter[];
    postType: string[];
    postedAt: string[];
    phase: string[];
    category: string[];
    subCategory: string[];
    [key: string]: string[] | SheetFilter[];
}
