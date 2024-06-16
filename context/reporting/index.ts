import { createSlice } from "@reduxjs/toolkit";

export interface IReportingState {
    link: string;
    csvFile: File | null;
}

let initialState: IReportingState = {
    link: "",
    csvFile: null,
}

export const reportingSlice = createSlice({
    name: "reporting",
    initialState,
    reducers: {
        setLink: (state, action) => {
            state.link = action.payload;
        },
        setCSVFile: (state, action) => {
            state.csvFile = action.payload;
        }
    }
});

export const { setLink, setCSVFile } = reportingSlice.actions;