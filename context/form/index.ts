import { createSlice } from "@reduxjs/toolkit";

export interface FormInput {
    label: string;
    value: string;
    type: string;
    isLinkField: boolean;
}

export interface FormState {
    formInputs: FormInput[];
}

export const formSlice = createSlice({
    name: "form",
    initialState: {
        formInputs: [],
    } as FormState,

    reducers: {
        setFormInputs: (state, action) => {
            state.formInputs = action.payload;
        }
    }
});

export const { setFormInputs } = formSlice.actions;