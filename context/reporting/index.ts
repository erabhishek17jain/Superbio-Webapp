
import { IColumnResponse } from "@/services/form.service";
import { createSlice } from "@reduxjs/toolkit";

export interface IReportingState {
    link: string;
    csvFile: File | null;
    campData: IColumnResponse
}

let initialState: IReportingState = {
    link: '',
    csvFile: null,
    campData: { data: [], meta: {} as any },
};

export const reportingSlice = createSlice({
    name: "reporting",
    initialState,
    reducers: {
        setLink: (state, action) => {
            state.link = action.payload;
        },
        setCSVFile: (state, action) => {
            state.csvFile = action.payload;
        },
        setCampData: (state, action) => {
            state.campData = action.payload;
        }
    }
});

export const { setLink, setCSVFile, setCampData } = reportingSlice.actions;