import { createSlice } from '@reduxjs/toolkit';
import { getCampaigns, createCampaign, fetchSheetByCampaignId } from './network';
import dayjs from 'dayjs';
import { ICampaign } from '@/interfaces/campaign';
import { IColumn, IColumnDetails, ISheet, ISheetDetails } from '@/interfaces/sheet';

let initialCampaign: ICampaign = {
    id: '',
    title: '',
    description: '',
    brand: '',
    keywords: [],
    priority: 3,
    startDate: dayjs().toDate().toDateString(),
    endDate: dayjs().toDate().toDateString(),
    status: '',
    groups: 0,
    source: '',
    user: {
        id: '',
        name: '',
        email: '',
    },
    sharedUsers: [],
    updatedAt: undefined,
    createdAt: undefined,
};

export interface ICampaignState {
    activeCampaign: { data: ICampaign[]; meta: any };
    sharedCampaign: { data: ICampaign[]; meta: any };
    archivedCampaign: { data: ICampaign[]; meta: any };
    allCampaign: { data: ICampaign[]; meta: any };
    selectedCampaign: ICampaign | null;
    loading: boolean;
    error: string;
    newCampaign: ICampaign;
    sheet: ISheet | null;
    sheetLoading: boolean;
    sheets: ISheetDetails[];
    selectedSheet: ISheetDetails | null;
    sheetValues: IColumnDetails[];
    valuesLoading: boolean;
    links: string[];
    totalLikes: number;
    columns: IColumn[];
    updatedAt: number;
    filters: FilterKeys[];
    meta: {
        total: number;
        limit: number;
        page: number;
        updatedAt: number;
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
    } | null;
}

let initialState: ICampaignState = {
    activeCampaign: { data: [], meta: {} },
    sharedCampaign: { data: [], meta: {} },
    archivedCampaign: { data: [], meta: {} },
    allCampaign: { data: [], meta: {} },
    selectedCampaign: null,
    loading: true,
    error: '',
    newCampaign: initialCampaign,
    sheet: null,
    sheetLoading: true,
    sheets: [],
    selectedSheet: null,
    sheetValues: [],
    valuesLoading: false,
    links: [],
    totalLikes: 0,
    columns: [],
    updatedAt: 0,
    meta: null,
    filters: [],
};

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSelectCampaign: (state, action) => {
            state.selectedCampaign = action.payload;
        },
        setNewCampaign: (state, action) => {
            state.newCampaign = action.payload;
        },
        setSheet: (state, action) => {
            state.sheet = action.payload;
        },
        setSheetLoading: (state, action) => {
            state.sheetLoading = action.payload;
        },
        setSheets: (state, action) => {
            state.sheets = action.payload;
        },
        setSelectedSheet: (state, action) => {
            state.selectedSheet = action.payload;
        },
        setSheetValues: (state, action) => {
            state.sheetValues = action.payload;
        },
        setValuesLoading: (state, action) => {
            state.valuesLoading = action.payload;
        },
        setLinks: (state, action) => {
            state.links = action.payload;
        },
        setLikes: (state, action) => {
            if (!action.payload) {
                return;
            }
            state.totalLikes = action.payload + state.totalLikes;
        },
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        setUpdatedAt: (state, action) => {
            state.updatedAt = action.payload;
        },
        setMeta: (state, action) => {
            state.meta = action.payload;
        },
        resetCampaignStore: (state) => {
            state.selectedSheet = null;
            state.sheets = [];
            state.sheetLoading = false;
            state.selectedCampaign = null;
            state.sheet = null;
            state.newCampaign = initialCampaign;
            state.sheetValues = [];
            state.valuesLoading = false;
            state.links = [];
            state.totalLikes = 0;
            state.columns = [];
            state.updatedAt = 0;
            state.meta = null;
            state.allCampaign = { data: [], meta: {} };
        },
        setFitlersState: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCampaigns.rejected, (state) => {
            state.loading = false;
        }),
            builder.addCase(createCampaign.rejected, (state) => {
                state.loading = false;
            }),
            builder.addCase(getCampaigns.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(getCampaigns.fulfilled, (state, action: any) => {
                if (action.payload.ownerType === 'own') {
                    state.activeCampaign = action.payload;
                } else if (action.payload.ownerType === 'shared') {
                    state.sharedCampaign = action.payload;
                } else if (action.payload.ownerType === 'archive') {
                    state.archivedCampaign = action.payload;
                }
                state.allCampaign = action.payload;
                state.loading = false;
            }),
            builder.addCase(createCampaign.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(createCampaign.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(fetchSheetByCampaignId.pending, (state) => {
                state.sheetLoading = true;
            }),
            builder.addCase(fetchSheetByCampaignId.fulfilled, (state, action) => {
                state.sheet = action.payload;
                state.sheetLoading = false;
            }),
            builder.addCase(fetchSheetByCampaignId.rejected, (state) => {
                state.sheetLoading = false;
            });
    },
});

export const {
    setLoading,
    setSelectCampaign,
    setNewCampaign,
    setSheet,
    setSheetLoading,
    setSheets,
    setSelectedSheet,
    resetCampaignStore,
    setSheetValues,
    setValuesLoading,
    setLinks,
    setLikes,
    setColumns,
    setUpdatedAt,
    setMeta,
    setFitlersState,
} = campaignSlice.actions;
