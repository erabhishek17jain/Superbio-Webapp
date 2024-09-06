import { createAsyncThunk } from '@reduxjs/toolkit';
import CampaignNetworkService, { CampaignStatus } from '@/services/campaign.service';
import { enqueueSnackbar } from 'notistack';
import SheetNetworkService from '@/services/sheet.service';
import { ICampaign } from '@/interfaces/campaign';

export const getCampaigns = createAsyncThunk(
    'campaign/getCampaigns',
    async (payload: { page: number; limit: number; status: CampaignStatus; ownerType: string; q: string; type: string }) => {
        try {
            const { page, limit, status, ownerType, q, type } = payload;
            return await CampaignNetworkService.instance.getCampaigns(page, limit, status, ownerType, q, type);
        } catch (err: any) {
            throw err;
        }
    }
);

export const createCampaign = createAsyncThunk('compaign/createCampaign', async (payload: ICampaign, ThunkRejectAPI) => {
    try {
        return await CampaignNetworkService.instance.createCampaign(payload).then((r) =>
            enqueueSnackbar('Campaign created', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
        );
    } catch (err) {
        throw ThunkRejectAPI.rejectWithValue(err);
    }
});

export const fetchSheetByCampaignId = createAsyncThunk('campaign/fetchSheetByCampaignId', async (payload: { campaignId: string }) => {
    try {
        const { campaignId } = payload;
        return await SheetNetworkService.instance.getSheetByCampaignId(campaignId);
    } catch (err: any) {
        throw err;
    }
});
